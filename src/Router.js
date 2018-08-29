import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './components/Home/Home';
import Users from './components/Users/Users';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgotPassword from './components/Auth/ForgotPassword';
import ChangePassword from './components/Auth/ChangePassword';
import ToDoList from './components/ToDoList/ToDoList';
import InactiveUsers from "./components/Users/InactiveUsers";
import Error from "./components/Errors/Error";
import Tasks from "./components/Tasks/Tasks";
import UserTasks from "./components/Tasks/UserTasks";
import StartedTasks from "./components/Tasks/StartedTasks";
import AssignedTasks from "./components/Tasks/AssignedTasks";
import Log from './components/Log';
import TaskDetails from "./components/Tasks/TaskDetails";

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/users" component={Users}/>
                    <Route exact path="/users/inactive" component={InactiveUsers}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/forgot-password" component={ForgotPassword}/>
                    <Route exact path="/change-password" component={ChangePassword}/>
                    <Route exact path="/to-do-list" component={ToDoList}/>
                    <Route exact path="/tasks" component={Tasks}/>
                    <Route exact path="/tasks/user-tasks" component={UserTasks}/>
                    <Route exact path="/tasks/started-tasks" component={StartedTasks}/>
                    <Route exact path="/tasks/assigned-tasks" component={AssignedTasks}/>

                    <Route path="/task/:id" component={TaskDetails} />

                    <Route exact path="/tasks-history" component={Log}/>
                    <Route exact path="/error" component={Error}/>
                </Switch>
            </BrowserRouter>
        );
    }
}
