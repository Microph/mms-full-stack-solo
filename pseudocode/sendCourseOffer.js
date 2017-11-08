func sendCourseOffer(courseID, studentID) {
    course= SELECT *
            FROM 'Course'
            WHERE CourseID = 'courseID'

    notifyOfferToStudent(course, studentID)
    
    return
}