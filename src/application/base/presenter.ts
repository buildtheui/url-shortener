import {Response} from "express";

export abstract class Presenter {
    abstract transform(response: object, expressResponse: Response): object;
}