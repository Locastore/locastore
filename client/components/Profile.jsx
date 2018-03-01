import React from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import BusinessListEntry from './BusinessListEntry.jsx';
import BusinessDetail from './BusinessDetail.jsx';

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
          <h1>User Favorites</h1>
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

// Barebones 0 results component, will add styling at a later point
function NoFavorites(props) {
  return (
    <h4>User has 0 favorites</h4>
  )
}

export default Profile;