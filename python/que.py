from utils import unique_values, get_user_choice

def ask_question(players_df, feature):
    options = unique_values(players_df, feature)
    if len(options) == 1:
        return None, None
    print(f"\n🤔 What is the player's {feature.replace('_', ' ')}?")
    for i, val in enumerate(options, 1):
        print(f"{i}. {val.title()}")
    return feature, options

def filter_players(players_df, feature, answer):
    return players_df[players_df[feature] == answer]

def ask_achievement_question(player_name, df):
    achievement = df[df["fullname"] == player_name]["achievements"].values[0]
    print(f"\n🧠 Is the player known for: \"{achievement}\"?")
    print("1. Yes\n2. No")
    choice = get_user_choice(2)
    return choice == 1
