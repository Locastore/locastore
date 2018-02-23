import React from 'react';

class Signup extends React.Component {
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

  onFormSubmit() {
    this.props.SingupSubmit(this.state);
  }



  render () {
    return (
      <div>
      <h3>Signup for Locastore</h3>
      <form >
        <label>
          Create Username
          <input onChange={this.onChangeUsername.bind(this)} type="text" name="username"/>
        </label>
        <br />
        <label>
          Your Email Address
          <input onChange={this.onChangeEmail.bind(this)} type="email" name="email"/>
        </label>
        <br />
        <label>
          Create Password
          <input onChange={this.onChangePassword.bind(this)} type="text" name="password"/>
        </label>
        <br />
        <input onClick={this.onFormSubmit.bind(this)} type="submit" value="Submit"/>
      </form>
    </div>)
  }
}

export default Signup;