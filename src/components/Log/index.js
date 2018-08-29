import React, {Component} from 'react';
import Layout from "../Misc/Layout";
import axios from "axios/index";
import './LogsRow';
import LogsRow from "./LogsRow";
import {ListGroupItem,Row,Col} from 'reactstrap';
import '../../css/Logs.css';
import PaginationUsers from "../Users/PaginationUsers";

export default class Log extends Component{
    state = {
        logs: [],
        current_page: '',
        last_page: '',
        total_logs: '',
        shouldRerender: false

    };

    async componentDidMount() {
        if(sessionStorage.getItem('role') === '1')
        {
            let logs = await axios.get(process.env.REACT_APP_API_URL + 'logs');

            if (logs && logs.data && logs.data.data) {

                this.setState({
                    logs: logs.data.data.data,
                    current_page: logs.data.data.current_page,
                    last_page: logs.data.data.last_page,
                    total_logs: logs.data.data.total
                });

            } else {
                this.props.history.push('/error')
            }

        }
    }

    async componentDidUpdate() {
        const {current_page} = this.state;

        if (this.state.shouldRerender) {
            let logs = await axios.get(process.env.REACT_APP_API_URL + `logs?page=${current_page}`);

            if (logs && logs.data && logs.data.data) {

                this.setState({
                    logs: logs.data.data.data,
                    current_page: logs.data.data.current_page,
                    last_page: logs.data.data.last_page,
                    total_tasks: logs.data.data.total,
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

    render() {
        const {logs,current_page,last_page,total_logs} = this.state;


        return (
            <Layout title={'Tasks history'}>
                <ListGroupItem className={'toHideLogs'} color="success">
                    <Row>
                        <Col sm={1}>
                            <b>ID</b>
                        </Col>
                        <Col sm={2}>
                            <b>Task name</b>
                        </Col>
                        <Col sm={3}>
                            <b>Change by</b>
                        </Col>
                        <Col sm={2}>
                            <b>Type</b>
                        </Col>
                        <Col sm={2}>
                            <b>From</b>
                        </Col>
                        <Col sm={2}>
                            <b>To</b>
                        </Col>
                    </Row>
                </ListGroupItem>
                {logs && logs.map((log, key) => {
                    return <LogsRow key={key} log={log} key_color={key}/>
                })}
                <ListGroupItem className={'toHideLogs'} color="success">
                    <PaginationUsers name={'Total'} isFilter={false} current_page={current_page} last_page={last_page} total_users={total_logs} pg={this._pg}/>
                </ListGroupItem>
            </Layout>
        )
    }
}