#!/usr/bin/env python3
"""
List all mongodb Docs available
"""


def list_all(mongo_collection):
	"""
	List all mongodb Docs available
	"""
	return mongo_collection.find()