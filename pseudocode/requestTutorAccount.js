func requestTutorAccount(studentID, detail, proofDocument) {
    if proofDocument == empty {
        print("กรุณาแนบเอกสารยืนยันก่อนสมัครเป็นติวเตอร์")
        return
    }

    request =   INSERT INTO 'TutorRequest'
                VALUES(studentID = 'studentID',
                        detail = 'detail'
                        proof = 'proofDocument')

    return
}