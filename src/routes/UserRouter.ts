import { Request, Response } from "express";
import { BaseRouter } from "./BaseRouter";
import { UserController } from "src/controllers";
import passport from "passport";
// import passportConfig from 'src/config/passport'
export class UserRouter extends BaseRouter {
  constructor() {
    super(UserController);
    //methods are not static, so prototype methods..
    //To prevent post/:id at the back, move this first
    this.router
      .post(
        "/login",
        (req, res, next) => {
          console.log("req body : ", req.body);
          passport.authenticate("local", function(err, user, info) {
            //If want to pass some var to next middleware, req.someVar.some.. = something before next()
            if (err) return next(err); // 500 error
            if (!user)
              return res
                .status(404)
                .send("local authenticate failed, No User Exist");
            req.logIn(user, err => {
              if (err) return next(err);
              return next();
            });
          })(req, res, next);
        },
        this.handler(UserController.prototype.loginTest)
      )
      .get("/test", this.handler(UserController.prototype.test))
      .get("/:id", this.handler(UserController.prototype.findOne))
      .get("/", this.handler(UserController.prototype.findByAge))
      .post("/:id/:age", this.handler(UserController.prototype.createOne))
      .put("/:id", this.handler(UserController.prototype.update))
      .delete("/:id", this.handler(UserController.prototype.deleteOne));
  }
}
