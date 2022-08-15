import { GetServerSideProps, NextPage } from 'next';
import { BuiltInProviderType } from 'next-auth/providers';
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
} from 'next-auth/react';

interface Props {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
}

/**
 * @define this is one custom sign in page
 * @param providers used to show the provider configuration.
 * @returns
 */
const SignInPage: NextPage<Props> = ({ providers }) => {
  return (
    <div className="flex justify-center mt-20 space-x-2">
      <img
        src="https://pixy.org/src/9/thumbs350/98320.jpg"
        alt="twitter-image"
        className="ml-6 object-cover md:w-44 md:-h-80 rotate-6 hidden  md:inline-flex"
      />
      <div>
        {Object.values(providers!).map((provider) => (
          <div className="flex flex-col items-center" key={provider.id}>
            <img
              className="w-36 object-cover"
              src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
              alt="twitter-logo"
            />
            <p className="text-center text-sm italic my-2">
              This app is created for firebase and nextjs practice
            </p>
            <button
              onClick={() => signIn(provider.id, { callbackUrl: '/' })}
              className="bg-sky-400 rounded-lg p-3 text-white hover:bg-sky-600 transition duration-200"
            >
              Sign In with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SignInPage;

export const getServerSideProps: GetServerSideProps = async () => {
  // get the current provider and custom the sign in page
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
};
