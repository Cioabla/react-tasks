import React, {Component} from 'react';
import Layout from "../Misc/Layout";
import axios from "axios/index";
import TaskRow from "./TaskRow";
import '../../css/Tasks.css';
import {ListGroup,ListGroupItem,Row,Col,Button,Modal,ModalFooter,ModalHeader,ModalBody,Form,FormGroup,Label,Input} from 'reactstrap';

export default class Tasks extends Component{
    state = {
      tasks: [],
        id: false,
        open: false,
        name: '',
        description: '',
        assign: '',
        status: '',
        shouldRerender: false
    };

    async componentDidMount() {
        if(sessionStorage.getItem('token'))
        {
            let tasks = await axios.get('http://api-tasks-react/v1/tasks');

            if (tasks && tasks.data && tasks.data.data) {

                this.setState({
                    tasks: tasks.data.data.data,
                });

            } else {
                this.props.history.push('/error')
            }
        }
    }

    async componentDidUpdate() {
        if (this.state.shouldRerender) {
            let tasks = await axios.get('http://api-tasks-react/v1/tasks');

            if (tasks && tasks.data && tasks.data.data) {

                this.setState({
                    tasks: tasks.data.data.data,
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
            name, description
        };

        let res;

        if (id) {
            data.status = status;
            res = await axios.patch(`http://api-tasks-react/v1/task/${id}`, data);
        } else {
            res = await axios.post(`http://api-tasks-react/v1/task`, data);
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
            assign: task.assign,
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

    render() {
        const {tasks,id} = this.state;

        return (
            <Layout title={'Tasks'}>
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
                                    <option value={5}>Eu</option>
                                    <option value={8}>Radu</option>
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
                    <ListGroupItem color="success">
                        <Row>
                            <Col lg={1}><b>Legend: </b></Col>
                            <Col lg={3}><p><b>Color blue: active</b></p></Col>
                            <Col lg={3}><p><b>Color white: inactive</b></p></Col>
                            <Col lg={3}/>
                            <Col lg={2}><Button className={'button-add'} color="primary" onClick={this._add}>Add task</Button></Col>
                        </Row>
                    </ListGroupItem>
                    {tasks && tasks.map((task, key) => {
                        return <TaskRow edit={this._edit} key={key} task={task}/>
                    })}
                </ListGroup>
            </Layout>
        )
    }
}