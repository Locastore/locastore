import React from 'react';
import ReactDOM from 'react-dom';

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="nav">
        {/*<img src={require('./locastore.png')} />*/}
        <ul className="nav-list">
          <li><a href="#">Shop</a></li>
          <li><a href="#">Login</a></li>
          <li><a href="#">Sign Up</a></li>
          <li><a href="#">About Us</a></li>
        </ul>
      </div>
    )
  }
}

export default Nav;