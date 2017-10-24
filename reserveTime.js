func reserveTime() {
    if is not student {
        print("This area is only for students.")
        return
    }

    availableTime = getAvailableTime(Matching.tutorID)
    
    if userInput.reserveTime is not in availableTime {
        print("Tutor is not avaiable at your selected time")
        return
    }

    payDownPayment()
    queryInsertBooking()
    return
}