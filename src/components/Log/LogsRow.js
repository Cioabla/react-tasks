import React, {Component, Fragment} from 'react';
import {ListGroupItem,Row,Col} from 'reactstrap';


export default class LogsRow extends Component{

    _taskName = (task) => {
        if(task === null){
            return 'The task was deleted'
        }else{
            return task.name
        }
    };

    _userName = (user) => {
        if(user === null){
            return 'The user was deleted'
        }else {
            return user.name
        }
    };

    _typeAction = type => {
        switch (type){
            case 0:
                return 'Status';
            case 1:
                return 'Assigned';
            default:
                return 'Unknown'
        }
    };


    _listColor = () => {
        const {key_color,log} = this.props;

        if(key_color % 2 === 0) {
            return <Fragment>
                <ListGroupItem color="info">
                    <Row>
                        <Col sm={1}>
                            <b className={'toShowLogs'}>ID</b>{log.id}
                        </Col>
                        <Col sm={2}>
                            <b className={'toShowLogs'}>Task name: </b>{this._taskName(log.task)}
                        </Col>
                        <Col sm={3}>
                            <b className={'toShowLogs'}>User name: </b>{this._userName(log.user)}
                        </Col>
                        <Col sm={2}>
                            <b className={'toShowLogs'}>Type: </b>{this._typeAction(log.type)}
                        </Col>
                        <Col sm={2}>
                            <b className={'toShowLogs'}>From: </b>{log.old_value}
                        </Col>
                        <Col sm={2}>
                            <b className={'toShowLogs'}>To: </b>{log.new_value}
                        </Col>
                    </Row>
                </ListGroupItem>
            </Fragment>
        }else {
            return <Fragment>
                <ListGroupItem color="danger">
                    <Row>
                        <Col sm={1}>
                            <b className={'toShowLogs'}>ID</b>{log.id}
                        </Col>
                        <Col sm={2}>
                            <b className={'toShowLogs'}>Task name: </b>{this._taskName(log.task)}
                        </Col>
                        <Col sm={3}>
                            <b className={'toShowLogs'}>Change by: </b>{this._userName(log.user)}
                        </Col>
                        <Col sm={2}>
                            <b className={'toShowLogs'}>Type: </b>{this._typeAction(log.type)}
                        </Col>
                        <Col sm={2}>
                            <b className={'toShowLogs'}>From: </b>{log.old_value}
                        </Col>
                        <Col sm={2}>
                            <b className={'toShowLogs'}>To: </b>{log.new_value}
                        </Col>
                    </Row>
                </ListGroupItem>
            </Fragment>
        }

    };

    render() {
        return (
            this._listColor()
        )
    }
}