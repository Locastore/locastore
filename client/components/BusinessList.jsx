import React from 'react';
import BusinessListEntry from './BusinessListEntry.jsx';

const BusinessList = (props) => {

return (
  <div>
      {props.businesses.map((business, index) => {
        return (
          <BusinessListEntry handleDetail={props.handleDetail} key={index} business={business} />
        )
      })}
  </div>
);
}

export default BusinessList;