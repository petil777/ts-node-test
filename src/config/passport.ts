import passport from "passport";
import passportLocal from "passport-local";
import { User } from "@models";

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser<any, any>((user, done) => {
  console.log("serialize start");
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  //User.findById(id, (err, user)=>{})
  console.log("deserialize start");
  const user = new User({
    id: "kim",
    password: "123",
    age: 20,
    description: "nothing"
  });
  if (id === "kim") done(null, user);
  else done(Error("No user"), null);
});

passport.use(
  "local",
  new LocalStrategy({ usernameField: "id" }, (id, password, done) => {
    // UserRepository.findOne({username}, (err, user)=>{
    //     if(err) return done(err);
    //     if(!user)return done(null, false);
    //     return done(null, user);
    // })
    if (id === "kim" && password === "123") {
      const user = new User({ id, password, age: 20, description: "nothing" });
      return done(null, user);
    }
    const err = new Error("No user");
    return done(err);
  })
);
