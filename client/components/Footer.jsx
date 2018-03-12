import React from 'react';
import '../styles/App.css';

class Footer extends React.Component {
  render () {

    return (
      <div className="footer">
        <p>© {new Date().getFullYear()}
          <a className="footer" href="/about"> Locastore Team </a>
          //
          <a className="footer" href="https://github.com/LocastoreV2/locastore"> Repo </a>
        </p>
      </div>
    )
  }
}

export default Footer;