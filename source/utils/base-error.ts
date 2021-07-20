export enum HttpStatusCode {
    OK = 200,
    BAD_REQUEST = 400,
    REQUEST_FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER = 500
}


export class BaseError extends Error {
    public readonly name: string;
    public readonly httpCode: HttpStatusCode;
    public readonly data:object

    constructor(name: string, httpCode: HttpStatusCode, description: string,data:object) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);

        this.name = name;
        this.httpCode = httpCode;
        this.data=data;

        Error.captureStackTrace(this);
    }
}

export class HTTP400Error extends BaseError {
    constructor(description = 'bad request',data?:object|null) {
        super('Bad Request', HttpStatusCode.BAD_REQUEST, description,data);
    }
}


export class HTTP403Error extends BaseError {
    constructor(description = 'request forbidden',data?:object|null) {
        super('Request Forbidden', HttpStatusCode.BAD_REQUEST, description,data);
    }
}

export class HTTP404Error extends BaseError {
    constructor(description = 'not found',data?:object|null) {
        super('Not Found', HttpStatusCode.BAD_REQUEST, description,data);
    }
}


