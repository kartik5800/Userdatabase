import React from 'react'
import * as yup from "yup";
import {useFormik } from "formik";
import { Link, useHistory } from "react-router-dom";
import logo from '../../../src/image/logo.jpg'


export const Signup = () => {

    const history = useHistory();

    let schema = yup.object().shape({
        name:yup.string().required("please enter your name"),
        email: yup.string().email().required("please enter email addersh"),
        password: yup.string().required("please enter your password"),
    });

    const formik = useFormik({
        initialValues: {
            name:"",
            email: "",
            password: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            let olddata = localStorage.getItem('formdata');
            if(olddata==null){
              olddata = []
              olddata.push(values)
              localStorage.setItem('formdata', JSON.stringify(olddata));
            }else{
              let oldArr = JSON.parse(olddata)
              oldArr.push(values)
              localStorage.setItem("formdata", JSON.stringify(oldArr))
              console.log(oldArr,'hhg')
            }
            history.push("/");

        },
    });

    const { errors, handleChange, handleSubmit, handleBlur, touched } = formik;
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
                            <h1 className='login'>Ragister user</h1>
                            <input
                                    className='form-control'
                                    name="name"
                                    placeholder="name"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <p>{errors.name && touched.name ? errors.name : ""}</p>

                                <input
                                    className='form-control'
                                    name="email"
                                    placeholder="Email"
                                    type="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <p>{errors.email && touched.email ? errors.email : ""}</p>
                                <input
                                    className='form-control'
                                    name="password"
                                    placeholder="Password"
                                    type="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <p>
                                    {errors.password && touched.password ? errors.password : ""}
                                </p>
                                <div className='d-flex justify-content-center align-items-center'>
                                    <button className='btn btn-primary' type="submit">Sign Up</button>
                                </div>
                               <h5> i'm Allready a member! <Link to='/'> Login</Link></h5> 
                            </form>
                        </formik>
                    </div>
                </div>
            </div>

        </>
    )
}
