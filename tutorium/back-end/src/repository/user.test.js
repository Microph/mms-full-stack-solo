const user = require('./user');

describe('test admin authentication', () => {
    test('test dummy id', () => {
        // should login successfully
        return expect(user.adminAuthen('tutorium', 'tutorium')).resolves.toBeTruthy();
    });

    test('invalid id', () => {
        // should fail
        return expect(user.adminAuthen('kirito', 'theblackswordman')).resolves.toBeNull();
    });
});

describe('test find user by id', () => {
    test('find dummy student', async () => {
        const accountID = '107701540010684';
        const accountType = 'facebook'
        const student = await user.findUserByAccountID(accountID, accountType);
        // student ID should be the same
        expect(student.accountID).toEqual(accountID);
        // account type should be the same
        expect(student.accountType).toEqual(accountType);
    });

    test('find non-exist student', () => {
        // should find nothing
        return expect(user.findUserByAccountID('dummyInvalid', 'line')).resolves.toBeNull();
    });
});

describe('test register', () => {
    test('create new account', async () => {
        const accountID = 'dummyValid';
        const accountType = 'facebook';
        const userInput = {
            name: 'Mark',
            surname: 'Zuckerberg',
            gender: 'male',
            educationLevel: 'doctor',
            facebookURL: 'https://www.facebook.com/zuck',
            lineID: null,
            email: 'markzuck@facebook.com',
            mobile: '0123456789'
        }
        const account = await user.register(accountType, accountID, userInput);
        // should be created
        expect(account.created).toEqual(true);
        // studentID should be in range of 1 - 2147483648
        expect(account.studentID).toBeGreaterThanOrEqual(1);
        expect(account.studentID).toBeLessThanOrEqual(2147483648);
    });

    test('invalid register', () => {
        // should fail
        const userInput = {
            name: 'Ben',
            surname: 'tham',
            gender: 'tranny',
            educationLevel: 'baroque',
            facebookURL: null,
            lineID: null,
            email: 'bonclay@baroque.work',
            mobile: '0222222222'
        }
        return expect(user.register('internalLine', 'InvalidDummyID', userInput)).resolves.toBeUndefined();
    });
});

describe('test delete account', () => {
    test('delete dummy account', () => {
        // should success
        return expect(user.deleteStudentAccount(1)).resolves.toEqual(1);
    })

    test('delete non-exist account', () => {
        // should fail
        return expect(user.deleteStudentAccount(255)).resolves.toEqual(0);
    })

    test('delete invalid account', () => {
        // should be undefined
        return expect(user.deleteStudentAccount(0)).resolves.toBeUndefined();
    })
});