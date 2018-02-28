import React from 'react';
import { Route } from 'react-router-dom';
import { Card, CardImg, CardText, CardBody, CardTitle, CardLink, Button, Row, Col } from 'reactstrap';

class BusinessListEntry extends React.Component {
  constructor (props) {
    super(props);
  }

  imageFallback(event) {
    event.target.src = 'https://images.unsplash.com/photo-1496389395181-e5fdd5c0315e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=49bd31ab070ce144fe11d9df225d1d4c&auto=format&fit=crop&w=746&q=80';
  }

  render() {
    return (
      <Col className="cardColumn" xs="6" sm="4">
        <Card>
          <CardImg className="cardImg" top width="100%" src={this.props.business.photos} onError={this.imageFallback}></CardImg>
          <CardBody className="cardBody">
            <CardTitle className="cardTitle">{this.props.business.name}</CardTitle>
            <CardText className="cardPhone">{this.props.business.phone}</CardText>
            <hr />
              <Route render={({history}) => (
                <Button onClick={() => { this.props.handleDetail(this.props.business.place_id, history) }}>More Details</Button>
              )}>
              </Route>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default BusinessListEntry;