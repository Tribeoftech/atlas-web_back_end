#!/usr/bin/env python3
"""Initializes the Cache class
Creates a Redis client object and flushes the database.
"""

import redis
import uuid
from typing import Union, Callable
from functools import wraps


class Cache():
"""Initializes a Cache instance.
Creates a Redis client and flushes the database to clear any existing keys.
"""

def __init__(self):
        self._redis = redis.Redis()
        self._redis.flushdb()

def count_calls(method: Callable) -> Callable
"""Decorator to count calls made to the decorated function.
Increments a counter each time the decorated function is called and stores
the count in a Redis hash using the function's qualified name as the key.
"""
@wraps
def wrapper(*args, **kwargs):
    key = f"{instance.__class__.__name__}.{method.__name__}"
    inputs = inspect.signature(method).bind(instance, *args, **kwargs).arguments
    self.redis.rpush(f"{key}:inputs", str(inputs))
    output = method(instance, *args, **kwargs)
    self.redis.rpush(f"{key}:outputs", str(output))

    return output

