from models import db, User, Score
from app import app

with app.app_context():
    users = User.query.all()
    for u in users:
        print(f"User ID: {u.id}, Email: {u.email}")

    scores = Score.query.all()
    for s in scores:
        print(f"Score ID: {s.id}, User ID: {s.user_id}, Score: {s.score}")
