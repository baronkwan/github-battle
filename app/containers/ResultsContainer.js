var React = require('react')
var Results = require('../components/Results')
var gitHubHelpers = require('../utils/gitHubHelpers')

var ResultsContainer = React.createClass({
  getInitialState () {
    return {
      isLoading: true,
      scores: []
    }
  },
  componentDidMount () {
    gitHubHelpers.battle(this.props.location.state.playersInfo)
      .then((scores) => {
        this.setState({
          isLoading: false,
          scores: scores
        })
      })
  },
  render () {
    return (
      <Results 
        isLoading={this.state.isLoading}
        playersInfo={this.props.location.state.playersInfo}
        scores={this.state.scores} />
    )
  }
})

module.exports = ResultsContainer