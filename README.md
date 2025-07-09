# 🧠 Mind Mittra

$Demo$ $link$ : [https://youtu.be/iaXTzyVUavQ](https://youtu.be/iaXTzyVUavQ)

A web-based application that analyzes the **anxiety level** of users based on their responses to a questionnaire. The system categorizes the result into **None**, **Mild**, **Moderate**, or **Severe**, provides personalized advice, suggests nearby mental health centers, and shows **analytics based on the user's past scores**.

---

## 📌 Features

- 📝 **Anxiety Questionnaire**  
  User-friendly questionnaire to assess mental health status.

- 📊 **ML-Based Prediction**  
  Uses a **Random Forest Classifier** trained on relevant data to predict the user's anxiety level with **89% accuracy**.

- 🧾 **Severity Categorization**  
  Classifies results into:
  - None
  - Mild
  - Moderate
  - Severe

- 💡 **Personalized Advice**  
  Offers tips and coping strategies based on the anxiety level.

- 🏥 **Nearby Health Centre Suggestions**  
  Recommends mental health centers based on user location.

- 📈 **User Analytics Dashboard**  
  Shows progress over time with visual charts of past scores to help users track their mental health trends.

---

## 🧰 Tech Stack

| Layer        | Technology            |
|--------------|----------------------|
| Frontend     | React.js             |
| Backend      | Flask (Python)       |
| ML Model     | Random Forest Classifier |
| Database     | SQLite               |
| Charts       | Recharts |

---

## 🔍 How It Works

1. **User fills out a mental health questionnaire**  
2. **Responses are sent to the Flask backend**  
3. **Model predicts the anxiety level (None/Mild/Moderate/Severe)**  
4. **Prediction is saved to the database for future reference**  
5. **Advice is generated based on the result**  
6. **Nearby mental health centers are suggested**  
7. **User can view historical analytics of their anxiety scores**

---

## 📈 Model Performance

- **Model Used**: Random Forest Classifier  
- **Accuracy**: 89%  
- **Input Features**: Responses from the questionnaire  
- **Output Classes**: `None`, `Mild`, `Moderate`, `Severe`

---

## 🚀 Getting Started

### Prerequisites

- Python 3.x  
- Node.js + npm  
- SQLite  
- `pip` and `virtualenv`

---

### Setup and Run Backend & Frontend

```bash
# Backend setup
cd backend
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
python app.py

# Frontend setup
cd frontend
npm install
npm start
