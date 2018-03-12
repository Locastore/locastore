
import React from 'react';
import Slider from './Slider.jsx';
import axios from 'axios';
import SmallNav from './SmallNav.jsx';
import { Button, Container, Row, Col, CardText } from 'reactstrap';
import StarRatings from './starRatings.jsx';
import Grid from 'react-css-grid';
import SimpleMap from './GoogleMapReact.jsx';

class BusinessDetail extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      favorited: false,
      buttonText: 'Favorite'
    };
    this.isFavorited = this.isFavorited.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
    this.handleUnfavorite = this.handleUnfavorite.bind(this);
  }

  componentDidMount() {
    this.isFavorited();
  }

  isFavorited() {
    if (!this.props.favorites.length) {
      return;
    }
    let businessId = this.props.business.place_id;
    let userFavorites = this.props.favorites;
    for (var i = 0; i < userFavorites.length; i++) {
      if (businessId === userFavorites[i].place_id) {
        this.setState({ favorited: true });
        return;
      }
    }
  }

  handleFavorite(business) {
    axios.post('/favorite', {
      business: business
    })
    .then((res) => {
      console.log(res);
      this.setState({
        favorited: true
      });
      this.props.setNew();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleUnfavorite(business) {
    axios.post('/unfavorite', {
      business: business
    })
    .then((res) => {
      console.log(res);
      this.setState({
        favorited: false
      });
      this.props.setNew();
    })
    .catch((err) => {
      console.log(err);
    });
  }


  render() {
    let favoriteComponent = null;
    let photos = null;
    let hours = null;
    let website = null;
    if (this.props.imgLoading) {
      hours = <Loading />;
    } else if (this.props.business.hours) {
      photos = <Slider photos={this.props.business.extra_photos}/>;
      hours = (this.props.business.hours.map((openTime, index) =>
            <h4 className="hoursText"
                key={index}>
                {openTime}
            </h4>
          ));
      website = <h4><a href={`http://${this.props.business.website}`}>{this.props.business.website}</a></h4>;
    }
    if (this.props.loginStatus && this.state.favorited) {
      favoriteComponent =
        <Button onClick={() => {this.handleUnfavorite(this.props.business)}} outline color="danger">Unfavorite</Button>
    } else if (this.props.loginStatus) {
      favoriteComponent =
        <Button onClick={() => {this.handleFavorite(this.props.business)}} color="danger">Favorite</Button>
    } else {
      favoriteComponent = <Button color="danger" disabled>Favorite</Button>
    }
    return (
      <div>
        <SmallNav />
        <div className="bizContainer">
          <div className="bizHead">
            <h2 className="bizTitle">{this.props.business.name}</h2>
            <div className="ratings">
             <StarRatings rating={this.props.business.rating}/>
            </div>
            {favoriteComponent}
            <span><h5 className="bodyText price">{this.props.business.price}</h5></span>
            <div className="contact">
              <h5 className="bodyText address">📍 {this.props.business.address}</h5>
              <h5 className="bodyText phone">📞 {this.props.business.phone}</h5>
            </div>
          </div>
          <div className="bizTail">
            <div className="slider">
              { photos }
            </div>
            <div className="bizBody">
              <SimpleMap latitude={this.props.business.latitude} longitude={this.props.business.longitude}/>
              <br/>
              <h4 className="bodyText">Business Hours:</h4>
              { hours }
              { website }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function Loading() {
  return (
    <div className="loader small"></div>
  )
}

export default BusinessDetail;