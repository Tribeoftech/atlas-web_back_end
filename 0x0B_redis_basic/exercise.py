#!/usr/bin/env python3
"""
Redis
"""
import redis
import uuid


class Cache():

 def __init__(self):
        self._redis = redis.Redis()
        self._redis.flushdb()