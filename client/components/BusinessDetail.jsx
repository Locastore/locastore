import React from 'react';
import Slider from './Slider.jsx';

class BusinessDetail extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>
          <h2 className="bizTitle">{this.props.business.name}</h2>
        </div>
        <div className="slider">
          <Slider photos={this.props.business.extra_photos}/>
        </div>
        <div className="bizBody">
          <h4 className="bodyText">{this.props.business.address}</h4>
          <h4 className="bodyText">Phone: {this.props.business.phone}</h4>
          <h4 className="bodyText">Business Hours:</h4>
          {this.props.business.hours.map((openTime, index) =>
            <h4 className="hoursText" key={index}>{openTime}</h4>
          )}
          <h4><a href={`http://${this.props.business.website}`}>{this.props.business.website}</a></h4>
        </div>
      </div>
    );
  }
}

export default BusinessDetail;