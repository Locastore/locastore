import React from 'react';
import '../styles/Login.css';

class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: ''
    }
  }

  onChangeUsername (event) {
    this.setState({
      username: event.target.value
    })
  }

  onChangeEmail (event) {
    this.setState({
      email: event.target.value
    })
  }

  onChangePassword (event) {
    this.setState({
      password: event.target.value
    })
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.loginSubmit(this.state, event);
  }



  render () {
    return (
      <div className="login">
        <div className="loginLogo">
          <h2 className="companyName">Locastore</h2>
        </div>
        <div className="imgCaption">
          <h6>Distant Lands Travel Bookstore & Outfitter</h6>
          <h6 className="captionLocation">Pasadena, California, USA</h6>
        </div>
          <div className="loginForm">
            <h3 className="welcomeBack">Welcome Back</h3>
            <form >
              <label>
                Username
                <input onChange={this.onChangeUsername.bind(this)} type="text" name="username"/>
              </label>
              <br />
              <label>
                Password
                <input onChange={this.onChangePassword.bind(this)} type="text" name="password"/>
              </label>
              <br />
              <input onClick={this.onFormSubmit.bind(this)} type="submit" value="Submit"/>
            </form>
          </div>
    </div>)
  }
}

export default Login;