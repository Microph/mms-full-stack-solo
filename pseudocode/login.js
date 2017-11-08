func login(loginType, username, password) {
    if loginType == 'facebook' {
        token, id = performFacebookLogin()
    } else if loginType == 'line' {
        token, id = performLineLogin()
    } else {
        id= SELECT username
            FROM 'Admin'
            WHERE username = 'username'
                AND password = 'password'
    }

    SESSIONS['token'], SESSION['id'] = token, id 
    return
}