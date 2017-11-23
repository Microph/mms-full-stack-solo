export function searchForStudent(filters = undefined) {
    return new Promise((resolve, reject) => {
        if(filters) {
            let sql =   "SELECT * " +
                        "FROM student WHERE "
            let condition = ""

            Object.keys(filters).forEach((key) => {
                if(condition) {
                    condition += " AND " + key + " = " + "'" + filters[key] + "'"
                } else {
                    condition = key + " = " + "'" + filters[key] + "'"
                }
            })

            sql += condition

            this.connection.query(sql, (err, results) => {
                if(err) {
                    return reject(new Error('An error occured getting the users: ' + err))
                }

                if(results.length === 0) {
                    resolve(undefined)
                } else {
                    resolve(results)
                }
            })
        } else {
            let sql =   "SELECT * " +
                        "FROM student"

            this.connection.query(sql, (err, results) => {
                if(err) {
                    return reject(new Error('An error occured getting the users: ' + err))
                }

                if(results.length === 0) {
                    resolve(undefined)
                } else {
                    resolve(results)
                }
            })
        }
    })
}

export function searchForTutor(filters = undefined) {
    return new Promise((resolve, reject) => {
        if(filters) {
            let sql =   "SELECT * " +
                        "FROM tutor " +
                        "WHERE isApproved"
            let condition = ""
            
            Object.keys(filters).forEach((key) => {
                condition += " AND " + key + " = " + "'" + filters[key] + "'"
            })

            sql += condition
            
            this.connection.query(sql, (err, results) => {
            if(err) {
                return reject(new Error('An error occured getting the users: ' + err))
            }

            if(results.length === 0) {
                resolve(undefined)
            } else {
                resolve(results)
            }
            })
        } else {
            let sql =   "SELECT T.*, S.name, S.surname, S.gender " +
                        "FROM tutor T, student S " +
                        "WHERE T.isApproved AND T.studentID = S.studentID"

            this.connection.query(sql, (err, results) => {
                if(err) {
                    return reject(new Error('An error occured getting the users: ' + err))
                }

                if(results.length === 0) {
                    resolve(undefined)
                } else {
                    resolve(results)
                }
            })
        }
    })
}