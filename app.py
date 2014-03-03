import os

from flask import Flask, render_template
from flask.ext.restful import reqparse, Resource, Api

app = Flask(__name__)
api = Api(app)

@app.route('/')
def index():
    return render_template('index.html')

parser = reqparse.RequestParser()
parser.add_argument('json', type=str)

class Survey(Resource):
    def post(self):
        args = parser.parse_args()
        json = args['json']
        return json, 201

api.add_resource(Survey, '/api/v1/survey')
