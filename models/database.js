const sqlite = require('better-sqlite3');
const { prepare } = require('better-sqlite3/lib/methods/wrappers');
let path = require('path');
const db = new sqlite(path.resolve('AirlineBooking.db'), { fileMustExist: true });


getAllFlights = function() {
    return db.prepare('SELECT * FROM FLIGHT').all();
}

searchForFlight = function(date, source, destination) {
    return db.prepare('SELECT * FROM FLIGHT WHERE date = ' + date + ' AND source_city = ' + source + ' AND destenation = ' + destination).all();
}








bookeat = function(date, time, weight, flight_number, pass_ID, admin_ID) {
    db.prepare('INSERT INTO TICKET(date, time, weight, flight_number, pass_ID, admin_ID) VALUES("' + date + '", "' + time + '");').run()
}

AddPayment = function(amount, passengr_id) {
    db.prepare('INSERT INTO PAYMENT(amount , pass_ID) VALUES("' + amount + '", "' + passengr_id + '");').run()

}

module.exports = { getAllFlights, searchForFlight }