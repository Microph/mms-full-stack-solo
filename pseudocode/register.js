func register() {
    name = userInput.name
    surname = userInput.surname
    gender = userInput.gender
    address = userInput.address
    birthDate = userInput.birthDate
    bankAccount = userInput.bankAccount

    if facebookAuthen {
        id = facebook.userID
        IAccountType = FacebookAccount()
    } else {
        id = line.userID
        IAccountType = LineAccount()
    }

    queryInsertUserAccount()
    return
}