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

	parseJWT(token) {
		const base64Url = token.split('.')[1];
		const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
			return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
		}).join(''));

		return JSON.parse(jsonPayload);
	}

	async componentDidMount() {
		if (localStorage.getItem('userInfo') !== null) {
			await this.setState({
				userData: this.parseJWT(JSON.parse(localStorage.getItem('userInfo'))),
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