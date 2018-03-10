import React from 'react';
import Slider from './Slider.jsx';
import axios from 'axios';
import SmallNav from './SmallNav.jsx';
import { Button, Container, Row, Col } from 'reactstrap';

class BusinessDetail extends React.Component {
  constructor (props) {
    super(props);
    this.handleFavorite = this.handleFavorite.bind(this);
    this.state = {
      favorited: false,
      buttonText: 'Favorite'
    };
    this.isFavorited = this.isFavorited.bind(this);
  }

  componentDidMount() {
    this.isFavorited();
  }

  isFavorited() {
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
        <Container className="container">
            <h2 className="bizTitle">{this.props.business.name}</h2>
            <h5>Reviews</h5>
            <h5 className="bodyText address">map {this.props.business.address}</h5>
            <h5 className="bodyText phone">☎ Phone: {this.props.business.phone}</h5>
          <Row className="mainRow">
            <Col md={6} className="slider">
              { photos }
            </Col>
            <Col md={6} className="bizBody">

              <h4 className="bodyText">Business Hours:</h4>
              { hours }
              { website }
              {favoriteComponent}
              <h4 className="bodyText">Price: {this.props.business.price}</h4>
              <h4 className="bodyText">Rating: {this.props.business.rating}</h4>
            </Col>

          </Row>
        </Container>
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