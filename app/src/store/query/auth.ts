import { User } from '../model/user';

const AUTH_PATH = 'auth';

type SignInPayload = Pick<User, 'email' | 'password'>;
type SignUpPayload = Pick<User, 'email' | 'password' | 'name'>;

export default {
  signIn: async (payload: SignInPayload) => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/${AUTH_PATH}/sign-in`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    );

    return res.json();
  },
  signUp: async (payload: SignUpPayload) => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/${AUTH_PATH}/sign-up`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    );

    return res.json();
  },
};
