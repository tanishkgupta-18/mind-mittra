# import numpy as np
# import pandas as pd
# from sklearn.linear_model import LogisticRegression
# from sklearn.model_selection import train_test_split
# import pickle

# # Example synthetic data
# X = np.random.randint(0, 4, size=(500, 10))  # 500 samples, 10 questions
# y = []

# # Labels based on total score
# for row in X:
#     score = sum(row)
#     if score <= 5:
#         y.append(0)  # Minimal
#     elif score <= 10:
#         y.append(1)  # Mild
#     elif score <= 20:
#         y.append(2)  # Moderate
#     else:
#         y.append(3)  # Severe

# model = LogisticRegression(max_iter=1000)
# model.fit(X, y)

# # Save model
# with open("model.pkl", "wb") as f:
#     pickle.dump(model, f)


import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score
import pickle

# === Step 1: Generate better synthetic data === #
np.random.seed(42)
X = np.random.choice([0, 1, 2, 3], size=(1000, 10), p=[0.2, 0.3, 0.3, 0.2])
y = []

for row in X:
    score = sum(row)
    if score <= 5:
        y.append(0)  # Minimal
    elif score <= 10:
        y.append(1)  # Mild
    elif score <= 20:
        y.append(2)  # Moderate
    else:
        y.append(3)  # Severe

y = np.array(y)

# === Step 2: Train/test split === #
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y)

# === Step 3: Train improved model === #
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# === Step 4: Evaluate === #
y_pred = model.predict(X_test)
print("Accuracy:", accuracy_score(y_test, y_pred))
print(classification_report(
    y_test, y_pred,
    labels=[0, 1, 2, 3],
    target_names=["Minimal", "Mild", "Moderate", "Severe"]
))


# === Step 5: Save model === #
with open("model.pkl", "wb") as f:
    pickle.dump(model, f)

# Optional: Save label mapping
label_map = {0: "Minimal", 1: "Mild", 2: "Moderate", 3: "Severe"}
with open("label_map.pkl", "wb") as f:
    pickle.dump(label_map, f)
