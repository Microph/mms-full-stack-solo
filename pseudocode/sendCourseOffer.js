func sendCourseOffer() {
    if is not tutor {
        print("This area is only for tutors")
        return
    }

    selectedStudent = userInput.selectedStudent
    subject = userInput.subject
    price = userInput.price
    
    queryInsertMatching()
    notifyStudent()
    
    return
}