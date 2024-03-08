const express = require("express")
const app = express()
const mongoose = require("mongoose")

const Listing = require("./models/listingModel.js");
const path = require("path")
//Ejs-mate reqquire
const ejsMate = require("ejs-mate")

//override with POST 
const methodOverride = require('method-override')

//Require asynWrap 
const wrapAsync = require("./utils/wrapAsync.js")

//Require express error
const ExpressError = require("./utils/ExpressError.js")

//Require joi for the server side validation error
const Joi = require('joi'); 

const {listingSchema} = require("./schema.js")


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

const validateListing = (req, res, next) =>{
    let {err} = listingSchema.validate(req.body.listings)
    if(error) {
        throw new ExpressError(400, result.error)
    }else {
        next()
    }
}


//Index route
app.get("/listings",validateListing, wrapAsync( async(req, res) =>{
    let allListings = await Listing.find({})
    res.render("listings/index.ejs", {allListings})
}))

//New route
app.get("/listings/new", (req, res) =>{
    res.render("listings/new.ejs")
})

//Create route
app.post("/listings",validateListing, wrapAsync(async (req, res, next) =>{
    // if(!req.body.listings){
    //     throw new ExpressError(400, "Send valid data for listing")
    // }
    // let result = listingSchema.validate(req.body)
    // console.log(result)
    const newListing = new Listing(req.body.listings) //listings are came from the form-name-listings[name]
    await newListing.save()
    res.redirect("/listings")
}))

//Show route
app.get("/listings/:id",validateListing, wrapAsync( async (req, res) =>{
    let {id} = req.params;
    const listings = await Listing.findById(id)
    res.render("listings/show.ejs", {listings})
}))

//Edit route
app.get("/listings/:id/edit",validateListing, wrapAsync(async(req, res) =>{
    let {id} = req.params;
    const listings = await  Listing.findById(id)
    res.render("listings/edit.ejs", {listings})
}))

//Update route
app.put("/listings/:id",validateListing, wrapAsync(async(req, res) =>{
    if(!req.body.listing){
        throw new ExpressError(400, "Send valid data for listing")
    }
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listings})
    res.redirect("/listings")
}))

//Delete route
app.delete("/listings/:id",validateListing, wrapAsync(async(req, res) =>{
    let {id} = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id)
    console.log(deleteListing)
    res.redirect("/listings")
}))

app.get("/", (req, res) =>{
    res.send("working well")
})

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