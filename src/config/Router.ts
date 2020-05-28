import express from "express";
import { UserRouter } from "src/routes";
export interface IRouter {
  path: string;
  middleware: any[];
  handleRouter: express.Router;
}
const userRouter = new UserRouter();
export const Router: IRouter[] = [
  {
    path: "/",
    middleware: [],
    handleRouter: userRouter.router
  }
];
