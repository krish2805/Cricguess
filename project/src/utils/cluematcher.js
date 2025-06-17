const matchClueToPlayer = async (clues, players) => {
  const response = await fetch("http://localhost:5000/api/clue-match", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ clues , players })
  });
  return await response.json();
};
