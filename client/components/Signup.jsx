import React from 'react';

class Signup extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
    }
  }

  render () {
    return (
      <div>
      <h3>Signup for Locastore</h3>
      <form onSubmit={this.SignupSubmit}>
        <label>
          Create Username
          <input type="text" name="username"/>
        </label>
        <br />
        <label>
          Your Email Address
          <input type="email" name="email"/>
        </label>
        <br />
        <label>
          Create Password
          <input type="text" name="password"/>
        </label>
        <br />
        <input type="submit" value="Submit"/>
      </form>
    </div>)
  }
}

export default Signup;