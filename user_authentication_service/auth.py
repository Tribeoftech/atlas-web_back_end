#!/usr/bin/env python3
"""
Module used to auth user to database.
"""

import bcrypt
import uuid
from db import DB
from sqlalchemy.orm.exc import NoResultFound
from user import User


def _hash_password(password: str) -> bytes:
    """
    Returns hashed pwd using bcrypt.hashpw()
    """
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())


def _generate_uuid() -> str:
    """
    Returns str rep of new UUID
    """
    return str(uuid.uuid4())


class Auth:
    """
    Auth class to interact with the auth database
    """

    def __init__(self):
        self._db = DB()
