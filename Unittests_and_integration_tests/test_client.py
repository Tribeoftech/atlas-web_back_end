#!/usr/bin/env python3
"""
unittest for client.py
"""
TestGithubOrgClient(unittest.TestCase)
    
@parameterized.expand([testcase.TestCase])
def test_get_json(self, test_url, test_payload):
 """
 Test get_json method
 """
 from client import get_json
 self.assertEqual(get_json(test_url, test_payload), test_payload)