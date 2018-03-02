import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginStatus: 'Login'
    }
  }

  logView() {
    if (this.props.loggedIn) {
      this.setState({
        loginStatus: 'Logout'
      });
    }
  }

  render() {
    return (
      <div>
        <div className="companyDiv">
          <h2 className="companyName">Locastore</h2>
          <hr className="navHr"/>
        </div>
        <div className="nav">
          <ul className="nav-list">
            <li><Link className="navItem" to="/profile">Profile</Link></li>
            <li><Link className="navItem" to="/login" onClick={this.logView()}>{this.state.loginStatus}</Link></li>
            <li><Link className="navItem" to="/signup">Sign Up</Link></li>
            <li><Link className="navItem" to="/about">About Us</Link></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Nav;