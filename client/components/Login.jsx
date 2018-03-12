import React from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import '../styles/Forms.css';
import Footer from './Footer.jsx'

class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: ''
    }
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onchangeEmail = this.onChangeEmail.bind(this);
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
    event.preventDefault();
    this.props.loginSubmit(this.state, this.props.history);
  }

  render () {
    return (
      <div className="forms-grid">
        <div className="banner login left-col">
          <div className="loginLogo">
            <a className="homeLogo" href="/">
              <h2 className="companyName">Locastore</h2>
            </a>
          </div>
          <div className="imgCaption">
            <h6>Common Grounds Coffee Shop</h6>
            <h6 className="captionLocation">Spearfish, South Dakota, USA</h6>
          </div>
        </div>
        <div className="right-col">
          <div className="submitForm">
            <h3 className="formGreeting">Welcome Back</h3>
            <Form >
              <FormGroup>
                <Label>Username</Label>
                <Input
                  type="text"
                  name="username"
                  onChange={this.onChangeUsername}
                />
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input
                  type="password"
                  name="password"
                  onChange={this.onChangePassword}
                />
              </FormGroup>
                <Button onClick={this.onFormSubmit}>Login</Button>
                <Button href='/auth/google' className='googleButton'>
                  <img src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' className='icon'/>
                  <span className='buttonText'>Sign in With Google</span>
                </Button>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;
