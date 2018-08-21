import React, {Component} from 'react';
import Layout from "../Misc/Layout";
import axios from "axios/index";
import inactiveUsersImg from '../../images/img_inactive_users.svg';
import inactiveTasksImg from '../../images/img_inactive_tasks.svg';
import activeTasksImg from '../../images/img_active_tasks.svg';
import '../../css/ToDoList.css';
import {Card,CardImg,CardBody,CardTitle,CardSubtitle,Button,Row,Col , CardFooter , CardHeader} from 'reactstrap';


export default class AuthError extends Component{
    state = {
        inactiveUsers: '',
        inactiveUsersCard: false
    };

    async componentDidMount() {
        if(sessionStorage.getItem('role') === '1')
        {
            let users = await axios.get('http://api-tasks-react/v1/admin/users/inactive');

            if (users && users.data && users.data.data && users.data.data.total !== 0) {

                this.setState({
                    inactiveUsers: users.data.data.total,
                    inactiveUsersCard: true
                });
            }
        }
    }

    _inactiveUserAction = () => {
        this.props.history.push('/users/inactive')
    };

    _cancelAction = () => {
        this.setState({
            inactiveUsersCard: false
        });
    };

    render() {
        const {inactiveUsersCard, inactiveUsers} = this.state;

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
                                    <Button color={'success'} onClick={this._inactiveUserAction}>Go</Button>
                                    <Button color={'danger'} onClick={this._cancelAction} className={'card-to-do-cancel'}>Cancel</Button>
                                </CardFooter>
                            </Card>
                        </Col>}
                        <Col lg={4}>
                            <Card className={'card-to-do'}>
                                <CardHeader>Your active tasks</CardHeader>
                                <CardImg className={'imgCard'} top  src={inactiveTasksImg} alt="Card image cap" />
                                <CardBody>
                                    <CardTitle>3</CardTitle>
                                    <CardSubtitle>Functionalitate in lucru</CardSubtitle>
                                </CardBody>
                                <CardFooter>
                                    <Button color={'success'}>Go</Button>
                                    <Button color={'danger'} className={'card-to-do-cancel'}>Cancel</Button>
                                </CardFooter>
                            </Card>
                        </Col>
                        <Col lg={4}>
                            <Card className={'card-to-do'}>
                                <CardHeader>Your inactive tasks</CardHeader>
                                <CardImg className={'imgCard'} top  src={activeTasksImg} alt="Card image cap" />
                                <CardBody>
                                    <CardTitle>3</CardTitle>
                                    <CardSubtitle>Functionalitate in lucru</CardSubtitle>
                                </CardBody>
                                <CardFooter>
                                    <Button color={'success'}>Go</Button>
                                    <Button color={'danger'} className={'card-to-do-cancel'}>Cancel</Button>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Layout>
        )
    }
}