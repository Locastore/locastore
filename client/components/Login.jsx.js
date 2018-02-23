import React from 'react';

class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  onChangeUsername (event) {
    this.setState({
      username: event.target.value
    }, () => {
    console.log(this.state.username);
    })
  }

  onChangePassword (event) {
    this.setState({
      password: event.target.value
    })
  }

  onFormSubmit() {
    // console.log('FORM SUBMITTED!')
    // console.log(this.props);
    this.props.loginSubmit(this.state);
    // this.props.fix();
  }



  render () {
    return (
      <div className="login">
      <h3>Login</h3>
      <form >
        <label>
          Enter Username
          <input onChange={this.onChangeUsername.bind(this)} type="text" name="username"/>
        </label>
        <br />
        <label>
          Enter Password
          <input onChange={this.onChangePassword.bind(this)} type="text" name="password"/>
        </label>
        <br />
        <input onClick={this.onFormSubmit.bind(this)} type="submit" value="Submit"/>
      </form>
    </div>)
  }
}

export default Login;