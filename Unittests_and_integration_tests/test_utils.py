#!/usr/bin/env python3
"""
Unittest for utils.py
"""
import unittest
import unittest import TestCase

class TestAccessNestedMap(TestCase):
   """
   Test access to nestedmap
   """
   @parameterized.expand([
       ({"a": 1}, ("a",), 1),
       ({"a": {"b": 2}}, ("a", ), {"b": 2}),
       ({"a": {"b": 2}}, ("a", "b"), 2),
   ])
   def test_access_nested_map(self, map, path, expected):
       """
       Test access
       """
       from utils import access_nested_map
