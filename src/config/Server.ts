import express, { Request, Response, NextFunction } from "express";
import http from "http";
import morgan from "morgan";
import helmet from "helmet";
import methodOverride from "method-override";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";

import "src/config/passport";
import { Router } from "./Router";

//Typescript-restful-starter , MS/Typescript-node-starter
export class Server {
  private readonly app: express.Application;
  private readonly server: http.Server;

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
  }

  // private static connectDB() : Promise<any> =>{
  //     return Connection;
  // }
  public async start(): Promise<http.Server> {
    // # db connection pool connect wait
    // await Server.connectDB();
    this.expressConfiguration();
    this.routerConfiguration();
    return this.server;
  }
  // # 1) bodyParser for
  // # 2) cookieParser for parsing cookie
  // # 3) methodOVerride for using put,patch,delete (RESTFUL pattern)
  // # 4) morgan for logging
  // # 5) helmet to hide info (should be more detailed with option)
  public expressConfiguration = (): void => {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cookieParser("secret"));
    this.app.use(methodOverride());

    this.app.use(
      session({ resave: true, saveUninitialized: true, secret: "secret" })
    );

    // configPassport(passport);
    this.app.use(passport.initialize());
    this.app.use(passport.session());

    this.app.use(
      (req, res, next): void => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
          "Access-Control-Allow-Headers",
          "X-Requested-With, Content-Type, Authorization"
        );
        res.header(
          "Access-Control-Allow-Methods",
          "GET,PUT,PATCH,POST,DELETE,OPTIONS"
        );
        next();
      }
    );
    if (process.env.NODE_ENV == "development") {
      this.app.use(morgan("dev"));
    } else if (process.env.NODE_ENV == "production") {
      //# use winson for logger with morgan(combined);
      this.app.use(helmet());
    }
  };
  public routerConfiguration(): void {
    for (const Route of Router) {
      this.app.use(Route.path, Route.middleware, Route.handleRouter);
    }
    this.app.use(
      (req: Request, res: Response, next: NextFunction): void => {
        res.status(404);
        res.json({ error: "Not Found in router config" });
        next();
      }
    );
    // this.app.use((err:any, req:Request, res:Response, next:NextFunction) =>{
    //     if(err.name=="Unauthroized"){
    //         res.status(401).json({error: "not valid.."})
    //     }
    // })
    this.app.use((err: any, req: Request, res: Response) => {
      //logger.error(err.message, err)
      res.status(404).json({ error: err.message });
    });
  }
}
