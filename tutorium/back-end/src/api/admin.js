'use strict'

module.exports = (app, passport, options) => {

    //------------------------------------------------------------------------------------------------------Dashboard---
    app.get('/api/admin/dashboard', (req, res, next) => {
        if (isAdmin(req) === false) {
            res.redirect('/api/admin/logout')
            return;
        }
        
    })

    //----------------------------------------------------------------------------------------admin-search-tutor-reqs---
    app.get('/api/admin/tutor-request-management', (req, res, next) => {
        if (isAdmin(req) === false) {
            res.redirect('/api/admin/logout')
            return;
        }

        let qry = require('../repository/admin')
        qry.adminSearchTutorRequest().then((result) => {
            if (result.count === 0){
                res.status(200).send({ 
                    success: false,
                    msg: 'No tutor request found!'
                })
            } else {
                res.status(200).send({ 
                    success: true, 
                    students: result.rows,
                    count: result.count 
                })
            }
        })
    })

    //----------------------------------------------------------------------------------admin-response-to-a-tutor-req---
    app.post('/api/admin/tutor-request-management', (req, res, next) => {
        if (isAdmin(req) === false) {
            res.redirect('/api/admin/logout')
            return;
        }

        let id = req.body.id
        let accept = req.body.accept
        let qry = require('../repository/admin')
        if (id != null) {
            if (accept === 'true') {
                qry.adminAcceptTutorRequest(id).then((result) => {
                    if (result > 0) {
                        res.status(200).send({ 
                            success: true,
                            msg: 'Accepted!'
                        })
                    } else {
                        res.status(500).send({ 
                            success: false,
                            msg: 'Failed to Accept!'
                        })
                    }
                })
            } else {
                qry.adminDeleteTutorRequest(id).then((result) => {
                    if (result > 0) {
                        res.status(200).send({ 
                            success: true,
                            msg: 'Deleted!'
                        })
                    } else {
                        res.status(500).send({ 
                            success: false,
                            msg: 'Failed to Delete!'
                        })
                    }
                })
            }
        } else {
            res.status(500).send({ 
                success: false,
                msg: 'Bugged!!!'
            })
        }
    })

    //----------------------------------------------------------------------------------------query-all-reported-user---
    app.get('/api/admin/report-management', (req, res, next) => {
        if (isAdmin(req) === false) {
            res.redirect('/api/admin/logout')
            return;
        }

        let qry = require('../repository/admin')
        qry.adminSearchAllReport().then((result) => {
            if (result.count === 0){
                res.status(200).send({ 
                    success: false,
                    msg: 'No report found!'
                })
            } else {
                res.status(200).send({ 
                    success: true, 
                    report: result.rows,
                    count: result.count 
                })
            }
        })
    })

    //-------------------------------------------------------------------------------------------response-to-a-report---
    app.post('/api/admin/report-management', (req, res, next) => {
        if (isAdmin(req) === false) {
            res.redirect('/api/admin/logout')
            return;
        }

        if (req.body.id) {
            let qry = require('../repository/admin')
            qry.adminSuspendStudent(req.body.id).then((result) => {
                res.status(200).send({ 
                    success: true, 
                    result: result
                })
            })
        } else {
            res.status(500).send({ 
                success: false,
                msg: 'Bugged!!!'
            })
        }
    })

    //---------------------------------------------------------------------------------------query-all-suspended-user---
    app.get('/api/admin/suspended-user-management', (req, res, next) => {
        if (isAdmin(req) === false) {
            res.redirect('/api/admin/logout')
            return;
        }

        let qry = require('../repository/admin')
        qry.adminSearchSuspendedAccount().then((result) => {
            if (result.count === 0){
                res.status(200).send({ 
                    success: false,
                    msg: 'No suspended account!'
                })
            } else {
                res.status(200).send({ 
                    success: true, 
                    result: result
                })
            }
        })
    })

    //-----------------------------------------------------------------------------------------------unsuspend-a-user---
    app.post('/api/admin/suspended-user-management', (req, res, next) => {
        if (isAdmin(req) === false) {
            res.redirect('/api/admin/logout')
            return;
        }

        if (req.body.id) {
            let qry = require('../repository/admin')
            qry.adminUnsuspendAccount(req.body.id).then((result) => {
                if (result === 0) {
                    res.status(400).send({ 
                        success: false,
                        msg: 'The account is not suspended'
                    })
                } else {
                    res.status(200).send({ 
                        success: true
                    })
                }
                
            })
        } else {
            res.status(400).send({ 
                success: false
            })
        }
    })

    //---------------------------------------------------------------------------------------query-all-delete-request---
    app.get('/api/admin/delete-request-management', (req, res, next) => {
        if (isAdmin(req) === false) {
            res.redirect('/api/admin/logout')
            return;
        }
    })

    //-----------------------------------------------------------------------------------response-to-a-delete-request---
    app.post('/api/admin/delete-request-management', (req, res, next) => {
        if (isAdmin(req) === false) {
            res.redirect('/api/admin/logout')
            return;
        }
    })
}

//------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------check-if-the-user-is-an-admin---
function isAdmin (req) {
    return true;
    if (req.user.accountType === 'admin') {
        return true;
    } else return false;
}