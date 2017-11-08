func payCourseFee(studentID, paymentMethod, price) {
    if paymentMethod == 'bankTransfer' {
        bankAccountNo = SELECT 'bankAccountNo'
                        FROM 'BankAccountPayment'
                        WHERE studentID = 'studentID'

        success = bankTransferPaymentRequest(bankAccountNo, price)
    } else {
        creditCardNo = SELECT 'creditCardNo'
                        FROM 'CreditCardPayment'
                        WHERE studentID = 'studentID'

        success = creditCardPaymentRequest(creditCardNo, price)
    }

    if success == false {
        print("เกิดข้อผิดพลาด กรุณาชำระเงินใหม่อีกครั้ง")
    }

    return
}