import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const BusinessDetail = (props) => {
  return (
    <div>
      <h1>Business Details</h1>
      <h2>{props.business.name}</h2>
      <h4>{props.business.phone}</h4>
      <h4>{props.business.address}</h4>
      {props.business.hours.map((openTime) =>
        <h4>{openTime}</h4>
      )}
      <h4><a href={props.business.website}>{props.business.website}</a></h4>
    </div>
  );
}
export default BusinessDetail;