func register(conditionAccept, registerType, title, name, surname, birthdate, description) {
    if conditionAccept == false {
        print("กรุณายอมรับเงื่อนไขการใช้งานก่อนสมัครใช้งาน")
        return
    }

    if registerType = 'Line' {
        accountID = lineLogin()

        registerSuccess =   INSERT INTO 'Student'
                            VALUES(AccountType = 'registerType',
                                    AccountID = 'accountID',
                                    title = 'title',
                                    name = 'name',
                                    surname = 'surname',
                                    birthdate = 'birthdate',
                                    description = 'description')
        
    } else {
        accountID = facebookLogin()
        
        registerSuccess =   INSERT INTO 'Student'
                            VALUES(AccountType = 'registerType',
                                    AccountID = 'accountID',
                                    title = 'title',
                                    name = 'name',
                                    surname = 'surname',
                                    birthdate = 'birthdate',
                                    description = 'description')
    }

    if registerSuccess == false {
        print("การลงทะเบียนล้มเหลว โปรดลองใหม่อีกครั้ง")
        return
    }

    return
}