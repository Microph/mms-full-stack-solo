func cancelReservation() {
    if is not students {
        print("This area is only for the student.")
        return
    } else if is not booking {
        print("There is no any reservation to cancel.")
        return
    }

    bookingID = userInput.bookingID
    queryDeleteBooking()
    return
}