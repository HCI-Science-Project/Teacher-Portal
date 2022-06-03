import { useSession, signIn, signOut } from 'next-auth/react';
import { Container, Header, FlexboxGrid, Button, ButtonToolbar } from 'rsuite';
import Head from 'next/head';
import styles from '../styles/Index.module.css';


export default function App() {
	const { data: session } = useSession({
		required: true,
		onUnauthenticated() {
			signIn('google');
		},
	});

	if (session) {
		return (
			<>
				<Head>
					<title>Teacher&apos;s Portal</title>
				</Head>
				<Container style={{
					marginTop: '2em',
				}}>
					<FlexboxGrid justify='center'>
						<FlexboxGrid.Item colspan={12}>
							<Header>
								<h2 className={styles.center}>Teacher&apos;s Portal</h2>
								<h5 className={styles.center} style={{
									marginTop: '0.5em',
								}}>Currently signed in as {session?.user?.name}</h5>
							</Header>
							<ButtonToolbar style={{
								marginTop: '1em',
							}}>
								<Button
									onClick={() => signOut()}
									block
									color='red'
									appearance='primary'
								>Sign Out</Button>
							</ButtonToolbar>
						</FlexboxGrid.Item>
					</FlexboxGrid>
				</Container>
			</>
		);
	}
	else {
		return (
			<>
				<Head>
					<title>Access denied</title>
				</Head>
				<Container style={{
					marginTop: '2em',
				}}>
					<FlexboxGrid justify='center'>
						<FlexboxGrid.Item colspan={12}>
							<Header>
								<h2>You are not signed in</h2>
							</Header>
						</FlexboxGrid.Item>
					</FlexboxGrid>
				</Container>
			</>
		);
	}
}