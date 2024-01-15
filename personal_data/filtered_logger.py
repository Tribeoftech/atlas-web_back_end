#!/usr/bin/env python3
"""
Obfuscating log msgs
"""
import re
import logging
import os
import mysql.connector
from typing import List

PII_FIELDS = ('name', 'email', 'phone', 'ssn', 'password')


def filter_datum(fields: List[str], redaction: str,
                 message: str, separator: str) -> str:
    """returns the log message obfuscated"""
    for field in fields:
        message = re.sub(f"{field}=.*?{separator}",
                         f"{field}={redaction}{separator}", message)
    return message


class RedactingFormatter(logging.Formatter):
    """ Redacting Formatter class that inherits from logging.Formatter """

    REDACTION = "***"
    FORMAT = "[HOLBERTON] %(name)s %(levelname)s %(asctime)-15s: %(message)s"
    SEPARATOR = ";"

    def __init__(self, fields: List[str]):
        """ constructor method for RedactingFormatter class"""
        super(RedactingFormatter, self).__init__(self.FORMAT)
        self.fields = fields

    def format(self, record: logging.LogRecord) -> str:
        """ filter values in incoming log records using filter_datum"""
        original_message = record.getMessage()
        redacted_message = filter_datum(
            self.fields,
            self.REDACTION,
            original_message,
            self.SEPARATOR)
        record.msg = redacted_message
        return super().format(record)


def get_logger() -> logging.Logger:
    """returns a logging.Logger object"""
    logger = logging.getLogger("user_data")
    logger.setLevel(logging.INFO)
    logger.propagate = False
    handler = logging.StreamHandler()
    handler.setFormatter(RedactingFormatter(PII_FIELDS))
    logger.addHandler(handler)
    return logger


def get_db() -> mysql.connector.connection.MySQLConnection:
    """
    Connects to the database named <holberton> to read the <users> table

    Uses <os> module to obtain credentials from environment

    Uses <mysql-connector-python> to connect to MySQL Database

    Args:
        None

    Returns:
        mysql.connector.connection.MySQLConnection: connection to <holberton>
    """
    user = os.environ.get("PERSONAL_DATA_DB_USERNAME")
    password = os.environ.get("PERSONAL_DATA_DB_PASSWORD")
    host = os.environ.get("PERSONAL_DATA_DB_HOST")
    database = os.environ.get("PERSONAL_DATA_DB_NAME")
    return mysql.connector.connect(user=user, password=password, host=host,
                                   database=database)


def main():
    """
    Obtains a database connection using get_db() and retrieves all rows in the
    <users> table.

    Displays each row under a filtered format using get_logger() and
    <PII_FIELDS> to filter the fields.

    Args:
        None

    Returns:
        None
    """
    logger = get_logger()
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users")
    for row in cursor:
        # Instantiate list of tuples of <row>'s key/pair values
        tuple_list = row.items()
        # Convert to string of key/value pairs with separator
        str_row = '; '.join(f"{tuple[0]}={tuple[1]}" for tuple in tuple_list)
        # Pass string to logger to log in specified format
        logger.info(str_row)
    db.close()


if __name__ == "__main__":
    main()
