import Head from 'next/head';
import React, { Component } from 'react';
import { Segment, Header, Container, Icon, Input, Button } from 'semantic-ui-react';

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<>
				<Container style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '80vh',
					background-color: '#0C0404',
				}}>
					<Segment raised style={{
						padding: '110px',
						width: '100vh',
					}}>

						<Header as='h1'>Login to the Teacher Portal</Header>

						<Container style={{
							paddingTop: '30px',
							background-color: '#808080',
						}}>
							<Input iconPosition='left' placeholder='Email' fluid>
								<Icon name='at' />
								<input />
							</Input>
							<Input placeholder='Password' fluid style={{
								paddingTop: '30px',
								paddingBottom: '30px',
								background-color: '#B6B6B4'
							}} />
							<Button positive fluid>Login</Button>
						</Container>
					</Segment>
				</Container>
			</>
		);
	}
}

export default App;
