import React, {Component} from 'react';
import axios from 'axios';
import UserRow from "./UserRow";
import PaginationUsers from "./PaginationUsers";
import Layout from '../Misc/Layout';
import '../../css/Users.css';

import {ModalFooter,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    Form,
    Label,
    Input ,
    ListGroup ,
    ListGroupItem ,
    Row ,
    Col } from 'reactstrap';

export default class Users extends Component {
    state = {
        users: [],
        open: false,
        openModalDelete: false,
        id: false,
        name: '',
        email: '',
        password: '',
        role: '',
        status: '',
        shouldRerender: false,
        current_page: '',
        last_page: '',
        total_users: '',
        filter: ''
    };

    async componentDidMount() {
        if(sessionStorage.getItem('role') === '1')
        {
            let users = await axios.get(process.env.REACT_APP_API_URL + 'admin/users');

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
        const {current_page,filter} = this.state;

        const path = this._filterAction(filter);

        if (this.state.shouldRerender) {
            let users = await axios.get(path+current_page);

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

    _pg = (page) => {
        this.setState({current_page: page , shouldRerender: true})
    };

    _toggle = () => {
        this.setState({
            open: !this.state.open
        });
    };

    _toggleDelete = () => {
        this.setState({
            openModalDelete: !this.state.openModalDelete
        });
    };

    _onChange = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    };

    _onChangeFilter = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value,
            current_page: 1,
            shouldRerender: true
        });
    };

    _filterAction = filter => {
        switch (filter) {
            case '':
                return process.env.REACT_APP_API_URL + 'admin/users?page=';
            case 'Users':
                return process.env.REACT_APP_API_URL + 'admin/users/users?page=';
            case 'Admins':
                return process.env.REACT_APP_API_URL + 'admin/users/admins?page=';
            case 'Inactive':
                return process.env.REACT_APP_API_URL + 'admin/users/inactive?page=';
            case 'Active':
                return process.env.REACT_APP_API_URL + 'admin/users/active?page=';
            default:
                return 'Unknown'
        }
    };

    _userAction = async () => {
        const {name, email, password, role, id ,status} = this.state;

        const data = {
            name, email ,status
        };

        if (role !== '') {
            data.role = role;
        }

        let res;

        if (id) {
            res = await axios.patch(process.env.REACT_APP_API_URL + `admin/user/${id}`, data);
        } else {
            data.password = password;

            res = await axios.post(process.env.REACT_APP_API_URL + 'admin/user', data);
        }

        if (res && res.data && res.data.responseType === 'success') {
            this.setState({
                shouldRerender: true,
                open: false
            });
        }
    };

    _add = () => {
        this.setState({
            id: false,
            name: '',
            email: '',
            role: '',
            password: '',
            open: true
        });
    };

    _edit = (user) => {
        this.setState({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role_id,
            status: user.status,
            open: true
        });
    };

    _deleteModal = (user) => {
        this.setState({openModalDelete: true,id:user.id,name:user.name})
    };

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

    _titleAction = filter  => {
        switch (filter){
            case '':
                return 'All users';
            case 'Admins':
                return 'Admins';
            case 'Users':
                return 'Users';
            case 'Inactive':
                return 'Inactive users';
            case 'Active':
                return 'Active users';
            default:
                return 'Unknown'
        }
    };

    render() {
        const {users, id , current_page , last_page, total_users , filter} = this.state;

        return (
            <Layout title={this._titleAction(filter)}>
                <Modal isOpen={this.state.open} toggle={this._toggle}>
                    <ModalHeader toggle={this._toggle}>{id ? 'Edit user' : 'Add user'}</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input type="text"
                                       name="name"
                                       id="name"
                                       placeholder="Name"
                                       value={this.state.name}
                                       onChange={this._onChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="email"
                                       name="email"
                                       id="email"
                                       placeholder="Email"
                                       value={this.state.email}
                                       onChange={this._onChange}/>
                            </FormGroup>
                            {id && <FormGroup>
                                <Label for="status">Status</Label>
                                <Input type="select"
                                       name="status"
                                       id="status"
                                       value={this.state.status}
                                       onChange={this._onChange}>
                                    <option value={''}>Select</option>
                                    <option value={0}>Off</option>
                                    <option value={1}>On</option>
                                </Input>
                            </FormGroup>}
                            {!id && <FormGroup>
                                <Label for="password">Password</Label>
                                <Input type="password"
                                       name="password"
                                       id="password"
                                       placeholder="Password"
                                       value={this.state.password}
                                       onChange={this._onChange}/>
                            </FormGroup>}
                            <FormGroup>
                                <Label for="role">Select</Label>
                                <Input type="select"
                                       name="role"
                                       id="role"
                                       onChange={this._onChange}
                                       value={this.state.role}>
                                    <option value={''}>Select</option>
                                    <option value={1}>Admin</option>
                                    <option value={2}>User</option>
                                </Input>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this._userAction}>{id ? 'Edit user' : 'Add user'}</Button>
                        <Button color="secondary" onClick={this._toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
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
                            <Col lg={2}><Button className={'button-add'} color="primary" onClick={this._add}>Add user</Button></Col>
                        </Row>
                    </ListGroupItem>
                    {users && users.map((user, key) => {
                        return <UserRow editUsers={true} key={key} user={user} edit={this._edit} deleteUser={this._deleteModal}/>
                    })}
                    <ListGroupItem className={'user-inherit'}>
                            <PaginationUsers name={'Users'} isFilter={true} current_page={current_page} last_page={last_page} total_users={total_users} filter={filter} pg={this._pg} onChangeFilter={this._onChangeFilter}/>
                    </ListGroupItem>
                </ListGroup>
            </Layout>
        )
    }
}
