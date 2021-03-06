'use strict'

module.exports = (app, passport, options) => {

    //------------------------------------------------------------------------------------------------------------------
    app.post('/api/user-write-report', (req, res, next) => {
        if (!req.body.reporterStudentID || !req.body.topic || !req.body.detail){
            res.status(500).send({ 
                success: false
            })
        } else {
        let qry = require('../repository/report')
            qry.userWriteReport(req.body.reporterStudentID, req.body.reportedStudentID, req.body.topic, req.body.detail).then((result) => {
                res.status(200).send({ 
                    success: true
                })
            })
        }
    })

}