// // Needed resources
 const express = require("express")
const router = new express.Router()
const utilities = require("../utilities")
const interrorController = require("../controllers/interrorController")

// // Middleware causes an error
router.use("/", utilities.handleErrors(async (req, res, next) => {
 // throw new Error("Middleware intentionally throwing an exception") // Comment this line to allow controller to cause the error
   next()
 }))

// // Route to cause 500 type error
 router.get("/", utilities.handleErrors(interrorController.causeError))

 module.exports = router;
