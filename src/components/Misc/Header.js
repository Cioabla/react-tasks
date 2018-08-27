import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem} from 'reactstrap';
import '../../css/Header.css';

export default class Header extends Component {
    state = {
        redirect: false
    };

    _logout = () => {
        sessionStorage.clear();

        this.setState({
            redirect: true
        });
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to={'/login'}/>;
        }

        return (
            <div className={'header'}>
                <Navbar expand="md">
                    <NavbarBrand className={'logo'} href="/">ROWEB</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <div className={'navItem navItemLogout'} onClick={this._logout}>Logout</div>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle className={'navItem'} nav caret>
                                    {sessionStorage.getItem('name')}
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Edit
                                    </DropdownItem>
                                    <DropdownItem>
                                        Delete
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        Reset
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}