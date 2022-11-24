import React, { useEffect, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Dock } from "react-dock";
import { useNavigate } from 'react-router-dom';
import './home.css'
import * as yup from "yup";
import { Formik, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { DeleteUser, EditUser, insertUser } from '../../Redux/Action/user.action';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Pagination from './Pagination';
import { ActiveUser } from './ActiveUser';
import { InActiveUser } from './InActiveUser';



export const Home = () => {
  const [filterdata, setFilterData] = useState("");
  const [Namefilter, setNameFilter] = useState("");
  const [Idfilter, setIdFilter] = useState("");
  const [Emailfilter, setEmailFilter] = useState("");
  const [Numberfilter, setNumberFilter] = useState("");
  const [Agefilter, setAgeFilter] = useState("");
  const [Genderfilter, setGenderFilter] = useState("");
  const [statusfilter, setStatusFilter] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [modalShow1, setModalShow1] = useState(false);
  const [Right, setRight] = useState(false);
  const [update, setUpdate] = useState(false);
  const [did, setDid] = useState(0);
  const userData = useSelector((state) => state.user.user);
  const [userlist, setUserList] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Order, setOrder] = useState("ASC");
  const [currentpage, setCurrentpage] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(50);
  const indexOfLastPost = currentpage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = userlist?.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentpage(pageNumber);
  const [favUserData, setFavUserData] = useState([]);
  const [searchStore, setsearchStore] = useState("");




  useEffect(() => {
    setUserList(userData);
  }, [userData]);

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  let DockFunction = () => {
    setRight(true);
  };

  let DockClose = () => {
    setRight(false);
    formik.resetForm();
    setUpdate(false);
  };


  let watchList = () => {
    navigate('/likepage')
  };


  const handleEdit = (values) => {
    dispatch(EditUser(values));
    setUpdate(false);
  }

  let handleEditData = (user) => {
    DockFunction();
    setUpdate(true);
    formik.setValues(user);
  };

  const handleDelete = (id) => {
    dispatch(DeleteUser(did));
    setModalShow(false);
   let localData = JSON.parse(localStorage.getItem('like'));
   let filterData = localData.filter((d, i) => d.id !== did);
   localStorage.setItem("like", JSON.stringify(filterData))
  }


  const handleChange12 = (e) => {
    setFilterData(e.target.value);
    localStorage.setItem("Search", JSON.stringify(e.target.value));
  };


  useEffect(() => {
    let localData = JSON.parse(localStorage.getItem("Search"));
    if (localData !== null) {
      setsearchStore(localData);
    }
  });

  useEffect(() => {
    let localData = JSON.parse(localStorage.getItem("Search"));
    if (localData) {
      setFilterData(localData);
    }
  }, []);

  const SearchClose = () => {
    localStorage.removeItem("Search");
    window.location.reload();
  }


  let schema = yup.object().shape({
    firstName: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    age: yup.number().required().positive().integer(),
    gender: yup.string().required(),
    status: yup.string().required(),
  });
  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      phone: "",
      age: "",
      gender: "",
      status: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {


      if (update) {
        handleEdit(values);
      } else {
        handleAdd(values);
      }
      DockClose();
      formik.resetForm()
    },


  });
  const handleAdd = (values) => {
    let id = Math.floor(Math.random() * 1000)
    let data = {
      id: id,
      ...values
    }
    dispatch(insertUser(data));
  }


  // --------------------- testing  


  const { errors, handleChange, handleSubmit, handleBlur, touched, values } =
    formik;

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className='width500'
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Are You Sure About Delete ?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button className="btn btn-danger" onClick={() => handleDelete()}>Yes</Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function MyVerticallyCenteredModal1(props) {
    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter1"
        centered
        className='width500'
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter1">
            Are You Sure to Logout ?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button onClick={() => handleLogOut()}>Yes</Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  let showField = (e) => {
    setpostsPerPage(e);
  };

  // -------------------------sorting

  const sorting = (col) => {
    if (Order === "ASC") {
      const sorted = userData.sort((a, b) =>
        a[col]?.toLowerCase() > b[col]?.toLowerCase() ? 1 : -1
      );
      setUserList(sorted);
      setOrder("DSC");
    }
    if (Order === "DSC") {
      const sorted = userData.sort((a, b) =>
        a[col]?.toLowerCase() < b[col]?.toLowerCase() ? 1 : -1
      );
      setUserList(sorted);
      setOrder("ASC");
    }
  };

  const sorting2 = (col) => {
    if (Order === "ASC") {
      const sorted = userData.sort((a, b) =>
        a[col]?.toString() > b[col]?.toString() ? 1 : -1
      );
      setUserList(sorted);
      setOrder("DSC");
    }
    if (Order === "DSC") {
      const sorted = userData.sort((a, b) =>
        a[col]?.toString() < b[col]?.toString() ? 1 : -1
      );
      setUserList(sorted);
      setOrder("ASC");
    }
  };



  // --------------------------wishlist
  const favDataHandler = async (data) => {
    let favLocalData = await JSON.parse(localStorage.getItem("like"));
    if (favLocalData) {
      const findIdx = await favLocalData?.findIndex((x) => x.id === data.id);
      if (findIdx === -1) {
        let newList = [...favLocalData, data];
        localStorage.setItem("like", JSON.stringify(newList));
        setFavUserData(newList);
      } else {
        favLocalData.splice(findIdx, 1);
        localStorage.setItem("like", JSON.stringify(favLocalData));
        setFavUserData(favLocalData);
      }
    } else {
      let arr = [data];
      localStorage.setItem("like", JSON.stringify(arr));
    }
  };

  useEffect(() => {
    let selectedData = JSON.parse(localStorage.getItem("like"));

    if (selectedData !== null) {
      setFavUserData(selectedData);
    }
  }, []);

  return (
    <>


      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <MyVerticallyCenteredModal1
        show={modalShow1}
        onHide={() => setModalShow1(false)}
      />
      <div className="container">


        <div className='header'>
          <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal"
            onClick={() => { setModalShow1(true) }}>
            Logout
          </button>
          <h1 className='navbar1'>USER database</h1>
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => DockFunction()}>Add User</button>
        </div>

        <div className="d-flex justify-content-between">
          <Dock position="right" isVisible={Right}>
            <div className="container dockdesign">
              <div>
                <div className="CloseDock">
                  <i className="fa-solid fa-xmark" onClick={() => DockClose()}></i>
                </div>
                <div className="d-flex justify-content-center">
                  <h1 className='text-center'>Add User</h1>

                </div>
                <div className='m-5 py-3'>
                  <Formik values={formik}>
                    <form onSubmit={handleSubmit} className="FormNote">
                      <input
                        className='form-control'
                        value={values.firstName}
                        name="firstName"
                        placeholder="firstName"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <p>
                        {errors.firstName && touched.firstName ? errors.firstName : ""}
                      </p>
                      <input
                        className='form-control'
                        value={values.email}
                        id="exampleEmail"
                        name="email"
                        placeholder="Email"
                        type="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <p>
                        {errors.email && touched.email ? errors.email : ""}
                      </p>
                      <input
                        className='form-control'
                        value={values.phone}
                        id="exampleNumber"
                        name="phone"
                        placeholder="Number"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <p>
                        {errors.phone && touched.phone ? errors.phone : ""}
                      </p>
                      <input
                        className='form-control'
                        value={values.age}
                        name="age"
                        placeholder="Age"
                        type="number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />{" "}
                      <p>{errors.age && touched.age ? errors.age : ""}</p>
                      <select
                        className='form-control'
                        value={values.gender}
                        name="gender"
                        type="select"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option>Select Gender</option>
                        <option>male</option>
                        <option>female</option>
                      </select>
                      <p>
                        {errors.gender && touched.gender
                          ? errors.gender
                          : ""}
                      </p>
                      <select
                        className='form-control'
                        value={values.status}
                        name="status"
                        type="select"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option>Select</option>
                        <option>true</option>
                        <option>false</option>
                      </select>
                      <p>
                        {errors.status && touched.status ? errors.status : ""}
                      </p>

                      <div className='d-flex justify-content-center'>
                        {update ? (
                          <button className='btn btn-primary' type="submit">update</button>
                        ) : (
                          <button className='btn btn-primary' type="submit">Submit</button>
                        )}
                      </div>
                    </form>
                  </Formik>
                </div>
              </div>
            </div>
          </Dock>
        </div>

        <div className='showwidth'>
          <select
            id="exampleSelect"
            name="select"
            type="select"
            className="form-control w-25"
            onChange={(e) => showField(e.target.value)}
          >
            <option>Select Data Per Page</option>
            <option value={userlist?.length}>All</option>
            <option>5</option>
            <option>10</option>
            <option>15</option>

          </select>
        </div>



        <div className='d-flex justify-content-center'>
          <input className="form-control me-2 w-50 " type="text" placeholder="Search" aria-label="Search"
            //  onChange={(e) => handleSearch(e)}
            value={searchStore}
            onChange={handleChange12}



          /> <span
            className="input-group-text serchclear"
            id="basic-addon1"
            onClick={() => SearchClose()}
          >
            <i className="fa-solid fa-xmark"></i>
          </span>
        </div>

        <nav>
  <div class="nav nav-tabs" id="nav-tab" role="tablist">
    <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Home</button>
    <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Profile</button>
    <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Contact</button>
  
  </div>
</nav>
<div class="tab-content" id="nav-tabContent">
  <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">   <table className="table">
              <thead>
                <tr>
                  <th scope="col" onClick={(col) => sorting2("id")} >ID</th>
                  <th scope="col" onClick={(col) => sorting("firstName")}>NAME</th>
                  <th scope="col" onClick={(col) => sorting("email")} >EMAIL</th>
                  <th scope="col" onClick={(col) => sorting("phone")}>PHONE</th>
                  <th scope="col" onClick={(col) => sorting2("age")} >AGE</th>
                  <th scope="col" onClick={(col) => sorting("gender")}>GENDER</th>
                  <th scope="col" onClick={(col) => sorting("status")}>STATU</th>
                  <th scope="col" className='w-auto'>ACTION</th>

                </tr>
                <tr>


                  <th scope="col"><input
                    type="text"
                    className="form-control"
                    placeholder="Search id"
                    aria-label="Username"
                    onChange={(e) => setIdFilter(e.target.value)}
                  /></th>
                  <th scope="col"><input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    aria-label="Username"
                    onChange={(e) => setNameFilter(e.target.value)}

                  /></th>
                  <th scope="col"><input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    aria-label="Username"

                    onChange={(e) => setEmailFilter(e.target.value)}

                  /></th>
                  <th scope="col"><input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    aria-label="Username"

                    onChange={(e) => setNumberFilter(e.target.value)}

                  /></th>
                  <th scope="col"><input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    aria-label="Username"

                    onChange={(e) => setAgeFilter(e.target.value)}

                  /></th>
                  <th scope="col"><input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    aria-label="Username"

                    onChange={(e) => setGenderFilter(e.target.value)}

                  /></th>
                  <th scope="col"><input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    aria-label="Username"

                    onChange={(e) => setStatusFilter(e.target.value)}

                  /></th>

                  <th className='homeheart'><i className={favUserData.length <= 0 ? "fa-regular fa-heart heart" : "fa-solid fa-heart heart"} onClick={() => watchList()}></i></th>
                </tr>
              </thead>


              <tbody className="table-group-divider">


                {currentPosts
                  ?.filter(
                    (user) =>
                      user.firstName.toLowerCase().includes(filterdata) ||
                      user.email.toLowerCase().includes(filterdata) ||
                      user.phone.toString().includes(filterdata) ||
                      user.age.toString().includes(filterdata) ||
                      user.gender
                        .toLowerCase()
                        .startsWith(filterdata.toLowerCase())
                  )
                  .filter((iduser) =>
                    iduser.id.toString().includes(Idfilter)
                  )
                  .filter((nameuser) =>
                    nameuser.firstName.toLowerCase().includes(Namefilter)
                  )
                  .filter((emailuser) =>
                    emailuser.email.toLowerCase().includes(Emailfilter)
                  )
                  .filter((numberuser) =>
                    numberuser.phone.toString().includes(Numberfilter)
                  )
                  .filter((ageuser) =>
                    ageuser.age.toString().includes(Agefilter)
                  )
                  .filter((genderuser) =>
                    genderuser.gender
                      .toLowerCase()
                      .startsWith(Genderfilter.toLowerCase())
                  )
                  .filter((statususer) =>
                    statususer.status
                      .toLowerCase()
                      .includes(statusfilter)
                  )
                  ?.map((user, index) => {
                    return (
                      <tr>
                        <th key={index} scope="row">{user.id}</th>
                        <td>{user.firstName}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.age}</td>
                        <td>{user.gender}</td>
                        <td>{user.status}</td>
                        <td>

                          <div>
                            <td className='width25'>


                              <i className={
                                favUserData.findIndex(
                                  (x) => x.id === user.id
                                ) >= 0
                                  ? "fa-solid fa-heart heart2"
                                  : "fa-regular fa-heart heart1"
                              }

                                onClick={() => favDataHandler(user)}></i>

                              <i className="fa-regular fa-pen-to-square mx-3"
                                onClick={() => handleEditData(user)}></i>
                              <i className="fa-regular fa-trash-can"
                                onClick={() => {
                                  setModalShow(true);
                                  setDid(user.id);
                                }}
                              ></i>

                            </td>


                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table></div>
  <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0"><ActiveUser /></div>
  <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" tabindex="0"><InActiveUser /></div>
</div>


        {/* <Tabs defaultIndex={0} onSelect={(index) => console.log(index)}>
          <TabList>
            <Tab>All</Tab>
            <Tab>Active</Tab>
            <Tab>InActive</Tab>
          </TabList>
          <TabPanel>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" onClick={(col) => sorting2("id")} >ID</th>
                  <th scope="col" onClick={(col) => sorting("firstName")}>NAME</th>
                  <th scope="col" onClick={(col) => sorting("email")} >EMAIL</th>
                  <th scope="col" onClick={(col) => sorting("phone")}>PHONE</th>
                  <th scope="col" onClick={(col) => sorting2("age")} >AGE</th>
                  <th scope="col" onClick={(col) => sorting("gender")}>GENDER</th>
                  <th scope="col" onClick={(col) => sorting("status")}>STATU</th>
                  <th scope="col" className='w-auto'>ACTION</th>

                </tr>
                <tr>


                  <th scope="col"><input
                    type="text"
                    className="form-control"
                    placeholder="Search id"
                    aria-label="Username"
                    onChange={(e) => setIdFilter(e.target.value)}
                  /></th>
                  <th scope="col"><input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    aria-label="Username"
                    onChange={(e) => setNameFilter(e.target.value)}

                  /></th>
                  <th scope="col"><input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    aria-label="Username"

                    onChange={(e) => setEmailFilter(e.target.value)}

                  /></th>
                  <th scope="col"><input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    aria-label="Username"

                    onChange={(e) => setNumberFilter(e.target.value)}

                  /></th>
                  <th scope="col"><input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    aria-label="Username"

                    onChange={(e) => setAgeFilter(e.target.value)}

                  /></th>
                  <th scope="col"><input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    aria-label="Username"

                    onChange={(e) => setGenderFilter(e.target.value)}

                  /></th>
                  <th scope="col"><input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    aria-label="Username"

                    onChange={(e) => setStatusFilter(e.target.value)}

                  /></th>

                  <th className='homeheart'><i className={favUserData.length <= 0 ? "fa-regular fa-heart heart" : "fa-solid fa-heart heart"} onClick={() => watchList()}></i></th>
                </tr>
              </thead>


              <tbody className="table-group-divider">


                {currentPosts
                  ?.filter(
                    (user) =>
                      user.firstName.toLowerCase().includes(filterdata) ||
                      user.email.toLowerCase().includes(filterdata) ||
                      user.phone.toString().includes(filterdata) ||
                      user.age.toString().includes(filterdata) ||
                      user.gender
                        .toLowerCase()
                        .startsWith(filterdata.toLowerCase())
                  )
                  .filter((iduser) =>
                    iduser.id.toString().includes(Idfilter)
                  )
                  .filter((nameuser) =>
                    nameuser.firstName.toLowerCase().includes(Namefilter)
                  )
                  .filter((emailuser) =>
                    emailuser.email.toLowerCase().includes(Emailfilter)
                  )
                  .filter((numberuser) =>
                    numberuser.phone.toString().includes(Numberfilter)
                  )
                  .filter((ageuser) =>
                    ageuser.age.toString().includes(Agefilter)
                  )
                  .filter((genderuser) =>
                    genderuser.gender
                      .toLowerCase()
                      .startsWith(Genderfilter.toLowerCase())
                  )
                  .filter((statususer) =>
                    statususer.status
                      .toLowerCase()
                      .includes(statusfilter)
                  )
                  ?.map((user, index) => {
                    return (
                      <tr>
                        <th key={index} scope="row">{user.id}</th>
                        <td>{user.firstName}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.age}</td>
                        <td>{user.gender}</td>
                        <td>{user.status}</td>
                        <td>

                          <div>
                            <td className='width25'>


                              <i className={
                                favUserData.findIndex(
                                  (x) => x.id === user.id
                                ) >= 0
                                  ? "fa-solid fa-heart heart2"
                                  : "fa-regular fa-heart heart1"
                              }

                                onClick={() => favDataHandler(user)}></i>

                              <i className="fa-regular fa-pen-to-square mx-3"
                                onClick={() => handleEditData(user)}></i>
                              <i className="fa-regular fa-trash-can"
                                onClick={() => {
                                  setModalShow(true);
                                  setDid(user.id);
                                }}
                              ></i>

                            </td>


                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </TabPanel>
          <TabPanel>
            <h2>Active</h2>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" onClick={(col) => sorting2("id")} >ID</th>
                  <th scope="col" onClick={(col) => sorting("firstName")}>NAME</th>
                  <th scope="col" onClick={(col) => sorting("email")} >EMAIL</th>
                  <th scope="col" onClick={(col) => sorting("phone")}>PHONE</th>
                  <th scope="col" onClick={(col) => sorting2("age")} >AGE</th>
                  <th scope="col" onClick={(col) => sorting("gender")}>GENDER</th>
                  <th scope="col" onClick={(col) => sorting("status")}>STATU</th>
                  <th scope="col" className='w-auto'>ACTION</th>
                </tr>
                <tr>
                  <th scope="col"><input
                    type="text"
                    className="form-control"
                    placeholder="Search id"
                    aria-label="Username"
                    onChange={(e) => setIdFilter(e.target.value)} /></th>
                  <th scope="col"><input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    aria-label="Username"
                    onChange={(e) => setNameFilter(e.target.value)} /></th>
                  <th scope="col"><input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    aria-label="Username"
                    onChange={(e) => setEmailFilter(e.target.value)} /></th>
                  <th scope="col"><input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    aria-label="Username"
                    onChange={(e) => setNumberFilter(e.target.value)} /></th>
                  <th scope="col"><input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    aria-label="Username"
                    onChange={(e) => setAgeFilter(e.target.value)} /></th>
                  <th scope="col"><input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    aria-label="Username"
                    onChange={(e) => setGenderFilter(e.target.value)} /></th>
                  <th scope="col"><input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    aria-label="Username"
                    onChange={(e) => setStatusFilter(e.target.value)} /></th>
                  <th className='homeheart'><i className={favUserData.length <= 0 ? "fa-regular fa-heart heart" : "fa-solid fa-heart heart"} onClick={() => watchList()}></i></th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {currentPosts
                  ?.filter(
                    (user) =>
                      user.firstName.toLowerCase().includes(filterdata) ||
                      user.email.toLowerCase().includes(filterdata) ||
                      user.phone.toString().includes(filterdata) ||
                      user.age.toString().includes(filterdata) ||
                      user.gender
                        .toLowerCase()
                        .startsWith(filterdata.toLowerCase())
                  )
                  .filter((iduser) =>
                    iduser.id.toString().includes(Idfilter)
                  )
                  .filter((nameuser) =>
                    nameuser.firstName.toLowerCase().includes(Namefilter)
                  )
                  .filter((emailuser) =>
                    emailuser.email.toLowerCase().includes(Emailfilter)
                  )
                  .filter((numberuser) =>
                    numberuser.phone.toString().includes(Numberfilter)
                  )
                  .filter((ageuser) =>
                    ageuser.age.toString().includes(Agefilter)
                  )
                  .filter((genderuser) =>
                    genderuser.gender
                      .toLowerCase()
                      .startsWith(Genderfilter.toLowerCase())
                  )
                  .filter((statususer) =>
                    statususer.status
                      .toLowerCase()
                      .includes(statusfilter)
                  )
                  ?.map((user, index) => {
                    return user.status === "true" ? (
                      <tr>
                        <th key={index} scope="row">{user.id}</th>
                        <td>{user.firstName}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.age}</td>
                        <td>{user.gender}</td>
                        <td>{user.status}</td>
                        <td>
                          <div>
                            <td className='width25'>
                              <i className={
                                favUserData.findIndex(
                                  (x) => x.id === user.id
                                ) >= 0
                                  ? "fa-solid fa-heart heart2"
                                  : "fa-regular fa-heart heart1"
                              }
                                onClick={() => favDataHandler(user)}></i>
                              <i className="fa-regular fa-pen-to-square mx-3"
                                onClick={() => handleEditData(user)}></i>
                              <i className="fa-regular fa-trash-can"
                                onClick={() => {
                                  setModalShow(true);
                                  setDid(user.id);
                                }}
                              ></i>
                            </td>
                          </div>
                        </td>
                      </tr>
                    ) : null;
                  })}
              </tbody>
            </table>
          </TabPanel>
          <TabPanel>
            <h2>inactive</h2>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" onClick={(col) => sorting2("id")} >ID</th>
                  <th scope="col" onClick={(col) => sorting("firstName")}>NAME</th>
                  <th scope="col" onClick={(col) => sorting("email")} >EMAIL</th>
                  <th scope="col" onClick={(col) => sorting("phone")}>PHONE</th>
                  <th scope="col" onClick={(col) => sorting2("age")} >AGE</th>
                  <th scope="col" onClick={(col) => sorting("gender")}>GENDER</th>
                  <th scope="col" onClick={(col) => sorting("status")}>STATU</th>
                  <th scope="col" className='w-auto'>ACTION</th>

                </tr>
                <tr>
                  <th scope="col"><input
                    type="text"
                    className="form-control"
                    placeholder="Search id"
                    aria-label="Username"
                    onChange={(e) => setIdFilter(e.target.value)} /></th>
                  <th scope="col"><input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    aria-label="Username"
                    onChange={(e) => setNameFilter(e.target.value)} /></th>
                  <th scope="col"><input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    aria-label="Username"
                    onChange={(e) => setEmailFilter(e.target.value)} /></th>
                  <th scope="col"><input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    aria-label="Username"
                    onChange={(e) => setNumberFilter(e.target.value)} /></th>
                  <th scope="col"><input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    aria-label="Username"
                    onChange={(e) => setAgeFilter(e.target.value)} /></th>
                  <th scope="col"><input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    aria-label="Username"
                    onChange={(e) => setGenderFilter(e.target.value)} /></th>
                  <th scope="col"><input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    aria-label="Username"
                    onChange={(e) => setStatusFilter(e.target.value)} /></th>
                  <th className='homeheart'><i className={favUserData.length <= 0 ? "fa-regular fa-heart heart" : "fa-solid fa-heart heart"} onClick={() => watchList()}></i></th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {currentPosts
                  ?.filter(
                    (user) =>
                      user.firstName.toLowerCase().includes(filterdata) ||
                      user.email.toLowerCase().includes(filterdata) ||
                      user.phone.toString().includes(filterdata) ||
                      user.age.toString().includes(filterdata) ||
                      user.gender
                        .toLowerCase()
                        .startsWith(filterdata.toLowerCase())
                  )
                  .filter((iduser) =>
                    iduser.id.toString().includes(Idfilter)
                  )
                  .filter((nameuser) =>
                    nameuser.firstName.toLowerCase().includes(Namefilter)
                  )
                  .filter((emailuser) =>
                    emailuser.email.toLowerCase().includes(Emailfilter)
                  )
                  .filter((numberuser) =>
                    numberuser.phone.toString().includes(Numberfilter)
                  )
                  .filter((ageuser) =>
                    ageuser.age.toString().includes(Agefilter)
                  )
                  .filter((genderuser) =>
                    genderuser.gender
                      .toLowerCase()
                      .startsWith(Genderfilter.toLowerCase())
                  )
                  .filter((statususer) =>
                    statususer.status
                      .toLowerCase()
                      .includes(statusfilter)
                  )
                  ?.map((user, index) => {
                    return user.status === "false" ? (
                      <tr>
                        <th key={index} scope="row">{user.id}</th>
                        <td>{user.firstName}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.age}</td>
                        <td>{user.gender}</td>
                        <td>{user.status}</td>
                        <td>
                          <div>
                            <td className='width25'>
                              <i className={
                                favUserData.findIndex(
                                  (x) => x.id === user.id
                                ) >= 0
                                  ? "fa-solid fa-heart heart2"
                                  : "fa-regular fa-heart heart1"
                              }
                                onClick={() => favDataHandler(user)}
                                data-toggle="tooltip" data-placement="right" title="Add to Wishlist"></i>
                              <i className="fa-regular fa-pen-to-square mx-3"
                                onClick={() => handleEditData(user)}
                                data-toggle="tooltip" data-placement="right" title="Click to Edit"></i>
                              <i className="fa-regular fa-trash-can"
                                onClick={() => {
                                  setModalShow(true);
                                  setDid(user.id);
                                }}
                                data-toggle="tooltip" data-placement="right" title="Click to Delete"></i>
                            </td>
                          </div>
                        </td>
                      </tr>
                    ) : null;
                  })}
              </tbody>
            </table>
          </TabPanel>
        </Tabs> */}
        <div className='fw-bold'>
          Showing 1 to {postsPerPage} of {userData.length}
        </div>
        <div className="page">
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={userlist?.length}
            paginate={paginate}
          />
        </div>
      </div>

    </>
  )
}
