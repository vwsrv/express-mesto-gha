import { STATUS } from '../utils/constants';

export default class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS.FORBIDDEN;
  }
}
