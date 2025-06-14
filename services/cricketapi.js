const axios = require("axios");

const API_KEY = "b13eec441fmshfba088cc256cfe9p12d13fjsnf66779e71962"; // Replace with your key

const BASE_URL = "https://cricbuzz-cricket.p.rapidapi.com";
const HEADERS = {
    "x-rapidapi-key": API_KEY,
    "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com"
};

// Search Player by Name
const searchPlayer = async (playerName) => {
    try {
        const response = await axios.get(`${BASE_URL}/players/search?name=${playerName}`, { headers: HEADERS });
        return response.data;  // Returns player list with IDs
    } catch (error) {
        console.error("Error searching player:", error.message);
        return null;
    }
};

module.exports = { searchPlayer };
