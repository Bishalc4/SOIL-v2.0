function luhnAlgorithm(cardNumber) {
    let sum = 0;
    let doubleUp = false;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber.charAt(i));

        if (doubleUp) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
        doubleUp = !doubleUp;
    }

    if(sum % 10 === 0) {
        return true;
    }
    return false;
}

export default luhnAlgorithm;
