import pandas as pd
import numpy as np
import random
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score
import joblib



rows = []

for _ in range(200):
    row = [random.choices([0, 1], weights=[0.7, 0.3])[0] for _ in range(10)]
    rows.append(row + ['None'])

for _ in range(200):
    row = [random.choices([0, 1, 2], weights=[0.3, 0.6, 0.1])[0] for _ in range(10)]
    rows.append(row + ['Mild'])

for _ in range(200):
    row = [random.choices([0, 1, 2], weights=[0.1, 0.5, 0.4])[0] for _ in range(10)]
    rows.append(row + ['Moderate'])

for _ in range(200):
    row = [random.choices([1, 2, 3], weights=[0.2, 0.6, 0.2])[0] for _ in range(10)]
    rows.append(row + ['Moderately Severe'])

for _ in range(200):
    row = [random.choices([2, 3], weights=[0.2, 0.8])[0] for _ in range(10)]
    rows.append(row + ['Severe'])

df = pd.DataFrame(rows, columns=['Q1','Q2','Q3','Q4','Q5','Q6','Q7','Q8','Q9','Q10','Severity'])
df.to_csv("mental_health_questions.csv", index=False)

print("\nSynthetic dataset generated and saved as 'mental_health_questions.csv'.")
print("\nLabel distribution:\n", df['Severity'].value_counts())


X = df[['Q1','Q2','Q3','Q4','Q5','Q6','Q7','Q8','Q9','Q10']]
y_raw = df['Severity']

le = LabelEncoder()
y = le.fit_transform(y_raw)

print("\nClasses:", list(le.classes_))


X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

print("\nTraining samples:", X_train.shape[0])
print("Test samples:", X_test.shape[0])


model = RandomForestClassifier(n_estimators=200, random_state=42)
model.fit(X_train, y_train)

print("\nModel trained.")

y_pred = model.predict(X_test)

print("\nAccuracy:", accuracy_score(y_test, y_pred))
print("\nClassification Report:\n")
print(classification_report(y_test, y_pred, target_names=le.classes_))

joblib.dump(model, 'mental_health_model.pkl')
joblib.dump(le, 'label_encoder.pkl')

print("\nModel and label encoder saved as 'mental_health_model.pkl' and 'label_encoder.pkl'.")

example_input = pd.DataFrame(
    [[1, 2, 1, 2, 1, 1, 1, 2, 1, 1]],
    columns=['Q1','Q2','Q3','Q4','Q5','Q6','Q7','Q8','Q9','Q10']
)

loaded_model = joblib.load('mental_health_model.pkl')
loaded_le = joblib.load('label_encoder.pkl')

prediction = loaded_model.predict(example_input)
severity = loaded_le.inverse_transform(prediction)

print("\nExample input:", example_input.iloc[0].tolist())
print("Predicted Severity:", severity[0])
