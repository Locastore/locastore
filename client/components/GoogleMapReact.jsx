import React from 'react';
import GoogleMapReact from 'google-map-react';

const EmbedReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends React.Component {
  constructor(props) {
    super(props);
    console.log('props', props);
    this.state = {
      center: {lat: this.props.latitude, lng: this.props.longitude},
      zoom: 14
    };
  }

  render() {
    return (
      <div className="googleMap">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.googleMapKey }}
        defaultCenter={this.state.center}
        defaultZoom={this.state.zoom}
      >
        <EmbedReactComponent
          lat={this.props.latitude}
          lng={this.props.longitude}
          text={this.props.name}
        />
      </GoogleMapReact>
      </div>
    );
  }
}

module.exports = SimpleMap;