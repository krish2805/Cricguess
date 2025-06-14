import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report

# === Load dataset ===
df = pd.read_csv("international_cricketers_all.csv")

# === Drop unnecessary columns if they exist ===
df = df.drop(columns=[col for col in ['id', 'batting_hand'] if col in df.columns])

# === Fill missing values and convert to strings ===
columns_to_fill = [
    'fullname', 'achievements', 'country_name', 'formats_played',
    'batting_position', 'battingstyle', 'bowlingstyle',
    'bowling_type', 'current_or_retired', 'role'
]
for col in columns_to_fill:
    df[col] = df[col].fillna("unknown").astype(str)

# === Combine selected columns into 'clues' ===
columns_for_clues = [
    'role', 'current_or_retired', 'achievements', 'formats_played',
    'battingstyle', 'bowlingstyle', 'bowling_type',
       'country_name', 'batting_position'
]
df['clues'] = df[columns_for_clues].apply(lambda row: " ,".join(row), axis=1).str.lower()

# === Remove rows with empty 'clues' just in case
df = df[df['clues'].str.strip() != ""]

# === Encode target (player name)
df['fullname'] = df['fullname'].astype(str)
le = LabelEncoder()
df['cricketer_encoded'] = le.fit_transform(df['fullname'])

# === TF-IDF Vectorization
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(df['clues'])
y = df['cricketer_encoded']

# === Train/test split and model training
if len(set(y)) < 2:
    print("❌ Not enough players/classes to train the model.")
else:
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = LogisticRegression(max_iter=1000)
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    labels_in_test = sorted(set(y_test))
    target_names = [str(name) for name in le.inverse_transform(labels_in_test)]

    print("\n🎯 Classification Report:")
    print(classification_report(y_test, y_pred, labels=labels_in_test, target_names=target_names))

    df.to_csv("processed_cricketers_dataset.csv", index=False)
    print("✅ Saved as 'processed_cricketers_dataset.csv'")
