import { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom"
import "./ChangePassword.scss"
import validate from "../../Functions/ChangePasswordValidation"

function ChangePassword() {
    const navigate = useNavigate();


    const [values, setValues] = useState({
        currPassword: '',
        password: '',
        confirmPassword: ''
     })
     
    const [errors, setError] = useState({});

    function handleChange(e) {
        setValues({...values, [e.target.name]: e.target.value})
     }

    function handleSubmit(e) {
        e.preventDefault();
        setError(validate(values));
    }
    useEffect(() => {
        if (
            Object.keys(errors).length === 0 &&
            values.currPassword !== "" &&
            values.password !== "" &&
            values.confirmPassword !== ""
        ) {
            const currUser = JSON.parse(localStorage.getItem("user"));
            const users = JSON.parse(localStorage.getItem("users"));
            const userIndex = users.findIndex(user => user.username === currUser);

            if (userIndex >= 0) {
            users[userIndex].password = values.password;
            localStorage.setItem("users", JSON.stringify(users));
            }

            alert("Change password successful");
            navigate("/profile");
        }
    }, [errors]);

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
