import moment from 'moment';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { Layout } from '../../components/Layout';
import { ShowIf } from '../../components/ShowIf';
import { Spinner } from '../../components/Spinner';
import { RoutePath } from '../../route';
import { accessTokenAtom } from '../../store/atom/accessToken.atom';
import issue from '../../store/query/issue';
import { timezoneOffsetState } from '../../store/selector/timezoneOffset.selector';

const Component: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [score, setScore] = useState(0);
  const [created_at, setCreatedAt] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const accessToken = useRecoilValue(accessTokenAtom);
  const timezoneOffset = useRecoilValue(timezoneOffsetState);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const promise = async () => {
      if (!moment(created_at).isValid()) {
        return setErrorMessage('Invalid date');
      }

      try {
        const result = await issue.createIssue(
          {
            name,
            score,
            description,
            created_at: moment(created_at)
              .add(timezoneOffset, 'hours')
              .toDate(),
          },
          accessToken,
        );

        if (!!result?.statusCode && result.statusCode !== 201) {
          if (Array.isArray(result.message)) {
            setErrorMessage(result.message.join(', '));
          } else if (typeof result.message === 'string') {
            setErrorMessage(result.message);
          }
        } else {
          navigate(RoutePath.HOME);
        }
      } catch (error) {
        error instanceof Error && setErrorMessage(error.message);
      }
    };

    setIsLoading(true);
    await promise();
    setIsLoading(false);
  };

  return (
    <Layout navigate={navigate}>
      <h2 className="flex items-center pl-2 text-2xl font-semibold">
        <button className="mr-2" onClick={() => navigate(-1)}>
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
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
        Create new issue
      </h2>
      <h4 className="pl-2 text-base font-normal">
        An issue contains name, description, date, and score.
      </h4>

      <div className="mt-8 max-w-[500px] rounded-lg bg-white p-4 sm:p-6 xl:p-8">
        <div className="max-w-[500px]">
          <label className="block pb-1 text-base font-semibold text-gray-600">
            Name
          </label>
          <input
            type="text"
            id="issue-name"
            className="mt-1 mb-5 w-full rounded-lg border px-3 py-2 text-base"
            maxLength={32}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="block pb-1 text-base font-semibold text-gray-600">
            Description (optional)
          </label>
          <textarea
            className="mt-1 mb-5 w-full rounded-lg border px-3 py-2 text-base"
            id="issue-description"
            maxLength={250}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label className="block pb-1 text-base font-semibold text-gray-600">
            Score
          </label>
          <input
            className="mt-1 mb-5 w-full rounded-lg border px-3 py-2 text-base"
            type="number"
            id="score-input"
            max={100}
            min={0}
            onChange={(event) => setScore(Number(event.target.value))}
          />

          <label className="block pb-1 text-base font-semibold text-gray-600">
            Date
          </label>
          <input
            type="date"
            id="issue-date"
            className="mt-1 mb-5 w-full rounded-lg border px-3 py-2 text-base"
            onChange={(event) => setCreatedAt(event.target.value)}
          />

          <ShowIf condition={!!errorMessage}>
            <h3 className="block pb-1 text-sm font-normal text-purple600">
              {errorMessage}
            </h3>
          </ShowIf>

          <div className="flex items-center justify-between">
            <button
              type="button"
              className="mt-2 flex min-w-[105px] cursor-pointer rounded-md py-2 px-16 font-semibold text-purple-500 hover:bg-gray-50 sm:pl-[5.5rem] sm:pr-24"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button
              type="button"
              id="create-button"
              className="mt-2 flex min-w-[105px] cursor-pointer rounded-md bg-purple-500 py-2 px-16 font-semibold text-white hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-600 active:bg-purple-800 disabled:cursor-default disabled:bg-purple-300 sm:pl-[5.5rem] sm:pr-24"
              onClick={handleSubmit}
              disabled={!name || !score || !created_at || isLoading}
            >
              <ShowIf condition={isLoading}>
                <div className="w-full">
                  <Spinner />
                </div>
              </ShowIf>
              <ShowIf condition={!isLoading}>Create</ShowIf>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const CreateIssuePage: React.FC = React.memo(Component);
