const API_BASE = "http://127.0.0.1:5000/api";

export const fetchPlayerClues = async (answersArray) => {
  try {
    const response = await fetch(`${API_BASE}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ answers: answersArray })
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch clues. Status: ${response.status}`);
    }

    const data = await response.json();

    // Handle cases where API returns empty or malformed data
    if (!data || !Array.isArray(data.clues) || !Array.isArray(data.players)) {
      throw new Error("Invalid data format received from /predict");
    }

    return {
     
      clues: data.clues,
      players: data.players,
    };
  } catch (error) {
    console.error("Error in fetchPlayerClues:", error);
    throw error;
  }
};

export const matchClueToPlayer = async (clues, players) => {
  const response = await fetch(`${API_BASE}/clue-match`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
       players: players , 
       clues: clues        // Array of clues
            // Array of player objects: [{ fullname: "..." }]
    })
  });

  if (!response.ok) {
    throw new Error("Failed to match clue.");
  }

  const data = await response.json();
  return data.predicted_player;
};

