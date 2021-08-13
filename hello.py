from cal_schedule import calschedule
from datetime import date, time, datetime, timedelta
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = 'mssql+pyodbc://SA:Kal123456@localhost:1433/SimpleInventory?driver=ODBC+Driver+17+for+SQL+Server'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = 0

db = SQLAlchemy(app)
today = date.today()
now = datetime.now()

class UserString(db.Model):
    __tablename__="user_string"
    id = db.Column(db.Integer, primary_key=True)
    userString = db.Column(db.String(30))
    searchString = db.Column(db.String(30))
    deadline = db.Column(db.Date)
    duration = db.Column(db.Integer)
    price = db.Column(db.Integer)

@app.route('/api/time')
def get_current_time():
    list_of_userString = generate_schedule()
    return {'time': list_of_userString}#now.strftime("%H:%M:%S")}


@app.route('/api/cal', methods=['POST'])
def get_cal():
    data = request.get_json()
    new_user_string = UserString(
        userString = data["userString"],
        searchString = data["searchString"],
        deadline = data["selectedDate"],
        duration = data["durationValue"],
        price = data["priceValue"],
    )
    db.session.add(new_user_string)
    db.session.commit()
    return jsonify({"message": "Strings were added to database"}), 200

def generate_schedule():
    date_forward_week = today + timedelta(days=7)
    str_date_forward_week = getStringDate(date_forward_week)
    event_pts = UserString.query.filter(UserString.deadline >= str_date_forward_week).all()
    
    dofdate = {}
    new_date = None

    for x in range(6):
        itm = []
        if event_pts:
            new_date = date_forward_week + timedelta(days=x)
            itm = calschedule.generate(event_pts, 8)
            dofdate[getStringDate(new_date)] = itm

        for i in reversed(itm):
            del event_pts[i]

    return dofdate


def getStringDate(de):
    return de.strftime("%Y/%m/%d")