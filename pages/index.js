import Head from 'next/head';
import React, { Component } from 'react';
import { Segment, Header, Container, Icon, Input, Button } from 'semantic-ui-react';

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<script src="https://apis.google.com/js/platform.js" async defer></script>
			<meta name="google-signin-client_id" content="554823153885-g6qe6cqvtbrf2oico1m8ag5gkqsqupnm.apps.googleusercontent.com.apps.googleusercontent.com">
			<>
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

						<Header as='h1'>Login to the Teacher Portal</Header>

						<Container style={{
							paddingTop: '30px',
						}}>
							<Input iconPosition='left' placeholder='Email' fluid>
								<Icon name='at' />
								<input />
							</Input>
							<Input placeholder='Password' fluid style={{
								paddingTop: '30px',
								paddingBottom: '30px',
							}} />
							<Button positive fluid>Login</Button>
							<div class="g-signin2" data-onsuccess="onSignIn"></div>
						</Container>
					</Segment>
				</Container>
			</>
		);
	}
}

export default App;
