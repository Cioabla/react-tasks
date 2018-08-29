import React, {Component} from 'react';
import Layout from "../Misc/Layout";

export default class TaskDetails extends Component{
    render() {
        const { match: { params } } = this.props;

        return (
            <Layout title={'Task'}>
                <h2>ID: {params.id}</h2>
            </Layout>
        )
    }
}