const report = require('./report');

describe('test add report', () => {
    test('add dummy report', async () => {
        // should success
        reporterId = 1;
        reportedId = 2;
        topic = 'Cyberbully';
        detail = 'He says \'GG\'';
        const result = await report.userWriteReport(reporterId, reportedId, topic, detail);
        // report id should be in range of 1 - 2147483648
        expect(result.reportID).toBeGreaterThanOrEqual(1);
        expect(result.reportID).toBeLessThanOrEqual(2147483648);
        // reporter id and reported id should be the same
        expect(result.reporterStudentID).toEqual(reporterId);
        expect(result.reportedStudentID).toEqual(reportedId);
        // topic & description should be the same
        expect(result.topic).toEqual(topic);
        expect(result.detail).toEqual(detail);
    });

    test('add invalid user', () => {
        // should fail
        return expect(report.userWriteReport(0, 0, 'Complain to my teaching style', 'LOL such a loser')).resolves.toBeUndefined();
    })
});