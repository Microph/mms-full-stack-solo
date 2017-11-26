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

const CreditCard = sequelize.define('creditCard', {
    studentID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    cardNO: {
        type: Sequelize.STRING(16),
        primaryKey: true
    },
    cardHolder: {
        type: Sequelize.STRING(200),
        allowNull: false
    },
    CVV: {
        type: Sequelize.STRING(3),
        allowNull: false
    },
    expireMonth: {
        type: Sequelize.STRING(2),
        allowNull: false
    },
    expireYear: {
        type: Sequelize.STRING(2),
        allowNull: false
    }
})

const Match = sequelize.define('match', {
    studentID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    tutorID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    subject: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    studentConfirm: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    time: Sequelize.STRING(1500)
})

const Suspended = sequelize.define('suspended', {
    studentID: { 
        type: Sequelize.INTEGER,
        primaryKey: true 
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

const TutorRequest = sequelize.define('tutorRequest', {
    studentID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    tutorID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    subject: {
        type: Sequelize.STRING(100),
        allowNull: false
    }
})

/* #### 1-1 Relations #### */
Account.belongsTo(Student, { 
    foreignKey: 'studentID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Match.belongsTo(Student, {
    foreignKey: 'studentID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Match.belongsTo(Tutor, {
    foreignKey: 'tutorID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Tutor.belongsTo(Student, {
    foreignKey: 'studentID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

TutorRequest.belongsTo(Student, {
    foreignKey: 'studentID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

TutorRequest.belongsTo(Tutor, {
    foreignKey: 'tutorID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Suspended.belongsTo(Student,{
    foreignKey: 'studentID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

/* #### 1-Many Relations #### */
Student.hasMany(CreditCard, {
    foreignKey: 'studentID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Student.hasMany(Report, {
    foreignKey: 'studentID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

sequelize.sync()

module.exports = {
    Account: Account,
    Admin: Admin,
    CreditCard: CreditCard,
    Report: Report,
    Match: Match,
    Student: Student,
    Suspended: Suspended,
    Tutor: Tutor,
    TutorRequest: TutorRequest
}