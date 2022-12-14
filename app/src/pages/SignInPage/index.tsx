import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { ShowIf } from '../../components/ShowIf';
import { Spinner } from '../../components/Spinner';
import { RoutePath } from '../../route';
import auth from '../../store/query/auth';
import { accessTokenAtom } from '../../store/atom/accessToken.atom';
import { UnauthorizedError } from '../../common/errors';

const Component: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const setAccessToken = useSetRecoilState(accessTokenAtom);

  const navigate = useNavigate();
  const { state } = useLocation();

  const handleSignIn = async () => {
    const promise = async () => {
      if (!email) {
        return setErrorMessage('Email is required');
      }

      if (!password) {
        return setErrorMessage('Password is required');
      }

      try {
        const result = await auth.signIn({ email, password });

        if (!result.access_token) {
          throw new UnauthorizedError('Invalid email or password');
        }

        setErrorMessage('');
        setAccessToken(result.access_token);
        navigate(RoutePath.HOME);
      } catch (error) {
        error instanceof Error && setErrorMessage(error.message);
      }
    };

    setIsLoading(true);
    await promise();
    setIsLoading(false);
  };

  useEffect(() => {
    if (!!state?.error) setErrorMessage(state.error);
  }, []);

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-100 sm:py-12">
      <div className="xs:p-0 mx-auto p-10 md:w-full md:max-w-md">
        <div className="w-full rounded-lg bg-white">
          <div className="px-5 py-7">
            <h1 className="mb-5 text-left text-3xl font-bold">
              Dcentric Health
            </h1>

            <label className="block pb-1 text-base font-semibold text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="sign-in-email"
              className="mt-1 mb-5 w-full rounded-lg border px-3 py-2 text-base"
              placeholder="Input your email"
              onChange={(event) => setEmail(event.target.value)}
            />
            <label className="block pb-1 text-base font-semibold text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="sign-in-password"
              className="mt-1 mb-5 w-full rounded-lg border px-3 py-2 text-base"
              placeholder="Input your password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              type="button"
              id="login"
              className="inline-block w-full rounded-lg bg-purple-500 py-2.5 text-center text-base font-semibold text-white shadow-sm transition duration-200 hover:bg-purple-600 hover:shadow-md focus:bg-purple-700 focus:shadow-sm focus:ring-2 focus:ring-purple-500/50"
              onClick={handleSignIn}
              disabled={isLoading}
            >
              <ShowIf condition={isLoading}>
                <div className="w-full translate-x-[46%]">
                  <Spinner />
                </div>
              </ShowIf>
              <ShowIf condition={!isLoading}>
                <span className="mr-2 inline-block">Login</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="inline-block h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </ShowIf>
            </button>

            <ShowIf condition={!!errorMessage}>
              <h4 className="mt-4 max-w-[300px] text-xs font-normal text-purple500">
                {errorMessage}
              </h4>
            </ShowIf>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SignInPage = React.memo(Component);
