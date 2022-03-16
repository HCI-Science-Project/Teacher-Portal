import Head from 'next/head';
import axios from 'axios';
import React, { Component } from 'react';
import { Segment, Header, Container, Icon, Input, Button } from 'semantic-ui-react';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: {},
		};
	}

	componentDidMount() {
		if (localStorage.getItem('userInfo') !== null) {
			this.setState({
				userData: JSON.parse(localStorage.getItem('userInfo')),
			});
		}
		if (localStorage.getItem('userInfo') === null) {
			window.location.href = '/';
		}
	}

	logout() {
		localStorage.removeItem('userInfo');
		window.location.href = process.env.NODE_ENV === 'production' ? '/Teacher-Portal' : '/';
	}

	render() {
		return (
			<Container style={{
				paddingTop: '50px',
			}}>
				<Header as='h1'>Welcome {this.state.userData.name}!</Header>
				<Button negative fluid onClick={() => this.logout()}>Logout</Button>
			</Container>
		);
	}
}

export default App;