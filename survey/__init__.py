import os

from flask import Flask
from flask.ext.restful import Api
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.heroku import Heroku

app = Flask(__name__)

try:
    app.config.from_object('local_config')
except:
    pass

heroku = Heroku(app)
db = SQLAlchemy(app)
api = Api(app)

from survey import api, views, models
