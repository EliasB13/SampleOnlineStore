import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom'
import { userActions } from '../../actions'

class LoginPage extends Component {
    constructor(props) {
      super(props);
  
      this.props.logout();

      this.state = {
        login: '',
        password: '',
        submitted: false
      };
      
      this.handleLoginChange = this.handleLoginChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleLoginChange(e) {
      this.setState({ login: e.target.value });
    }
  
    handlePasswordChange(e) {
      this.setState({ password: e.target.value });
    }
  
    handleSubmit(e) {
      e.preventDefault();

      this.setState( { submitted: true } );
      const { login, password } = this.state;
      if (login && password) {
        this.props.login(login, password);
      }
    }
  
    render() {
      //const { loggingIn } = this.props;
      const { login, password, submitted } = this.state;

      return (
        <div className="row justify-content-center">
          <div className="col-10 col-sm-7 col-md-5 col-lg-4">
            <h4>Use a local account to log in.</h4>
            <hr />
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="login">Login</Label>
                <Input
                  id="login"
                  name="login"
                  onChange={this.handleLoginChange}
                  placeholder="Login"
                  type="text"
                  value={ login }
                  invalid={ submitted && !login }
                />
                <FormFeedback>Login can't be empty</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="userPassword">Password</Label>
                <Input
                  id="userPassword"
                  name="password"
                  onChange={this.handlePasswordChange}
                  placeholder="Password"
                  type="password"
                  value={ password }
                  invalid={ submitted && !password }
                />
                <FormFeedback>Password can't be empty</FormFeedback>
              </FormGroup>
              <p>
                <Link to="/register">Haven't account yet? Create a new one.</Link>
              </p>
              <Button color="primary">Log In</Button>
            </Form>
          </div>
        </div>
      );
    }
  }

function mapState(state) {
  const { loggingIn } = state.authentication;
  return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };