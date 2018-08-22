import React, {Component} from 'react';
import {ListGroupItem,ListGroupItemHeading,ListGroupItemText,Button} from 'reactstrap';

export default class TaskRow extends Component{
    _edit = (task) => {
        const {edit} = this.props;

        edit && edit(task);
    };

    render() {
        const {task} = this.props;

        return (
            <ListGroupItem className={'task-list-group-item'} color={'info'}>
                <ListGroupItemHeading className={'header-task-list'}>
                    <p className={'left'}><b>Name: </b>{task.name}</p>
                    <p className={'right'}><b>Created by: </b>{task.user.name}</p>
                </ListGroupItemHeading>
                <ListGroupItemText>
                    {task.description}
                </ListGroupItemText>
                <ListGroupItemHeading className={'footer-task-list'}>
                    <div className={'left'}>
                        <Button onClick={() => this._edit(task)} className={'task-button-edit'} color={'success'}>Edit</Button>
                        <Button className={'task-button-delete'} color={'danger'}>Delete</Button>
                    </div>
                    <p className={'right'}><b>Assign to: </b>{task.assign.name}</p>
                </ListGroupItemHeading>
            </ListGroupItem>
        )
    }
}