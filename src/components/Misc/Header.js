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
    DropdownItem,
    ListGroup,
    ListGroupItem} from 'reactstrap';
import '../../css/Header.css';
import {Icon} from 'react-fa';
import axios from "axios/index";

export default class Header extends Component {
    state = {
        id: '',
        redirect: false,
        redirectTask: false,
        notification: [],
        total_notification: '',
        shouldRerender: false
    };




    async componentDidMount() {

        let notification = await axios.get(process.env.REACT_APP_API_URL + 'notification');

        if (notification && notification.data && notification.data.data) {

            this.setState({
                notification: notification.data.data.data,
                total_notification: notification.data.data.total
            });
        }
    }

    _logout = () => {
        sessionStorage.clear();

        this.setState({
            redirect: true
        });
    };

    _notificationAction = async (id) => {

        let notification = await axios.delete(process.env.REACT_APP_API_URL + 'notification/' + id);

        if(notification && notification.data && notification.data.responseType === 'success')
        {
            this.setState({
                redirectTask: true,
                id: id
            });

        }

    };

    renderRedirect = () => {
        if (this.state.redirectTask) {
            this.setState({
                redirectTask: false
            });
            return <Redirect to={'/task/' + this.state.id}/>
        }
    };

    render() {
        const {notification} = this.state;

        if (this.state.redirect) {
            return <Redirect to={'/login'}/>;
        }


        return (
            <div className={'header'}>
                {this.renderRedirect()}
                <Navbar expand="md">
                    <NavbarBrand className={'logo'} href="/">ROWEB</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <UncontrolledDropdown className={'notification-div'} nav inNavbar>
                                <DropdownToggle className={'navItem'} nav caret>
                                    <h6 className={'total-notification'}>{this.state.total_notification}</h6>
                                    <div className={'navItem navItemNotification'}>
                                        <Icon className={'iconNotification'} name='bell' size={'lg'}/>
                                    </div>
                                </DropdownToggle>
                                <DropdownMenu className={'notificationListGroup'} right>
                                    <ListGroup>
                                        {notification && notification.map((not,key) => {
                                            return <ListGroupItem  key={key} onClick={() => this._notificationAction(not.id)} className={'notList'}>
                                                    <h6>{not.message}</h6>
                                                </ListGroupItem>

                                        })}
                                    </ListGroup>
                                </DropdownMenu>
                            </UncontrolledDropdown>
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