var batFriends = require("../data/batfriends");

module.exports = function(app) {
  app.get("/api/batFriends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/batFriends", function(req, res) {
    console.log(req.body.scores);

    var user = req.body;

    for(var i = 0; i < user.scores.length; i++) {
      user.scores[i] = parseInt(user.scores[i]);
    }

    var sideKickIndex = 0;
    var minimumDiff = 40;

    for(var i = 0; i < batFriends.length; i++) {
      var totalDifference = 0;
      for(var j = 0; j < batFriends[i].scores.length; j++) {
        var difference = Math.abs(user.scores[j] - friends[i].scores[j]);
        totalDifference += difference;
      }

      if(totalDifference < minimumDiff) {
        sideKickIndex = i;
        minimumDiff = totalDifference;
      }
    }

    friends.push(user);

    res.json(friends[sideKickIndex]);
  });
};