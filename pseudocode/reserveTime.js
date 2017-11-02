func reserveTime() {
    if is not student {
        print("This area is only for students.")
        return
    }

    availableTime = getAvailableTime(Matching.tutorID)
    
    if userInput.reserveTime is not in availableTime {
        print("Tutor is not avaiable at your selected time")
        getInputReserveTime()
        return
    } else if userInput.payViaBankAccount {
        payDownSuccess = payDownBankAccount()
    } else {
        payDownSuccess = payDownCreditCard()
    }

    if not payDownSuccess {
        print("Payment transaction is failed, please try again")
        return
    }
    
    queryInsertBooking()
    notifyTutor()
    return
}