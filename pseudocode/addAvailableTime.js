func addAvailableTime(tutorID, date, startTime, endTime) {
    reservation = SELECT * 
                    FROM 'Reservation' 
                    WHERE tutorID = 'tutorID'
                        AND date = 'date'
                        AND startTime = 'startTime'
                        AND endTime = 'endTime'
    if reservation != empty {
        print("คุณมีนัดหมายกับนักเรียนในช่วงเวลานี้แล้ว กรุณาเลือกช่วงเวลาอื่น")
        return
    }

    addAvailableTime = INSERT INTO 'AvailableTime'
                        VALUES (tutorID = 'tutorID',
                                date = 'date', 
                                startTime = 'startTime', 
                                endTime = 'endTime')
                                
    return
}