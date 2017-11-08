func editCourseOffer(tutorID, courseID, subject, price, description, level) {
    course =    SELECT *
                FROM 'Course'
                WHERE CourseID = 'courseID'

    if course == empty {
        print("ไม่มีคอร์สเรียนนี้ในระบบ")
        return
    } else if tutorID == empty || subject == empty || price == empty || description == empty || level = empty {
        print("ข้อมูลที่กรอกไม่ถูกต้อง กรุณากรอกข้อมูลให้ครบถ้วน")
        return
    } else if price < 150 {
        print("ข้อมูลที่กรอกไม่ถูกต้อง กรุณากรอกราคามากกว่า 150 บาท/ชั่วโมง")
        return
    }
    updateCourse =  UPDATE 'Course'
                    SET subject = 'subject',
                        price = 'price',
                        description = 'description',
                        level = 'level'
                    WHERE CourseID = 'courseID'
                        AND tutorID = 'tutorID'

    return
}