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
    Expect data fields: "email" "password".

    If user does not exist, register,responds.

    If user exists, catch exception,return JSON payload
        return 400
    """
    email = request.form.get('email')
    password = request.form.get('password')
    try:
        AUTH.register_user(email, password)
        return jsonify({'email': email, 'message:': 'user created'})
    except ValueError as e:
        return jsonify({'message': 'email already registered'}), 400


@app.route("/sessions", methods=["POST"])
def sessions():
    """
    Expect data fields: "email" "password".

    If login incorrect, use flask.abort respond 401.

    create new session for the user, store session_id as
    a cookie key "session_id" return JSON payload form.
    """
    email = request.form.get('email')
    password = request.form.get('password')
    if not email or not password or not AUTH.valid_login(email, password):
        abort(401)
    sesh_id = AUTH.create_session(email)
    result = jsonify({'email': email, 'message': 'logged in'})
    result.set_cookie('session_id', sesh_id)
    return result


@app.route("/sessions", methods=["DELETE"])
def logout():
    """
    Expect to contain session_id cookie.

    If user does not exist,
    respond 403.
    """
    sesh_id = request.cookies.get('session_id')
    user = AUTH.get_user_from_session_id(sesh_id)
    if not user or not sesh_id:
        abort(403)
    AUTH.destroy_session(user.id)
    return redirect('/', 302)


@app.route("/profile", methods=["GET"])
def profile():
    """
    Expect to contain  session_id cookie.
    """
    sesh_id = request.cookies.get('session_id')
    user = AUTH.get_user_from_session_id(sesh_id)
    if not user or not sesh_id:
        abort(403)
    return jsonify({'email': user.email})


@app.route("/reset_password", methods=["POST"])
def reset_password():
    """
    Expect to contain email.

    If email not registered, responds with 403
    """
    email = request.form.get('email')
    try:
        token = AUTH.get_reset_password_token(email)
        return jsonify({'email': email, 'reset_token': token})
    except Exception as e:
        abort(403)


@app.route("/reset_password", methods=["PUT"])
def reset_password_change():
    """
    Expect email, reset_token, and new_password field.

    Update the password.

    """
    email = request.form.get('email')
    reset_token = request.form.get('reset_token')
    new_password = request.form.get('new_password')
    try:
        AUTH.update_password(reset_token, new_password)
        return jsonify({'email': email, 'message': 'Password updated'})
    except Exception as e:
        abort(403)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000")
