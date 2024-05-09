function validateAddress(address) {
    let errors = {};

    if (!address.firstName) {
        errors.firstName = "First Name is required";
    } else if (!/^[A-Za-z]+$/.test(address.firstName)) {
        errors.firstName = "First Name must contain only letters";
    }

    if (!address.lastName) {
        errors.lastName = "Last Name is required";
    } else if (!/^[A-Za-z]+$/.test(address.lastName)) {
        errors.lastName = "Last Name must contain only letters";
    }

    if (!address.addressLine) {
        errors.addressLine = "Address is required";
    }

    if (!address.city) {
        errors.city = "City is required";
    } else if (!/^[A-Za-z\s]+$/.test(address.city)) {
        errors.city = "City must contain only letters and spaces";
    }

    if (!address.state) {
        errors.state = "State is required";
    } else if (!/^[A-Za-z\s]+$/.test(address.state)) {
        errors.state = "State must contain only letters";
    }

    if (!address.postcode) {
        errors.postcode = "Postcode is required";
    } else if (!/^[0-9]+$/.test(address.postcode)) {
        errors.postcode = "Postcode must contain only numbers";
    }

    if (!address.country) {
        errors.country = "Country is required";
    } else if (!/^[A-Za-z\s]+$/.test(address.country)) {
        errors.country = "Country must contain only letters";
    }

    return errors;
}

export default validateAddress;

