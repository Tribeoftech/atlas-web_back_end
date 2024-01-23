#!/usr/bin/env python3
"""
Create Flask app
"""
from flask import Flask, jsonify, request, abort, redirect
from auth import Auth


AUTH = Auth()
app = Flask(__name__)

@app.route("/", methods=["GET"])
def index():
    """
    get endpoint
    """
   return jsonify({"message": "Bienvenue"})


@app.route("/users", methods=["POST"])
def users():
    """
    Expect form data: "email" "password".

    If user does not exist, register it, respond.

    If user exists, catch exception,return JSON payload and 400
    """
    email = request.form.get('email')
    password = request.form.get('password')
    try:
        AUTH.register_user(email, password)
        return jsonify({'email': email, 'message:': 'user created'})
    except ValueError as e:
        return jsonify({'message': 'email already registered'}), 400
