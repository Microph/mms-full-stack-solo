const tutor = require('./tutor');

describe('test student search', () => {
        test('test constraint on all students', async () => {
        const allStudent = await tutor.studentSearch();
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
            // // isBanned should be either true or false
            // expect(allStudent.rows[a].isBanned).not.toBeUndefined();
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
                expect(allStudent.rows[a].place).not.toBeTruthy();
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

    test('find one student', async () => {
        const dummyStudent = await tutor.studentSearch({studentID: 1});
        // because studentId is unique, so it should find only one student
        expect(dummyStudent.count).toEqual(1);
    });

    test('should not find invalid student', async () => {
        const dummyStudent = await tutor.studentSearch({studentID: 0});
        // because studentId is range between 1 - 2147483648 so it shound not find student with ID = 0
        expect(dummyStudent.count).toEqual(0);
    });
});

describe('test register', () => {
    test('register new tutor', async () => {
        // assume this guy is not a tutor
        const studentId = 18;
        const userInput = {
            education: JSON.stringify([{
                level: 'bachelor',
                university: 'Chulalongkorn',
                faculty: 'Engineer',
                major: 'Computer'
            }]),
            teachList: JSON.stringify([{
                subject: 'math',
                level: 'matthayomplai'
            }]),
            place: JSON.stringify(['MRT Samyan']),
            time: JSON.stringify([{
                day: 'wednesday',
                time: '13.00-16.00'
            }])
        };
        const newTutor = await tutor.register(studentId, userInput);
        // should create new tutor
        expect(newTutor.created).toEqual(1);
        // studentId shoud be the same
        expect(newTutor.studentID).toEqual(studentId);
    });

    test('already registered tutor', async () => {
        // already have this guy as tutor
        const studentId = 1;
        const userInput = {
            education: JSON.stringify([{
                level: 'bachelor',
                university: 'Chulalongkorn',
                faculty: 'Engineer',
                major: 'Computer'
            }]),
            teachList: JSON.stringify([{
                subject: 'math',
                level: 'matthayomplai'
            }]),
            place: JSON.stringify(['MRT Samyan']),
            time: JSON.stringify([{
                day: 'wednesday',
                time: '13.00-16.00'
            }])
        };
        const alreadyTutor = await tutor.register(studentId, userInput);
        // should not create anything new
        expect(alreadyTutor.created).toEqual(0);
        // studentId should be the same
        expect(alreadyTutor.studentId).toEqual(studentId);
    });

    test('invalid tutor', () => {
        const userInput = {
            education: JSON.stringify([{
                level: 'bachelor',
                university: 'Chulalongkorn',
                faculty: 'Engineer',
                major: 'Computer'
            }]),
            teachList: JSON.stringify([{
                subject: 'math',
                level: 'matthayomplai'
            }]),
            place: JSON.stringify(['MRT Samyan']),
            time: JSON.stringify([{
                day: 'wednesday',
                time: '13.00-16.00'
            }])
        };
        // invalid studentId
        // should be error
        return expect(tutor.register(0, userInput)).resolves.toEqual(0);
    });
});

describe('test update teach list', () => {
    test('update dummy tutor teach list', () => {
        const teachList = [{
            subject: 'chemistry',
            level: 'matthayomton'
        },{
            subject: 'thai',
            level: 'doctor'
        },{
            subject: 'english',
            level: 'master'
        }];
        // should success
        return expect(tutor.updateTeachList(1, {teachList: JSON.stringify(teachList)})).resolves.toEqual(1);
    });

    test('update dummy tutor teach list with bad constraint', () => {
        const teachList = [{
            subject: 'math',
            level: 'bachelor',
            dummy: 'dummy'
        },{
            subject: 'science'
        },{
            subject: 'politics',
            level: 'thai'
        }];
        // should fail
        return expect(tutor.updateTeachList(1, {teachList: JSON.stringify(teachList)})).resolves.toEqual(0);
    });

    test('update invalid tutor', () => {
        const teachList = [{
            subject: 'chemistry',
            level: 'matthayomton'
        },{
            subject: 'thai',
            level: 'doctor'
        },{
            subject: 'english',
            level: 'master'
        }];
        // there are no tutor with ID = 0
        // should fail
        return expect(tutor.updateTeachList(0, {teachList: JSON.stringify(teachList)})).resolves.toEqual(0);
    });
});

describe('test update place', () => {
    test('update dummy tutor place', () => {
        const place = ["Enginex", "Siam Paragon", "BTS Sanamkeela"];
        // should success
        return expect(tutor.updatePlace(1, {place: JSON.stringify(place)})).resolves.toEqual(1);
    });

    test('update dummy tutor place with bad format', () => {
        const place = 'baddies';
        // should fail
        return expect(tutor.updatePlace(1, {place: JSON.stringify(place)})).resolves.toEqual(0);
    });

    test('update invalid tutor', () => {
        const place = ["Enginex", "Siam Paragon", "BTS Sanamkeela"];
        // there are no tutor with ID = 0
        // should fail
        return expect(tutor.updatePlace(0, {place: JSON.stringify(place)})).resolves.toEqual(0);
    });
});

describe('test update time', () => {
    test('update dummy tutor time', () => {
        const time = [{
            day: 'monday',
            time: '09.00-11.00'
        },{
            day: 'thursday',
            time: '21.00-22.00'
        }];
        // should success
        return expect(tutor.updateTime(1, {time: JSON.stringify(time)})).resolves.toEqual(1);
    });

    test('update dummy tutor time with bad format', () => {
        const time = [{
            day: 'saturday'
        },{
            day: 'songkarnday',
            time: '13.00-22.00'
        },{
            day: 'friday',
            time: '16.00-18.00',
            extra: 'free wifi'
        }];
        // should fail
        return expect(tutor.updateTime(1, {time: JSON.stringify(time)})).resolves.toEqual(0);
    });

    test('update invalid tutor', () => {
        const time = [{
            day: 'monday',
            time: '09.00-11.00'
        },{
            day: 'thursday',
            time: '21.00-22.00'
        }];
        // there are no tutor with ID = 0
        // should fail
        return expect(tutor.updateTime(0, {time: JSON.stringify(time)})).resolves.toEqual(0);
    });
})