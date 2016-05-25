var React = require('react')
var ConfirmBattle = require('../components/ConfirmBattle')
var gitHubHelpers = require('../utils/gitHubHelpers')

var ConfirmBattleContainer = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState () {
    return {
      isLoading: true,
      playersInfo: []
    }
  },

  componentWillMount () {
    console.log("componentWillMount")
  },

  componentDidMount () {
    var query = this.props.location.query
    console.log('componentDidMount')
    // Fetch info from github then update state
    gitHubHelpers.getPlayersInfo([query.playerOne, query.playerTwo])
      .then((players) => {
        this.setState({
          isLoading: false,
          playersInfo: [players[0], players[1]]
        })
      })
  },

  componentWillReceiveProps () {
    console.log("componentWillReceiveProps")
  },

  componentWillUnmount () {
    console.log("componentWillUnmount")
  },

  handleInitiateBattle () {
    this.context.router.push({
      pathname: '/results',
      state: {
        playersInfo: this.state.playersInfo
      }
    })
  },

  render () {
    console.log("render")
    return (
      <ConfirmBattle  
        isLoading={this.state.isLoading}
        playersInfo={this.state.playersInfo}
        onInitiateBattle={this.handleInitiateBattle} />
    )
  }

})

module.exports = ConfirmBattleContainer