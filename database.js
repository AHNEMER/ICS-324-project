const db = require('better-sqlite3')('AirlineBooking.db');


getAllFlights = function() {
    return db.prepare('SELECT * FROM FLIGHT').all();
}

searchForFlight = function(date, source, destination) {
    return db.prepare('SELECT * FROM FLIGHT WHERE date = ' + date + ' AND source_city = ' + source + ' AND destenation = ' + destination).all();
}