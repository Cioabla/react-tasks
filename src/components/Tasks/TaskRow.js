import React, {Component, Fragment} from 'react';
import {ListGroupItem,ListGroupItemHeading,ListGroupItemText,Button,Row,Col} from 'reactstrap';

export default class TaskRow extends Component{
    _edit = (task) => {
        const {edit} = this.props;

        edit && edit(task);
    };

    _status = status => {
        switch (status){
            case 0:
                return 'assigned';
            case 1:
                return 'in progress';
            case 2:
                return 'not done';
            case 3:
                return 'done';
            default:
                return 'unknown'
        }
    };

    _deleteTask = (task) => {
        const {deleteTask} = this.props;

        deleteTask && deleteTask (task);
    };

    _userName = (task) => {
        if(task) {
            return task.name;
        }else {
            return 'The user has been deleted';
        }
    };

    _taskColor = () => {
        const {task,color} = this.props;
        let admin = false;

        if(sessionStorage.getItem('role') === '1')
        {
            admin = true;
        }


        if(color % 2 === 0)
        {
            return <Fragment>
                <ListGroupItem className={'task-list-group-item'}>
                    <ListGroupItemHeading className={'header-task-list'}>
                        <Row>
                            <Col lg={4}>
                                <p className={'left'}><b>Name: </b>{task.name}</p>
                            </Col>
                            <Col className={'center'} lg={4}>
                                <p><b>Status: </b>{this._status(task.status)}</p>
                            </Col>
                            <Col lg={4}>
                                <p className={'right'}><b>Created by: </b>{this._userName(task.user)}</p>
                            </Col>
                        </Row>
                    </ListGroupItemHeading>
                    <ListGroupItemText>
                        {task.description}
                    </ListGroupItemText>
                    <ListGroupItemHeading className={'footer-task-list'}>
                        <div className={'left'}>
                            <Button onClick={() => this._edit(task)} className={'task-button-edit'} color={'success'}>Edit</Button>
                            {admin && <Button onClick={() => this._deleteTask(task)} className={'task-button-delete'} color={'danger'}>Delete</Button>}
                        </div>
                        <p className={'right'}><b>Assign to: </b>{this._userName(task.assign)}</p>
                    </ListGroupItemHeading>
                </ListGroupItem>
            </Fragment>
        } else {
            return <Fragment>
                <ListGroupItem active className={'task-list-group-item'}>
                    <ListGroupItemHeading className={'header-task-list'}>
                        <Row>
                            <Col lg={4}>
                                <p className={'left'}><b>Name: </b>{task.name}</p>
                            </Col>
                            <Col className={'center'} lg={4}>
                                <p><b>Status: </b>{this._status(task.status)}</p>
                            </Col>
                            <Col lg={4}>
                                <p className={'right'}><b>Created by: </b>{this._userName(task.user)}</p>
                            </Col>
                        </Row>
                    </ListGroupItemHeading>
                    <ListGroupItemText>
                        {task.description}
                    </ListGroupItemText>
                    <ListGroupItemHeading className={'footer-task-list'}>
                        <div className={'left'}>
                            <Button onClick={() => this._edit(task)} className={'task-button-edit'} color={'success'}>Edit</Button>
                            {admin && <Button onClick={() => this._deleteTask(task)} className={'task-button-delete'} color={'danger'}>Delete</Button>}
                        </div>
                        <p className={'right'}><b>Assign to: </b>{this._userName(task.assign)}</p>
                    </ListGroupItemHeading>
                </ListGroupItem>
            </Fragment>
        }
    };

    render() {
        return (
            this._taskColor()
        )
    }
}