import React, {Component} from 'react';
import axios from 'axios';
import UserRow from "./UserRow";
import PaginationUsers from "./PaginationUsers";
import Layout from '../Misc/Layout';
import '../../css/Users.css';

import {
    ListGroup ,
    ListGroupItem ,
    Row ,
    Col ,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    Button} from 'reactstrap';

export default class InactiveUsers extends Component {
    state = {
        users: [],
        openModalDelete: false,
        shouldRerender: false,
        current_page: '',
        last_page: '',
        total_users: '',
        id: false,
        name: ''
    };

    async componentDidMount() {
        if(sessionStorage.getItem('role') === '1')
        {
            let users = await axios.get(process.env.REACT_APP_API_URL + 'admin/users/inactive');

            if (users && users.data && users.data.data) {

                this.setState({
                    users: users.data.data.data,
                    current_page: users.data.data.current_page,
                    last_page: users.data.data.last_page,
                    total_users: users.data.data.total
                });

            } else {
                this.props.history.push('/error')
            }
        }
    }

    async componentDidUpdate() {
        const {current_page} = this.state;

        if (this.state.shouldRerender) {
            let users = await axios.get(process.env.REACT_APP_API_URL + `admin/users/inactive?page=${current_page}`);

            if (users && users.data && users.data.data) {

                this.setState({
                    users: users.data.data.data,
                    current_page: users.data.data.current_page,
                    last_page: users.data.data.last_page,
                    total_users: users.data.data.total,
                    shouldRerender: false
                });

            } else {
                this.props.history.push('/error')
            }
        }
    }

    _deleteUser = async () => {
        const {id} = this.state;

        let res = await axios.delete(process.env.REACT_APP_API_URL + `admin/user/${id}`);

        if (res && res.data && res.data.responseType === 'success') {
            this.setState({
                shouldRerender: true,
                openModalDelete:false
            });
        }
    };

    _deleteModal = (user) => {
        this.setState({openModalDelete: true,id:user.id,name:user.name})
    };

    _activate = async (user) => {
        let res;

        res = await axios.patch(process.env.REACT_APP_API_URL + `admin/user/${user.id}`, {status: 1});

        if (res && res.data && res.data.responseType === 'success') {
            this.setState({
                shouldRerender: true,
                open: false
            });
        }
    };

    _pg = (page) => {
        this.setState({current_page: page , shouldRerender: true})
    };

    render() {
        const {users, current_page , last_page, total_users} = this.state;

        if(!sessionStorage.getItem('token'))
        {
            this.props.history.push('/login');
        }

        return (
            <Layout title={'Inactive users'}>
                <Modal isOpen={this.state.openModalDelete} toggle={this._toggleDelete}>
                    <ModalHeader toggle={this._toggleDelete}>Delete</ModalHeader>
                    <ModalBody>
                        <h3>You're sure you want to delete the user <b>{this.state.name}</b></h3>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this._deleteUser}>Delete</Button>
                        <Button color="secondary" onClick={this._toggleDelete}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <ListGroup className={'users-list'}>
                    <ListGroupItem color="success">
                        <Row>
                            <Col className={'toHide'} lg={1}><b>ID</b></Col>
                            <Col className={'toHide'} lg={2}><b>Name</b></Col>
                            <Col className={'toHide'} lg={4}><b>Email</b></Col>
                            <Col className={'toHide'} lg={1}><b>Status</b></Col>
                            <Col className={'toHide'} lg={2}><b>Role</b></Col>
                        </Row>
                    </ListGroupItem>
                    {users && users.map((user, key) => {
                        return <UserRow activateUser={true} key={key} user={user} activate={this._activate} deleteUser={this._deleteModal}/>
                    })}
                    <ListGroupItem>
                        <PaginationUsers name={'Users'} current_page={current_page} last_page={last_page} total_users={total_users} pg={this._pg}/>
                    </ListGroupItem>
                </ListGroup>
            </Layout>
        )
    }
}