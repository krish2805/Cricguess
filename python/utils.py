# python/utils.py
import pandas as pd

def load_processed_data():
    df= pd.read_csv("model/processed_cricketers_dataset.csv")
    for col in df.select_dtypes(include='object').columns:
        df[col] = df[col].str.strip().str.lower().str.title()
    return df

def unique_values(df, col):
    """Returns unique values in a column, sorted by frequency."""
    return df[col].value_counts().index.tolist()

def get_user_choice(num_options):
    """Gets a valid numeric input from the user for selection."""
    while True:
        try:
            choice = int(input("Select an option (number): "))
            if 1 <= choice <= num_options:
                return choice
            else:
                print(f"❌ Enter a number between 1 and {num_options}.")
        except ValueError:
            print("❌ Invalid input. Please enter a number.")
