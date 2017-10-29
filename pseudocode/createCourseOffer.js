func createCourseOffer() {
    if is not tutor {
        print("This area is only for tutors.")
        return
    }

    subject = userInput.subject
    price = userInput.price
    queryInsertSubject()

    return
}