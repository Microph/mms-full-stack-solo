'use strict'

module.exports = (app, passport, options) => {
    app.post('api/admin/request-management', (req, res, next) => {
        if (req.id != null) {
            if (req.accept === true) {
                
            } else {

            }
        } else {

        }
    })

    app.get('api/admin/delete-request-management', (req, res, next) => {
        if (isAdmin(req)) {

        }
    })
}

function isAdmin (req) {
    if (req.user.accountType === 'admin') {
        return true;
    } else return false;
}