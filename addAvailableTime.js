func addAvailableTime() {
    if is not Tutor {
        print("This area is only for tutors")
        return
    }

    date = userInput.date
    start_time = userInput.start_time
    start_time = userInput.end_time

    queryInsertAvailableTime()
    return
}