/* eslint-disable linebreak-style */
/* eslint-disable no-useless-escape */
/* eslint-disable import/prefer-default-export */
import { constants as HTTP_STATUS } from 'node:http2';

export const urlPattern = /^https?:\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
export const STATUS = {
  OK: HTTP_STATUS.HTTP_STATUS_OK, // 200
  CREATED: HTTP_STATUS.HTTP_STATUS_CREATED, // 201
  NOT_FOUND: HTTP_STATUS.HTTP_STATUS_NOT_FOUND, // 404
  BAD_REQUEST: HTTP_STATUS.HTTP_STATUS_BAD_REQUEST, // 400
  AUTH_ERROR: HTTP_STATUS.HTTP_STATUS_UNAUTHORIZED, // 401
  CONFLICT: HTTP_STATUS.HTTP_STATUS_CONFLICT, // 409
  SEVER_ERR: HTTP_STATUS.HTTP_STATUS_INTERNAL_SERVER_ERROR, // 500
  FORBIDDEN: HTTP_STATUS.HTTP_STATUS_FORBIDDEN, // 403
};