import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
import pickle

# Example synthetic data
X = np.random.randint(0, 4, size=(500, 10))  # 500 samples, 10 questions
y = []

# Labels based on total score
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

model = LogisticRegression(max_iter=1000)
model.fit(X, y)

# Save model
with open("model.pkl", "wb") as f:
    pickle.dump(model, f)
