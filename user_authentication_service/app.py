#!/usr/bin/env python3
"""
Creates Flask app
"""
from flask import Flask, jsonify, request, abort, redirect
from auth import Auth


AUTH = Auth()
app = Flask(__name__)

@app.route("/", methods=["GET"])
def index():
    """
    First get endpoint
    """
   return jsonify({"message": "Bienvenue"})

