func searchTutor() {
    if is not student {
        print("This area is only for students")
        return
    }

    courses = querySelectCourses(userInput.filter)
    return courses
}