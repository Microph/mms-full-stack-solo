func cancelReservation(studentID, reserveID) {
    reservation =   SELECT *
                    FROM 'Reservation'
                    WHERE reserveID = 'reserveID'
                        AND studentID = 'studentID'
    
    if reservation == empty {
        print("คุณไม่มีการนัดหมายในช่วงเวลานี้")
        return
    }

    deleteReservation = DELETE FROM 'Reservation'
                        WHERE reserveID = 'reserveID'
                            AND studentID = 'studentID'


    return
}