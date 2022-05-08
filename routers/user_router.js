const express = require('express');
const { getAllFlights } = require('../models/database');
const db = require('../models/database');
const { redirect } = require('express/lib/response');

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

let router = express.Router();



date = null
source = null
destination = null

router.get('/', function(req, res) {
    res.render("search.njk")

})

router.get('/myTickets', function(req, res) {

})

router.get('/myAccount', function(req, res) {

    })
    /////////////////////////////////////////////////////////////////////////////////////////
router.get('/:userID/search', function(req, res) {
    userID = req.params.userID
    res.render("search.njk", {
        userID: userID
    })
})

router.post('/:userID/search', urlencodedParser, function(req, res) {
        userID = req.params.userID
        date = req.body.date
        source = req.body.source
        destination = req.body.destination

        console.log(req.body)
            // let flights = db.searchForFlight



        res.redirect("/user/" + userID + "/search/results")
    })
    /////////////////////////////////////////////////////////////////////////////////////////

router.get('/:userID/search/results', function(req, res) {
    userID = req.params.userID
    flights = db.searchForFlight(date, source, destination)
    console.log(flights)

    res.render("result.njk", {
        userID: userID,
        flights: flights
    })
})

router.post('/:userID/search/results', function(req, res) {
        userID = req.params.userID

    })
    /////////////////////////////////////////////////////////////////////////////////////////

router.get('/:userID/:flightNumber/book', function(req, res) {
    userID = req.params.userID
    flightNumber = req.params.flightNumber

    res.render("pickSeat.njk", { userID: userID, flightNumber: flightNumber })
})


router.post('/:userID/:flightNumber/book', urlencodedParser, function(req, res) {
    userID = req.params.userID
    flightNumber = req.params.flightNumber
    seatNumber = req.body.seatNumber
    ticket = db.getTicket(flightNumber, seatNumber)
    bookedTicket = ticket[0]


    res.redirect("/user/" + userID + "/" + flightNumber + "/" + bookedTicket.ticket_ID + "/book/payment")
})

/////////////////////////////////////////////////////////////////////////////////////////

router.get('/:userID/:flightNumber/:ticketID/book/payment', function(req, res) {

    res.render("payment.njk")
})


router.post('/:userID/:flightNumber/:ticketID/book/payment', urlencodedParser, function(req, res) {
    cardNumber = req.body.cardNumber
    endDate = req.params.endDate
    cvv = req.params.cvv
    cvv = req.params.cvv
    holderName = req.params.holderName


    res.render("payment.njk", { userID: userID })
})








module.exports = router;