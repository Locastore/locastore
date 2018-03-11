import React from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import BusinessListEntry from './BusinessListEntry.jsx';
import BusinessDetail from './BusinessDetail.jsx';
import BusinessList from './BusinessList.jsx';
import { withRouter } from 'react-router';
import SmallNav from './SmallNav.jsx';
import '../styles/Profile.css';

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let favorites = null;
    if (this.props.favorites.length === 0) {
      favorites = <NoFavorites />
    } else {
      favorites = (
        <div>
          <h3 className="favoritesTitle">Your Favorites</h3>
          <hr className="favoritesHr" />
          <BusinessList
            handleDetail={this.props.handleDetail}
            businesses={this.props.favorites}
            loginStatus={this.props.loginStatus}
            loading={this.props.loading}
          />
        </div>
      )
    }
    return (
      <div>
        <Switch>
          <Route path="/location/:place" render={ (props) =>
            this.props.favorites.map((business, index) => {
              if (business.place_id === props.match.params.place) {
                return (<BusinessDetail
                          key={index}
                          match={props.match}
                          business={business}
                          loginStatus={this.props.loginStatus}
                          imgLoading={this.state.imgLoading}
                        />)
              }
            })
          } />
          <Route path="/profile" render={ () =>
            <div>
              <SmallNav />
              <div>{favorites}</div>
            </div>
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
const ProfileWithRouter = withRouter(Profile);
export default ProfileWithRouter;