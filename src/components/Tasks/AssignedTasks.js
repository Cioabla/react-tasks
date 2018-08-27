import React, {Component} from 'react';
import Layout from "../Misc/Layout";
import axios from "axios/index";
import TaskRow from "./TaskRow";
import '../../css/Tasks.css';
import PaginationUsers from "../Users/PaginationUsers";
import {ListGroup,ListGroupItem,Button,Modal,ModalFooter,ModalHeader,ModalBody,Form,FormGroup,Label,Input} from 'reactstrap';


export default class AssignedTasks extends Component{
    state = {
        tasks: [],
        usersField: [],
        id: false,
        open: false,
        name: '',
        description: '',
        assign: '',
        status: '',
        shouldRerender: false,
        current_page: '',
        last_page: '',
        total_tasks: '',
        openModalDelete: false
    };

    async componentDidMount() {
        if(sessionStorage.getItem('token'))
        {
            let tasks = await axios.get(process.env.REACT_APP_API_URL + 'tasks/user-assigned-tasks');
            let users = await axios.get(process.env.REACT_APP_API_URL + 'users');

            if (tasks && tasks.data && tasks.data.data) {

                this.setState({
                    tasks: tasks.data.data.data,
                    current_page: tasks.data.data.current_page,
                    last_page: tasks.data.data.last_page,
                    total_tasks: tasks.data.data.total
                });

            } else {
                this.props.history.push('/error')
            }

            if (users && users.data && users.data.data) {

                this.setState({
                    usersField: users.data.data,
                });

            } else {
                this.props.history.push('/error')
            }
        }
    }

    async componentDidUpdate() {
        const {current_page} = this.state;

        if (this.state.shouldRerender) {
            let tasks = await axios.get(process.env.REACT_APP_API_URL + `tasks/user-assigned-tasks?page=${current_page}`);

            if (tasks && tasks.data && tasks.data.data) {

                this.setState({
                    tasks: tasks.data.data.data,
                    current_page: tasks.data.data.current_page,
                    last_page: tasks.data.data.last_page,
                    total_tasks: tasks.data.data.total,
                    shouldRerender: false
                });

            } else {
                this.props.history.push('/error')
            }

        }
    }

    _onChange = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    };

    _toggle = () => {
        this.setState({
            open: !this.state.open
        });
    };

    _taskAction = async () => {
        const {name, description, assign , id , status} = this.state;

        const data = {
            name, description , assign
        };

        let res;

        if (id) {
            data.status = status;
            res = await axios.patch(process.env.REACT_APP_API_URL + `task/${id}`, data);
        } else {
            res = await axios.post(process.env.REACT_APP_API_URL + `task`, data);
        }

        if (res && res.data && res.data.responseType === 'success') {
            this.setState({
                shouldRerender: true,
                open: false
            });
        }
    };

    _edit = (task) => {
        this.setState({
            id: task.id,
            name: task.name,
            description: task.description,
            status: task.status,
            assign: this._assignLabel(task.assign),
            open: true
        });
    };

    _add = () => {
        this.setState({
            id: false,
            name: '',
            description: '',
            assign: '',
            open: true
        });
    };

    _assignLabel = (assign) => {
        if(assign)
        {
            return assign.id
        }else
        {
            return ''
        }
    };

    _deleteModal = (task) => {
        this.setState({openModalDelete: true,id:task.id,name:task.name})
    };


    _usersSelect = (user,key) => {
        return  <option key={key} value={user.id}>{user.name}</option>;
    };

    _pg = (page) => {
        this.setState({current_page: page , shouldRerender: true})
    };

    _toggleDelete = () => {
        this.setState({
            openModalDelete: !this.state.openModalDelete
        });
    };

    _deleteTask = async () => {
        const {id} = this.state;

        let res = await axios.delete(process.env.REACT_APP_API_URL + `task/${id}`);

        if (res && res.data && res.data.responseType === 'success') {
            this.setState({
                shouldRerender: true,
                openModalDelete:false
            });
        }
    };

    render() {
        const {tasks,id,usersField,current_page,last_page,total_tasks} = this.state;

        return (
            <Layout title={'Your assigned tasks'}>
                <Modal isOpen={this.state.openModalDelete} toggle={this._toggleDelete}>
                    <ModalHeader toggle={this._toggleDelete}>Delete</ModalHeader>
                    <ModalBody>
                        <h3>You're sure you want to delete the user <b>{this.state.name}</b></h3>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this._deleteTask}>Delete</Button>
                        <Button color="secondary" onClick={this._toggleDelete}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.open} toggle={this._toggle}>
                    <ModalHeader toggle={this._toggle}>{id ? 'Edit task' : 'Add task'}</ModalHeader>
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
                                <Label for="description">Description</Label>
                                <Input type="textarea"
                                       rows="4"
                                       name="description"
                                       id="description"
                                       placeholder="Description"
                                       value={this.state.description}
                                       onChange={this._onChange}/>
                            </FormGroup>
                            {id && <FormGroup>
                                <Label for="status">Status</Label>
                                <Input type="select"
                                       name="status"
                                       id="status"
                                       onChange={this._onChange}
                                       value={this.state.status}>
                                    <option value={0}>Assigned</option>
                                    <option value={1}>In progress</option>
                                    <option value={2}>Not done</option>
                                    <option value={3}>Done</option>
                                </Input>
                            </FormGroup>}
                            <FormGroup>
                                <Label for="assign">Assign to</Label>
                                <Input type="select"
                                       name="assign"
                                       id="assign"
                                       onChange={this._onChange}
                                       value={this.state.assign}>
                                    <option value={''}>Select</option>
                                    {usersField && usersField.map((user, key) => {
                                        return this._usersSelect(user,key)
                                    })}
                                </Input>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this._taskAction}>{id ? 'Edit task' : 'Add task'}</Button>
                        <Button color="secondary" onClick={this._toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <ListGroup>
                    <ListGroupItem className={'tasks-inherit'} color="success">
                        <Button className={'button-add-tasks right-btn'} color="primary" onClick={this._add}>Add task</Button>
                        <PaginationUsers name={'Tasks'} isFilter={false} current_page={current_page} last_page={last_page} total_users={total_tasks} pg={this._pg}/>
                    </ListGroupItem>
                    {tasks && tasks.map((task, key) => {
                        return <TaskRow color={key} edit={this._edit} deleteTask={this._deleteModal} key={key} task={task}/>
                    })}
                </ListGroup>
            </Layout>
        )
    }
}