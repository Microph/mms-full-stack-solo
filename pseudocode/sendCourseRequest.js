func sendCourseRequest(studentID, tutorID, subject, level) {
    courseRequest = INSERT INTO 'CourseRequest'
                    VALUES(studentID = 'studentID',
                            tutorID = 'tutorID',
                            subject = 'subject',
                            level = 'level')

    if courseRequest != empty {
        notifyTutor(studentID, tutorID)
    }

    return
}