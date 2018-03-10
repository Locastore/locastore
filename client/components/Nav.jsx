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
        <a href='/logout' className='navItem'>Logout</a>
        <li>
          <Link className="navItem" to="/profile">
          <i className="fas fa-angle-double-right"></i>
            Profile
          </Link>
        </li>

        </div>
      )
    } else {
      loginComponent = (
        <div>
          <li><Link className="navItem" to="/login">
          <i className="fas fa-angle-double-right"></i>
          Login</Link></li>
          <li><Link className="navItem" to="/signup">
          <i className="fas fa-angle-double-right"></i>
          Sign Up</Link>
          </li>
        </div>
      )
    }
    return (
      <div>
        <div className="companyDiv">
          <h2 className="companyName">Locastore</h2>
          <hr className="navHr"/>
        </div>
        <div className="nav">
          <ul className="nav-list">
            {loginComponent}
            <li><Link className="navItem" to="/about">
            <i className="fas fa-angle-double-right"></i>
            About Us</Link></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Nav;
