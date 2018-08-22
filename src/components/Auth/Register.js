import React, {Component} from 'react';
import axios from 'axios';
import {InputGroup,Input,Button,Container} from 'reactstrap';
import {Link,Redirect} from 'react-router-dom';

export default class Register extends Component {
    state = {
        email: '',
        password: '',
        name: '',
        password2: '',
        error: false
    };

    _onChange = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    };

    _register = async () => {
        const {email, password , name , password2} = this.state;

        if(password !== password2)
        {
            this.setState({error: '\n' +
                'Write the same password in both password fields'});
        }else {
            const response = await axios.post('http://api-tasks-react/v1/register', {
                email, password , name
            });

            if (response && response.data && response.data.responseType === 'success') {
                this.props.history.push('/login');
            } else if (response && response.data && response.data.errorMessage) {
                this.setState({error: response.data.errorMessage})
            } else {
                this.setState({error: 'Something is wrong! \n' +
                    'Please try again or come back later'})
            }
        }
    };

    render() {
        const {email, password , name , password2 ,error} = this.state;

        if (sessionStorage.getItem('token')) {
            return <Redirect to={'/'}/>
        }

        return (
            <Container className={'authContainer'}>
                <div className={'containerHeader'}>
                    <h3 className={'titleHeader'}>REGISTER</h3>
                </div>
                <InputGroup>
                    <Input type={'text'} name={'name'} value={name} onChange={this._onChange} placeholder="Name" />
                </InputGroup>
                <br />
                <InputGroup>
                    <Input type={'text'} name={'email'} value={email} onChange={this._onChange} placeholder="Email" />
                </InputGroup>
                <br />
                <InputGroup>
                    <Input type={'password'} name={'password'} value={password} onChange={this._onChange} placeholder="Password" />
                </InputGroup>
                <br />
                <InputGroup>
                    <Input type={'password'} name={'password2'} value={password2} onChange={this._onChange} placeholder="Rewrite the password" />
                </InputGroup>
                <br/>
                {error && <h2 className={"errMessage"}>{error}</h2>}
                <Button onClick={this._register} color="success">Sign up</Button>
                <Link className={'signUp-redirect'} to={'/login'}><Button className={'signUP'} color="success">Sign in</Button></Link>
            </Container>
        )
    }
}