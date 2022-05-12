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
noFlights = false
seatIsBooked = false

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

    var minDate = new Date();
    minDate.setDate(minDate.getDate() + 1);
    minDate = minDate.toISOString().slice(0, 10)

    res.render("search.njk", {
        userID: userID,
        noFlights: noFlights,
        minDate: minDate

    })
})

router.post('/:userID/search', urlencodedParser, function(req, res) {
        userID = req.params.userID
        date = req.body.date
        source = req.body.source
        destination = req.body.destination

        console.log(req.body)


        res.redirect("/user/" + userID + "/search/results")
    })
    /////////////////////////////////////////////////////////////////////////////////////////

router.get('/:userID/search/results', function(req, res) {
    userID = req.params.userID
    flights = db.searchForAvailableFlight(date, source, destination)
    if (flights.length == 0) {
        noFlights = true
        res.redirect("/user/" + userID + "/search")
    } else {
        res.render("result.njk", {
            userID: userID,
            flights: flights
        })
    }
})

router.post('/:userID/search/results', function(req, res) {
        userID = req.params.userID

    })
    /////////////////////////////////////////////////////////////////////////////////////////

router.get('/:userID/:flightNumber/book', function(req, res) {
    userID = req.params.userID
    flightNumber = req.params.flightNumber
    tickets = db.getAllTickets(flightNumber)

    res.render("pickSeat.njk", {
        userID: userID,
        flightNumber: flightNumber,
        tickets: tickets
    })
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

    userID = req.params.userID
    flightNumber = req.params.flightNumber
    ticketID = req.params.ticketID

    ticket = db.getTicketByID(ticketID)
    bookedTicket = ticket[0]
    price = db.getPrice(bookedTicket.flight_number, bookedTicket.class)

    res.render("payment.njk", { flightNumber: flightNumber, ticket: bookedTicket, price: price })

})


router.post('/:userID/:flightNumber/:ticketID/book/payment', urlencodedParser, function(req, res) {
    userID = req.params.userID
    flightNumber = req.params.flightNumber
    ticketID = req.params.ticketID

    cardNumber = req.body.cardNumber
    endDate = req.body.endDate
    cvv = req.body.cvv
    holderName = req.body.holderName

    payentValed = true
        //some payment valedation

    if (payentValed) {

        ticket = db.getTicketByID(ticketID)
        bookedTicket = ticket[0]
        price = db.getPrice(bookedTicket.flight_number, bookedTicket.class)

        db.addPayment(price, userID)
        db.bookTicket(userID, ticketID)

    } else {

    }

    db.bookTicket(userID, ticketID)


    res.render("payment.njk", { userID: userID })
})








module.exports = router;