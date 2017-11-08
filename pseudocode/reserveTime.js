func reserveTime(studentID, tutorID, date, startTime, endTime) {
    if !(date in available.date && startTime in available.startTime && endTime in available.endTime) {
        print("ติวเตอร์ไม่ว่างในช่วงเวลาที่คุณเลือก")
        return
    }

    paySuccess = payCourseFee()
    
    if paySuccess == false {
        print("การชำระเงินมัดจำไม่สมบูรณ์ กรุณาทำรายการใหม่อีกครั้ง")
        return
    }

    reservation =   INSERT INTO 'Reservation'
                    VALUES(tutorID = 'tutorID',
                            studentID = 'studentID',
                            date = 'date',
                            startTime = 'startTime',
                            endTime = 'endTime')

    notifyTutor(tutorID)
    
    return
}