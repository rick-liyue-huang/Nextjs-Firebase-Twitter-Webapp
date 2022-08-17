import NextAuth from 'next-auth';
import GoogeProvider from 'next-auth/providers/google';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogeProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string, // must match the firebase google authentication provider and clould google console credentials
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string, // same as upper case, get from cloud google credentials and past them to firebase google authentication provider
    }),
    // ...add more providers here
  ],

  // custom page for auth direction, here use signIn method to direct to /auth/signin page
  pages: {
    signIn: '/auth/signin',
  },

  // after deployment, add this for server configuration
  secret: process.env.SERVER_SECRET,

  // callback for modify the return the session information
  callbacks: {
    async session({ session, token }) {
      // @ts-ignore
      session!.user!.username = session.user?.name
        ?.split(' ')
        .join('')
        .toLocaleLowerCase();

      // @ts-ignore
      session!.user!.uid = token.sub;

      return session;
    },
  },
});
