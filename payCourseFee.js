func payCourseFee() {
    if is not student {
        print("This area is only for students.")
        return
    }

    paymentMetohd = querySelectPaymentMethod()
    price = queryPriceToPay()
    
    if paymentMethod is bank {
        requestPaymentViaBank()
    } else {
        requestPaymentViaCreditCard()
    }

    return
}