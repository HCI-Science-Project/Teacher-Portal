import Head from 'next/head';
import axios from 'axios';
import React, { Component } from 'react';
import { Segment, Header, Container, Icon, Input, Button } from 'semantic-ui-react';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: {},
			output: '',
		};
	}

	async componentDidMount() {
		if (localStorage.getItem('userInfo') !== null) {
			await this.setState({
				userData: JSON.parse(localStorage.getItem('userInfo')),
			});

			if (!this.state.userData.email.endsWith('hci.edu.sg') && !this.state.userData.email.endsWith('student.hci.edu.sg')) {
				this.setState({
					output: 'You are not authorized to view this page!',
				});
			}
		}
		if (localStorage.getItem('userInfo') === null) {
			window.location.href = '/Teacher-Portal';
		}
	}

	logout() {
		localStorage.removeItem('userInfo');
		window.location.href = '/Teacher-Portal'; // careful I'm hardcoding this so it doesn't work on the dev server
	}

	render() {
		return (
			<Container style={{
				paddingTop: '50px',
			}}>
				<Head>
					<title>Home</title>
				</Head>
				<Header as='h1'>Welcome {this.state.userData.name}!</Header>
				<p>{this.state.output}</p>
				<Button negative fluid onClick={() => this.logout()}>Logout</Button>
			</Container>
		);
	}
}

export default App;