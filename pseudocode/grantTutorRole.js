func grantTutorRole(studentID) {
    tutorRequest =  SELECT * 
                    FROM 'TutorRequest'
                    WHERE studentID = 'studentID'
    tutor = SELECT *
            FROM 'Tutor'
            WHERE studentID = 'studentID'

    if tutorRequest == empty {
        print("ผู้ใช้งานคนดังกล่าวไม่ได้ส่งสำขอยื่นสมัครเป็นติวเตอร์")
        return
    } else if tutor != empty {
        print("ผู้ใช้งานคนดังกล่าวมีสถานะเป็นติวเตอร์อยู่แล้ว")
    }

    grantTutor= INSERT INTO 'Tutor'
                VALUES(studentID='studentID')

    return
}