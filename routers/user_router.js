const express = require('express');
const { getAllFlights } = require('../models/database');
const db = require('../models/database');


let router = express.Router();

router.get('/', function(req, res) {
    res.render("search.njk")

})

router.get('/myTickets', function(req, res) {

})

router.get('/myAccount', function(req, res) {

})

router.get('/search', function(req, res) {
    res.render("search.njk")
})

router.get('/search/results', function(req, res) {
    res.render("result.njk", {
        getAllFlights: getAllFlights
    })
})

router.get('/:ticketID/book', function(req, res) {

})

router.get('/:ticketID/book/payment', function(req, res) {

})







module.exports = router;