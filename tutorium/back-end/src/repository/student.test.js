const student = require('./student');

describe('test tutor search', () => {
    test('test constraint on all tutor', async () => {
        const allTutor = await student.tutorSearch();
        for(let a=0; a< allTutor.count; a++){
            // student ID must have value between 1 - 2147483648
            expect(allTutor.rows[a].studentID).toBeGreaterThanOrEqual(1);
            expect(allTutor.rows[a].studentID).toBeLessThanOrEqual(2147483648);
            // each of education must have level, university, faculty and major
            var array = JSON.parse(allTutor.rows[a].education);
            for (education of array){
                expect(Object.keys(education)).toContain('level');
                expect(Object.keys(education)).toContain('university');
                expect(Object.keys(education)).toContain('faculty');
                expect(Object.keys(education)).toContain('major');
            }
            if(allTutor.rows[a].teachList){
                var array = JSON.parse(allTutor.rows[a].teachList);
                for (teachList of array){
                    // each of subject in teachList must be 'math' 'science' 'physics' 'chemistry' 'biology' 'thai' 'english' or 'socialstudies'
                    expect(teachList.subject).toMatch(/math|science|physics|chemistry|biology|thai|english|socialstudies/);
                    // each of level in teachList must be 'pratom', 'matthayomton', 'matthayomplai', 'bachelor', 'master', or 'doctor'
                    expect(teachList.level).toMatch(/pratom|matthayomton|matthayomplai|bachelor|master|doctor/);
                }
                expect(allTutor.rows[a].place).toBeTruthy();
                var array = JSON.parse(allTutor.rows[a].time);
                for (time of array){
                    // day must be 'monday' 'tuesday' 'wednesday' 'thursday' 'friday 'saturday' or 'sunday'
                    expect(time.day).toMatch(/monday|tuesday|wednesday|thursday|friday|saturday|sunday/);
                    // time must be in xx.yy-zz.aa form
                    expect(time.time).toMatch(/([01]\d|2[0-3]).([0-5]\d)-([01]\d|2[0-3]).([0-5]\d)$/);
                }
            }
            // should have upload Evidence
            expect(allTutor.rows[a].uploadEvidence).toBeTruthy();
            // isApprove should be true
            expect(allTutor.rows[a].isApproved).toEqual(1);
        }
    });

    test('find one tutor', async () => {
        const dummyTutor = await student.tutorSearch({studentID: 1});
        // because studentId is unique, so it should find only one tutor
        expect(dummyTutor.count).toEqual(1);
    });

    test('should not find invalid tutor', async () => {
        const dummyTutor = await student.tutorSearch({studentID: 0});
        // because studentId is range between 1 - 2147483648 so it shound not find tutor with ID = 0
        expect(dummyTutor.count).toEqual(0);
    });
});

describe('test update profile', () => {
    test('update dummy student profile', () => {
        const updateProfile = {
            name: 'Alexander',
            surname: 'III',
            gender: 'male',
            educationLevel: 'master',
            facebookURL: null,
            lineID: null,
            email: 'alexander3@russia.exe',
            mobile: '0912345678'
        }
        // should success
        return expect(student.updateProfile(1, updateProfile)).resolves.toEqual(1);
        // const updatedStudent = await student.updateProfile(1, updateProfile);
        // // all information should be updated
        // expect(updatedStudent.name).toEqual(updateProfile.name);
        // expect(updatedStudent.surname).toEqual(updateProfile.surname);
        // expect(updatedStudent.gender).toEqual(updateProfile.gender);
        // expect(updatedStudent.educationLevel).toEqual(updateProfile.educationLevel);
        // expect(updatedStudent.facebookURL).toEqual(updateProfile.facebookURL);
        // expect(updatedStudent.lineID).toEqual(updateProfile.lineID);
        // expect(updatedStudent.email).toEqual(updateProfile.email);
        // expect(updatedStudent.mobile).toEqual(updatedStudent.mobile);
    });

    test('update dummy student profile with bad constraint', () => {
        const updateProfile = {
            name: 'Al3x4nd3r',
            surname: '3',
            gender: 'XY',
            educationLevel: 'pokemon trainer',
            facebookURL: null,
            lineID: null,
            email: '413104nd1233@$%.&*',
            mobile: '9876543210'
        }
        // should fail
        return expect(student.updatePlace(0, updateProfile)).resolves.toEqual(0);
    });

    test('update invalid student', () => {
        const updateProfile = {
            name: 'Alexander',
            surname: 'III',
            gender: 'male',
            educationLevel: 'master',
            facebookURL: null,
            lineID: null,
            email: 'alexander3@russia.exe',
            mobile: '0912345678'
        }
        // there are no student with ID = 0
        // should fail
        return expect(student.updateProfile(0, updateProfile)).resolves.toEqual(0);
    });
});

