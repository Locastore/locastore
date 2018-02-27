import React from 'react';
import { Route } from 'react-router-dom';
//to={`/location/${props.business.place_id}`}
const BusinessListEntry = (props) => {

  return (
    <div>
      <Route render={({history}) => (
        <div onClick={() => { props.handleDetail(props.business.place_id, history) }} >
          <h3><a>{props.business.name}</a></h3>
        </div>
      )}>
      </Route>
      <h5>{props.business.phone}</h5>
      <h5><a href={props.business.website}>{props.business.website}</a></h5>
    </div>
  );
}
export default BusinessListEntry;