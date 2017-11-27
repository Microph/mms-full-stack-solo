const admin = require('./admin');

describe('test search tutor request', () => {
    test('test constraint on all tutor', async () => {
        const allTutorRequest = await admin.adminSearchTutorRequest();
        for(let a=0; a< allTutorRequest.count; a++){
            // should have upload Evidence
            expect(allTutorRequest.rows[a].uploadEvidence).toBeTruthy();
            // isApprove should be false
            expect(allTutorRequest.rows[a].isApproved).toEqual(0);
        }
    });
});

describe('test accept tutor request', () => {
    test('accept new tutor request', () => {
        // assume this is new tutor
        return expect(admin.adminAcceptTutorRequest(18)).resolves.toEqual(1);
    });

    test('accept already tutor', () => {
        // tutor with id = 1 is already tutor
        return expect(admin.adminAcceptTutorRequest(1)).resolves.toEqual(0);
    });

    test('accept invalid tutor request ', () => {
        // there are no tutor with id = 0
        return expect(admin.adminAcceptTutorRequest(0)).resolves.toEqual(0);
    });
});

describe('test delete tutor request', () => {
    test('delete tutor request', () => {
        // assume this is new tutor
        return expect(admin.adminDeleteTutorRequest(18)).resolves.toEqual(1);
    });

    test('delete already tutor', () => {
        // tutor with id =1 is already tutor
        return expect(admin.adminDeleteTutorRequest(1)).resolves.toEqual(0);
    });

    test('delete invalid tutor request', () => {
        // there are no tutor with id = 0
        return expect(admin.adminDeleteTutorRequest(0)).resolves.toEqual(0);
    })
});

describe('test search all report', () => {
    test('test constraint on all report', async () => {
        const allReport = await admin.adminSearchAllReport();
        for (let a=0; a< allReport.count; a++){
            // report ID must have value between 1 - 2147483648
            expect(allReport.rows[a].reportID).toBeGreaterThanOrEqual(1);
            expect(allReport.rows[a].reportID).toBeLessThanOrEqual(2147483648);
            // reporter & reported ID must have value between 1 - 214783648
            expect(allReport.rows[a].reporterStudentId).toBeGreaterThanOrEqual(1);
            expect(allReport.rows[a].reporterStudentId).toBeLessThanOrEqual(2147483648);
            expect(allReport.rows[a].reportedStudentId).toBeGreaterThanOrEqual(1);
            expect(allReport.rows[a].reportedStudentId).toBeLessThanOrEqual(2147483648);
            // topic & description should not be null
            expect(allReport.rows[a].topic).not.toBeNull();
            expect(allReport.rows[a].description).not.toBeNull();
        }
    });
});

describe('test get student info', () => {
    test('test find dummy student', () => {
        // should got student
        return expect(admin.getStudentInfoByID(1)).resolves.not.toBeUndefined();
    });

    test('test find invalid student', () => {
        // should get undefined or something
        return expect(admin.getStudentInfoByID(0)).resolves.toBeUndefined();
    })
});

describe('test suspend student', () => {
    test('test newly suspend student', async () => {
        // should create new one
        const suspendStudent = await admin.adminSuspendStudent(18);
        return expect(suspendStudent[0].isNewRecord).toEqual(true);
    });

    test('test already suspend student', async () => {
        // should not create
        const alreadySuspendStudent = await admin.adminSuspendStudent(1);
        return expect(alreadySuspendStudent[0].isNewRecord).toEqual(false);
    });

    test('test suspend invalid student', () => {
        // should be undefined
        return expect(admin.adminSuspendStudent(0)).resolves.toBeUndefined();
    })
});

describe('test search suspend student', () => {
    test('test constraint on all suspended', async () => {
        const allSuspended = await admin.adminSearchSuspendedAccount();
        for (suspend of allSuspended){
            // student ID must have value between 1 - 2147483648
            expect(suspend.studentID).toBeGreaterThanOrEqual(1);
            expect(suspend.studentID).toBeLessThanOrEqual(2147483648);
        }
    })
});

describe('test unsuspend student', () => {
    test('test unsuspend a suspend student', () => {
        // assume this student is suspended
        return expect(admin.adminUnsuspendAccount(1)).resolves.toEqual(1);
    });

    test('test unsuspend already unsuspend student', () => {
        // assume this student is not suspended
        return expect(admin.adminUnsuspendAccount(1)).resolves.toEqual(0);
    });

    test('test unsuspend invalid student', () => {
        // should be undefined
        return expect(admin.adminUnsuspendAccount(0)).resolves.toBeUndefined();
    })
});