import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import AuthHeader from "../../Components/Layout/Auth-Header/AuthHeader";
import { findUser, createUser } from "../../data/user";
import validate from "../../Functions/SignUpValidation";
import "./SignUp.scss";

function SignUp() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "", email: "", password: "", confirmPassword: ""
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate form and if invalid do not contact API.
        const validationErrors = await handleValidation(values);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length !== 0) {
            return;
        }

        // Create user.
        const user = await createUser(values);

        if (user) {
            localStorage.setItem("user", JSON.stringify(values.username));
            const personalisedProfiles = JSON.parse(localStorage.getItem("profiles")) || []; // retrieve all existing users personalized profiles
            const userInitialProfile = {
                username: values.username, age: null, sex: "male", weight: null, height: null, activityLevel: "sedentary", 
                dietaryPreferences: "none", healthGoals: "maintain", caloricRequirement: ""
            };

            const updatedProfiles = [...personalisedProfiles, userInitialProfile];

            localStorage.setItem("profiles", JSON.stringify(updatedProfiles)); // storing empty personalized profiles for later use  

            alert("Thank you for joining our SOIL community");
            navigate("/");
        } 
    };

    const handleValidation = async (fields) => {
        const trimmedFields = trimFields(fields);
        const validationErrors = validate(trimmedFields);

        if (!validationErrors.username) {
            const userExists = await findUser(trimmedFields.username);
            if (userExists !== null) {
                validationErrors.username = "Username is already registered.";
            }
        }

        return validationErrors;
    };

    const trimFields = (fields) => {
        const trimmedFields = {};
        Object.keys(fields).forEach(key => trimmedFields[key] = fields[key].trim());
        setValues(trimmedFields);
        return trimmedFields;
    };

    return (
        <>
            <AuthHeader />
            <hr></hr>
            <div className="signup-container">
                <form className="form-container" onSubmit={handleSubmit}>
                    <div className="signup-form-group">
                        <label className="signup-label-control">Username</label>
                        <input type='text' placeholder='Enter Name' className="signup-input-control" value={values.username} name='username' onChange={handleChange} />
                        {errors.username && <p>{errors.username}</p>}
                    </div>

                    <div className="signup-form-group">
                        <label className="signup-label-control">Email</label>
                        <input type='email' placeholder='example@gmail.com' className="signup-input-control" value={values.email} name='email' onChange={handleChange} />
                        {errors.email && <p>{errors.email}</p>}
                    </div>

                    <div className="signup-form-group">
                        <label className="signup-label-control">Password</label>
                        <input type="password" placeholder='Enter Password' className="signup-input-control" value={values.password} name='password' onChange={handleChange} />
                        {errors.password && <p>{errors.password}</p>}
                        {errors.passwordLength && <p>{errors.passwordLength}</p>}
                        {errors.passwordNumber && <p>{errors.passwordNumber}</p>}
                        {errors.passwordSpecialChar && <p>{errors.passwordSpecialChar}</p>}
                        {errors.passwordUppercase && <p>{errors.passwordUppercase}</p>}
                        {errors.passwordLowercase && <p>{errors.passwordLowercase}</p>}
                    </div>

                    <div className="signup-form-group">
                        <label className="signup-label-control">Confirm Password</label>
                        <input type="password" className="signup-input-control" name='confirmPassword' value={values.confirmPassword} onChange={handleChange} />
                        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                    </div>

                    <div className="signup-form-group">
                        <button type="submit" className="btn btn-primary">Sign Up</button>
                    </div>
                </form>

                <div className="sign-up-link-container">
                    <p>Already have an account?</p>
                    <Link to="/login">
                        <p>Login here</p>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default SignUp;
