import React, {Component} from 'react';
import {Row, Col, Button , ListGroupItem} from 'reactstrap';
import PropTypes from 'prop-types';

export default class UserRow extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        deleteUser: PropTypes.func.isRequired
    };

    _showRole = role => {
        switch (role) {
            case 1:
                return 'Admin';
            case 2:
                return 'User';
            default:
                return 'Unknown'
        }
    };


    _showStatus = status => {
        switch (status) {
            case 1:
                return 'Active';
            case 0:
                return 'Inactive';
            default:
                return 'Unknown'
        }
    };

    _edit = (user) => {
        const {edit} = this.props;

        edit && edit(user);
    };

    _deleteUser = (user) => {
       const {deleteUser} = this.props;

        deleteUser && deleteUser (user);
    };

    _activate = (user) => {
        const {activate} = this.props;

        activate && activate (user);
    };

    render() {
        const {user , editUsers , activateUser} = this.props;
        let buttonDelete = true;

        if(parseInt(sessionStorage.getItem('id'),10) === user.id)
        {
            buttonDelete = false;
        }

        return (
            <ListGroupItem color={'info'}>
                <Row>
                    <Col lg={1}><b className={'toShow'}>ID: </b>{user.id}</Col>
                    <Col lg={2}><b className={'toShow'}>Name: </b>{user.name}</Col>
                    <Col lg={4}><b className={'toShow'}>Email: </b>{user.email}</Col>
                    <Col lg={1}><b className={'toShow'}>Status: </b>{this._showStatus(user.status)}</Col>
                    <Col lg={2}><b className={'toShow'}>Role: </b>{this._showRole(user.role_id)}</Col>
                    <Col lg={2}>
                        {activateUser && <Button className={'button-edit'} color="success" size="sm" onClick={() => this._activate(user)}>Activate</Button>}
                        {editUsers && <Button className={'button-edit'} color="success" size="sm" onClick={() => this._edit(user)}>Edit</Button>}
                        {buttonDelete && <Button className={'button-delete'} color="danger" size="sm" onClick={() => this._deleteUser(user)}>Delete</Button>}
                    </Col>
                </Row>
            </ListGroupItem>
        );
    }
}