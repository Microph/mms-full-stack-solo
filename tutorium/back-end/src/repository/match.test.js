const match = require('./match');

describe('test get offer by student id', () => {
    test('get dummy offer', async () => {
        const dummyOffer = match.getOfferByStudentID(19);
        // should get one offer
        expect(dummyOffer.count).toEqual(1);
    });

    test('get invalid student id', () => {
        // should be undefined
        return expect(match.getOfferByStudentID(0)).resolves.toBeUndefined();
    });
});

describe('test get offer by tutor id', () => {
    test('get dummy offer', async () => {
        const dummyOffer = match.getOfferByTutorID(19);
        // should get one offer
        expect(dummyOffer.count).toEqual(1);
    })

    test('get invalid tutor id', () => {
        // should be undefined
        return expect(match.getOfferByTutorID(0)).resolves.toBeUndefined();
    });
});

describe('test accept offer', () => {
    test('accept dummy offer', () => {
        // should success
        return expect(match.acceptOffer(19, 19)).resolves.toEqual(1);
    });

    test('accept non-exist offer', () => {
        // should fail
        return expect(match.acceptOffer(1, 1)).resolves.toEqual(0);
    });

    test('accept invalid student id', () => {
        // should be undefined
        return expect(match.acceptOffer(0, 0)).resolves.toBeUndefined();
    });
});

describe('test create offer', () => {
    test('test create new offer', async () => {
        const studentID = 1;
        const tutorID = 2;
        const subject = JSON.stringify([{
            subject: 'math',
            level: 'bachelor'
        }]);
        const price = 1234;
        const userInput = {
            studentID: studentID,
            subject: subject,
            price: price
        }
        const offer = await match.offer(tutorID, userInput);
        // should create new offer
        expect(offer.created).toEqual(true);
        // offer should same as input
        expect(offer.offer.studentID).toEqual(studentID);
        expect(offer.offer.tutorID).toEqual(tutorID);
        expect(offer.offer.subject).toEqual(subject);
        expect(offer.offer.price).toEqual(price);
        expect(offer.offer.studentConfirm).toEqual(false);
    });

    test('test invalid id', async () => {
        const subject = JSON.stringify([{
            subject: 'math',
            level: 'bachelor'
        }]);
        const price = 1234;
        const userInput = {
            studentID: 0,
            subject: subject,
            price: price
        }
        // should be undefined
        expect(match.offer(0, userInput)).resolves.toBeUndefined();
    });
});

describe('test tutor request', () => {
    test('test create new request', async () => {
        const studentID = 1;
        const tutorID = 2;
        const subject = JSON.stringify([{
            subject: 'physics',
            level: 'pratom'
        }]);
        const userInput = {
            tutorID: tutorID,
            subject: subject,
        };
        const request = await match.tutorRequest(studentID, userInput);
        // should create new request
        expect(request.created).toEqual(true);
        // request should be the same as input
        expect(request.tutorRequest.studentID).toEqual(studentID);
        expect(request.tutorRequest.tutorID).toEqual(tutorID);
        expect(request.tutorRequest.subject).toEqual(subject);
    });

    test('test invalid id', () => {
        const subject = JSON.stringify([{
            subject: 'physics',
            level: 'pratom'
        }]);
        const userInput = {
            tutorID: 0,
            subject: subject,
        };
        // should be undefined
        expect(match.tutorRequest(0, userInput)).resolves.toBeUndefined();
    });
});

describe('test delete tutor request', () => {
    test('delete dummy request', () => {
        // should success
        return expect(match.deleteTutorRequest(1, 2)).resolves.toEqual(1);
    });

    test('delete non-exist request', () => {
        // should fail
        return expect(match.deleteTutorRequest(1, 1)).resolves.toEqual(0);
    });

    test('delete invalid student id', () => {
        // should be undefined
        return expect(match.acceptOffer(0, 0)).resolves.toBeUndefined();
    });
});