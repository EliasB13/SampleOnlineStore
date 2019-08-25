import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import { NavMenuLoggedIn } from './NavMenuLoggedIn'

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    const isLogged = false;
    if (isLogged) {
      return (
        <div>
          <NavMenuLoggedIn />
          <Container>
            {this.props.children}
          </Container>
        </div>
      );
    } else {
      return (
        <div>
          <NavMenu />
          <Container>
            {this.props.children}
          </Container>
        </div>
      );
    }

    
  }
}
