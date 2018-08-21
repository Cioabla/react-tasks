import React, {Component} from 'react';
import axios from 'axios';

import {InputGroup,Input,Button,Container} from 'reactstrap';


export default class Login extends Component {
    state = {
        email: '',
        password: '',
        error: false
    };

    _onChange = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    };

    _login = async () => {
        const {email, password} = this.state;

        const response = await axios.post('http://api-tasks-react/v1/login', {
            email, password
        });

        if (response && response.data && response.data.data) {
            sessionStorage.setItem('token', response.data.data.jwt);
            sessionStorage.setItem('name', response.data.data.user.name);
            sessionStorage.setItem('role', response.data.data.user.role_id);
            sessionStorage.setItem('id', response.data.data.user.id);

            this.props.history.push('/');
        } else if (response && response.data && response.data.errorMessage) {
            this.setState({error: response.data.errorMessage})
        } else {
            this.setState({error: 'Something is wrong! \n' +
                'Please try again or come back later'})
        }
    };

    _redirectRegister = () => {
        this.props.history.push('/register');
    };

    render() {
        const {email, password,error} = this.state;

        if(sessionStorage.getItem('token'))
        {
            this.props.history.push('/users');
        }

        return (
            <Container className={'authContainer'}>
                <div className={'containerHeader'}>
                    <h3 className={'titleHeader'}>LOGIN</h3>
                </div>
                <InputGroup>
                    <Input type={'text'} name={'email'} value={email} onChange={this._onChange} placeholder="Email" />
                </InputGroup>
                <br />
                <InputGroup>
                    <Input  className={'inputPassword'} type={'password'} name={'password'} value={password} onChange={this._onChange} placeholder="Password" />
                </InputGroup>
                <br />
                <div>
                    <a className={'forgotPassword'} href={'/forgot-password'}><small>Forgot password</small></a>
                </div>
                <br/>
                {error && <h2 className={"errMessage"}>{error}</h2>}
                <Button onClick={this._login} color="success">Sign in</Button>
                <Button onClick={this._redirectRegister} className={'signUP'} color="success">Sign up</Button>
            </Container>
        )
    }
}
