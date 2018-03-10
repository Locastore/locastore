import React from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { Card, CardImg, CardText, CardBody, CardTitle, CardLink, Button, Row, Col } from 'reactstrap';

class BusinessListEntry extends React.Component {
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
  }

  getFavorites() {
    if (this.props.loginStatus) {
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

  imageFallback(event) {
    event.target.src = 'https://images.unsplash.com/photo-1496389395181-e5fdd5c0315e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=49bd31ab070ce144fe11d9df225d1d4c&auto=format&fit=crop&w=746&q=80';
  }

  render() {
    let favoriteComponent = null;
    this.getFavorites();
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
      <Col className="cardColumn" xs="6" sm="4">
        <Card>
        <div onClick={() => {this.props.handleDetail(this.props.business.place_id)}}>
          <CardImg
            className="cardImg"
            top width="100%"
            src={this.props.business.photos}
            onError={this.imageFallback}>
          </CardImg>

          <CardBody className="cardBody">
            <CardTitle className="cardTitle">{this.props.business.name}</CardTitle>
            <CardText className="cardPhone">{this.props.business.phone}</CardText>
            <hr />
            <div></div>
          </CardBody>
          </div>
          {favoriteComponent}
        </Card>
      </Col>
    );
  }
}

export default BusinessListEntry;