import React, { Component } from 'react';
import { LinkedIn } from 'react-linkedin-login-oauth2';

const queryString = require('query-string');
const axios = require('axios');

const backendApi = axios.create({
    baseURL: 'http://localhost:3010',
    withCredentials:true //this option is essential to receive the cookie from the backend
})

class CreateMentor extends Component {
    state = {
        code: '',
        errorMessage: '',
    };

    // handleMessage = (event)  => {
    //     console.log(event.origin);
    //     console.log(event.data.from)
    // }

    componentDidMount() {
        window.addEventListener('message', this.handleMessage)
    }

    handleSuccess = (data) => {
        // API call for getting access token and saving user profile
        this.setState({
            code: data.code,
            errorMessage: ''
        })
        backendApi.post('/users/register', {
            authCode: data.code
        }).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    handleFailure = (error) => {
        this.setState({
            code: '',
            errorMessage: error.errorMessage
        });
    }

    render() {
        const { code, errorMessage } = this.state;

        return  (
            <div>
                <LinkedIn
                    clientId={process.env.REACT_APP_LINKEDIN_CLIENT_ID}
                    onFailure={this.handleFailure}
                    onSuccess={this.handleSuccess}
                    redirectUri={process.env.REACT_APP_LINKEDIN_REDIRECT_URI}
                    scope='r_emailaddress r_liteprofile'
                    redirectPath='/mentors/create'
                >
                <img src='../images/linkedin-button.png' />
                </LinkedIn>
                <a href="http://localhost:3010/users/auth">Auth</a>
                {!code && <div>No code</div>}
                {code && <div>Code: {code}</div>}
                {errorMessage && <div>{errorMessage}</div>}
            </div>
        )
    }
}

export default CreateMentor;