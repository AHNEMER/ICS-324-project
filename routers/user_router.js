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

router.get('/:userID/search', function(req, res) {
    userID = req.params.userID
    res.render("search.njk", {
        userID: userID
    })
})

router.post('/:userID/search', urlencodedParser, function(req, res) {
    userID = req.params.userID
    let date = req.body.date
    let source = req.body.source
    let destination = req.body.destination

    console.log(req.body)
        // let flights = db.searchForFlight



    res.redirect("/user/" + userID + "/search/results")
})

router.get('/:userID/search/results', function(req, res) {
    userID = req.params.userID

    res.render("result.njk", {
        userID: userID,
        getAllFlights: getAllFlights
    })
})

router.get('/:userID/:flightNumber/book', function(req, res) {
    userID = req.params.userID
    res.render("pickSeat.njk", { userID: userID })
})


router.post('/:userID/:flightNumber/book', urlencodedParser, function(req, res) {
    userID = req.params.userID
    flightNumber = req.params.flightNumber
    seatNumber = req.body.seatNumber
    ticket = db.getTicket(flightNumber, seatNumber)
    bookedTicket = ticket[0]




    res.redirect("/" + userID + "/" + flightID + "/" + bookedTicket.ticket_ID + "/book/payment")
})


router.get('/:userID/:flightNumber/:ticketID/book/payment', function(req, res) {
    userID = req.params.userID
    flightNumber = req.params.flightNumber
    ticketID = req.params.ticketID


    res.render("payment.njk", { userID: userID })
})







module.exports = router;