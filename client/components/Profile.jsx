import React from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import BusinessListEntry from './BusinessListEntry.jsx';
import BusinessDetail from './BusinessDetail.jsx';
import '../styles/Profile.css';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: []
    };
    this.renderDetail = this.renderDetail.bind(this);
  }

  componentWillMount() {
    axios.get('/favorite')
    .then((res) => {
      this.setState({
        favorites: res.data
      });
    })
    .catch((err) => {
      console.log(err);
    })
  }

  renderDetail(placeId, history) {
    history.push(`/profile/${placeId}`);
  }

  render() {
    let favorites = null;
    if (this.state.favorites.length === 0) {
      favorites = <NoFavorites />
    } else {
      favorites = (
        <div>
          <h3 className="favoritesTitle">Your Favorites</h3>
          <hr className="favoritesHr" />
          {this.state.favorites.map((business, index) => {
            return (
              <BusinessListEntry handleDetail={this.renderDetail} key={index} business={business} />
            )
          })}
        </div>
      )
    }
    return (
      <div>
        <Switch>
          <Route path="/profile/:place" render={ (props) =>
            this.state.favorites.map((business, index) => {
              if (business.place_id === props.match.params.place) {
                return (<BusinessDetail key={index} match={props.match} business={business} />)
              }
            })
          } />
          <Route path="/profile" render={ () =>
            <div>{favorites}</div>
          } />
        </Switch>
      </div>
    )
  }
}

function NoFavorites(props) {
  return (
    <div>
      <h3 className="favoritesTitle">No current favorites - explore your city and add some!</h3>
      <hr className="favoritesHr" />
    </div>
  )
}

export default Profile;