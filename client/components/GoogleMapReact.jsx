import React from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {lat: 59.95, lng: 30.33},
      zoom: 11
    };
  }

  componentWillMount() {

  }

  getLatLong() {

  }

  render() {
    return (
      <div className="googleMap">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.googleMapKey }}
        defaultCenter={this.state.center}
        defaultZoom={this.state.zoom}
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text={'Kreyser Avrora'}
        />
      </GoogleMapReact>
      </div>
    );
  }
}

module.exports = SimpleMap;