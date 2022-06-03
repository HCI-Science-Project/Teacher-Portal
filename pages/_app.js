import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import 'rsuite/styles/index.less';

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {
	return (
		<SessionProvider session={session}>
			<Component {...pageProps} />
		</SessionProvider>
	);
}