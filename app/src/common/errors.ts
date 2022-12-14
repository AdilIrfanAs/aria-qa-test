export class UnauthorizedError extends Error {
  constructor(message?: string) {
    super(message || 'Unauthorized error');
    this.name = 'UnauthorizedError';
  }
}

export class BadRequestError extends Error {
  constructor(message?: string) {
    super(message || 'Bad request error');
    this.name = 'BadRequestError';
  }
}

export class InternalServerError extends Error {
  constructor(message?: string) {
    super(message || 'Internal Server Error');
    this.name = 'InternalServerError';
  }
}
