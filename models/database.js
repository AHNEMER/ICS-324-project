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

searchForAvailableFlight = function(date, source, destination) {
    flights = db.prepare('SELECT * FROM FLIGHT WHERE date = ? AND source_city = ? AND destenation = ?').all(date, source, destination);

    availableFlights = []

    for (let i = 0; i < flights.length; i++) {

        if (flighrHasEmptySeats(flights[i].flight_number)) {
            availableFlights.push(flights[i])
        }

    }
    return availableFlights;
}

getTicket = function(flightNumber, seat) {
    return db.prepare('SELECT * FROM TICKET WHERE flight_number = ? AND seat = ? AND is_booked = ?').all(flightNumber, seat, "F");
}

getTicketByID = function(ID) {
    return db.prepare('SELECT * FROM TICKET WHERE ticket_ID = ? AND is_booked = ?').all(flightNumber, "F");
}

getAllTickets = function(flightNumber) {
    return db.prepare('SELECT * FROM TICKET WHERE flight_number = ? AND is_booked = ?').all(flightNumber, "F");
}

getPrice = function(ticket) {
    flightPrice = db.prepare('SELECT price FROM FLIGHT WHERE flight_number = ? ').get(ticket.flight_number);
    classPrice = db.prepare('SELECT price FROM CLASS WHERE type = ? ').get(ticket.class);
    return flightPrice + classPrice

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

flighrHasEmptySeats = function(flightNumber) {
    hasTickets = db.prepare('SELECT * FROM TICKET WHERE flight_number = ? AND is_booked = ?').all(flightNumber, "F");

    if (hasTickets.length == 0) {
        return false
    } else {
        return true
    }

}







bookeat = function(date, time, weight, flight_number, pass_ID, admin_ID) {
    db.prepare('INSERT INTO TICKET(date, time, weight, flight_number, pass_ID, admin_ID) VALUES("' + date + '", "' + time + '");').run()
}

AddPayment = function(amount, passengr_id) {
    db.prepare('INSERT INTO PAYMENT(amount , pass_ID) VALUES("' + amount + '", "' + passengr_id + '");').run()

}

module.exports = { getAllFlights, searchForFlight, getUserByUsername, getPassngerById, getAdminById, getTicket, getTicketByID, getAllTickets, flighrHasEmptySeats, searchForAvailableFlight }