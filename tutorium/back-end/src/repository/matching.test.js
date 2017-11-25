const matching = require('./matching');

describe('student search', () => {
    test('find all students', async () => {
        const allStudent = await matching.studentSearch();
        expect(allStudent.count).toEqual(18);
    });

    test('find dummy student', async () => {
        const result = await matching.studentSearch({studentID: 18});
        expect(result.count).toEqual(1);
        const dummyStudent = result.rows[0];
        expect(dummyStudent.name).toEqual('Kame');
    })
});