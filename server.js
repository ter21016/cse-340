/* ******************************************
 * This server.js file is the primary file of the
 * application. It is used to control the project.
 *******************************************/

/* ***********************
 * Require Statements
 *************************/
// Their stuff
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const session = require("express-session")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
//const { getNav, checkJWTToken, handleErrors } = require("./utilities/")

const static = require("./routes/static")
const baseController = require("./controllers/baseController")
const inventoryRoute = require("./routes/inventoryRoute")
const accountRoute = require("./routes/accountRoute")
const messageRoute = require("./routes/messageRoute")
const errorRoute = require("./routes/errorRoute")
const utilities = require("./utilities/")
const pool = require("./database")

// Init
const app = express()



/* ***********************
 * Middleware
 * ************************/
app.use(
  session({
    store: new (require("connect-pg-simple")(session))({
      createTableIfMissing: true,
      pool,
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    name: "sessionId",
  }))

// Express Messages Middleware
app.use(require("connect-flash")())
app.use(function (req, res, next) {
  res.locals.messages = require("express-messages")(req, res)
  next()
})


// JWT checker

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ // for parsing application/x-www-form-urlencoded
  extended: true
}))
// Cookie parser
app.use(cookieParser())
app.use(utilities.checkJWTToken)



/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // Not at view root

/* ***********************
 * Routes
 *************************/
app.use(require("./routes/static"))
// Index route
app.get("/", utilities.handleErrors(baseController.buildHome))
// Inventory routes
app.use("/inv", require(".routes/inventoryRoute"))

// Account routes - Unit 4
app.use("/account", require("./routes/accountRoute"))
// Message routes
app.use("/message", messageRoute)
// Intentional error route. Used for testing
app.use("/ierror", errorRoute)
// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have lost that page' })
})

/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  console.dir(err);
  if(err.status == 404){ message = err.message} else {message = 'Sorry, we appear to have lost that page'}
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message,
    nav
  })
})

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})