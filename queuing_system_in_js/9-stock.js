
/**
 * Defines a simple in-memory product catalog and stock management.
 *
 * listProducts - Array of sample products with id, name, price, and stock fields.
 * Serves as a mock product catalog.
 */
import express from "express";
import { createClient } from "redis";
import { promisify } from "util";

const app = express();
const client = createClient();

const listProducts = [
  { id: 1, name: "Suitcase 250", price: 50, stock: 4 },
  { id: 2, name: "Suitcase 450", price: 100, stock: 10 },
  { id: 3, name: "Suitcase 650", price: 350, stock: 2 },
  { id: 4, name: "Suitcase 1050", price: 550, stock: 5 },
];

/**
 * Gets a product item from the listProducts array by its id.
 *
 * @param {number} id - The id of the product to find.
 * @returns {Object|undefined} The product object if found, else undefined.
 */

/**
 * Reserves the provided amount of stock for the given product id.
 *
 * @param {number} itemId - The id of the product to reserve stock for.
 * @param {number} stock - The amount of stock to reserve.
 * @returns {Promise} A promise that resolves when the stock is reserved.
 */

/**
 * Gets the currently reserved stock for the given product id.
 *
 * @param {number} itemId - The product id to get reserved stock for.
 * @returns {Promise<number|null>} A promise that resolves to the
 * reserved stock amount, or null if none reserved.
 */
const getItemById = (id) => listProducts.find((item) => item.id === id);

const reserveStockById = async (itemId, stock) => {
  await client.setAsync(`item.${itemId}`, stock);
};

const getCurrentReservedStockById = async (itemId) => {
  const stock = await client.getAsync(`item.${itemId}`);
  return stock || null;
};

/**
 * Converts Redis client get and set methods to use promises instead of callbacks.
 *
 * @param {Function} method - The Redis client method to promisify.
 * @returns {Function} - The promisified method returning a promise.
 */

/**
 * GET endpoint to retrieve a list of products to display.
 *
 * Returns an array of products with only needed fields, and renamed fields.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
client.getAsync = promisify(client.get);
client.setAsync = promisify(client.set);

app.get("/list_products", (req, res) => {
  res.json(
    listProducts.map(({ id, name, price, stock }) => ({
      itemId: id,
      itemName: name,
      price,
      initialAvailableQuantity: stock,
    }))
  );
});

/**
 * GET /list_products/:itemId
 *
 * Gets details for a specific product by ID.
 *
 * Returns product details including current reserved stock:
 * - itemId: Product ID
 * - itemName: Product name
 * - price: Product price
 * - initialAvailableQuantity: Initial stock level
 * - currentQuantity: Current reserved stock level
 */
app.get("/list_products/:itemId", async (req, res) => {
  const product = getItemById(Number(req.params.itemId));
  if (!product) {
    return res.json({ status: "Product not found" });
  }

  const currentStock =
    (await getCurrentReservedStockById(product.id)) || product.stock;
  res.json({
    itemId: product.id,
    itemName: product.name,
    price: product.price,
    initialAvailableQuantity: product.stock,
    currentQuantity: Number(currentStock),
  });
});

/**
 * Reserves a product by ID if stock is available.
 *
 * Checks if the product exists and has enough stock.
 * If so, reserves one unit of stock and responds with a confirmation.
 * Otherwise, responds with an error status.
 */
app.get("/reserve_product/:itemId", async (req, res) => {
  const product = getItemById(Number(req.params.itemId));
  if (!product) {
    return res.json({ status: "Product not found" });
  }

  const currentStock =
    (await getCurrentReservedStockById(product.id)) || product.stock;
  if (currentStock <= 0) {
    return res.json({
      status: "Not enough stock available",
      itemId: product.id,
    });
  }

  await reserveStockById(product.id, currentStock - 1);
  res.json({ status: "Reservation confirmed", itemId: product.id });
});

app.listen(1245, () => console.log("Server is listening on port 1245"));
