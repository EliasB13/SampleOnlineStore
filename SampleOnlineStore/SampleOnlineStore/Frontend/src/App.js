import React, { Component } from 'react';
import { Router, Route } from 'react-router';
import { connect } from 'react-redux';
import { Home } from './components/Home';
import { Cart } from './components/cart/Cart.js';
import { Container } from 'reactstrap';
import { NavMenu } from './components/navMenu/NavMenu';
import { NavMenuLoggedIn } from './components/navMenu/NavMenuLoggedIn';
import { LoginPage } from './components/login/LoginPage.js';
import { RegisterPage } from './components/register/RegisterPage.js';
import { history } from './helpers';
import { alertActions } from './actions';

class App extends Component { 
  static displayName = App.name;

  constructor(props) {
    super(props);

    history.listen((location, action) => {
        this.props.clearAlerts();
    });
}

  renderNavMenu() {
    const isLogged = false;
    if (isLogged) {
      return ( <NavMenuLoggedIn /> );
    } else {
      return ( <NavMenu /> );
    }
  }

  render () {
    return (
      <Router history={ history }>
        <div>
          { this.renderNavMenu() }
          <Container>
            <Route exact path='/' component={ Home } />
            <Route path='/login' component={ LoginPage } />
            <Route path='/register' component={ RegisterPage } />
            <Route path='/cart' component={ Cart } />
          </Container>
        </div>
      </Router>
    );

    // const isLogged = false;
    // if (isLogged) {
    //   return (
    //     <div>
    //       <NavMenuLoggedIn />
    //       <Container>
    //         <Route exact path='/' component={ Home } />
    //         <Route path='/cart' component={ Cart } />
    //         <Route path='/login' component={ LoginPage } />
    //       </Container>
    //     </div>
    //   );
    // } else {
    //   return (
    //     <div>
    //       <NavMenu />
    //       <Container>
    //         <Route exact path='/' component={ Home } />
    //         <Route path='/login' component={ LoginPage } />
    //         <Route path='/register' component={ RegisterPage } />
    //       </Container>
    //     </div>
    //   );
    // }
    }
}

function mapState(state) {
  const { alert } = state;
  return { alert };
}

const actionCreators = {
  clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };