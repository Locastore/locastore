import React from 'react';
import BusinessList from './BusinessList.jsx';

class Business extends React.Component {
  constructor (props) {
    super(props);
  }

  // Need to render business search view as well
  render () {
    return (
      <div>
        <BusinessList businesses={this.props.businesses} />
      </div>
    )
  }
}

export default Business;