import React from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { Card, CardImg, CardText, CardBody, CardTitle, CardLink, Button, Row, Col } from 'reactstrap';
import IconButton from 'material-ui/IconButton/';
import { CardActions, CardHeader, CardMedia } from 'material-ui/Card';
import StarRatings from './starRatings.jsx';

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
    event.target.src = 'http://www.karunahealthfoundation.com/wp-content/uploads/2015/05/no-image.jpg';
  }

  render() {
    let favoriteComponent = null;
    this.getFavorites();
    if (this.props.loginStatus && this.state.favorited) {
      favoriteComponent =
        <IconButton iconClassName="fa fa-heart" onClick={() => {this.handleUnfavorite(this.props.business)}} />
    } else if (this.props.loginStatus) {
      favoriteComponent =
        <IconButton iconClassName="far fa-heart" onClick={() => {this.handleFavorite(this.props.business)}}/>
    }

    return (
      <Col className="cardColumn" xs="6" sm="4">
        <Card style={{height: '350px', width:'330px', padding: '5px'}}>
        <div className="card-img-wrapper" onClick={() => {this.props.handleDetail(this.props.business.place_id)}}>
          <img className="cardImg" src={this.props.business.photos} onError={this.imageFallback} />
          <div className="card-img-text">
          <p className="details-text">More Details</p>
          </div>
        </div>
          <CardBody className="cardBody">
            <CardTitle className="cardTitle">{this.props.business.name}</CardTitle>
            <StarRatings rating={this.props.business.rating}/>
            <CardText>{this.props.business.price}</CardText>
            {favoriteComponent}
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default BusinessListEntry;