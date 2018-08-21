import React, {Component} from 'react';
import Layout from "../Misc/Layout";

export default class Error extends Component{
    render() {
        return (
            <Layout title={'Error'}>
                <h2>Ooops , something is wrong! Please try again or come back later.</h2>
            </Layout>
        )
    }
}