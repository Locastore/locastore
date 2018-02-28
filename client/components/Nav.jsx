import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="nav">
        {/*<img src={require('./locastore.png')} />*/}
        <ul className="nav-list">
          <li><a className="navItem" href="#">Profile</a></li>
          <li className="navItem"><Link to="/login">Login</Link></li>
          <li className="navItem"><Link to="/signup">Sign Up</Link></li>
          <li><a className="navItem" href="#">About Us</a></li>
        </ul>
      </div>
    )
  }
}

export default Nav;