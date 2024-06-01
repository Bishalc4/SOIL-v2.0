import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, updatePassword } from "../../data/user";
import "./ChangePassword.scss";
import validate from "../../Functions/ChangePasswordValidation";

function ChangePassword() {
    const navigate = useNavigate();
    const user = getUser();

    const [values, setValues] = useState({
        currPassword: '',
        password: '',
        confirmPassword: ''
    });
    
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const trimmedValues = trimFields(values);
        const validationErrors = validate(trimmedValues);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            const response = await updatePassword(user, trimmedValues.currPassword, trimmedValues.password);
            if (response) {
                alert("Change password successful");
                navigate("/profile");
            } else {
                alert("Current password incorrect");
                navigate("/profile");
            }
        }
    };

    const trimFields = (fields) => {
        const trimmedFields = {};
        Object.keys(fields).forEach(key => trimmedFields[key] = fields[key].trim());
        setValues(trimmedFields);
        return trimmedFields;
    };
    return (
    <>
        <div className="password-container">
            <form className="form-container" onSubmit={handleSubmit}>
                <h2>Change Password</h2>
                <div className="password-form-group">
                    <label className="password-label-control">Current Password</label>
                    <input type='password' placeholder='Enter password' className="password-input-control" value={values.currPassword} name='currPassword' onChange={handleChange}/>
                    {errors.currPassword && <p>{errors.currPassword}</p>}
                </div>

                <div className="password-form-group">
                    <label className="password-label-control">New Password</label>
                    <input type='password' placeholder='Enter new password' className="password-input-control" value={values.password} name='password' onChange={handleChange} />
                    {errors.password && <p>{errors.password}</p>}
                    {errors.passwordLength && <p>{errors.passwordLength}</p>}
                    {errors.passwordNumber && <p>{errors.passwordNumber}</p>}
                    {errors.passwordSpecialChar && <p>{errors.passwordSpecialChar}</p>}
                    {errors.passwordUppercase && <p>{errors.passwordUppercase}</p>}
                    {errors.passwordLowercase && <p>{errors.passwordLowercase}</p>}
                </div>

                <div className="password-form-group">
                    <label className="password-label-control">Confirm Password</label>
                    <input type="password" className="password-input-control" value={values.confirmPassword} name='confirmPassword' onChange={handleChange}/>
                    {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                </div>

                <div className="password-form-group">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>

            </form>
        </div>
    </>
    );

}

export default ChangePassword

