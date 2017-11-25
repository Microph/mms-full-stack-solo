const matching = require('./matching');

describe('student search', () => {
    test('find all students', async () => {
        const allStudent = await matching.studentSearch();
        expect(allStudent.count).toEqual(18);
    });
});