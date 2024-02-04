"""Initializes the Cache class

Creates a Redis client object and flushes the database."""
#!/usr/bin/env python3
Redis client object."""
"""
import redis
import uuid



class Cache():
"""
Initializes a Cache instance.
Creates a Redis client and flushes the database to clear any existing keys.
"""
def __init__(self):
        self._redis = redis.Redis()
        self._redis.flushdb()
        
def count_calls(method: Callable) -> Callable: