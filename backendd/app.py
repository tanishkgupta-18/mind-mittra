# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from models import db, User, Score
# import pickle
# import numpy as np


# # AIzaSyBo1g7-ITAWSpj7UbrEBDiQf8O13ik7lSY




# # Load ML model


# app = Flask(__name__)
# CORS(app)

# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# db.init_app(app)


# with app.app_context():
#     db.create_all()

# with open("model.pkl", "rb") as f:
#     ml_model = pickle.load(f)

# def get_gemini_advice(severity):
#     import google.generativeai as genai
#     genai.configure(api_key="AIzaSyBo1g7-ITAWSpj7UbrEBDiQf8O13ik7lSY")
#     prompt = f"Give personalized mental health advice for someone with {severity} depression."
#     model = genai.GenerativeModel('gemini-2.5-flash')
#     response = model.generate_content(prompt)
#     return response.text

# # --------------------
# # Authentication
# # --------------------
# @app.route("/signup", methods=["POST"])
# def signup():
#     data = request.get_json()
#     email = data.get("email")
#     full_name = data.get("fullname")
#     password = data.get("password")

#     if User.query.filter_by(email=email).first():
#         return jsonify({"error": "Email already exists"}), 400

#     user = User(email=email, full_name=full_name)
#     user.set_password(password)
#     db.session.add(user)
#     db.session.commit()
#     return jsonify({"message": "User created successfully"}), 201

# @app.route("/login", methods=["POST"])
# def login():
#     data = request.get_json()
#     email = data.get("email")
#     password = data.get("password")

#     user = User.query.filter_by(email=email).first()
#     if not user or not user.check_password(password):
#         return jsonify({"error": "Invalid credentials"}), 401

#     return jsonify({"message": "Login successful", "user_id": user.id}), 200

# # --------------------
# # Questionnaire
# # --------------------
# @app.route("/predict", methods=["POST"])
# def predict():
#     data = request.get_json()
#     user_id = int(data.get("user_id", 0))
#     questions = [val for key, val in sorted(data.items()) if key.startswith("Q")]

#     if len(questions) != 10:
#         return jsonify({"error": "All 10 questions must be answered."}), 400

#     total_score = sum(questions)

#     # Save score to DB
#     if user_id:
#         score_record = Score(user_id=user_id, score=total_score)
#         db.session.add(score_record)
#         db.session.commit()

#     # if total_score <= 5:
#     #     severity = "Minimal"
#     # elif total_score <= 10:
#     #     severity = "Mild"
#     # elif total_score <= 20:
#     #     severity = "Moderate"
#     # else:
#     #     severity = "Severe"

#     # return jsonify({"severity": severity})
#         # Use ML model to predict severity
#         X_input = np.array(questions).reshape(1, -1)
#         severity_idx = ml_model.predict(X_input)[0]
#         severity_map = {0: "Minimal", 1: "Mild", 2: "Moderate", 3: "Severe"}
#         severity = severity_map[severity_idx]
#         advice = get_gemini_advice(severity)
#         return jsonify({"severity": severity, "advice": advice})


# # --------------------
# # Analytics
# # --------------------
# @app.route("/latest-score/<int:user_id>", methods=["GET"])
# def get_latest_score(user_id):
#     score = Score.query.filter_by(user_id=user_id).order_by(Score.id.desc()).first()
#     if not score:
#         return jsonify({"error": "No score found"}), 404

#     total_score = score.score

#     if total_score <= 5:
#         severity = "Minimal"
#     elif total_score <= 10:
#         severity = "Mild"
#     elif total_score <= 20:
#         severity = "Moderate"
#     else:
#         severity = "Severe"

#     return jsonify({
#         "score": total_score,
#         "total": 30,
#         "severity": severity
#     })

# ## for userAnalytics page
# @app.route("/user-scores/<int:user_id>", methods=["GET"])
# def user_scores(user_id):
#     scores = Score.query.filter_by(user_id=user_id).order_by(Score.id.asc()).all()
#     if not scores:
#         return jsonify({"error": "No scores found"}), 404

#     data = [
#         {"id": s.id, "score": s.score}
#         for s in scores
#     ]

#     return jsonify(data)

# @app.route("/user/<int:user_id>", methods=["GET"])
# def get_user(user_id):
#     user = User.query.get(user_id)
#     if not user:
#         return jsonify({"error": "User not found"}), 404

#     return jsonify({
#         "id": user.id,
#         "fullname": user.full_name,
#         "email": user.email
#     })


# if __name__ == "__main__":
#     app.run(debug=True)


from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, User, Score
import pickle
import numpy as np

# === Load ML model and label map ===
with open("model.pkl", "rb") as f:
    ml_model = pickle.load(f)

with open("label_map.pkl", "rb") as f:
    severity_map = pickle.load(f)

# === Flask Setup ===
app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    db.create_all()

# === Gemini API Integration ===
def get_gemini_advice(severity):
    import google.generativeai as genai
    genai.configure(api_key="AIzaSyBo1g7-ITAWSpj7UbrEBDiQf8O13ik7lSY")

    prompt = f"Give supportive mental health advice to someone experiencing {severity} depression. Keep it positive and reassuring."
    model = genai.GenerativeModel("gemini-2.5-flash")

    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Could not generate advice at the moment. Error: {str(e)}"

# --------------------
# Authentication
# --------------------
@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    email = data.get("email")
    full_name = data.get("fullname")
    password = data.get("password")

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists"}), 400

    user = User(email=email, full_name=full_name)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User created successfully"}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid credentials"}), 401

    return jsonify({"message": "Login successful", "user_id": user.id}), 200

# --------------------
# Questionnaire & Prediction
# --------------------
@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    user_id = int(data.get("user_id", 0))
    questions = [val for key, val in sorted(data.items()) if key.startswith("Q")]

    if len(questions) != 10:
        return jsonify({"error": "All 10 questions must be answered."}), 400

    total_score = sum(questions)

    if user_id:
        score_record = Score(user_id=user_id, score=total_score)
        db.session.add(score_record)
        db.session.commit()

    # Predict using ML model
    X_input = np.array(questions).reshape(1, -1)
    severity_idx = ml_model.predict(X_input)[0]
    severity = severity_map.get(severity_idx, "Unknown")

    advice = get_gemini_advice(severity)

    return jsonify({"severity": severity, "advice": advice})

# --------------------
# User Analytics & Scores
# --------------------
@app.route("/latest-score/<int:user_id>", methods=["GET"])
def get_latest_score(user_id):
    score = Score.query.filter_by(user_id=user_id).order_by(Score.id.desc()).first()
    if not score:
        return jsonify({"error": "No score found"}), 404

    total_score = score.score

    # Determine severity for frontend display
    if total_score <= 5:
        severity = "Minimal"
    elif total_score <= 10:
        severity = "Mild"
    elif total_score <= 20:
        severity = "Moderate"
    else:
        severity = "Severe"

    return jsonify({
        "score": total_score,
        "total": 30,
        "severity": severity
    })

@app.route("/user-scores/<int:user_id>", methods=["GET"])
def user_scores(user_id):
    scores = Score.query.filter_by(user_id=user_id).order_by(Score.id.asc()).all()
    if not scores:
        return jsonify({"error": "No scores found"}), 404

    data = [{"id": s.id, "score": s.score} for s in scores]
    return jsonify(data)

@app.route("/user/<int:user_id>", methods=["GET"])
def get_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        "id": user.id,
        "fullname": user.full_name,
        "email": user.email
    })

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    message = data.get("message", "")

    if not message.strip():
        return jsonify({"error": "Empty message"}), 400

    import google.generativeai as genai

    genai.configure(api_key="AIzaSyBo1g7-ITAWSpj7UbrEBDiQf8O13ik7lSY")

    prompt = f"You are a compassionate mental health assistant. Respond helpfully to: {message}"

    try:
        model = genai.GenerativeModel("gemini-2.5-flash")
        response = model.generate_content(prompt)
        return jsonify({"reply": response.text})
    except Exception as e:
        return jsonify({"reply": f"Sorry, I'm having trouble responding right now. Error: {str(e)}"}), 500


# --------------------
# Run App
# --------------------
if __name__ == "__main__":
    app.run(debug=True)
