import React from 'react';

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
    this.props.loginSubmit(this.state, event);
  }



  render () {
    return (
      <div className="login">
      <h3>Login, Go Local</h3>
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
    </div>)
  }
}

export default Login;