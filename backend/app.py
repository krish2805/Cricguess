from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)  # Allow requests from React frontend

# Load model & vectorizer
model = joblib.load("model/cricketer_model.pkl")
vectorizer = joblib.load("model/tfidf_vectorizer.pkl")
df = pd.read_csv("model/processed_cricketers_dataset.csv")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    clue_text = data.get("clue")

    if not clue_text:
        return jsonify({"error": "No clue provided"}), 400

    vec = vectorizer.transform([clue_text])
    prediction = model.predict(vec)[0]

    return jsonify({"predicted_player": prediction})

if __name__ == "__main__":
    app.run(debug=True)
