export const baseQuestions = [
  {
    id: 1,
    key: "country_name",
    question: "🤔 What is the player's country name?",
    options: [
    "India",
    "Australia",
    "England",
    "South Africa",
    "New Zealand",
    "Pakistan",
    "Sri Lanka",
    "West Indies",
    "Bangladesh"
     
    ]
  },
  {
    id: 2,
    key: "role",
    question: "🤔 What is the player's role?",
    options: [
      "Batsman",
      "Bowler",
      "All-rounder"
    ]
  },
  {
    id: 3,
    key: "current_or_retired",
    question: "In which era did they mainly play?",
    options: [
      "Current",
      "retired"
    ]
  }
];

// Role-specific questions
export const roleBasedQuestions = {
  Batsman: [
    {
      id: 4,
      key: "battingstyle",
      question: "🤔 What is the player's battingstyle?",
      options: ["right-Handed", "left-Handed"]
    },
 {
      id : 5,
      key : "formats_played",
      question: "Which format does the player mainly play?",
      options: ["Test, ODI, T20I" , "Test, ODI" , "ODI, T20I"]
    },
    {
      id: 6,
      key: "batting_position",
      question: "🤔 What is the player's batting position?",
      options: ["Middle-Order", "Top-Order", "Opener"]
    }
  ],
  Bowler: [
    
       {
      id : 4,
      key : "formats_played",
      question: "Which format does the player mainly play?",
      options: ["Test, ODI, T20I" , "Test, ODI" , "ODI, T20I"]
    },
    {
      id: 5,
      key: "bowlingstyle",
      question: "🤔 What is the player's bowlingstyle?",
      options: [ "right-arm fast-medium","right-arm medium-Fast","right-arm fast"," right-arm leg break","slow left-arm chinaman","left-arm fast-medium","right-arm Off Break"]
    },
    {
      id: 6,
      key: "bowling_type",
      question: "What is their bowling type?",
      options: ["fast" , "fast-medium" ,"medium-fast", "off-spin" , "left-arm spin" , "leg-spin"]
    }
  ],
  "All-rounder": [

     {
      id : 4,
      key : "formats_played",
      question: "Which format does the player mainly play?",
      options: ["Test, ODI, T20I" , "Test, ODI" , "ODI, T20I"]
    },
    {
      id: 5,
      key: "bowlingstyle",
      question: "🤔 What is the player's bowlingstyle?",
      options: [ "Right-Arm Fast-Medium","Right-Arm Medium-Fast","Right-Arm Fast"," Right-Arm Leg Break","Slow Left-Arm Chinaman","Left-Arm Fast-Medium","Right-Arm Off Break"]

    },
   
     {
      id: 6,
      key: "bowling_type",
      question: "What is their bowling type?",
      options: ["Fast-medium", "Off-spin", "Left-arm spin" , "Left-arm fast-medium" , "Medium pace"]
    }
  ]
};

