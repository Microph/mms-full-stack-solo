func deleteCourseOffer(tutorID, courseID) {
    course = SELECT *
             FROM 'Course'
             WHERE CourseID = 'courseID'
    
    if course == empty {
        print("ไม่มีคอร์สเรียนนี้ในระบบ")
        return
    }

    deleteCourse = DELETE FROM 'Course'
                    WHERE CourseID = 'courseID'
                        AND tutorID = 'tutorID'
    
    return
}