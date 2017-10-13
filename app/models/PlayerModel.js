class PlayerModel {
  constructor(playerName, wins, draws, fails) {
    this.playerName = playerName;
    this.wins = wins;
    this.draws = draws;
    this.fails = fails;
  }
}

module.exports = PlayerModel;
