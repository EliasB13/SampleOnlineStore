import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import './Icons.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            cartQuantity: 0
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    renderNavLinks() {

        if (this.props.isLogged) {
            return (
                <React.Fragment>
                    <NavItem>
                        <NavLink tag={Link} className="text-dark" to="/cart">
                            <svg className="cart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                <path d="M6 6 L30 6 27 19 9 19 M27 23 L10 23 5 2 2 2" />
                                <circle cx="25" cy="27" r="2" />
                                <circle cx="12" cy="27" r="2" />
                            </svg>
                            {
                                this.state.cartQuantity === 0 ? null :
                                    <span class='badge badge-warning' id='lblCartCount'>{this.state.cartQuantity}</span>
                            }
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} className="text-dark" to="/login">Sign Out</NavLink>
                    </NavItem>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <NavItem>
                        <NavLink tag={Link} className="text-dark" to="/login">Sign In</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} className="text-dark" to="/register">Sign Up</NavLink>
                    </NavItem>
                </React.Fragment>
            );
        }
    }

    render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">SampleOnlineStore</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                {this.renderNavLinks()}
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
