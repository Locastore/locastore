import React from 'react';
// import Slider from './Slider.jsx';
// <Slider photos={this.props.business.photos}/>

class BusinessDetail extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div className="bizBackground">
        <div className="details">
          <h2 className="bizTitle">{this.props.business.name}</h2>
        </div>
        <div>
          <img src={this.props.business.photos}/>
        </div>
        <div className="bizBody">
          <h4>{this.props.business.phone}</h4>
          <h4>{this.props.business.address}</h4>
          {this.props.business.hours.map((openTime, index) =>
            <h4 key={index}>{openTime}</h4>
          )}
          <h4><a href={`http://${this.props.business.website}`}>{this.props.business.website}</a></h4>
        </div>
      </div>
    );
  }
}

export default BusinessDetail;