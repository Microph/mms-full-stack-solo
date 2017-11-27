const payment = require('./payment');

describe('test get card', () => {
    test('get dummy card', async () => {
        const studentID = 1;
        const dummyCard = await payment.getCard(studentID);
        for (let a=0; a< dummyCard.count; a++){
            dummyValue = dummyCard.rows[a].dataValues;
            // expect studentID to be the same
            expect(dummyValue.studentID).toEqual(studentID);
            // expect card number to be 16 digit
            expect(dummyValue.cardNO).toMatch(/\d{16}/);
            // expect card holder to be Thai or English character
            expect(dummyValue.cardHolder).toMatch(/[\u0E00-\u0E7Fa-zA-Z\s]{1,200}/);
            // expect CVV to be 3 digit
            expect(dummyValue.CVV).toMatch(/\d{3}/);
            // expect expire month to be 01 - 12
            expect(dummyValue.expireMonth).toMatch(/0[123456789]|(1[012])/);
            // expect expire year to be 2 digit
            expect(dummyValue.expireYear).toMatch(/\d{2}/);
        }
    })

    test('get invalid id', async () => {
        // expect to get nothing
        const invalidCard = await payment.getCard(0);
        expect(invalidCard.count).toEqual(0);
    })
});

describe('test add card', () => {
    test('add new card', async () => {
        const studentID = 1;
        const userInput = {
            cardNO: 1234567890123456,
            cardHolder: 'Chris Redfield',
            CVV: 123,
            expireMonth: '01',
            expireYear: '20'
        };
        const card = await payment.addCard(studentID, userInput);
        // should create new card
        expect(card.created).toEqual(true);
        // card detail should be the same as input
        expect(card.card.studentID).toEqual(studentID);
        expect(card.card.cardNO).toEqual(userInput.cardNO);
        expect(card.card.cardHolder).toEqual(userInput.cardHolder);
        expect(card.card.CVV).toEqual(userInput.CVV);
        expect(card.card.expireMonth).toEqual(userInput.expireMonth);
        expect(card.card.expireYear).toEqual(userInput.expireYear);
    });

    test('add invalid id', () => {
        const userInput = {
            cardNO: 1234567890123456,
            cardHolder: 'Chris Redfield',
            CVV: 123,
            expireMonth: '01',
            expireYear: '20'
        };
        // should be undefined
        return expect(payment.addCard(0, userInput)).resolves.toBeUndefined();
    });
});

describe('test update card', () => {
    test('update dummy card', () => {
        const userInput = {
            cardNO: 2039582036451768,
            cardHolder: 'Jonathan Joestar',
            CVV: 224,
            expireMonth: '12',
            expireYear: '22'
        };
        // should success
        return expect(payment.updateCard(1, userInput)).resolves.toEqual(1);
    });

    test('update invalid student', () => {
        const userInput = {
            cardNO: 2039582036451768,
            cardHolder: 'Jonathan Joestar',
            CVV: 224,
            expireMonth: '12',
            expireYear: '22'
        };
        // should fail
        return expect(payment.updateCard(0, userInput)).resolves.toEqual(0);
    });
});

describe('test delete card', () => {
    test('delete dummy card', () => {
        // should success
        return expect(payment.deleteCard(1, 1234567890123456)).resolves.toEqual(1);
    });

    test('delete non-exist card', () => {
        // should fail
        return expect(payment.deleteCard(1, 3748959393838818)).resolves.toEqual(0);
    });

    test('delete invalid student', () => {
        // should fail
        return expect(payment.deleteCard(0, 1234567890123456)).resolves.toEqual(0);
    });
});