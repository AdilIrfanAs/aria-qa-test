import { isEmpty } from 'lodash';

import { UnauthorizedError } from '../../common/errors';
import { Params, paramsToQueryString } from '../../common/paramsToQueryString';

import { Issue } from '../model/issue';

const ISSUE_PATH = 'issue';

type CreateIssuePayload = Pick<Issue, 'name' | 'score'> &
  Partial<Pick<Issue, 'description' | 'created_at'>>;

interface CreatedAtRange {
  created_at_start_date?: string;
  created_at_end_date?: string;
}

interface GetIssuesParams extends CreatedAtRange {
  page?: number;
  page_size?: number;
  order_by?: 'created_at' | 'score' | 'name' | 'updated_at' | 'id';
  sort_by?: 'ASC' | 'DESC';
}

type GetIssuesStatisticsParams = CreatedAtRange;

export default {
  createIssue: async (
    payload: CreateIssuePayload,
    accessToken: string | null,
  ) => {
    if (!accessToken) {
      throw new UnauthorizedError('Access token is required.');
    }

    const res = await fetch(`${process.env.REACT_APP_API_URL}/${ISSUE_PATH}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    return res.json();
  },
  getIssues: async (params: GetIssuesParams, accessToken: string | null) => {
    if (!accessToken) {
      throw new UnauthorizedError('Access token is required.');
    }

    const uri = `${process.env.REACT_APP_API_URL}/${ISSUE_PATH}?${
      !isEmpty(params) ? paramsToQueryString(params as Params) : ''
    }`;

    const res = await fetch(uri, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.json();
  },
  getIssuesStatistics: async (
    params: GetIssuesStatisticsParams,
    accessToken: string | null,
  ) => {
    if (!accessToken) {
      throw new UnauthorizedError('Access token is required.');
    }

    const uri = `${process.env.REACT_APP_API_URL}/${ISSUE_PATH}/statistics?${
      !isEmpty(params) ? paramsToQueryString(params as Params) : ''
    }`;

    const res = await fetch(uri, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.json();
  },
};
