import { Link,  useNavigate} from "react-router-dom"
import { useState, useEffect} from'react'
import AuthHeader from "../../Components/Layout/Auth-Header/AuthHeader"
import validate from "../../Functions/LoginValidation"
import "./Login.scss"

//Users will use this page to login
function Login() {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        email: '',
        password: ''
     })

     const [errors, setError] = useState({});

     function handleSubmit(e) {
        e.preventDefault();
        setError(validate(values));

     }

     function handleChange(e) {
        setValues({...values, [e.target.name]: e.target.value})
     }

     useEffect(() => {
        if (Object.keys(errors).length === 0 && (values.email !== "" && values.password !== "")) {
            const existingUsers = JSON.parse(localStorage.getItem("users")) || []; // reterive all existing users or assign to nothing if 'users' key is not there
            const existingUser = existingUsers.find(user => user.email === values.email && user.password === values.password); //check if inputted login detail matches with existing user

            if (existingUser) {
                localStorage.setItem("user", JSON.stringify(existingUser.username));
                alert("Login successful");
                navigate("/profile");
            } else {
                alert("Account doesn't exit");
            }

        }
      }, [errors]);

    return(
        <>
        <AuthHeader />
        <hr></hr>
        <div className="login-container">
            <form className="login-form-container" onSubmit={handleSubmit}>
                <div className="login-form-group">
                    <label className="login-label-control">Email</label>
                    <input type='email' className="login-input-control" placeholder='example@gmail.com' value={values.email} name='email' onChange={handleChange}/>
                    {errors.email && <p>{errors.email}</p>}
                </div>

                <div className="login-form-group">
                    <label className="login-label-control">Password</label>
                    <input type="password" className="login-input-control" placeholder='Enter Password' value={values.password} name='password' onChange={handleChange}/>
                    {errors.password && <p>{errors.password}</p>}
                    {errors.passwordLength && <p>{errors.passwordLength}</p>}
                    {errors.passwordNumber && <p>{errors.passwordNumber}</p>}
                    {errors.passwordSpecialChar && <p>{errors.passwordSpecialChar}</p>}
                    {errors.passwordUppercase && <p>{errors.passwordUppercase}</p>}
                    {errors.passwordLowercase && <p>{errors.passwordLowercase}</p>}
                </div>

                <div className="login-form-group">
                    <button type="submit" className="btn btn-primary" id='submit-button'>Login</button>
                </div>
            </form>
            
            <div className="login-link-container">
                <p>Dont have an account? </p>
                <Link to="/signup">
                    <p>Sign Up</p>
                </Link>
            </div>
        </div>
        </>
    );
}

export default Login;