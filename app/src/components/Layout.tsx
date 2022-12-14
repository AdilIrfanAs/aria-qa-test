import React, { useEffect } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { RoutePath } from '../route';
import { accessTokenAtom } from '../store/atom/accessToken.atom';
import { expiryState } from '../store/selector/expiry.selector';
import { userState } from '../store/selector/user.selector';

interface LayoutProps {
  children: React.ReactNode;
  navigate: NavigateFunction;
}
export const Layout: React.FC<LayoutProps> = (props) => {
  const { children, navigate } = props;

  const user = useRecoilValue(userState);
  const isExpired = useRecoilValue(expiryState);
  const setAccessToken = useSetRecoilState(accessTokenAtom);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setAccessToken(null);

    navigate(RoutePath.HOME);
  };

  useEffect(() => {
    if (!user || isExpired) {
      localStorage.removeItem('access_token');
      setAccessToken(null);

      navigate(RoutePath.HOME, {
        state: { error: 'You must sign in to access this page.' },
      });
    }
  }, []);

  return (
    <div className="flex overflow-hidden">
      <nav className="visible fixed z-30 flex w-full items-center border-b border-gray-200 bg-white py-2 pr-4 lg:hidden">
        <img
          src="/logo.svg"
          alt="Dcentric Health logo"
          className="flex w-32 items-center px-6"
        />

        <button
          type="button"
          className="cursor-pointer font-semibold"
          onClick={() => navigate(RoutePath.HOME)}
        >
          Dashboard
        </button>

        <div className="grow" />
        <button
          type="button"
          id="logout"
          className="cursor-pointer font-semibold"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>
      <aside
        id="sidebar"
        className="fixed top-0 left-0 z-20 hidden h-full w-64 shrink-0 lg:visible lg:flex"
        aria-label="Sidebar"
      >
        <div className="flex flex-1 flex-col space-y-1 divide-y bg-white py-4">
          <img
            src="/logo.svg"
            alt="Dcentric Health logo"
            className="mb-2 flex w-auto items-center px-6"
          />

          <button
            type="button"
            className="flex cursor-pointer items-center py-2 px-6 text-base font-normal text-gray-900 hover:bg-gray-100"
            onClick={() => navigate(RoutePath.HOME)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
              <path d="M22 12A10 10 0 0 0 12 2v10z" />
            </svg>
            Dashboard
          </button>

          <div className="grow" />

          <button
            type="button"
            className="flex cursor-pointer items-center py-2 px-6 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100"
            onClick={handleLogout}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      <div
        id="main-content"
        className="relative h-screen w-full overflow-y-auto bg-gray-100 pt-12 lg:ml-64 lg:pt-0"
      >
        <main className="pt-4 lg:pt-0">
          <div className="flex h-screen flex-col px-4 pt-4">{children}</div>
        </main>
      </div>
    </div>
  );
};
