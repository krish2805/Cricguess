import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import joblib

# Load dataset
df = pd.read_csv("processed_cricketers_dataset.csv")  # your saved dataset with clues and fullname

# Features and labels
X = df['clues']
y = df['fullname']

# Vectorize text
vectorizer = TfidfVectorizer()
X_vec = vectorizer.fit_transform(X)

# Split
X_train, X_test, y_train, y_test = train_test_split(X_vec, y, test_size=0.2, random_state=42)

# Train
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
print("Model performance:\n")
print(classification_report(y_test, y_pred))

# Save model and vectorizer
joblib.dump(model, "cricketer_model.pkl")
joblib.dump(vectorizer, "tfidf_vectorizer.pkl")