describe('test update wantlist', () => {
    test('update dummy student wantlist', () => {
        const wantList = [{
            subject: 'math',
            level: 'bachelor'
        },{
            subject: 'science',
            level: 'pratom'
        },{
            subject: 'physics',
            level: 'master'
        }];
        // should success
        return expect(student.updateWantList(1, {wantList: JSON.stringify(wantList)})).resolves.toEqual(1);
    });

    test('update dummy student wantlist with bad constraint', () => {
        const wantList = [{
            subject: 'math',
            level: 'bachelor',
            hi: 'hello world!'
        },{
            subject: 'science'
        },{
            subject: 'magic',
            level: 'crimson'
        }];
        // should fail
        return expect(student.updateWantList(1, {wantList: JSON.stringify(wantList)})).resolves.toEqual(0);
    });

    test('update invalid student', () => {
        const wantList = [{
            subject: 'math',
            level: 'bachelor'
        },{
            subject: 'science',
            level: 'pratom'
        },{
            subject: 'physics',
            level: 'master'
        }];
        // there are no student with ID = 0
        // should fail
        return expect(student.updateWantList(0, {wantList: JSON.stringify(wantList)})).resolves.toEqual(0);
    });
});

describe('test update place', () => {
    test('update dummy student place', () => {
        const place = ["Too Fast To Sleep", "Chamchuri Square", "MRT Hauykwang"];
        // should success
        return expect(student.updatePlace(1, {place: JSON.stringify(place)})).resolves.toEqual(1);
    });

    test('update dummy student place with bad format', () => {
        const place = 'ABC';
        // should fail
        return expect(student.updatePlace(1, {place: JSON.stringify(place)})).resolves.toEqual(0);
    });

    test('update invalid student', () => {
        const place = ["Too Fast To Sleep", "Chamchuri Square", "MRT Hauykwang"];
        // there are no student with ID = 0
        // should fail
        return expect(student.updatePlace(0, {place: JSON.stringify(place)})).resolves.toEqual(0);
    });
});

describe('test update time', () => {
    test('update dummy student time', () => {
        const time = [{
            day: 'wednesday',
            time: '14.00-16.00'
        },{
            day: 'sunday',
            time: '16.00-19.00'
        }];
        // should success
        return expect(student.updateTime(1, {time: JSON.stringify(time)})).resolves.toEqual(1);
    });

    test('update dummy student time with bad format', () => {
        const time = [{
            day: 'wednesday'
        },{
            day: 'birthday',
            time: '00.00-23.00'
        },{
            day: 'tuesday',
            time: '13.00-14.00',
            extra: 'passive income'
        }];
        // should fail
        return expect(student.updateTime(1, {time: JSON.stringify(time)})).resolves.toEqual(0);
    });

    test('update invalid student', () => {
        const time = [{
            day: 'wednesday',
            time: '14.00-16.00'
        },{
            day: 'sunday',
            time: '16.00-19.00'
        }];
        // there are no student with ID = 0
        // should fail
        return expect(student.updateTime(0, {time: JSON.stringify(time)})).resolves.toEqual(0);
    });
})