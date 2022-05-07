const express = require('express');
let nunjucks = require('nunjucks');
let path = require('path');
const userRoute = require("./routers/user_router")
const adminRoute = require("./routers/admin_router")
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const db = require('./models/database');
const { getAllFlights } = require('./models/database');
const { redirect } = require('express/lib/response');


const port = 8000;


const app = express();


app.set("view engine", "njk")
app.use(express.static(path.join(__dirname, 'public')))

nunjucks.configure(['views/'], {
    autoescape: false,
    express: app
})

app.use("/user", userRoute)
app.use("/admin", adminRoute)


app.get('/', function(req, res) {
    res.render("login.njk")
});

app.post('/', urlencodedParser, function(req, res) {
    let username = req.body.username
    let password = req.body.password
    let userdata = db.getUserByUsername(username)


    if (userdata.length == 0) { // check if username exest

    } else {
        let data = userdata[0]
        console.log(data)

        if (password == data.password) { // check if password correct

            if (db.getPassngerById(data.ID).length != 0) { // check user is a passenger
                console.log("login succsesfuly")
                res.redirect("/user")
            }

        }

    }
});

app.listen(port, () => {
    console.log(`Server listening on port http://127.0.0.1:${port}!`)
});