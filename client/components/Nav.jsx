import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
  constructor(props) {
    super(props);
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
            <li><a className="navItem" href="#">Profile</a></li>
            <li><Link className="navItem" to="/login">Login</Link></li>
            <li><Link className="navItem" to="/signup">Sign Up</Link></li>
            <li><Link className="navItem" to="/about">About Us</Link></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Nav;