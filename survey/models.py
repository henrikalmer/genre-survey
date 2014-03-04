from survey import db

class Response(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    json = db.Column(db.String(255))

    def __init__(self, json):
        self.json = json

    def __repr__(self):
        return '<Response %s>' % self.id
