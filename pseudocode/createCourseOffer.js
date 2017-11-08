func createCourseOffer(tutorID, subject, price, description, level) {
    if tutorID == empty || subject == empty || price == empty || description == empty || level = empty {
        print("ข้อมูลที่กรอกไม่ถูกต้อง กรุณากรอกข้อมูลให้ครบถ้วน")
        return
    } else if price < 150 {
        print("ข้อมูลที่กรอกไม่ถูกต้อง กรุณากรอกราคามากกว่า 150 บาท/ชั่วโมง")
        return
    }
    
    createCourse =  INSERT INTO 'Course'
                    VALUES(tutorID = 'tutorID',
                            subject = 'subject',
                            price = 'price',
                            description = 'description',
                            level = 'level')

    return
}