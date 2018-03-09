import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/SmallNav.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'reactstrap';

const logoStyle = {
  "fontFamily": "Sacramento",
  "fontSize": "30px"
}

class SmallNav extends React.Component {
  constructor(props) {
    super(props);
  }
render() {
    return (
      <div>
        <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse">
          <a className="navbar-brand" style={logoStyle} href="/">Locastore</a>
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/*Collapsible content*/}
          <div className="collapse navbar-collapse" id="navbarNav">

            {/*Links*/}
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">Profile</Link>
              </li>
            </ul>
            {/*Links*/}

          </div>
        </nav>
      </div>
    );
  }
}

export default SmallNav;