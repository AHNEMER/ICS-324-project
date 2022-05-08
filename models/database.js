const sqlite = require('better-sqlite3');
const { prepare } = require('better-sqlite3/lib/methods/wrappers');
let path = require('path');
const db = new sqlite(path.resolve('AirlineBooking.db'), { fileMustExist: true });


getAllFlights = function() {
    return db.prepare('SELECT * FROM FLIGHT').all();
}

searchForFlight = function(date, source, destination) {
    return db.prepare('SELECT * FROM FLIGHT WHERE date = ? AND source_city = ? AND destenation = ?').all(date, source, destination);
}

getTicket = function(flightNumber, seat) {
    return db.prepare('SELECT * FROM TICKET WHERE flight_number = ? AND seat = ?').all(flightNumber, seat);
}

getUserByUsername = function(username) {
    return db.prepare('SELECT * FROM USER WHERE username = ?').all(username);
}

getPassngerById = function(id) {
    return db.prepare('SELECT * FROM PASSNGER WHERE pass_id = ?').all(id);
}

getAdminById = function(id) {
    return db.prepare('SELECT * FROM ADMIN WHERE admin_id = ?').all(id);
}









bookeat = function(date, time, weight, flight_number, pass_ID, admin_ID) {
    db.prepare('INSERT INTO TICKET(date, time, weight, flight_number, pass_ID, admin_ID) VALUES("' + date + '", "' + time + '");').run()
}

AddPayment = function(amount, passengr_id) {
    db.prepare('INSERT INTO PAYMENT(amount , pass_ID) VALUES("' + amount + '", "' + passengr_id + '");').run()

}

module.exports = { getAllFlights, searchForFlight, getUserByUsername, getPassngerById, getAdminById, getTicket }