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
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
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
    this.props.signupSubmit(this.state, this.props.history);
  }

  render () {
    return (
      <div className="signup">
        <div className="loginLogo">
          <a className="homeLogo" href="/">
            <h2 className="companyName">Locastore</h2>
          </a>
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
              <Input
                type="text"
                name="username"
                onChange={this.onChangeUsername}
              />
            </FormGroup>
            <FormGroup>
              <Label>Create Password</Label>
              <Input
                type="password"
                name="password"
                onChange={this.onChangePassword}
              />
            </FormGroup>
            <FormGroup>
              <Label>Your Email</Label>
              <Input
                type="email"
                name="email"
                onChange={this.onChangeEmail}
              />
            </FormGroup>
            <Button onClick={this.onFormSubmit}>Sign Up</Button>
            <Button href='/auth/google' className='googleButton'>
              <img src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' className='icon'/>
              <span className='buttonText'>Sign up With Google</span>
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default Signup;