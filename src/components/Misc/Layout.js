import React, {Component} from 'react';
import Header from './Header';
import Footer from './Footer';
import {Redirect,Link} from "react-router-dom";
import axios from 'axios';
import qs from 'qs';
import {Row,Col,ListGroup,ListGroupItem} from 'reactstrap';
import '../../css/Layout.css';
import {Icon} from 'react-fa'

export default class Layout extends Component {
    _showRole = role => {
        switch (role) {
            case '1':
                return 'Admin';
            case '2':
                return 'User';
            default:
                return 'Unknown'
        }
    };


    render() {

        if (!sessionStorage.getItem('token')) {
            return <Redirect to={'/login'}/>
        }

        axios.interceptors.request.use((request) => {
            if (request.data && request.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
                request.data = qs.stringify(request.data);
            }
            return request;
        });

        axios.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.getItem('token');

        let admin = false;

        if(sessionStorage.getItem('role') === '1')
        {
            admin = true;
        }

        return (
            <div className={'layout'}>
                <Header/>
                <div className={'main-container'}>
                    <Row className={'main-container'}>
                        <Col lg="2" className={'leftContainer main-container'}>
                            <Col className={'leftContainerDivTitle'} lg='12'>
                                <p className={'leftContainerTitle'}>{this._showRole(sessionStorage.getItem('role'))} {sessionStorage.getItem('name')}</p>
                            </Col>
                            <Col className={'leftContainerDivTitle'} lg='12'>
                                <ListGroup className={'list'}>
                                    <ListGroupItem className={'listTitle'}>MAIN NAVIGATION</ListGroupItem>
                                    <Link to={'/to-do-list'}><ListGroupItem className={'list-element'}><Icon className={'icon'} name='spinner'/>TO DO LIST</ListGroupItem></Link>
                                    {admin && <Link to={'/users'}><ListGroupItem className={'list-element'}><Icon className={'icon'} name='users'/>All Users</ListGroupItem></Link>}
                                    <Link to={'/tasks'}><ListGroupItem className={'list-element'}><Icon className={'icon'} name='tasks'/>All tasks</ListGroupItem></Link>
                                </ListGroup>
                            </Col>
                        </Col>
                        <Col lg="10" className={'rightContainer'}>
                            <div className={'dashboard'}>
                                <div className={'dashboard-header'}><p>Dashboard -> {this.props.title}</p></div>
                                <div className={'dashboard-body'}>{this.props.children}</div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <Footer/>
            </div>
        );
    }
}