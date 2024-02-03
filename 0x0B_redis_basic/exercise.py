"""Initializes the Cache class

Creates a Redis client object and flushes the database."""
#!/usr/bin/env python3
Redis client object."""
"""
import redis
import uuid


class Cache():

 def __init__(self):
        self._redis = redis.Redis()
        self._redis.flushdb()