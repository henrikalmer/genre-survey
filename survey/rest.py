import json

from flask.ext.restful import reqparse, Resource
from survey import api, db
from survey.models import Response

parser = reqparse.RequestParser()
parser.add_argument('json', type=str, help="JSON data to store as a survey response")

class Survey(Resource):
    def get(self):
        responses = [json.loads(r.json) for r in Response.query.all()]
        return json.dumps(responses), 200

    def post(self):
        # read
        args = parser.parse_args()
        json_string = args['json']
        # validate
        try:
            o = json.loads(json_string)
        except ValueError:
            return "JSON string could not be parsed", 400
        else:
            json_string = json.dumps(o)
        # store
        response = Response(json_string)
        db.session.add(response)
        db.session.commit()
        return json_string, 201

api.add_resource(Survey, '/api/v1/survey')
