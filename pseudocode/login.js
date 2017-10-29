func login() {
    if loginWithFacebook {
        facebook = performFacebookLogin()
        token = facebook.token
        id = facebook.userID
    } else {
        line = performLineLogin()
        token = line.token
        id = line.userID
    }

    querySelectUserID()
    return
}