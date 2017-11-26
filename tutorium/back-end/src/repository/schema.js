'use strict'

let config = require('../../config/config')
let Sequelize = require('sequelize')

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: 'mysql',
    port: 3306,
    define: {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    }
})

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.(Sequelize)');
}).catch(err => {
    console.error('Unable to connect to the database(Sequelize):', err);
})

/* #### Define Table #### */
const Account = sequelize.define('account', {
    studentID: { 
        type: Sequelize.INTEGER, 
        primaryKey: true 
    },
    accountType: { 
        type: Sequelize.STRING(20), 
        allowNull: false 
    },
    accountID: { 
        type: Sequelize.STRING(200), 
        allowNull: false 
    },
    isTutor: { 
        type: Sequelize.BOOLEAN, 
        allowNull: false, 
        defaultValue: false 
    }
})

const Admin = sequelize.define('admin', {
    username: { 
        type: Sequelize.STRING(20), 
        primaryKey: true 
    },
    password: {
        type: Sequelize.STRING, 
        allowNull: false 
    }
})

const Report = sequelize.define('report', {
    reportID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    reporterStudentID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    reportedStudentID: {
        type: Sequelize.INTEGER
    },
    topic: {
        type: Sequelize.STRING(200),
        allowNull: false
    },
    detail: {
        type: Sequelize.STRING(2000),
        allowNull: false
    }
})

const Student = sequelize.define('student', {
    studentID: { 
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true 
    },
    name: { 
        type: Sequelize.STRING(45), 
        allowNull: false 
    },
    surname: { 
        type: Sequelize.STRING(45), 
        allowNull: false 
    },
    gender: {
        type: Sequelize.ENUM('male','female','others'),
        allowNull: false
    },
    educationLevel: {
        type: Sequelize.ENUM('pratom','matthayomton','matthayomplai','bachelor','master','doctor'),
        allowNull: false
    },
    facebookURL: Sequelize.STRING(100),
    lineID: Sequelize.STRING(50),
    email: { 
        type: Sequelize.STRING(100), 
        allowNull: false 
    },
    mobile: { 
        type: Sequelize.STRING(10), 
        allowNull: false 
    },
    wantList: Sequelize.STRING(2000),
    place: Sequelize.STRING(1000),
    time: Sequelize.STRING(1500),
    isBanned: {
        type: Sequelize.BOOLEAN, 
        defaultValue: false 
    }
})

const Tutor = sequelize.define('tutor', {
    studentID: { 
        type: Sequelize.INTEGER, 
        primaryKey: true 
    },
    education: { 
        type: Sequelize.STRING(2000), 
        allowNull: false 
    },
    teachList: { 
        type: Sequelize.STRING(2000), 
        allowNull: false 
    },
    place: { 
        type: Sequelize.STRING(1000), 
        allowNull: false 
    },
    time: { 
        type: Sequelize.STRING(1500), 
        allowNull: false 
    },
    uploadEvidence: Sequelize.STRING(2000),
    isApproved: { 
        type: Sequelize.BOOLEAN, 
        defaultValue: false }
})

/* #### Relations #### */
Account.belongsTo(Student, { 
    foreignKey: 'studentID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Tutor.belongsTo(Student, {
    foreignKey: 'studentID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Student.hasMany(Report, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Report.belongsTo(Student, {
    foreignKey: 'studentID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

module.exports = {
    Account: Account,
    Admin: Admin,
    Student: Student,
    Tutor: Tutor,
    Report: Report
}