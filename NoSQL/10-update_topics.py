#!/usr/bin/env python3
"""
Update a school's topics
"""


def update_topics(mongo_collection, name, topics):
	"""
    Update a school's topics
	"""
	return mongo_collection.update_many({'name': name}, {'$set': {'topics': topics}})