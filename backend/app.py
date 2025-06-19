from flask import Flask, request, jsonify
from flask_cors import CORS
from difflib import SequenceMatcher
import joblib
import pandas as pd
import os

app = Flask(__name__)
CORS(app )

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load model, vectorizer, and dataset
model = joblib.load(os.path.join(BASE_DIR, "model", "cricketer_model.pkl"))
vectorizer = joblib.load(os.path.join(BASE_DIR, "model", "tfidf_vectorizer.pkl"))
df = pd.read_csv(os.path.join(BASE_DIR, "model", "processed_cricketers_dataset.csv"))

# 🔹 Answer-based filtering API
@app.route("/api/predict", methods=["POST"])
def answer_based_prediction():
    data = request.get_json()
    answers = data.get("answers", [])

    filtered_df = df.copy()

    for answer in answers:
        col = answer.get("key")
        value = answer.get("value")
        if col and value and col in filtered_df.columns:
            # Ensure values are strings before comparison
            filtered_df = filtered_df[filtered_df[col].astype(str).str.lower() == value.lower()]

    if filtered_df.empty:
        return jsonify({"players": [], "clues": []})

    players = [{"fullname": row["fullname"]} for _, row in filtered_df.iterrows()]
    clues = list(filtered_df["achievements"].dropna().unique())[:5]

    print("➡️ Returning players:", players)
    print("➡️ Returning clues:", clues)


    return jsonify({"players": players, "clues": clues})


# # 🔹 Final clue confirmation API
# @app.route("/api/clue-match", methods=["POST"])
# def clue_match():
#     data = request.get_json()
#     clue_text = data.get("clue", "")

#     if not clue_text:
#         return jsonify({"error": "No clue provided"}), 400

#     vec = vectorizer.transform([clue_text])
#     predicted_player = model.predict(vec)[0]

#     return jsonify({"predicted_player": predicted_player})


@app.route("/api/clue-match", methods=["POST"])
def clue_match():
    data = request.get_json()
    print("🔍 Received payload:", data)
    clues = data.get("clues", [])
    player_objs = data.get("players", [])
   
    print("➡️ Clues:", clues)
    print("➡️ Players:", player_objs)


    if not clues or not player_objs:
        return jsonify({"error": "Missing clues or players"}), 400

    def clean(text):
        return str(text).strip().lower()

    def similarity(a, b):
        return SequenceMatcher(None, clean(a), clean(b)).ratio()

    player_names = [p["fullname"] for p in player_objs]
    best_score = 0
    best_player = None

    for name in player_names:
        row = df[df["fullname"] == name]
        if row.empty:
            continue

        row = row.iloc[0]
        achievements = row.get("achievements", "")
        if pd.isna(achievements):
            continue

        achievement_text = clean(achievements)
        total_score = 0

        for clue in clues:
            clue_text = clean(clue)
            score = similarity(clue_text, achievement_text)
            total_score += score

        print(f"Player: {name} | Score: {total_score}")

        if total_score > best_score:
            best_score = total_score
            best_player = name

    if best_score < 0.15:
        print("⚠️ No confident match found.")
        return jsonify({"predicted_player": None})

    print(f"✅ Best match: {best_player} with score {best_score}")
    return jsonify({"predicted_player": best_player})






if __name__ == "__main__":
    app.run(debug=True)
