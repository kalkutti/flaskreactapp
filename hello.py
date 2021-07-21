import time
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = 'mssql+pyodbc://SA:Kal123456@localhost:1433/SimpleInventory?driver=ODBC+Driver+17+for+SQL+Server'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = 0

db = SQLAlchemy(app)

class UserString(db.Model):
    __tablename__="user_string"
    id = db.Column(db.Integer, primary_key=True)
    userString = db.Column(db.String(30))
    searchString = db.Column(db.String(30))

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}


@app.route('/api/cal', methods=['POST'])
def get_cal():
    return 'jerk'