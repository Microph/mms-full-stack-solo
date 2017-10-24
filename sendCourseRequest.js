func sendCourseRequest() {
    if is not student {
        print("This area is only for students")
        return
    }

    selectedTutor = userInput.selectedTutor
    subject = userInput.subject
    price = userInput.price

    queryInsertMatching()
    notifyTutor()

    return
}