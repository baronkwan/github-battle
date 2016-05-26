var React = require('react')
var Link = require('react-router').Link
var MainContainer = require('./MainContainer')

var Home = React.createClass({
  render () {
    return (
      <MainContainer>
        <img 
          src='../fist_image.png'
          style={{height: 150, weight: 150}} />
        <h1>Github Battle</h1>
        <p className="lead">A React.JS Project</p>
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