import React from 'react';

const BusinessListEntry = (props) => {

return (
  <div>
    <h4>{props.business.name}</h4>
    <h5>{props.business.phone}</h5>
    <h5><a href={props.business.website}>{props.business.website}</a></h5>
  </div>
);
}
export default BusinessListEntry;