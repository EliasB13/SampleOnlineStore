import React, { Component } from 'react';
import { Router, Route } from 'react-router';
import { connect } from 'react-redux';
import { Catalog } from './components/products/Catalog';
import { Cart } from './components/cart/Cart.js';
import { Container } from 'reactstrap';
import { NavMenu } from './components/navMenu/NavMenu';
import { LoginPage } from './components/login/LoginPage.js';
import { RegisterPage } from './components/register/RegisterPage.js';
import { history } from './helpers';
import { alertActions } from './actions';
import { PrivateRoute } from './helpers/privateRoute';
import { ProductPage } from './components/products/ProductPage';
import './App.css';

class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);

        history.listen((location, action) => {
            this.props.clearAlerts();
        });
    }

    render() {
        const { alert } = this.props;
        const { authentication } = this.props;
        
        return (
            <Router history={history}>
                <div>
                    <NavMenu isLogged={authentication.loggedIn} />
                    <Container>
                        <div>
                            {alert.message &&
                                <div className={`alert ${alert.type}`}>{alert.message}</div>
                            }
                        </div>
                        <Route exact path='/' component={Catalog} />
                        <Route path='/login' component={LoginPage} />
                        <Route path='/register' component={RegisterPage} />
                        <Route path='/product/:id' component={ProductPage} />
                        <PrivateRoute path='/cart' component={Cart} />
                    </Container>

                    <footer class="border-top footer text-muted">
                        <div class="container">
                            &copy; 2019 - SampleOnlineStore - Made by EliasB
                        </div>
                    </footer>
                </div>
            </Router>
        );
    }
}

function mapState(state) {
    return {
        authentication: state.authentication,
        alert: state.alert
    };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };