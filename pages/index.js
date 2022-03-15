/* global google */
import Head from 'next/head';
import Script from 'next/script';
import React, { Component } from 'react';
import { Segment, Header, Container, Icon, Input, Button } from 'semantic-ui-react';

class App extends Component {
	constructor(props) {
		super(props);
	}

	handleCredentialResponse(response) {
		console.log('Encoded JWT ID token: ' + response.credential);
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
					</Segment>
				</Container>
			</>
		);
	}
}

export default App;
