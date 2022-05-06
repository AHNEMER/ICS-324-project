const express = require('express');
let nunjucks = require('nunjucks');
let path = require('path');

const port = 8080;

const app = express();

app.set("view engine", "njk")
app.use(express.static(path.join(__dirname, 'public')))

nunjucks.configure(['views/'], {
    autoescape: false,
    express: app
})


app.listen(port, () => {
    console.log(`Server listening on port http://127.0.0.1:${port}!`)
});