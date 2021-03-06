import datetime
from survey import db

class Response(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    json = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def __init__(self, json_string):
        self.json = json_string

    def __repr__(self):
        return '<Response %s>' % self.id
