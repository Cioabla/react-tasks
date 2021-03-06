import React , {Component} from 'react';
import {Container, InputGroup , Input , Button} from 'reactstrap';
import axios from "axios/index";
import {Link,Redirect} from 'react-router-dom';

export default class ForgotPassword extends Component {
    state = {
        email: '',
        error: false,
    };

    _onChange = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    };

    _sendRequest = async () => {
        const {email} = this.state;

        const response = await axios.post(process.env.REACT_APP_API_URL + 'forgot-password', {
            email
        });

        if (response && response.data && response.data.responseType === 'success') {
            this.props.history.push('/change-password');
        } else if (response && response.data && response.data.errorMessage) {
            this.setState({error: response.data.errorMessage})
        } else {
            this.setState({error: 'Something is wrong! \n' +
                'Please try again or come back later'})
        }
    };

    render() {
        const {email , error} = this.state;

        if (sessionStorage.getItem('token')) {
            return <Redirect to={'/'}/>
        }

        return (
            <Container className={'authContainer'}>
                <div className={'containerHeader'}>
                    <h3 className={'titleHeader'}>FORGOT PASSWORD</h3>
                </div>
                <InputGroup>
                    <Input type={'text'} name={'email'} value={email} onChange={this._onChange} placeholder="Email" />
                </InputGroup>
                <br />
                {error && <h2 className={"errMessage"}>{error}</h2>}
                <Button onClick={this._sendRequest} color="success">Send</Button>
                <Link className={'signUp-redirect'} to={'/login'}><Button className={'signUP'} color="success">Sign in</Button></Link>
            </Container>
        )
    }
}