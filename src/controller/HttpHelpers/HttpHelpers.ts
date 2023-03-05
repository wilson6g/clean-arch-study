import { HttpStatusCode } from "axios"
import { ServerError } from "../Errors"
import { HttpResponse } from "../Ports/IHttpResponse"

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: HttpStatusCode.BadRequest,
  body: error.message
})

export const ok = (data: any): HttpResponse => ({
  statusCode: HttpStatusCode.Ok,
  body: data
})

export const created = (data: any): HttpResponse => ({
  statusCode: HttpStatusCode.Created,
  body: data
})

export const deleted = (): HttpResponse => ({
  statusCode: HttpStatusCode.NoContent,
  body: {}
})

export const serverError = (reason: string): HttpResponse => ({
  statusCode: HttpStatusCode.InternalServerError,
  body: new ServerError(reason)
})