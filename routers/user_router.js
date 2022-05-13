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
modifiy = false
payDifferance = false
userBookedMaxFlightsNumber = false
hasFirstClass = false
hasBussinesClass = false
hasEconomyClass = false

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
    noFlights = false
})

router.post('/:userID/search', urlencodedParser, function(req, res) {
        userID = req.params.userID
        date = req.body.date
        source = req.body.source
        destination = req.body.destination


        res.redirect("/user/" + userID + "/search/results")
    })
    /////////////////////////////////////////////////////////////////////////////////////////

router.get('/:userID/search/results', function(req, res) {
    userID = req.params.userID

    avilabelFlights = null
    avilabelFlights = db.searchForAvailableFlight(date, source, destination)



    waitlistFlights = null
    waitlistFlights = db.searchForUnvailableFlight(date, source, destination)





    if ((flights.length == 0) && (waitlistFlights.length == 0)) {
        noFlights = true
        res.redirect("/user/" + userID + "/search")
    } else {

        modifiy = false
        res.render("result.njk", {
            userID: userID,
            flights: avilabelFlights,
            waitlistFlights: waitlistFlights,
            modifiy: modifiy,
            userBookedMaxFlightsNumber: userBookedMaxFlightsNumber
        })
        userBookedMaxFlightsNumber = false

    }
})

router.post('/:userID/search/results', function(req, res) {
        userID = req.params.userID

    })
    /////////////////////////////////////////////////////////////////////////////////////////

router.get('/:userID/:flightNumber/book', function(req, res) {
    userID = req.params.userID
    flightNumber = req.params.flightNumber

    userFlights = db.getUserTicketsPerFlight(userID, flightNumber)
    numberOfUserFlights = userFlights.number

    if (numberOfUserFlights >= 10) {

        userBookedMaxFlightsNumber = true
        res.redirect("/user/" + userID + "/search/results")

    } else {

        tickets = db.getAllTickets(flightNumber)



        res.render("pickSeat.njk", {
            userID: userID,
            flightNumber: flightNumber,
            tickets: tickets
        })
    }
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

        //error: payment not valedation

    }

    db.bookTicket(userID, ticketID)


    res.redirect("/user/" + userID + "/search")
})

/////////////////////////////////////////////////////////////////////////////////////////

router.get('/:userID/tickets', function(req, res) {
    userID = req.params.userID
    tickets = db.getUserTicketsInfo(userID)

    res.render("myTickets.njk", {
        userID: userID,
        tickets: tickets
    })

})


router.post('/:userID/:ticketID/delete', urlencodedParser, function(req, res) {
    userID = req.params.userID
    ticketID = req.params.ticketID

    db.unBookTicket(userID)
    res.redirect("/user/" + userID + "/search")

})


/////////////////////////////////////////////////////////////////////////////////////////

router.get('/:userID/:flightNumber/:ticketID/modifiy', function(req, res) {
    userID = req.params.userID
    flightNumber = req.params.flightNumber
    ticketID = req.params.ticketID
    tickets = db.getAllTickets(flightNumber)

    modifiy = true

    res.render("pickSeat.njk", {
        userID: userID,
        flightNumber: flightNumber,
        ticketID: ticketID,
        tickets: tickets,
        modifiy: modifiy
    })

})

router.post('/:userID/:flightNumber/:ticketID/change_to/:newTicket', urlencodedParser, function(req, res) {
    userID = req.params.userID
    flightNumber = req.params.flightNumber

    ticketID = req.params.ticketID
    newTicket = req.params.newTicket


    oldBookedTicket_ = db.getTicketByID(ticketID)
    newBookedTicket_ = db.getTicketByID(newTicket)

    oldBookedTicket = oldBookedTicket_[0]
    newBookedTicket = newBookedTicket_[0]


    oldTicketPrice = db.getPrice(oldBookedTicket.flight_number, oldBookedTicket.class)
    newicketPrice = db.getPrice(newBookedTicket.flight_number, newBookedTicket.class)

    if (oldTicketPrice == newicketPrice) {

        db.modifiyBookTicket(userID, ticketID, newTicket)
        res.redirect("/user/" + userID + "/tickets")

    } else if (oldTicketPrice < newicketPrice) {

        res.redirect('/user/' + userID + '/' + flightNumber + '/' + ticketID + '/change_to/' + newTicket + '/payment')

    } else {
        db.modifiyBookTicket(userID, ticketID, newTicket)
            // price = oldTicketPrice - newicketPrice
            // refund(userID,price)
        res.redirect("/user/" + userID + "/tickets")


    }



    res.redirect("/user/" + userID + "/search")



})

router.get('/:userID/:flightNumber/:ticketID/change_to/:newTicket/payment', function(req, res) {
    userID = req.params.userID
    flightNumber = req.params.flightNumber

    ticketID = req.params.ticketID
    newTicket = req.params.newTicket


    oldBookedTicket_ = db.getTicketByID(ticketID)
    newBookedTicket_ = db.getTicketByID(newTicket)

    oldBookedTicket = oldBookedTicket_[0]
    newBookedTicket = newBookedTicket_[0]


    oldTicketPrice = db.getPrice(oldBookedTicket.flight_number, oldBookedTicket.class)
    newicketPrice = db.getPrice(newBookedTicket.flight_number, newBookedTicket.class)

    price = newicketPrice - oldTicketPrice

    payDifferance = true
    res.render("payment.njk", { userID: userID, flightNumber: flightNumber, ticket: newBookedTicket, payDifferance: payDifferance, price: price, oldBookedTicket: oldBookedTicket })
    payDifferance = false

})

router.post('/:userID/:flightNumber/:ticketID/change_to/:newTicket/payment', urlencodedParser, function(req, res) {

    userID = req.params.userID
    flightNumber = req.params.flightNumber

    ticketID = req.params.ticketID
    newTicket = req.params.newTicket



    cardNumber = req.body.cardNumber
    endDate = req.body.endDate
    cvv = req.body.cvv
    holderName = req.body.holderName

    payentValed = true
        //some payment valedation

    if (payentValed) {

        db.addPayment(price, userID)
        db.modifiyBookTicket(userID, ticketID, newTicket)

        res.redirect("/user/" + userID + "/tickets")


    } else {

        //error: payment not valedation

    }

})

/////////////////////////////////////////////////////////////////////////////////////////

router.get('/:userID/:flightNumber/waitlis', function(req, res) {
    userID = req.params.userID
    flightNumber = req.params.flightNumber

    classes = db.getFlightClasses(flightNumber)

    hasFirstClass = false
    hasBussinesClass = false
    hasEconomyClass = false


    firstClassTickets = 0
    bussinesTickets = 0
    economyTickets = 0


    waitlist = db.getWaitlist(flightNumber)

    for (let i = 0; i < waitlist.length; i++) {

        if (waitlist[i].ticket_type == "business") {
            bussinesTickets++
        }

        if (waitlist[i].ticket_type == "first class") {
            firstClassTickets++
        }

        if (waitlist[i].ticket_type == "economy") {
            economyTickets++
        }

    }




    if ((economyTickets > 0) || (economyTickets <= 10)) {
        hasEconomyClass = true
    }

    if ((firstClassTickets > 0) || (firstClassTickets <= 3)) {
        hasEconomyClass = true
    }


    if ((bussinesTickets > 0) || (bussinesTickets <= 3)) {
        hasBussinesClass = true
    }




    res.render("pickSeat.njk", {
        userID: userID,
        flightNumber: flightNumber,
        tickets: tickets


    })
})













module.exports = router;