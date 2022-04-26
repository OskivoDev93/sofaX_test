import { IHttpStatus } from "./api";
const eventManager = require('events');


export const EventHandler = new eventManager()

export class Responses {
    /**
     * @method rejectInternalServer
     * @param error
     */
    static rejectInternalServer(error: IPromiseErrors) {
      return Responses.rejectRequest(
        error,
       IHttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  
    /**
     * @method rejectNotFound
     * @param error
     */
    static rejectNotFound(error: IPromiseErrors) {
      return this.rejectRequest(error, IHttpStatus.NOT_FOUND);
    }
  
    static rejectExists(error: IPromiseErrors) {
      return this.rejectRequest(error, IHttpStatus.EXISTS);
    }
  
    static rejectNotModified(error: IPromiseErrors) {
      return this.rejectRequest(error, IHttpStatus.NOT_MODIFIED);
    }
  
    /**
     * @method rejectBadRequest
     * @param error
     */
    static rejectBadRequest(error: IPromiseErrors) {
      return Responses.rejectRequest(error, IHttpStatus.BAD_REQUEST);
    }
  
    static badRequestMessage(str: string): string {
      return `API Endpoint bad request.\n - ${str}`;
    }
  
    /**
     * @method rejectRequest
     * @param error
     * @param status
     */
    static rejectRequest(
      error: IPromiseErrors,
      status: number = IHttpStatus.INTERNAL_SERVER_ERROR,
    ) {
      if (error?.httpStatus) {
        return error;
      }
      if (error?.data) {
        return Responses.responseWithData(error?.message, error?.data, status);
      }
      return Responses.responseWithoutData(error?.message, status);
    }
  
    /**
     * @method rejectNotFoundWithEvent
     * @param errorMsg
     * @param eventName
     * @param eventData
     */
    static rejectNotFoundWithEvent(
      errorMsg: string,
      eventName: string,
      eventData: any = {},
    ) {
      EventHandler.emit(eventName, {
        message: errorMsg,
        data: eventData,
      });
      return Responses.rejectNotFound({ message: errorMsg });
    }
  
    /**
     * @method rejectBadRequestWithEvent
     * @param errorMsg
     * @param eventName
     * @param eventData
     */
    static rejectBadRequestWithEvent(
      errorMsg: string,
      eventName: string,
      eventData: any = {},
    ) {
      EventHandler.emit(eventName, {
        message: errorMsg,
        data: eventData,
      });
      return Responses.rejectBadRequest({ message: errorMsg });
    }
  
    /**
     * @method rejectInternalServerWithEvent fires an event and rejects with status of internal server error
     * @param errorMsg
     * @param eventName
     * @param eventData
     */
    static rejectInternalServerWithEvent(
      errorMsg: string,
      eventName: string,
      eventData: any = {},
    ) {
      EventHandler.emit(eventName, {
        message: errorMsg,
        data: eventData,
      });
      return Responses.rejectInternalServer({
        message: errorMsg,
      });
    }
  
    /**
     * @method resolveWithData return promise resolve with data
     * @param messageContainer
     * @param dataContainer
     */
    static resolveWithData(messageContainer: string = '', dataContainer: {}) {
      return Responses.responseWithData(
        messageContainer,
        dataContainer,
        IHttpStatus.OK,
      );
    }
  
    /**
     * @method responseWithData
     * @param msg
     * @param dataContainer
     * @param status
     */
    static responseWithData(
      msg: string,
      dataContainer: {},
      status: IHttpStatus,
    ): IResponseWithData {
      return {
        httpStatus: status,
        response: {
          message: msg,
          data: dataContainer,
        },
      };
    }
  
    /**
     * @method responseWithoutData
     * @param msg
     * @param status
     */
    static responseWithoutData(
      msg: string,
      status: IHttpStatus,
    ): IResponseWithoutData {
      return {
        httpStatus: status,
        response: {
          message: msg,
        },
      };
    }
  
    static resolveCreatedWithData(
      messageContainer: string = '',
      dataContainer: object,
    ) {
      return Responses.responseWithData(
        messageContainer,
        dataContainer,
        IHttpStatus.CREATED,
      );
    }
  
    /**
     * @method resolveBoolean
     * @param result
     */
    static resolveBoolean(result: boolean = true) {
      return result;
    }
  
    /**
     * @method rejectBoolean
     * @param result
     */
    static rejectBoolean(result: boolean = false) {
      return result;
    }
  
    /**
     * @method resolveWithMessage resolve with message
     * @param messageContainer
     */
    static resolveWithMessage(messageContainer: string) {
      return Responses.responseWithoutData(
        messageContainer,
        IHttpStatus.OK,
      );
    }
  
    /**
     * @method emptyErrorResponse return empty error array
     * @param error
     */
    static emptyErrorResponse(error) {
      return Responses.responseWithoutData(
        error.message,
        IHttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  
    /**
     * @method resolveCreatedWithEvent
     * @param msg
     * @param dataContainer
     * @param eventName
     * @param eventData
     */
    static resolveCreatedWithEvent(
      messageContainer: string,
      dataContainer: object,
      eventName: string,
      eventData: any = {},
    ) {
      EventHandler.emit(eventName, {
        message: messageContainer,
        data: eventData,
      });
      return Responses.responseWithData(
        messageContainer,
        dataContainer,
        IHttpStatus.CREATED,
      );
    }
  
    /**
     * @method rejectUnauthorized
     * @param msg
     * @param eventName
     * @param eventData
     */
    static rejectUnauthorized(
      messageContainer: string,
      eventName: string,
      eventData: any = {},
    ) {
      EventHandler.emit(eventName, {
        message: messageContainer,
        data: eventData,
      });
      return Responses.responseWithoutData(
        messageContainer,
        IHttpStatus.UNAUTHORIZED,
      );
    }
  }
  
  export interface IPromiseErrors {
    message: string;
    httpStatus?: number;
    data?: string | object;
  }
  
  export interface IResponseWithData {
    httpStatus: IHttpStatus;
    response: {
      message: string;
      data: {};
    };
  }
  
  export interface IResponseWithoutData {
    httpStatus: IHttpStatus;
    response: {
      message: string;
    };
  }