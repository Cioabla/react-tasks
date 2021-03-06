import React , {Component} from 'react';
import {Container, InputGroup , Input , Button} from 'reactstrap';
import axios from "axios/index";
import {Link,Redirect} from 'react-router-dom';

export default class ChangePassword extends Component {
    state = {
        email: '',
        code: '',
        password: '',
        error: false,
    };

    _onChange = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    };

    _sendRequest = async () => {
        const {email , code , password} = this.state;

        const response = await axios.post(process.env.REACT_APP_API_URL + 'change-password', {
            email , code , password
        });

        if (response && response.data && response.data.responseType === 'success') {
            this.props.history.push('/login');
        } else if (response && response.data && response.data.errorMessage) {
            this.setState({error: response.data.errorMessage})
        } else {
            this.setState({error: 'Something is wrong! \n' +
                'Please try again or come back later'})
        }
    };

    render() {
        const {email , error , code , password} = this.state;

        if (sessionStorage.getItem('token')) {
            return <Redirect to={'/'}/>
        }

        return (
            <Container className={'authContainer'}>
                <div className={'containerHeader'}>
                    <h3 className={'titleHeader'}>CHANGE PASSWORD</h3>
                </div>
                <InputGroup>
                    <Input type={'text'} name={'email'} value={email} onChange={this._onChange} placeholder="Email" />
                </InputGroup>
                <br />
                <InputGroup>
                    <Input  className={'code'} type={'text'} name={'code'} value={code} onChange={this._onChange} placeholder="Code" />
                </InputGroup>
                <br />
                <InputGroup>
                    <Input  className={'password'} type={'password'} name={'password'} value={password} onChange={this._onChange} placeholder="Password" />
                </InputGroup>
                <br />
                {error && <h2 className={"errMessage"}>{error}</h2>}
                <Button onClick={this._sendRequest} color="success">Send</Button>
                <Link className={'signUp-redirect'} to={'/login'}><Button className={'signUP'} color="success">Sign in</Button></Link>
            </Container>
        )
    }
}