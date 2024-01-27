#!/usr/bin/env python3

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
         
    class TestGetJson(TestCase):
        @parameterized.expand([
        ("http://example.com", {"payload": True}),
        ("http://holberton.io", {"payload": False}),
    ])    
    def test_get_json(self, test_url, test_payload): 
        from utils import get_json
        import requests
        from unittest import mock
        with mock.patch('requests.get', return_value=mock.Mock(
                json=lambda: test_payload)):
            self.assertEqual(get_json(test_url), test_payload)
class TestMemoize(unittest.TestCase):
    """ This is a class that holds methods for testing the utils.memoize """

    def test_memoize(self):
        """ This method tests utils.memoize """
        class TestClass:
            """ This class holds a method of memoization """

            def a_method(self):
                """ This is the mock method """
                return 42

            @memoize
            def a_property(self):
                """ This is the mock property with mock method's value """
                return self.a_method()
        with mock.patch.object(TestClass, 'a_method') as fn:
            tc = TestClass()
            tc.a_property
            tc.a_property
            fn.assert_called_once()


if __name__ == '__main__':
    unittest.main()