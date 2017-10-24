func requestTutorAccount() {
    if is not student {
        print("This area is only for students.")
        return
    }

    tutorDetails = userInput.tutorDetails
    proofDocuments = userInput.fileUploads.proofDocuments

    queryInsertRequestTutorApprove()
    return
}