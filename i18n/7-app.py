#!/usr/bin/env python3
"""
basic babel flask app.

"""
from flask import Flask, request, g
from flask_babel import Babel
from flask_babel import gettext as _
import pytz
from flask.templating import render_template


# Set up Flask app and tend to baby checker
app = Flask(__name__)
babel = Babel(app)
_.__doc__ = " checker."


# simulate database
users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


# Simple Class to set Babel's default local and timezone
class Config():
    
    LANGUAGES = ['en', 'fr']
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


# Configure Flask
app.config.from_object(Config)


# Determins if en or fr
@babel.localeselector
def get_locale():
   
    locale = request.args.get('locale')
    if locale and locale in Config.LANGUAGES:
        return locale
    try:
        user = get_user()
        if user and user['locale'] in Config.LANGUAGES:
            return user['locale']
        raise Exception
    except Exception:
        return request.accept_languages.best_match(Config.LANGUAGES)


# uses same logic as locale selector but for timezone
@babel.timezoneselector
def get_timezone():
 
    timezone = request.args.get('timezone')
    if timezone:
        return timezone
    try:
        user = get_user()
        if user and user['timezone'] in pytz.all_timezones:
            return user['timezone']
        raise pytz.exceptions.UnknownTimeZoneError
    except pytz.exceptions.UnknownTimeZoneError:
        return 'UTC'

# simulate getting user from databse
def get_user():
   
    user_id = request.args.get('login_as')
    if not user_id:
        return None
    try:
        user_id = int(user_id)
        if user_id < 1 or user_id > 4:
            raise Exception
    except Exception:
        return None
    return users[user_id]


# loads user before page is rendered, ignore empty line below :(

@app.before_request
def before_request():
   
    data = get_user()
    if data:
        g.user = data
        home_text = _("You are logged in as %(name)s.", name=data['name'])
        return render_template('5-index.html', home_text=home_text)
    else:
        return render_template('5-index.html', home_text=_('not_logged_in'))


# index page
@app.route('/')
def index():
    """
    return the index page.
    """
    return render_template('5-index.html')


# run app
if __name__ == '__main__':
    app.run()