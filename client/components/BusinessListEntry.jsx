import React from 'react';
import { Link } from 'react-router-dom';

const BusinessListEntry = (props) => {

  return (
    <div>
      <Link to={`/location/${props.business.place_id}`}>
        <h4>{props.business.name}</h4>
      </Link>
      <h5>{props.business.phone}</h5>
      <h5><a href={props.business.website}>{props.business.website}</a></h5>
    </div>
  );
}
export default BusinessListEntry;