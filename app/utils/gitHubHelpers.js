var axios = require('axios')

var client_id = ""
var GITHUB_API_KEY = ""
var param = "?client_id" + client_id + "&client_secret=" + GITHUB_API_KEY

function getUserInfo (username) {
  return axios.get(`https://api.github.com/users/${username}${param}`)
}

// fetch username repos
function getRepos (username) {
  return axios.get(`https://api.github.com/users/${username}/repos${param}&per_page=100`)
}

// calculate all the stars that user has
function getTotalStars (repos) {
  return repos.data.reduce((prev, curr) => {
    return prev + curr.stargazers_count
  }, 0)
}

// get repos, getTotalStars then return object with that data, returning an object
function getPlayerData (player) {
  return getRepos(player.login)
    .then(getTotalStars)
    .then(function (totalStars) {
      return {
        followers: player.followers,
        totalStars: totalStars
      }
    })
}

// return an array, after doing some fancy algorithms to determine a winner
function calculateScores (players) {
  return [
    players[0].followers * 5 + players[0].totalStars,
    players[1].followers * 5 + players[1].totalStars
  ]
}

var helpers = {

  // fetch players data from github
  getPlayersInfo (players) {
    return axios.all(players.map((username) => {
      return getUserInfo(username)
    }))
    .then((info) => {
      return info.map((user) => {
        return user.data
      })
    })
    .catch((err) => {
      console.warm('Error in getPlayersInfo', err)
    })
    
  },

  // battle logic
  battle (players) {
    var playerOneData = getPlayerData(players[0])
    var playerTwoData = getPlayerData(players[1])

    return axios.all([playerOneData, playerTwoData])
      .then(calculateScores)
      .catch((err) => {console.warn('Error in battle', err)})
  }
}

module.exports = helpers
