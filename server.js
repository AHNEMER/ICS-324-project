const express = require('express');
let nunjucks = require('nunjucks');
let path = require('path');

const port = 8080;

const userRoute = require("./routers/user_router")
const adminRoute = require("./routers/admin_router")

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
    res.render("base1.njk")
});



app.listen(port, () => {
    console.log(`Server listening on port http://127.0.0.1:${port}!`)
});