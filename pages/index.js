/* global google */
import Head from 'next/head';
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
			output: '',
		};
		this.handleCredentialResponse = this.handleCredentialResponse.bind(this);
	}

	parseJWT(token) {
		const base64Url = token.split('.')[1];
		const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
			return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
		}).join(''));

		return JSON.parse(jsonPayload);
	}

	async handleCredentialResponse(response) {

		console.log('Encoded JWT ID token: ' + response.credential);

		this.setState({ JWT: response.credential });
		this.setState({ userInfo: this.parseJWT(response.credential) });

		console.log(this.state.userInfo);

		localStorage.setItem('userInfo', JSON.stringify(this.state.userInfo));
		if (localStorage.getItem('userInfo') !== null) {
			window.location.href = './home';
		}
	}

	componentDidMount() {
		if (localStorage.getItem('userInfo') !== null) {
			window.location.href = './home';
		}
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
		}, 1750);
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
						<Header as='h3'>{this.state.output}</Header>
					</Segment>
				</Container>
			</>
		);
	}
}

export default App;
