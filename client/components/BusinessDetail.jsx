import React from 'react';
import Slider from './Slider.jsx';
import axios from 'axios';
import SmallNav from './SmallNav.jsx';
import { Button } from 'reactstrap';

class BusinessDetail extends React.Component {
  constructor (props) {
    super(props);
    this.handleFavorite = this.handleFavorite.bind(this);
    this.state = {
      userFavorites: [],
      favorited: false,
      buttonText: 'Favorite'
    };
    this.isFavorited = this.isFavorited.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
    this.throttleget = throttle(this.getFavorites, 3000);
  }

  getFavorites() {
    if (this.props.loginStatus && this.state.userFavorites.length === 0) {
      axios.get('/favorite')
      .then((res) => {
        this.setState({
          userFavorites: res.data
        }, this.isFavorited);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }

  isFavorited() {
    let businessId = this.props.business.place_id;
    let userFavorites = this.state.userFavorites;
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
    this.throttleget();
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
        <Button onClick={() => {this.handleUnfavorite(this.props.business)}}>Unfavorite</Button>
    } else if (this.props.loginStatus) {
      favoriteComponent =
        <Button onClick={() => {this.handleFavorite(this.props.business)}}>Favorite</Button>
    } else {
      favoriteComponent = <span></span>
    }
    return (
      <div>
        <SmallNav />
        <div>
          <h2 className="bizTitle">{this.props.business.name}</h2>
        </div>
        <div className="slider">
          { photos }
        </div>
        <div className="bizBody">
          <h4 className="bodyText">{this.props.business.address}</h4>
          <h4 className="bodyText">Phone: {this.props.business.phone}</h4>
          <h4 className="bodyText">Business Hours:</h4>
          { hours }
          { website }
          {favoriteComponent}
          <h4 className="bodyText">Price: {this.props.business.price}</h4>
          <h4 className="bodyText">Rating: {this.props.business.rating}</h4>
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

const throttle = (func, limit) => {
  let lastFunc
  let lastRan
  return function() {
    const context = this
    const args = arguments
    if (!lastRan) {
      func.apply(context, args)
      lastRan = Date.now()
    } else {
      clearTimeout(lastFunc)
      lastFunc = setTimeout(function() {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args)
          lastRan = Date.now()
        }
      }, limit - (Date.now() - lastRan))
    }
  }
}

export default BusinessDetail;