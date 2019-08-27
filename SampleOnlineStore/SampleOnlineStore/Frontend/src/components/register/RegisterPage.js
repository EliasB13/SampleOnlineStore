import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Form, FormGroup, Label, Input, Button, FormFeedback, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom'
import { userActions } from '../../actions'

class RegisterPage extends Component {

    constructor(props) {
        super(props);


        this.state = {
            login: '',
            password: '',
            passwordConfirm: '',
            submitted: false
        };

        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePasswordConfirmChange = this.handlePasswordConfirmChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleLoginChange(e) {
        this.setState({ login: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    handlePasswordConfirmChange(e) {
        this.setState({ passwordConfirm: e.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { login, password, passwordConfirm } = this.state;
        if (login && password && password === passwordConfirm) {
            this.props.register(login, password);
        }
    }

    render() {
        const { registering } = this.props;
        const { login, password, submitted, passwordConfirm } = this.state;

        return (
            <div className="row justify-content-center">
                <div className="col-10 col-sm-7 col-md-5 col-lg-4">
                    <h4>Sign up</h4>
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
                                value={login}
                                invalid={submitted && !login}
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
                                value={password}
                                invalid={submitted && !password }
                            />
                            <FormFeedback>Password can't be empty</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="userPasswordConfirm">Confirm password</Label>
                            <Input
                                id="userPasswordConfirm"
                                name="passwordConfirm"
                                onChange={this.handlePasswordConfirmChange}
                                placeholder="Confirm password"
                                type="password"
                                value={passwordConfirm}
                                invalid={submitted && password !== passwordConfirm}
                            />
                            <FormFeedback>Password and confirmation don't match</FormFeedback>
                        </FormGroup>
                        <p>
                            <Link to="/login">Already have account? Sign in.</Link>
                        </p>
                        { registering ? <Spinner color="dark" />
                            : <Button color="primary">Sign Up</Button> }
                    </Form>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };