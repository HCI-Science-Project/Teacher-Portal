import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

export default NextAuth({
	providers: [
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	callbacks: {
		async signIn({ user: { email } }) {
			return (email.endsWith('hci.edu.sg') || email === 'mrgeek484@gmail.com');
		},
	},
});