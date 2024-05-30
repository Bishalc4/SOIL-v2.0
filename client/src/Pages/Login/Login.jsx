import { Link,  useNavigate} from "react-router-dom"
import { useState, useEffect} from'react'
import AuthHeader from "../../Components/Layout/Auth-Header/AuthHeader"
import validate from "../../Functions/LoginValidation"
import { verifyUser, setUser } from "../../data/user"
import{ setCart } from "../../data/cart"
import "./Login.scss"

//Users will use this page to login
function Login() {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        username: '',
        password: ''
     }); 

     const [errors, setError] = useState({});

     const handleSubmit = async (e) => {
        e.preventDefault();
        setError(validate(values));

        if (Object.keys(errors).length === 0 && (values.username !== "" && values.password !== "")) {
                
                const user = await verifyUser(values.username, values.password);
    
                if(user === null) {
                    // Login failed, reset password field to blank and set error message.
                    setValues({ ...values, password: "" });
                    alert("Username/password invalid, please try again.");
                    return;
                  }
                alert("Welcome " + values.username);
                await setUser(values.username);
                await setCart(values.username);
                navigate("/");
    
            }
     }

     function handleChange(e) {
        setValues({...values, [e.target.name]: e.target.value})
     }

      

    return(
        <>
        <AuthHeader />
        <hr></hr>
        <div className="login-container">
            <form className="login-form-container" onSubmit={handleSubmit}>
                <div className="login-form-group">
                    <label className="login-label-control">Username</label>
                    <input type='text' className="login-input-control" placeholder='abc123' value={values.username} name='username' onChange={handleChange}/>
                    {errors.username && <p>{errors.username}</p>}
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