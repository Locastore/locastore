import React from 'react';

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="nav">
        <ul className="nav-list">
          <li><a href="#">Shop</a></li>
          <li><a href="#">Login</a></li>
          <li><a href="#">Sign up</a></li>
          <li><a href="#">About Us</a></li>
        </ul>
      </div>
    )
  }
}


export default Nav;