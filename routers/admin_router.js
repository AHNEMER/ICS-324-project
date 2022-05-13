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

router.post('/:adminID/search', urlencodedParser,
    function(req, res) {
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

router.get('/:adminID/:flightNumber', function(req, res) {
    adminID = req.params.adminID
    flightNumber = req.params.flightNumber
    flight = db.getFlightBynumber(flightNumber)
    res.render("resultAdmin.njk", { adminID: adminID, flight: flight })
})

router.get('/waitlis', function(req, res) {

})



/////////////////////////////////////////////////////////////////////////////////////////


router.get('/:adminID/:flightNumber/addTicket', function(req, res) {
    adminID = req.params.adminID
    flightNumber = req.params.flightNumber
    flight = db.getFlightBynumber(flightNumber)
    res.render("resultAdmin.njk", { adminID: adminID, flight: flight })
})

router.get('/waitlis', function(req, res) {

})


////////////////////////////////////////////////////////////////////////////////////////


router.get('/:adminID/:flightNumber/bookTicket', function(req, res) {
    adminID = req.params.adminID
    flightNumber = req.params.flightNumber
    flight = db.getFlightBynumber(flightNumber)
    res.render("resultAdmin.njk", { adminID: adminID, flight: flight })
})

router.get('/waitlis', function(req, res) {

})


////////////////////////////////////////////////////////////////////////////////////////


router.get('/:adminID/:flightNumber/viewTickets', function(req, res) {
    adminID = req.params.adminID
    flightNumber = req.params.flightNumber
    flight = db.getFlightBynumber(flightNumber)
    res.render("resultAdmin.njk", { adminID: adminID, flight: flight })
})

router.get('/waitlis', function(req, res) {

})


////////////////////////////////////////////////////////////////////////////////////////


router.get('/:adminID/:flightNumber/waitlist', function(req, res) {
    adminID = req.params.adminID
    flightNumber = req.params.flightNumber
    flight = db.getFlightBynumber(flightNumber)
    res.render("resultAdmin.njk", { adminID: adminID, flight: flight })
})

router.get('/waitlis', function(req, res) {

})


////////////////////////////////////////////////////////////////////////////////////////


router.get('/:adminID/addflight', function(req, res) {
    adminID = req.params.adminID
    flightNumber = req.params.flightNumber
    flight = db.getFlightBynumber(flightNumber)
    res.render("resultAdmin.njk", { adminID: adminID, flight: flight })
})

router.get('/waitlis', function(req, res) {

})





module.exports = router;