import pandas as pd
from que import ask_question, filter_players, ask_achievement_question
from utils import load_processed_data, get_user_choice

df = load_processed_data()
possible_players = df.copy()

# Step 1: Ask for country
for feature in ["country_name"]:
    question, options = ask_question(possible_players, feature)
    if question:
        user_choice = get_user_choice(len(options))
        chosen_value = options[user_choice - 1]
        possible_players = filter_players(possible_players, feature, chosen_value)

# Step 2: Ask for role
question, options = ask_question(possible_players, "role")
if question:
    user_choice = get_user_choice(len(options))
    chosen_role = options[user_choice - 1]
    possible_players = filter_players(possible_players, "role", chosen_role)

# Role-based questioning
role = chosen_role.lower()

if role == "batsman":
    question_order = ["current_or_retired", "battingstyle", "batting_position"]
elif role == "bowler":
    question_order = ["current_or_retired", "bowlingstyle", "bowling_type"]
elif role == "all rounder":
    question_order = [
        "current_or_retired", "battingstyle", "batting_position",
        "bowlingstyle", "bowling_type"
    ]
else:
    question_order = []

# Continue asking based on role
for feature in question_order:
    question, options = ask_question(possible_players, feature)
    if not question:
        continue
    user_choice = get_user_choice(len(options))
    chosen_value = options[user_choice - 1]
    possible_players = filter_players(possible_players, feature, chosen_value)
    
    if len(possible_players) == 1:
        print(f"\n🎯 The player is: {possible_players['fullname'].values[0]}")
        exit()

# Final check using achievements if multiple remain
if len(possible_players) >= 1:
    print("\n🧠 Final decision based on achievements:")
    for _, row in possible_players.iterrows():
        confirmed = ask_achievement_question(row["fullname"], df)
        if confirmed:
            print(f"\n🎯 The player is: {row['fullname']}")
            break
    else:
        print("\n❌ Could not confidently identify the player.")

elif len(possible_players) == 1:
    print(f"\n🎯 The player is: {possible_players['fullname'].values[0]}")
else:
    print("\n❌ No players match the given clues.")
