func searchTutor() {
    if is not tutor {
        print("This area is only for tutors")
        return
    }

    students = querySelectStudent(userInput.filter)
    return students
}