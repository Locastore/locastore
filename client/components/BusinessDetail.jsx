import React from 'react';

const BusinessDetail = (props) => {
  return (
    <div>
      <h1>Business Details</h1>
      <h2>{props.business.name}</h2>
      <h4>{props.business.phone}</h4>
      <h4>{props.business.address}</h4>
      <h4><a href={props.business.website}>{props.business.website}</a></h4>
    </div>
  );
}
export default BusinessDetail;