from flask.ext.restful import reqparse, Resource
from survey import api

parser = reqparse.RequestParser()
parser.add_argument('json', type=str)

class Survey(Resource):
    def post(self):
        args = parser.parse_args()
        json = args['json']
        return json, 201

api.add_resource(Survey, '/api/v1/survey')
