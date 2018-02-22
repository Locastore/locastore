import React from 'react';
import BusinessListEntry from './BusinessListEntry.jsx';

const BusinessList = (props) => {

return (
  <div>
      {props.businesses.map(function(business) {
        return (
          <BusinessListEntry business={business} />
        )
      })}
  </div>
);
}
export default BusinessList;