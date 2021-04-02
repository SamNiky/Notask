from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS, cross_origin


app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Notask.db'
db = SQLAlchemy(app)
ma = Marshmallow(app)


class Tasks(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(3000), nullable=False)

class TasksSchema(ma.Schema):
    class Meta:
        fields = ('id', 'text')

task_schema = TasksSchema()
tasks_schema = TasksSchema(many=True)


@app.route('/')
def index():
    return "Hello, I'm Notask Backend!"

@app.route('/get/tasks/', methods=['GET'])
def getTasks():
    tasks = Tasks.query.all()
    response = tasks_schema.dump(tasks)
    return jsonify({'tasks':response})

@app.route('/create/task', methods=['POST'])
def createTask():
    data = request.get_json()
    text = data.get('text', 'error')
    if text != 'error':
        create = Tasks(text=text)
    try:
        db.session.add(create)
        db.session.commit()
        tasks = Tasks.query.all()
        response = tasks_schema.dump(tasks)
        return jsonify({'tasks':response})
    except:
        return jsonify({'error': 'wrong request'})

@app.route('/delete/task', methods=['POST'])
def deleteTask():
    data = request.get_json()
    id = data.get('id', 'error')
    if id != 'error':
        delete = Tasks.query.get(id)
    try:
        db.session.delete(delete)
        db.session.commit()
        tasks = Tasks.query.all()
        response = tasks_schema.dump(tasks)
        return jsonify({'tasks':response})
    except:
        return jsonify({'error': 'wrong request'})


if __name__ == "__main__":
    app.run(debug=True)