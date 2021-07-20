import * as express from 'express';
import { BaseError } from '../../utils/base-error';

export abstract class BaseController {
    // or even private
    protected req: express.Request;
    protected res: express.Response;

    protected abstract executeImpl(): Promise<void | any>;

    public execute(req: express.Request, res: express.Response): void {
        this.req = req;
        this.res = res;

        this.executeImpl();
    }

    public static jsonResponse(res: express.Response, code: number, message: string) {
        return res.status(code).json({ message });
    }

    public ok<T>(res: express.Response, dto?: T) {
        if (!!dto) {
            return res.status(200).json(dto);
        } else {
            return res.sendStatus(200);
        }
    }

    public created(res: express.Response) {
        return res.sendStatus(201);
    }

    public clientError(message?: string) {
        return BaseController.jsonResponse(this.res, 400, message ? message : 'Bad request');
    }

    public unauthorized(message?: string) {
        return BaseController.jsonResponse(this.res, 401, message ? message : 'Unauthorized');
    }

    public paymentRequired(message?: string) {
        return BaseController.jsonResponse(this.res, 402, message ? message : 'Payment required');
    }

    public forbidden(message?: string) {
        return BaseController.jsonResponse(this.res, 403, message ? message : 'Forbidden');
    }

    public notFound(message?: string) {
        return BaseController.jsonResponse(this.res, 404, message ? message : 'Not found');
    }

    public conflict(message?: string) {
        return BaseController.jsonResponse(this.res, 409, message ? message : 'Conflict');
    }

    public tooMany(message?: string) {
        return BaseController.jsonResponse(this.res, 429, message ? message : 'Too many requests');
    }

    public fail(error: Error | string) {
        return this.res.status(400).json({
            message: error.toString()
        });
    }
}
