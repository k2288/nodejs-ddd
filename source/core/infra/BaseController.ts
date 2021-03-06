import * as express from 'express';
import { I18nMessage } from '../logic/Guard';

export abstract class BaseController {
    // or even private
    protected req: express.Request;
    protected res: express.Response;

    protected abstract executeImpl(): Promise<void | any>;

    public execute=(req: express.Request, res: express.Response): void=> {
        this.req = req;
        this.res = res;

        this.executeImpl();
    }

    public jsonResponse(res: express.Response, code: number, message: string|I18nMessage) {
        if(typeof message ==="string"){
            return res.status(code).send({message:this.req.__(message)});
        }
        
        else if ("text" in message){
            return res.status(code).send( {message:this.req.__(message.text,message.varibales)})
        }

    }

    public ok<T>(res: express.Response, dto?: T) {
        if (!!dto) {
            return res.status(200).send(dto);
        } else {
            return res.sendStatus(200);
        }
    }

    public created(res: express.Response) {
        return res.sendStatus(201);
    }

    public clientError(message?: string|I18nMessage) {
        return this.jsonResponse(this.res, 400, message ? message : 'Bad request');
    }

    public unauthorized(message?: string|I18nMessage) {
        return this.jsonResponse(this.res, 401, message ? message : 'Unauthorized');
    }

    public paymentRequired(message?: string|I18nMessage) {
        return this.jsonResponse(this.res, 402, message ? message : 'Payment required');
    }

    public forbidden(message?: string|I18nMessage) {
        return this.jsonResponse(this.res, 403, message ? message : 'Forbidden');
    }

    public notFound(message?: string|I18nMessage) {
        return this.jsonResponse(this.res, 404, message ? message : 'Not found');
    }

    public conflict(message?: string|I18nMessage) {
        return this.jsonResponse(this.res, 409, message ? message : 'Conflict');
    }

    public tooMany(message?: string|I18nMessage) {
        return this.jsonResponse(this.res, 429, message ? message : 'Too many requests');
    }

    public fail(error: Error | string |I18nMessage ) {
        if(typeof error ==="string"){
            return this.res.status(400).send({message:error.toString()});
        }
        else if("message" in error){
            return this.res.status(400).send({message:this.req.__(error.message)})

        }
        else if ("text" in error){
            return this.res.status(400).send({message:this.req.__(error.text,error.varibales)})
        }

    }
}
