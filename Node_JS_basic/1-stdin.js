console.log('Welcome to Holberton School, what is your name?');
/**
 * Prints a welcome message and prompts the user for their name.
 */
process.stdin
  /**
   * Reads user input from stdin when data is available
   * and writes a greeting with their name to stdout.
   */
  .on('readable', () => {
    const name = process.stdin.read();
    if (name !== null) {
      process.stdout.write(`Your name is: ${name}`);
    }
  });
