#!/usr/bin/env python3
"""
Get some stats about logs in MongoDB
"""
import pymongo


def log():
    """
    printing the stats
    """
    client = pymongo.MongoClient()
    db = client.logs
    collection = db.nginx

    print("{} logs".format(collection.count_documents({})))

    print("Methods:")
    methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

    for method in methods:
        print("\tmethod {}: {}".format(
            method, collection.count_documents({"method": method})))

    print("{} status check".format(collection.count_documents(
        {"method": "GET", "path": "/status"})))


if __name__ == "__main__":
    log()