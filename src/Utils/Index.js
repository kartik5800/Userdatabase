const Islogin = () => {
let localData = localStorage.getItem('user')



 if (localData) {

        return true;
    } else {
        return false;
    }



}

export default Islogin;





