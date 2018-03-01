import React from 'react';
import '../styles/About.css';
import { Container, Row, Col } from 'reactstrap';

class About extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <img className="logo" src="https://c1.staticflickr.com/5/4743/38734064130_7dcc8f1deb_s.jpg"/>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 className="sectionHead">About Locastore</h3>
            <p>Locastore - a play on the popular term "locavore" - is a platform to connect consumers to the locally-owned business ecosystems around them. We believe in the power of small businesses to improve community-building, generate market diversity, and improve quality of life. We hope to encourage deeper, more habitual interactions with locally-owned businesses and empower mom & pop to keep mommin' & poppin'.</p>
          </Col>
        </Row>

        <h3 className="sectionHead">Developer Team</h3>

        <Row>
          <Col xs="6" sm="4"><img className="aboutImg" src="https://c1.staticflickr.com/5/4770/39649699085_054a6e330d_q.jpg"/>
            <div className="aboutInfo">
              <h4>Evaline Bai</h4>
              <h5 className="title">Product Owner</h5>
              <h6 className="haunt">Favorite Local Haunt:</h6>
              <h6>"Four walls and a chemex"</h6>
            </div>
          </Col>

          <Col xs="6" sm="4"><img className="aboutImg" src="https://c1.staticflickr.com/5/4750/39834378884_e323733655_q.jpg"/>
            <div className="aboutInfo">
              <h4>Norbie Magno</h4>
              <h5 className="title">Engineering Lead</h5>
              <h6 className="haunt">Favorite Local Haunt:</h6>
              <h6>"My essential oils guy"</h6>
            </div>
          </Col>

          <Col sm="4"><img className="aboutImg" src="https://c1.staticflickr.com/5/4721/26673937628_488ed3ebf0_q.jpg"/>
            <div className="aboutInfo">
              <h4>Mike Butak</h4>
              <h5 className="title">Scrum Master</h5>
              <h6 className="haunt">Favorite Local Haunt:</h6>
              <h6>"Grandma's swap meets"</h6>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default About;