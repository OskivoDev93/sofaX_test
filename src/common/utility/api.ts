import { HttpStatus } from "@nestjs/common";

export type IResponse = Record<'message', string> &
  Partial<Record<'data', any>>;

export type IPromise = Record<'httpStatus', IHttpStatus> &
  Record<'response', IResponse>;

export enum IHttpStatus {
    // 200: Request succeeded
    OK = HttpStatus.OK,
  
    // 201: New resources created
    CREATED = HttpStatus.CREATED,
  
    // 202: Server acknowledgement
    ACCEPTED = HttpStatus.ACCEPTED,
  
    // 409: Already Exists
    EXISTS = HttpStatus.CONFLICT,
  
    // 400: Bad request from client
    BAD_REQUEST = HttpStatus.BAD_REQUEST,
  
    // 401: Lacks valid authentication credentials
    UNAUTHORIZED = HttpStatus.UNAUTHORIZED,
  
    FORBIDDEN = HttpStatus.FORBIDDEN,
  
    // 404: Could not find the resource
    NOT_FOUND = HttpStatus.NOT_FOUND,
  
    NOT_MODIFIED = HttpStatus.NOT_MODIFIED,
  
    // 429: Too many request
    TOO_MANY_REQUESTS = HttpStatus.TOO_MANY_REQUESTS,
  
    // 500: Unexpected issue encountered by server
    INTERNAL_SERVER_ERROR = HttpStatus.INTERNAL_SERVER_ERROR,
  
    // 503: Temporary overload or scheduled maintenance
    SERVICE_UNAVAILABLE = HttpStatus.SERVICE_UNAVAILABLE,
  }
  