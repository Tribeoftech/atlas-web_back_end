#!/usr/bin/env python3

"""
Main file
"""

from filtered_logger import get_db, get_logger, PII_FIELDS

# Get a database connection
db = get_db()

# Create a cursor
cursor = db.cursor()

# Execute an SQL query
cursor.execute("SELECT COUNT(*) FROM users;")

# Fetch and print the result
for row in cursor:
    print(row[0])

# Close cursor and database connection
cursor.close()
db.close()

# Logging-related code
logger = get_logger()
print(logger.__annotations__.get('return'))
print("PII_FIELDS: {}".format(len(PII_FIELDS)))
