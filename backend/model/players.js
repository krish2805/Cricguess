// backend/models/Player.js
const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    id : int ,
  firstname: String,
  lastname: String,
  fullname: String,
  battingstyle: String,
  bowlingstyle: String,
  position: String,
  country_id: int,
  country_name: String,
  current_or_retired: String,
  batting_hand: String,
  bowling_type: String,
  batting_position: String,
  formats_played: String,
  achievements: String,
  
});

module.exports = mongoose.model('Player', PlayerSchema);

id,firstname,lastname,fullname,battingstyle,bowlingstyle,position,country_id,country_name,current_or_retired,batting_hand,bowling_type,batting_position,formats_played,achievements
