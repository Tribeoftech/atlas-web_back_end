#!/usr/bin/env python3
"""
return all schools with a specific topic
"""


def schools_by_topic(mongo_collection, topic):
	"""
    return all schools with a specific topic
	"""
	return mongo_collection.find({'topics': topic})