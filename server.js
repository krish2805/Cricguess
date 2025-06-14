// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const fs = require("fs");
// const path = require("path");
// const csv = require("csv-parser");
// const axios = require("axios");

// const app = express();
// app.use(cors());

// const dataPath = path.join(__dirname, "data", "processdata.csv");
// const cricketers = [];

// // ✅ Load and Parse CSV Dataset
// fs.createReadStream(dataPath)
//   .pipe(csv())
//   .on("data", (row) => {
//     cricketers.push(row);
//   })
//   .on("end", () => {
//     console.log(`✅ Dataset Loaded Successfully! ${cricketers.length} records found.`);
//   });

// // ✅ Fetch Player Info from RapidAPI (Cricbuzz)
// const fetchPlayerFromAPI = async (playerName) => {
//   try {
//     const options = {
//       method: "GET",
//       url: "https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/search",
//       params: { plrN: playerName },
//       headers: {
//         "x-rapidapi-key": process.env.CRICKET_API_KEY,
//         "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com"
//       }
//     };

//     const response = await axios.request(options);
//     return response.data || { message: "Player not found in API ❌" };
//   } catch (error) {
//     console.error("⚠️ Error fetching player from API:", error.message);
//     return { error: "Failed to fetch data from API" };
//   }
// };

// // ✅ API Endpoint: Search Players
// app.get("/players", async (req, res) => {
//   const { name } = req.query;
//   if (!name) return res.json({ error: "❌ Please provide a player name" });

//   // 🔍 Search in Local Dataset
//   const filteredPlayers = cricketers.filter(player =>
//     player.fullname.toLowerCase().includes(name.toLowerCase())
//   );

//   if (filteredPlayers.length) {
//     return res.json(filteredPlayers);
//   }

//   // 🌍 Fetch from API if not found in dataset
//   const apiData = await fetchPlayerFromAPI(name);
//   res.json(apiData);
// });

// // ✅ Root Route
// app.get("/", (req, res) => {
//   res.send("🏏 Cricket Predictor API is running!");
// });

// // ✅ Start Server
// const PORT = 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));




require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

// API Configuration
const RAPIDAPI_KEY = "b13eec441fmshfba088cc256cfe9p12d13fjsnf66779e71962"; // Replace with your actual API key
const RAPIDAPI_HOST = "cricbuzz-cricket.p.rapidapi.com";

// Fetch Player Data from API
app.get("/players", async (req, res) => {
    const { name } = req.query;

    if (!name) {
        return res.status(400).json({ error: "Player name is required!" });
    }

    try {
        // Make API Request to Fetch Player List
        const response = await axios.get(`https://${RAPIDAPI_HOST}/stats/v1/player/search`, {
            headers: {
                "x-rapidapi-key": RAPIDAPI_KEY,
                "x-rapidapi-host": RAPIDAPI_HOST
            },
            params: { plrN: name } // Search player by name
        });

        if (!response.data || response.data.player.length === 0) {
            return res.status(404).json({ error: "Player not found in API!" });
        }

        const player = response.data.player[0]; // Get first matched player
        const playerId = player.id;

        // Fetch Full Player Details using Player ID
        const playerDetails = await axios.get(`https://${RAPIDAPI_HOST}/stats/v1/player/${playerId}`, {
            headers: {
                "x-rapidapi-key": RAPIDAPI_KEY,
                "x-rapidapi-host": RAPIDAPI_HOST
            }
        });

        res.json(playerDetails.data);
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ error: "Failed to fetch player data!" });
    }
});

// Root Route
app.get("/", (req, res) => {
    res.send("🏏 Cricket Predictor API is running using Cricbuzz API!");
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

