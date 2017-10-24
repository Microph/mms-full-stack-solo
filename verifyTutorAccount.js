func verifyTutorAccount() {
    if is not admin {
        print("This area is only for admins.")
        return
    }

    if userInput.approve {
        queryInsertTutor() 
    }

    queryDeleteRequestTutorAccount()
    notifyTutor()
    return
}