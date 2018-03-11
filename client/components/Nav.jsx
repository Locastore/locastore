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
    let loginComponent = null;
    if (this.props.loginStatus) {
      loginComponent = (
        <div>
          <Link className="navItem" to="/logout">
            <i className="fas fa-angle-double-right"></i>
            Logout
          </Link>
          <Link className="navItem" to="/profile">
            <i className="fas fa-angle-double-right"></i>
            Profile
          </Link>
        </div>
      )
    } else {
      loginComponent = (
        <div>
          <Link className="navItem" to="/login">
              <i className="fas fa-angle-double-right"></i>
              Login
          </Link>
          <Link className="navItem" to="/signup">
              <i className="fas fa-angle-double-right"></i>
              Sign Up
          </Link>
        </div>
      )
    }
    return (
      <div className="nav-grid">
        <div className="companyDiv">
          <h2 className="companyName">Locastore</h2>
        </div>
        <div className="nav">
          <div className="nav-list">
            {loginComponent}
            <Link className="navItem" to="/about">
              <i className="fas fa-angle-double-right"></i>
              About Us
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Nav;
