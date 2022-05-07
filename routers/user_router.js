const express = require('express');
const { getAllFlights } = require('../models/database');
const db = require('../models/database');
const { redirect } = require('express/lib/response');

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })



let router = express.Router();

router.get('/', function(req, res) {
    res.render("search.njk")

})

router.get('/myTickets', function(req, res) {

})

router.get('/myAccount', function(req, res) {

})

router.get('/:username/search', function(req, res) {
    username = req.params.username
    res.render("search.njk", {
        username: username
    })
})

router.post('/:username/search', urlencodedParser, function(req, res) {
    username = req.params.username
    let date = req.body.date
    let source = req.body.source
    let destination = req.body.destination
    console.log(req.body)
        // let flights = db.searchForFlight



    res.redirect("/user/" + username + "/search/results")
})

router.get('/:username/search/results', function(req, res) {

    res.render("result.njk", {
        getAllFlights: getAllFlights
    })
})

router.get('/:ticketID/book', function(req, res) {

})

router.get('/:ticketID/book/payment', function(req, res) {

})







module.exports = router;