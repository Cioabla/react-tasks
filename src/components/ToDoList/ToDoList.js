import React, {Component} from 'react';
import Layout from "../Misc/Layout";
import axios from "axios/index";
import inactiveUsersImg from '../../images/img_inactive_users.svg';
import inactiveTasksImg from '../../images/img_inactive_tasks.svg';
import activeTasksImg from '../../images/img_active_tasks.svg';
import '../../css/ToDoList.css';
import {Link} from 'react-router-dom';
import {Card,CardImg,CardBody,CardTitle,CardSubtitle,Button,Row,Col , CardFooter , CardHeader} from 'reactstrap';


export default class AuthError extends Component{
    state = {
        inactiveUsers: '',
        inactiveUsersCard: false,
        activeTasks: '',
        activeTasksCard: false,
        inactiveTasks: '',
        inactiveTasksCard: false
    };

    async componentDidMount() {
        if(sessionStorage.getItem('role') === '1')
        {
            let users = await axios.get(process.env.REACT_APP_API_URL + 'admin/users/inactive');

            if (users && users.data && users.data.data && users.data.data.total !== 0) {

                this.setState({
                    inactiveUsers: users.data.data.total,
                    inactiveUsersCard: true
                });
            }
        }

        let tasksInactive = await axios.get(process.env.REACT_APP_API_URL + 'tasks/user-assigned-tasks');

        if (tasksInactive && tasksInactive.data && tasksInactive.data.data && tasksInactive.data.data.total !== 0) {

            this.setState({
                inactiveTasks: tasksInactive.data.data.total,
                inactiveTasksCard: true
            });
        }

        let tasksActive =  await axios.get(process.env.REACT_APP_API_URL + 'tasks/user-in-progress-tasks');

        if (tasksActive && tasksActive.data && tasksActive.data.data && tasksActive.data.data.total !== 0) {

            this.setState({
                activeTasks: tasksActive.data.data.total,
                activeTasksCard: true
            });
        }
    }

    _cancelAction = (e) => {
        const {name} = e.target;

        this.setState({
            [name]: false
        });
    };

    render() {
        const {inactiveUsersCard, inactiveUsers , inactiveTasksCard , activeTasksCard , inactiveTasks, activeTasks} = this.state;

        return (
            <Layout title={'To Do List'}>
                <div>
                    <Row>
                        {inactiveUsersCard && <Col lg={4}>
                            <Card className={'card-to-do'}>
                                <CardHeader>Inactive users</CardHeader>
                                <CardImg className={'imgCard'} top src={inactiveUsersImg} alt="Card image cap" />
                                <CardBody>
                                    <CardTitle>{inactiveUsers}</CardTitle>
                                    <CardSubtitle>users are waiting to be enabled</CardSubtitle>
                                </CardBody>
                                <CardFooter>
                                    <Link to={'/users/inactive'}><Button color={'success'}>Go</Button></Link>
                                    <Button name={'inactiveUsersCard'} color={'danger'} onClick={this._cancelAction} className={'card-to-do-cancel'}>Cancel</Button>
                                </CardFooter>
                            </Card>
                        </Col>}
                        {activeTasksCard && <Col lg={4}>
                            <Card className={'card-to-do'}>
                                <CardHeader>Your started tasks</CardHeader>
                                <CardImg className={'imgCard'} top  src={activeTasksImg} alt="Card image cap" />
                                <CardBody>
                                    <CardTitle>{activeTasks}</CardTitle>
                                    <CardSubtitle>tasks started waiting to be continued</CardSubtitle>
                                </CardBody>
                                <CardFooter>
                                    <Link to={'/tasks/started-tasks'}><Button color={'success'}>Go</Button></Link>
                                    <Button name={'activeTasksCard'} color={'danger'} onClick={this._cancelAction} className={'card-to-do-cancel'}>Cancel</Button>
                                </CardFooter>
                            </Card>
                        </Col>}
                        {inactiveTasksCard && <Col lg={4}>
                            <Card className={'card-to-do'}>
                                <CardHeader>Your assigned tasks</CardHeader>
                                <CardImg className={'imgCard'} top  src={inactiveTasksImg} alt="Card image cap" />
                                <CardBody>
                                    <CardTitle>{inactiveTasks}</CardTitle>
                                    <CardSubtitle>tasks are waiting to be started</CardSubtitle>
                                </CardBody>
                                <CardFooter>
                                    <Link to={'/tasks/assigned-tasks'}><Button color={'success'}>Go</Button></Link>
                                    <Button name={'inactiveTasksCard'} color={'danger'} onClick={this._cancelAction} className={'card-to-do-cancel'}>Cancel</Button>
                                </CardFooter>
                            </Card>
                        </Col>}
                    </Row>
                </div>
            </Layout>
        )
    }
}