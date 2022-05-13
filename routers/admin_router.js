const express = require('express');
const { getAllFlights } = require('../models/database');
const db = require('../models/database');
const { redirect } = require('express/lib/response');

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

let router = express.Router();

noFlights = false
flightNumber = null

/////////////////////////////////////////////////////////////////////////////////////////
router.get('/:adminID/search', function(req, res) {
    adminID = req.params.adminID

    res.render("searchAdmin.njk", { adminID: adminID, noFlights: noFlights })
    noFlights = false
})


router.post('/:adminID/search', urlencodedParser, function(req, res) {
    adminID = req.params.adminID
    flightNumber = req.body.flightNumber
    searchedFlights = db.getFlightBynumber(flightNumber)

    if (searchedFlights == null) {
        noFlights = true
        res.redirect("/admin/" + adminID + "/search")
    } else {

        res.redirect("/admin/" + adminID + "/" + flightNumber)
    }


})

/////////////////////////////////////////////////////////////////////////////////////////
router.get('/:adminID/addNewflight', function(req, res) {
    adminID = req.params.adminID

    res.render("addFlight.njk", { adminID: adminID })
})


router.post('/:adminID/addNewflight', urlencodedParser, function(req, res) {
    adminID = req.params.adminID
    date = req.body.date
    time = req.body.time
    destination = req.body.destination
    price = req.body.price
    source = req.body.source
    gateNumber = req.body.gateNumber
    planeID = req.body.planeID

    db.addFlight(date, time, price, destination, source, gateNumber, planeID)




    res.redirect("/admin/" + adminID + "/search")
})




/////////////////////////////////////////////////////////////////////////////////////////


router.get('/:adminID/:flightNumber', function(req, res) {
    adminID = req.params.adminID
    flightNumber = req.params.flightNumber
    flight = db.getFlightBynumber(flightNumber)
    res.render("resultAdmin.njk", { adminID: adminID, flight: flight })
})



/////////////////////////////////////////////////////////////////////////////////////////




router.get('/:adminID/:flightNumber/addTicket', function(req, res) {
    adminID = req.params.adminID
    flightNumber = req.params.flightNumber
    res.render("addTicket.njk", { adminID: adminID, flightNumber: flightNumber })

})

router.post('/:adminID/:flightNumber/addTicket', urlencodedParser, function(req, res) {
    adminID = req.params.adminID
    flightNumber = req.params.flightNumber

    flight = db.getFlightBynumber(flightNumber)


    weight = req.body.weight
    seat = req.body.seat
    Class = req.body.class

    db.addTicket(flight.date, flight.time, weight, seat, Class, flight.flight_number, adminID)
    res.redirect("/admin/" + adminID + "/" + adminID)


})




////////////////////////////////////////////////////////////////////////////////////////


router.get('/:adminID/:flightNumber/bookTicket', function(req, res) {
    adminID = req.params.adminID
    flightNumber = req.params.flightNumber

})




////////////////////////////////////////////////////////////////////////////////////////


router.get('/:adminID/:flightNumber/viewTickets', function(req, res) {
    adminID = req.params.adminID
    flightNumber = req.params.flightNumber

})




////////////////////////////////////////////////////////////////////////////////////////


router.get('/:adminID/:flightNumber/waitlist', function(req, res) {
    adminID = req.params.adminID
    flightNumber = req.params.flightNumber

})




////////////////////////////////////////////////////////////////////////////////////////









module.exports = router;