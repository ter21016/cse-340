// // Needed resources
// const express = require("express")
// const router = new express.Router()

// //const utilities = require("../utilities")
// //const errorController = require("../controllers/errorController")

// // Middleware causes an error
// router.use("/", utilities.handleErrors(async (req, res, next) => {
//     // throw new Error("Middleware intentionally throwing an exception") // Comment this line to allow controller to cause the error
//     next()
// }))

// // Route to cause 500 type error
// router.get("/", utilities.handleErrors(errorController.causeError))

// module.exports = router;

const express = require("express");
const router = new express.Router();

// Route to trigger an intentional error
router.get('/trigger-error', (req, res, next) => {
  const err = new Error("Intentional Server Error");
  err.status = 500;
  next(err); // Pass the error to the middleware
});

// 404 Error Route
router.get('*', (req, res) => {
    res.status(404).render('404', {
        layout: false // Assuming you don't want any layout for this error page
    });
});

module.exports = router;