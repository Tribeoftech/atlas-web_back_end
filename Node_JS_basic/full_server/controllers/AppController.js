/**
 * AppController class.
 * Exports a getHomepage method that sends a simple response.
 */
class AppController {
  static getHomepage(req, res) {
    res.status(200).send("Hello Holberton School!");
  }
}

module.exports = AppController;
