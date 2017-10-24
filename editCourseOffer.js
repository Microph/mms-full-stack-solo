func editCourseOffer() {
    if is not tutor {
        print("This area is only for tutors.")
        return
    }

    subject = userInput.modifySubject
    price = userInput.modifyPrice
    queryUpdateSubject()

    return
}