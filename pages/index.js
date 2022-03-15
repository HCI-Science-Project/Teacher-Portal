/* global google */
import Head from 'next/head';
import * as jwt from 'jwt-simple';
import Script from 'next/script';
import axios from 'axios';
import React, { Component } from 'react';
import { Segment, Header, Container, Icon, Input, Button } from 'semantic-ui-react';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			JWT: '',
			gsiRes: '',
			userInfo: {},
		};
		this.handleCredentialResponse = this.handleCredentialResponse.bind(this);
	}

	parseJWT(key, secret) {
		let decodedJwt;
		try {
			decodedJwt = jwt.decode(key, secret);
		}
		catch (err) {
			// nothing
		}
		return decodedJwt;
	}

	async handleCredentialResponse(response) {
		/**
	{
   "web":{
      "client_id":"790718621561-40q6f32jb9l4ug1iv4bjdgmbgbrtsub5.apps.googleusercontent.com",
      "project_id":"fit-pathway-344209",
      "auth_uri":"https://accounts.google.com/o/oauth2/auth",
      "token_uri":"https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs",
      "client_secret":"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",
      "javascript_origins":[
      	"https://hci-science-project.github.io",
        "http://localhost",
        "http://localhost:3000"
      ]
   	}
}
		 */
		const rawRes = await axios.get('https://www.googleapis.com/oauth2/v1/certs');
		const certs = rawRes.data;
		const certKeys = Object.keys(certs);
		const cert = '-----BEGIN CERTIFICATE-----\nMIIDJjCCAg6gAwIBAgIIJMUg7I+7qIswDQYJKoZIhvcNAQEFBQAwNjE0MDIGA1UE\nAwwrZmVkZXJhdGVkLXNpZ25vbi5zeXN0ZW0uZ3NlcnZpY2VhY2NvdW50LmNvbTAe\nFw0yMjAzMDQxNTIxNDBaFw0yMjAzMjEwMzM2NDBaMDYxNDAyBgNVBAMMK2ZlZGVy\nYXRlZC1zaWdub24uc3lzdGVtLmdzZXJ2aWNlYWNjb3VudC5jb20wggEiMA0GCSqG\nSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCtfO33GkoLW+pu1Wb5cmLbKzX/gtqJEoGE\nE3JRO1MFl52Am2vddTpJKiXwcQPDMC49vdw4MAGvTCk2YQYWDt1xIvpA5JJveye2\n+yJirFRcgWcWkAYwQDZLNyicUt0Bos0oBfVPgXURTnS/bQQhkXFZ1HyxnQKWs6uL\nE9/9NHaFGiqLK+ukTJ5XHFZq1p7YM9OaB5OZ1qc8AqOylH2IXjESlGijYwpQYYwM\nNm8UlJKUvUF3bpJtcQdi+fia44ta5qujhVrYdQ+d8NckQ88CvYxqDWxuIQyCOzQV\nSV8mST+hmvwYQ6fLhM6WEaYmas8KS6caPfICbA6YNQumNGKGSeSnAgMBAAGjODA2\nMAwGA1UdEwEB/wQCMAAwDgYDVR0PAQH/BAQDAgeAMBYGA1UdJQEB/wQMMAoGCCsG\nAQUFBwMCMA0GCSqGSIb3DQEBBQUAA4IBAQBrTj3aIRxbH2QRlEgc/ZqMTQuOXqud\nd2CgMNoyTGO+uvMStHnLDIA6G31rN9mBFPrrCX4fbXsEcnw8diiyRMtk/H+MgbP5\nv4B0foDWkzzK9yG9JPS8uD60h7YSv/13flYHBvhG+lr5/nJEf1RNUo8gzGVNyEag\nLf1v/gMLLtqqvnTA7j9bu+ltj3WaD7nEd+MYgbUWDmfsbZJ8pEpSq+11c8OveEcB\naVlMcPw7zIJieAKTxmabcZsQYjEjU1CcWtuzzs2mnHy44Ow24REeZg5wzU0ZRI01\nnjfiSqbA4lUPd6X5cHPOpt7cFcnVElHWoiroQi38+BWWBunw/hl5/2Qy\n-----END CERTIFICATE-----\n';

		console.log('Encoded JWT ID token: ' + response.credential);

		this.setState({ JWT: response.credential });
		this.setState({ userInfo: this.parseJWT(response.credential, cert) });

		console.log(this.state.userInfo);
		this.updateOutput();
	}

	componentDidMount() {
		const script = document.createElement('script');
		script.src = 'https://accounts.google.com/gsi/client';
		script.async = true;
		script.defer = true;
		document.body.appendChild(script);

		setTimeout(() => {
			google.accounts.id.initialize({
				client_id: '790718621561-40q6f32jb9l4ug1iv4bjdgmbgbrtsub5.apps.googleusercontent.com',
				callback: this.handleCredentialResponse,
			});
			google.accounts.id.renderButton(
				document.getElementById('buttonDiv'),
				{ theme: 'outline', size: 'large' }, // customization attributes
			);
			google.accounts.id.prompt();
		}, 1000);
	}


	updateOutput = () => {
		if ((this.state.userInfo.email.endsWith('hci.edu.sg') /* && !this.state.userInfo.email.endsWith('student.hci.edu.sg') */) || this.state.userInfo.email === 'mrgeek484@gmail.com') {
			this.setState({ output: `Welcome, ${this.state.userInfo.name}` });
		}
	}

	render() {
		return (
			<>
				<Head>
					<meta name='google-signin-client_id" content="554823153885-g6qe6cqvtbrf2oico1m8ag5gkqsqupnm.apps.googleusercontent.com' />
				</Head>
				<Container style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '80vh',
				}}>
					<Segment raised style={{
						padding: '110px',
						width: '100vh',
					}}>
						<div id='buttonDiv'>Loading...</div>
						<Header as='h1'>{this.state.output}</Header>
					</Segment>
				</Container>
			</>
		);
	}
}

export default App;
