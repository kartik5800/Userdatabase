import React, { useEffect } from 'react'
import * as yup from "yup";
import { useFormik } from "formik";
import {Link, useHistory} from "react-router-dom";
import logo from '../../../src/image/logo.jpg'
import './Login.css'


export const Login = () => {

    const history = useHistory();
    let schema = yup.object().shape({
        email: yup.string().email().required("please enter email addersh"),
        password: yup.string().required("please enter your password"),
    });


    useEffect(() => {

        let olddata = localStorage.getItem('formdata');
        console.log("login page", olddata);
    }, [])



    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            let olddata = localStorage.getItem('formdata')
            let oldArr = JSON.parse(olddata)
            console.log("oldArr", oldArr);
            oldArr.map((user, index) => {

                if (user.email === values.email && user.password === values.password) {

                    history.push("/home");
                    console.log("welcome");
                    localStorage.setItem("user", JSON.stringify(values))
                } else {
                    console.log("getout");
                    alert(" please enter currect Email or password")
                }
     

            })
        }});




    // const formik = useFormik({
    //     initialValues: {
    //       email: "",
    //       password: "",
    //     },
    //     validationSchema: schema,
    //     onSubmit: (values) => {
    //       history.push("/home");
    //       localStorage.setItem("user", "123");

    //     },
    //   });

    const { errors, handleChange, handleSubmit, handleBlur, touched, values } = formik;
    return (
        <>
            <div className="container vh-100">
                <div className="row">
                    <div className="col-6 vh-100 d-flex justify-content-center align-items-center">
                        <div className=''>
                            <img className='' src={logo} alt="" />
                        </div>

                    </div>

                    <div className="col-6 d-flex justify-content-center align-items-center ">
                        <formik values={formik}>
                            <form onSubmit={handleSubmit} className='bg-white p-5 m-p rounded-5' >
                                <h1 className='login'>LOGIN</h1>
                                <input
                                    className='form-control'
                                    name="email"
                                    placeholder="Email"
                                    type="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                />
                                <p>{errors.email && touched.email ? errors.email : ""}</p>
                                <input
                                    className='form-control'
                                    name="password"
                                    placeholder="Password"
                                    type="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                />
                                <p>
                                    {errors.password && touched.password ? errors.password : ""}
                                </p>
                                <div className='d-flex justify-content-center align-items-center'>
                                    <button className='btn btn-primary' type="submit">Login</button>
                                </div>
                                <h5>  Not a Member ? <Link to="/signup"> Signup Now</Link></h5>
                            </form>
                        </formik>

                    </div>
                </div>
            </div>

        </>
    )
}
