import React from 'react';
import Slider from './Slider.jsx';
import axios from 'axios';
import { Button } from 'reactstrap';

class BusinessDetail extends React.Component {
  constructor (props) {
    super(props);
    this.handleFavorite = this.handleFavorite.bind(this);
    this.state = {
      favorited: false,
      buttonText: 'Favorite'
    };
  }

  handleFavorite(business) {
    axios.post('/favorite', {
      business: business
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  changeText() {
    this.setState({
      buttonText: 'Added to Favorites'
    })
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
          {this.props.loginStatus &&
            <Button onClick={() => {this.handleFavorite(this.props.business);
                                    this.changeText(); } }>{this.state.buttonText}</Button>
          }
        </div>
      </div>
    );
  }
}

export default BusinessDetail;