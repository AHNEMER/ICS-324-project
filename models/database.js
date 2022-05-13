const sqlite = require('better-sqlite3');
const { prepare } = require('better-sqlite3/lib/methods/wrappers');
let path = require('path');
const db = new sqlite(path.resolve('AirlineBooking.db'), { fileMustExist: true });


getAllFlights = function() {
    return db.prepare('SELECT * FROM FLIGHT').all();
}

getFlightBynumber = function(n) {
    return db.prepare('SELECT * FROM FLIGHT WHERE flight_number = ?').get(n);
}

searchForFlight = function(date, source, destination) {
    return db.prepare('SELECT * FROM FLIGHT WHERE date = ? AND source_city = ? AND destenation = ?').all(date, source, destination);
}

searchForAvailableFlight = function(date, source, destination) {
    flights = db.prepare('SELECT * FROM FLIGHT WHERE date = ? AND source_city = ? AND destenation = ?').all(date, source, destination);

    availableFlights = []

    for (let i = 0; i < flights.length; i++) {


        if ((flighrHasEmptySeats(flights[i].flight_number))) {

            availableFlights.push(flights[i])
        }
    }

    return availableFlights;
}

searchForUnvailableFlight = function(date, source, destination) {
    flights = db.prepare('SELECT * FROM FLIGHT WHERE date = ? AND source_city = ? AND destenation = ?').all(date, source, destination);

    unavailableFlights = []

    for (let i = 0; i < flights.length; i++) {

        if (flighrHasNoEmptySeats(flights[i].flight_number)) {
            unavailableFlights.push(flights[i])
        }

    }
    return unavailableFlights;
}

getTicket = function(flightNumber, seat) {
    return db.prepare('SELECT * FROM TICKET WHERE flight_number = ? AND seat = ? AND is_booked = ?').all(flightNumber, seat, "F");
}

getTicketByID = function(ID) {
    return db.prepare('SELECT * FROM TICKET WHERE ticket_ID = ?').all(ID);
}

getAllTickets = function(flightNumber) {
    return db.prepare('SELECT * FROM TICKET WHERE flight_number = ? AND is_booked = ?').all(flightNumber, "F");
}

getUserTickets = function(ID) {
    return db.prepare('SELECT * FROM TICKET WHERE pass_ID = ?').all(ID);
}

getUserTicketsInfo = function(ID) {
    return db.prepare('SELECT T.* , F.destenation, F.source_city  FROM TICKET T, FLIGHT F  WHERE pass_ID = ? AND T.flight_number = F.flight_number').all(ID);
}

getFlightClasses = function(flight_number) {
    return db.prepare('SELECT class FROM TICKET WHERE flight_number = ?').all(flight_number);
}

getWaitlist = function(flight_number) {
    return db.prepare('SELECT ticket_type FROM WAITLIST WHERE flight_number = ?').all(flight_number);
}

getUserTicketsPerFlight = function(userId, flight_number) {
    return db.prepare('SELECT COUNT(seat) as number FROM TICKET WHERE pass_ID = ? AND flight_number = ?').get(userId, flight_number);

}


countTicketsPerFlight = function(flight_number) {
    return db.prepare('SELECT COUNT(seat) as number FROM TICKET WHERE flight_number = ? AND is_booked = ?').all(userId, "F");
}

bookTicket = function(pass_ID, ID) {
    db.prepare('UPDATE TICKET SET pass_ID = ?, is_booked = ? WHERE ticket_ID = ?').run(pass_ID, "T", ID);
}

modifiyBookTicket = function(pass_ID, oldTicketID, newTicketID) {

    unBookTicket(oldTicketID)
    bookTicket(pass_ID, newTicketID)

}

unBookTicket = function(ID) {
    db.prepare('UPDATE TICKET SET pass_ID = ?, is_booked = ? WHERE ticket_ID = ?').run(null, "F", ID);
}

getPrice = function(flight_number, ticketClass) {
    flightPrice = db.prepare('SELECT price FROM FLIGHT WHERE flight_number = ? ').get(flight_number);
    classPrice = db.prepare('SELECT price FROM CLASS WHERE type = ? ').get(ticketClass);
    return flightPrice.price + classPrice.price

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

flighrHasNoEmptySeats = function(flightNumber) {
    hasTickets = db.prepare('SELECT * FROM TICKET WHERE flight_number = ? AND is_booked = ?').all(flightNumber, "F");

    if (hasTickets.length != 0) {
        return false
    } else {
        return true
    }

}

getCurrentActiveFlight = function() {
    activeFlight = db.prepare('SELECT * FROM FLIGHT WHERE date = ?').all(flight_number, date, time, plant_id, destenation, source_city)

    if (date == new Date().toString().slice(0, 10)) {
        return activeFlight;
    } else {
        return false
    }
}


deleteBookedSeat = function(pass_ID) {
    if (date <= Date().toString().slice(0, 10)) {
        return pass_ID = null
    } else return false
}

addPayment = function(amount, passengr_id) {

    db.prepare('INSERT INTO PAYMENT(amount, pass_ID) VALUES(?,?);').run(amount, passengr_id)

}


addFlight = function(date, time, price, destination, source_city, gate_number, plane_id) {

    db.prepare('INSERT INTO FLIGHT(date, time, destenation, price ,source_city, gate_number, plane_id) VALUES(?,?,?,?,?,?,?);').run(date, time, destination, price, source_city, gate_number, plane_id)

}

addTicket = function(date, time, weight, seat, Class, flight_number, adminID) {

    db.prepare('INSERT INTO TICKET(date, time, weight ,seat, class, is_booked, flight_number, admin_ID) VALUES(?,?,?,?,?,?,?,?);').run(date, time, weight, seat, Class, "F", flight_number, adminID)

}


module.exports = { getAllFlights, getFlightBynumber, searchForFlight, getUserByUsername, getPassngerById, getAdminById, getUserTicketsInfo, getUserTicketsPerFlight, getTicket, getTicketByID, getAllTickets, bookTicket, modifiyBookTicket, getPrice, flighrHasEmptySeats, searchForAvailableFlight, searchForUnvailableFlight, addPayment, getCurrentActiveFlight, getWaitlist, deleteBookedSeat, getFlightClasses, addFlight, addTicket }