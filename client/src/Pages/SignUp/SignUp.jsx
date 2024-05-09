import { Link, useNavigate} from "react-router-dom"
import {useState, useEffect} from 'react'
import AuthHeader from "../../Components/Layout/Auth-Header/AuthHeader"
import "./SignUp.scss"
import validate from "../../Functions/SignUpValidation"

function SignUp() {
    const navigate = useNavigate();

     const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
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
        if (Object.keys(errors).length === 0 && (
            values.name !== "" && values.email !== "" && values.password !== "" && values.confirmPassword !== "" && values.username !== "")) {

           const existingUsers = JSON.parse(localStorage.getItem("users")) || []; // reterive all existing users or assign to nothing if 'users' key is not there

           const existingUser = existingUsers.find(user => user.email === values.email && (user.Username).toLowerCase() === (values.username).toLowerCase());  //check if inputted login detail matches with existing user
            
            if (existingUser) {
                alert("Account already exists");
            }

            else {
            const currDate = new Date();
            const year = currDate.getFullYear();
            const month = currDate.getMonth() + 1; 
            const day = currDate.getDate() + 1;

            const userData = { username: values.username, email: values.email, password: values.password, dateJoined: 
                              `${year}-${month}-${day}`, firstName: "", lastName: "",}
            const updatedUsers = [...existingUsers, userData];

            localStorage.setItem("user", JSON.stringify(values.username)); //store the username of the logged in users
            localStorage.setItem("users", JSON.stringify(updatedUsers)); } // put new user into list of existing users


            const personalisedProfiles = JSON.parse(localStorage.getItem("profiles")) || []; // reterive all existing users personalised profiles
            const userInitialProfile = {username: values.username, age: null, sex: "male", weight: null, height: null, activityLevel: "sedentary", 
                                        dietaryPreferences: "none", healthGoals: "maintain", caloricRequirement: ""};

            const updatedProfiles = [...personalisedProfiles, userInitialProfile];

            localStorage.setItem("profiles",  JSON.stringify(updatedProfiles)); //storing empty personalised profiles for later use  

            alert("Thank you for joining our SOIL community");
            navigate("/profile");
        }
      }, [errors]);


    return(
        <>
        <AuthHeader />
        <hr></hr>
        <div className="signup-container">
            <form className="form-container" onSubmit={handleSubmit}>


                <div className="signup-form-group">
                    <label className="signup-label-control">Username</label>
                    <input type='text' placeholder='Enter Name' className="signup-input-control" value={values.username} name='username' onChange={handleChange}/>
                    {errors.username && <p>{errors.username}</p>}
                </div>

                <div className="signup-form-group">
                    <label className="signup-label-control">Email</label>
                    <input type='email' placeholder='example@gmail.com' className="signup-input-control" value={values.email} name='email' onChange={handleChange} />
                    {errors.email && <p>{errors.email}</p>}
                </div>

                <div className="signup-form-group">
                    <label className="signup-label-control">Password</label>
                    <input type="password" placeholder='Enter Password' className="signup-input-control" value={values.password} name='password' onChange={handleChange}/>
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