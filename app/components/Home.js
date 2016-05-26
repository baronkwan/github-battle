var React = require('react')
var Link = require('react-router').Link
var MainContainer = require('./MainContainer')

var Home = React.createClass({
  render () {
    return (
      <MainContainer>
        <h1>Github Battle</h1>
        <p className="lead">Some Fancy motto</p>
        <Link to='/playerOne'>
          <button type='button' className="btn btn-lg btn-success">
            Get Started
          </button>
        </Link>
      </MainContainer>
    )
  }
})

module.exports = Home;