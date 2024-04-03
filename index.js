const express = require("express")
const app = express()
const mongoose = require("mongoose")
const path = require("path")
//Ejs-mate reqquire
const ejsMate = require("ejs-mate")
//override with POST 
const methodOverride = require('method-override')
//Require express error
const ExpressError = require("./utils/ExpressError.js")

const listingRouter = require("./routes/listings.js")
const reviewRouter = require("./routes/reviews.js")
const userRouter = require("./routes/user.js")

//Express-session
const session = require('express-session')

//Connect flash
const flash = require('connect-flash');

//User things reuired
const passport = require("passport")
const LocalStrategy = require("passport-local")
const User = require("./models/userModel.js")

//Views folder connecting
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

//Public statice folder connencting
app.use(express.static(path.join(__dirname,"public")))

//Connection of ejs-mate
app.engine('ejs', ejsMate);

//Url encoded use for undertand the post method
app.use(express.urlencoded({extended:true}))

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))




main()
    .then(() =>{
        console.log("Connected to Databse")
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

//Session options
const sessionOption ={
    secret: 'mysupersecretcode',
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now() + 7 * 24 * 60 * 60* 1000,
        maxAge: 7 * 24 * 60 * 60* 1000,
        httpOnly: true
    }
    }

app.get("/", (req, res) =>{
    res.send("working well")
})    

//Use session
app.use(session(sessionOption))
//use flash
app.use(flash());

//USer method
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//Define flash middlware
app.use((req, res, next) =>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error")
    res.locals.currentUSer = req.user;
    next()
})

app.use("/listings",listingRouter)
app.use("/listings/:id/reviews",reviewRouter)
app.use("/", userRouter)


//Demo user
// app.get("/demouser", async (req, res) =>{
//     let fakeUser = new User({
//         email: "user@gmail.com",
//         username : "username"
//     })

//     let registerUser = await User.register(fakeUser, "hello") //fakeUser = username, hello = password
//     res.send(registerUser)
// })

app.all("*", (req, res, next) =>{
    next(new ExpressError(404, "Page not found"))
})

app.use((err,req, res, next)=>{
    //Decunstruct the express error
    let{statusCode = 500, message = "Something went wrong"} = err;
    res.status(statusCode).render("error.ejs",{err})
})

app.listen(8080, ()=>{
    console.log("Port is working on 8080")
})