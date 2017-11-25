const matching = require('./matching');

describe('student search', () => {
    test('test constraint on all students', async () => {
        const allStudent = await matching.studentSearch();
        for (let a = 0; a < allStudent.count; a++){
            // student ID must have value between 1 - 2147483648
            expect(allStudent.rows[a].studentID).toBeGreaterThanOrEqual(1);
            expect(allStudent.rows[a].studentID).toBeLessThanOrEqual(2147483648);
            // name must have length between 1 - 200 with only Thai or English characters
            expect(allStudent.rows[a].name).toMatch(/[\u0E00-\u0E7Fa-zA-Z]{1,45}/);
            // surname must have length between 1 - 200 with only Thai or English characters
            expect(allStudent.rows[a].surname).toMatch(/[\u0E00-\u0E7Fa-zA-Z]{1,45}/);
            // gender must be 'male', 'female' or 'others'
            expect(allStudent.rows[a].gender).toMatch(/male|female|others/);
            // educationLevel must be 'pratom', 'matthayomton', 'matthayomplai', 'bachelor', 'master' or 'doctor'
            expect(allStudent.rows[a].educationLevel).toMatch(/pratom|matthayomton|matthayomplai|bachelor|master|doctor/);
            // email validate by RFC 5322 standard
            expect(allStudent.rows[a].email).toMatch(/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);
            // mobile must be number with length 10 start with zero
            expect(allStudent.rows[a].mobile).toMatch(/0\d{9}/);
            // if there are wantList it must have time and place too.
            if(allStudent.rows[a].wantList){
                var array = JSON.parse(allStudent.rows[a].wantList);
                for (wantList of array){
                    console.log(wantList)
                    // subject must be 'math' 'science' 'physics' 'chemistry' 'biology' 'thai' 'english' or 'socialstudies'
                    expect(wantList.subject).toMatch(/math|science|physics|chemistry|biology|thai|english|socialstudies/);
                    // level must be 'pratom', 'matthayomton', 'matthayomplai', 'bachelor', 'master', or 'doctor'
                    expect(wantList.level).toMatch(/pratom|matthayomton|matthayomplai|bachelor|master|doctor/);
                }
                // place must not null
                expect(allStudent.rows[a].place).not.toBeNull();
                var array = JSON.parse(allStudent.rows[a].time)
                for (time of array){
                    // day must be 'monday' 'tuesday' 'wednesday' 'thursday' 'friday 'saturday' or 'sunday'
                    expect(time.day).toMatch(/monday|tuesday|wednesday|thursday|friday|saturday|sunday/);
                    // time must be in xx.yy-zz.aa form
                    expect(time.time).toMatch(/([01]\d|2[0-3]).([0-5]\d)-([01]\d|2[0-3]).([0-5]\d)$/);
                }
            }
        }
    });

    // test('find dummy student', async () => {
    //     const result = await matching.studentSearch({studentID: 18});
    //     expect(result.count).toEqual(1);
    //     const dummyStudent = result.rows[0];
    //     expect(dummyStudent.name).toMatch(/[\u0E00-\u0E7Fa-zA-Z]{1,200}/);
    // })
});