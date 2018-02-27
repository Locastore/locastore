import React from 'react';
import { Route } from 'react-router-dom';
import { Card, CardImg, CardText, CardBody, CardTitle, CardLink, Button, Row, Col } from 'reactstrap';

class BusinessListEntry extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <Col className="cardColumn" xs="6" sm="4">
        <Card>
          <CardImg className="cardImg" top width="100%" src={this.props.business.photos}></CardImg>
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