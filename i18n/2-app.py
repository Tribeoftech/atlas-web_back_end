#!/usr/bin/env python3
"""
 babel flask app.

Uses Config set Babel default local <en>

Uses class 4 flask app.
"""
from flask import Flask, render_template, request
from flask_babel import Babel


app = Flask(__name__)
babel = Babel(app)


class Config():
    """
    Configure Babel.
    """
    LANGUAGES = ['en', 'fr']
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app.config.from_object(Config)


@babel.localeselector
def get_locale():
    """
    Get locale from request.
    """
    return request.accept_languages.best_match(Config.LANGUAGES)


@app.route('/')
def index():
    """
    Return the index page.
    """
    return render_template('2-index.html'), 200


if __name__ == '__main__':
    app.run()
    