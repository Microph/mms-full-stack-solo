func deleteCourseOffer() {
    if is not tutor {
        print("This area is only for tutors.")
        return
    }

    subject = userInput.subject
    queryDeleteSubject()

    return
}