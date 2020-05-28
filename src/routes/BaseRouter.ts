import express, { Request, Response } from "express";

export abstract class BaseRouter {
  public router: express.Router;
  private controller: any;

  constructor(controller: any) {
    this.router = express.Router();
    this.controller = controller;
  }
  protected handler(action: () => void) {
    // # one controller per request.
    // # To use 'this' in action, constructor need
    // # And to use constructor, new instance need
    // # If not want, have to pass req,res to controller directly
    return (req: Request, res: Response) =>
      action.call(new this.controller(req, res));
  }
}
