import React from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import '../styles/Signup.css';

class Signup extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: ''
    }
  }

  onChangeUsername (event) {
    this.setState({
      username: event.target.value
    })
  }

  onChangeEmail (event) {
    this.setState({
      email: event.target.value
    })
  }

  onChangePassword (event) {
    this.setState({
      password: event.target.value
    })
  }

  onFormSubmit(event) {
    // console.log(this.state,'<-- this.state from the react onFormSubmit to be sent via singupSubmit');
    // let persistedEvent = event.persist();
    this.props.signupSubmit(this.state, event);
  }



  render () {
    return (
      <div className="signup">
        <div className="loginLogo">
          <h2 className="companyName">Locastore</h2>
        </div>
        <div className="imgCaption">
          <h6>Distant Lands Travel Bookstore & Outfitter</h6>
          <h6 className="captionLocation">Pasadena, California, USA</h6>
        </div>
        <div className="signupForm">
          <h3 className="joinMovement">Join the Movement</h3>
          <Form >
            <FormGroup>
              <Label>Create Username</Label>
              <Input type="text" name="username" onChange={this.onChangeUsername.bind(this)}/>
            </FormGroup>
            <FormGroup>
              <Label>Create Password</Label>
              <Input type="password" name="password" onChange={this.onChangePassword.bind(this)}/>
            </FormGroup>
            <FormGroup>
              <Label>Your Email</Label>
              <Input type="email" name="email" onChange={this.onChangeEmail.bind(this)}/>
            </FormGroup>
            <Button onClick={this.onFormSubmit.bind(this)}>Sign Up</Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default Signup;