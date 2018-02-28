import React from 'react';
import axios from 'axios';
import BusinessList from './BusinessList.jsx';
import BusinessDetail from './BusinessDetail.jsx';
import './Business.css';

import {
  Route,
  Link,
  Switch
} from 'react-router-dom';

class Business extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        <Switch>
          <Route path="/location/:place" render={ (props) =>
            this.props.businesses.map((business, index) => {
              if (business.place_id === props.match.params.place) {
                return (<BusinessDetail key={index} match={props.match} business={business} />)
              }
            })
          } />
          <Route path="/location" render={ (props) =>
            <BusinessList handleDetail={this.props.handleDetail} businesses={this.props.businesses} />
          } />
        </Switch>
      </div>
    )
  }
}

export default Business;