import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Wishlist } from './Wishlist';
import './like.css'
import { useSelector } from "react-redux";

export const Like = () => {
    const userData = useSelector((state) => state.user.user);
    const [userlist, setUserList] = useState();
    const [Like, Setlike] = useState([]);



    const handleWatchdelete = (id) => {
        let localData = JSON.parse(localStorage.getItem("like"));
        let FilterData = localData.filter((d , index) => d.id !== id);
        localStorage.setItem("like", JSON.stringify(FilterData));
        getdata();
    };



    const getdata = () => {
        let localData = JSON.parse(localStorage.getItem("like"));
        if (localData !== null) {
            Setlike(localData);
        }
    }

    useEffect(() => {
        setUserList(userData);
    }, [userData]);

    useEffect(() => {
        getdata();
    }, []);


    return (
        <>
            <div className="container">
                <div className='header'>
                    <h1 className='navbar1'>USER database</h1>
                    <Link to='/home'> <button
                        className="btn btn-primary"
                        type="button"
                    >Back</button></Link>
                </div>
                <div className="row d-flex">
                    {
                        Like.length > 0 ?
                            Like?.map((like, index) => {

                                return (
                                    <div className="col-3 p-3 cardd" key={index}>
                                        <div className="card">
                                            <div className="d-flex justify-content-around align-items-center" >
                                                <img src={like.image} alt="pic" className='w-25' />
                                                <h5>{like.firstName}</h5>
                                                <i className="fa-solid fa-heart d-flex justify-content-end d-block" data-toggle="tooltip" data-placement="right" title="Remove from list" onClick={() => handleWatchdelete(like.id)}></i>
                                            </div>
                                            <ul className="list-group list-group-flush cardul">
                                                <li className="list-group-item">{like.email}</li>
                                                <li className="list-group-item">{like.phone}</li>
                                                <li className="list-group-item">{like.gender}</li>
                                            </ul>

                                        </div>
                                    </div>
                                )
                            })
                            :
                            <Wishlist />
                    }



                </div>
            </div>


        </>
    )
}
