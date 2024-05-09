function validate(values) {
    let errors = {};
    if(!values.username) {
        errors.username = 'Name is required'; }  //check if name field is empty
    
    if (/\s/.test(values.username)) {
        errors.username = 'username cannot contain spaces'; } // check if username contains spcaes

    if (!values.email) {                 
        errors.email = 'Email address is required'; } //check if email field is empty
    
    if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid'; }   //check if email is in incorrect format

    if (!values.password) {
            errors.password = 'Password is required'; } //check if password field is empty
    else {
        if (values.password.length < 8) {
                errors.passwordLength = 'Password must be at least 8 characters long'; //check if password is less than 8 characters
        }
        if (!/\d/.test(values.password)) {
                errors.passwordNumber = 'Include Numbers (0-9)'; //check if password doesn't include numbers
        }
        if (!/[!@#$%^&*]/.test(values.password)) {
                errors.passwordSpecialChar = 'Include Special Characters (!,@,#,$,%,^,&,*)'; //check if password doesn't include special character
        }
        if (!/[A-Z]/.test(values.password)) {
                errors.passwordUppercase = 'Include Uppercase Letters'; //check if password doesn't include Uppercase letters
        }
        if (!/[a-z]/.test(values.password)) {
                errors.passwordLowercase = 'Include Lowercase Letters'; //check if password doesn't include Lowercase letters
        }
        }
        
    if(!values.confirmPassword) {
        errors.confirmPassword = 'Password is not confirmed'; } //check if password confrimation is inputted

    if(values.password != values.confirmPassword) {
        errors.confirmPassword = 'Password does not match';  }  //check if password and confirmed password matches 

    return errors;

}

export default validate; 