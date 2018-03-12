import React from 'react';
import '../styles/About.css';

class About extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="aboutPage">
        <div>
            <img className="logo" src="https://c1.staticflickr.com/5/4743/38734064130_7dcc8f1deb_s.jpg"/>
        </div>
        <div>
            <h3 className="sectionHead">About Locastore</h3>
            <p className="aboutText">Locastore - a play on the popular term "locavore" - is a platform to connect consumers to the locally-owned business ecosystems around them. We believe in the power of small businesses to improve community-building, generate market diversity, and improve quality of life. We hope to encourage deeper, more habitual interactions with locally-owned businesses and empower mom & pop to keep mommin' & poppin'.</p>
        </div>


        <h3 className="sectionHead">Development Team</h3>
        <div className="wrapper sienna aboutRow">
          <div>
            <a href="https://github.com/yufanw">
              <img className="aboutImg sienna" src="https://avatars2.githubusercontent.com/u/31011353?s=400&v=4"/>
            </a>
            <div className="aboutInfo sienna">
              <h4>Yufan Wang</h4>
              <h5 className="title">Product Owner</h5>
              <h6 className="haunt">Favorite Local Haunt:</h6>
              <h6>"Ducks Oyakodon"</h6>
            </div>
          </div>
          <div>
            <a href="https://github.com/qsmith1">
              <img className="aboutImg sienna" src="https://avatars0.githubusercontent.com/u/28540710?s=460&v=4"/>
            </a>
            <div className="aboutInfo sienna">
              <h4>Queenie Smith</h4>
              <h5 className="title">Engineering Lead</h5>
              <h6 className="haunt">Favorite Local Haunt:</h6>
              <h6>"Leo le glacier"</h6>
            </div>
          </div>
          <div>
            <a href="https://github.com/annahinnyc">
              <img className="aboutImg sienna" src="https://avatars3.githubusercontent.com/u/22921336?s=460&v=4"/>
            </a>
            <div className="aboutInfo sienna">
              <h4>Annah Patterson</h4>
              <h5 className="title">Scrum Master</h5>
              <h6 className="haunt">Favorite Local Haunt:</h6>
              <h6>"Apotheke"</h6>
            </div>
          </div>
          <div>
            <a href="https://github.com/connectblocks">
              <img className="aboutImg sienna" src="https://avatars1.githubusercontent.com/u/35247504?s=400&v=4"/>
            </a>
            <div className="aboutInfo sienna">
              <h4>Michael Shin</h4>
              <h5 className="title">Engineering Lead</h5>
              <h6 className="haunt">Favorite Local Haunt:</h6>
              <h6>"Myung Dong Kyoja"</h6>
            </div>
          </div>
        </div>

        <h3 className="sectionHead">Greenfield Team</h3>
        <div className="wrapper aboutRow">
          <div>
            <a href="https://github.com/evalineBai">
              <img className="aboutImg" src="https://c1.staticflickr.com/5/4770/39649699085_054a6e330d_q.jpg"/>
            </a>
            <div className="aboutInfo">
              <h4>Evaline Bai</h4>
              <h6 className="haunt">Favorite Local Haunt:</h6>
              <h6>"Four walls and a chemex"</h6>
            </div>
          </div>
          <div>
            <a href="https://github.com/Magnoes">
              <img className="aboutImg" src="https://c1.staticflickr.com/5/4750/39834378884_e323733655_q.jpg"/>
            </a>
            <div className="aboutInfo">
              <h4>Norbie Magno</h4>
              <h6 className="haunt">Favorite Local Haunt:</h6>
              <h6>"My essential oils guy"</h6>
            </div>
          </div>
          <div>
            <a href="https://github.com/mikebutak">
              <img className="aboutImg" src="https://c1.staticflickr.com/5/4721/26673937628_488ed3ebf0_q.jpg"/>
            </a>
            <div className="aboutInfo">
              <h4>Mike Butak</h4>
              <h6 className="haunt">Favorite Local Haunt:</h6>
              <h6>"Nancy's Western Antiques"</h6>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default About;