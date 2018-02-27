import React from 'react';
import { Route } from 'react-router-dom';
import { Card, CardImg, CardText, CardBody, CardTitle, CardLink, Button, Row, Col } from 'reactstrap';

//to={`/location/${props.business.place_id}`}


const BusinessListEntry = (props) => {
  return (
      <Col className="cardColumn" xs="6" sm="4">
        <Card>
          <CardImg top width="100%" height="300px" src={props.business.photos}></CardImg>
          <CardBody>
            <CardTitle>{props.business.name}</CardTitle>
            <CardText>{props.business.phone}</CardText>
            <CardLink>{props.business.website}</CardLink>
            <div>
              <Route render={({history}) => (
                <Button onClick={() => { props.handleDetail(props.business.place_id, history) }}>More Details</Button>
              )}>
              </Route>
            </div>
          </CardBody>
        </Card>
      </Col>
  );
}
export default BusinessListEntry;