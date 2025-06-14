import requests # type: ignore

# Set up API credentials
API_KEY = "b13eec441fmshfba088cc256cfe9p12d13fjsnf66779e71962"
BASE_URL = "https://cricbuzz-cricket.p.rapidapi.com"

HEADERS = {
    "x-rapidapi-key": API_KEY,
    "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com"
}

def fetch_commentary(match_id):
    url = f"{BASE_URL}/mcenter/v1/{match_id}/comm"
    response = requests.get(url, headers=HEADERS)
    
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": "Failed to fetch data", "status_code": response.status_code}

# Example usage
if __name__ == "__main__":
    match_id = "41881"  # Replace with a real match ID
    commentary = fetch_commentary(match_id)
    print(commentary)
