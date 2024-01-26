#!/usr/bin/env python3
"""
unittests utils.py
"""
import unittest
from unittest import TestCase
from unittest.mock import patch

class TestAccessNestedMap(TestCase):
    """
        Test access to map
    """
    @parameterized.expand([
        ({"a": 1}, ("a",), 1),
        ({"a": {"b": 2}}, ("a",), {"b": 2}),
        ({"a": {"b": 2}}, ("a", "b"), 2),
    ])
    def test_access_nested_map(self, map, path, expected):
        """
        Test access to map
        """
        from utils import access_nested_map
        self.assertEqual(access_nested_map(map, path), expected)
        
        @parameterized.expand([
        ({}, ("a")),
        ({"a": 1}, ("a", "b")),
    ])
    def test_access_nested_map_exception(self, map, path):
         from utils import access_nested_map
         self.assertRaises(KeyError, access_nested_map, map, path)
         
         