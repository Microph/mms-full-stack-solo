'use strict'

module.exports = (app, passport, options) => {

    //------------------------------------------------------------------------------------------------------Dashboard---
    app.get('/api/admin/dashboard', (req, res, next) => {
        if (isAdmin(req) === false) {
            res.redirect('/api/admin/logout')
            return;
        }
        
    })

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

        if (req.id != null) {
            if (req.accept === true) {
                
            } else {

            }
        } else {

        }
    })

    //----------------------------------------------------------------------------------------query-all-reported-user---
    app.get('/api/admin/report-management', (req, res, next) => {
        if (isAdmin(req) === false) {
            res.redirect('/api/admin/logout')
            return;
        }
    })

    //-------------------------------------------------------------------------------------------response-to-a-report---
    app.post('/api/admin/report-management', (req, res, next) => {
        if (isAdmin(req) === false) {
            res.redirect('/api/admin/logout')
            return;
        }
    })

    //---------------------------------------------------------------------------------------query-all-suspended-user---
    app.get('/api/admin/suspended-user-management', (req, res, next) => {
        if (isAdmin(req) === false) {
            res.redirect('/api/admin/logout')
            return;
        }
    })

    //-----------------------------------------------------------------------------------------------unsuspend-a-user---
    app.post('/api/admin/suspended-user-management', (req, res, next) => {
        if (isAdmin(req) === false) {
            res.redirect('/api/admin/logout')
            return;
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
    if (req.user.accountType === 'admin') {
        return true;
    } else return false;
}