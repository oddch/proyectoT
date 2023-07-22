import axios from './axiosConfig.js';
import Cookies from "js-cookie";

export default {
  setUserLogged(userLogged) {
    
    Cookies.set("user", userLogged);
    
  },
  getUserLogged() {
    if (Cookies.get("user") != null) {
      var user = JSON.parse(Cookies.get("user"))
      return user;
    }
  },
  // register(email, password) {
  //   const user = { email, password };
  //   return axios.post("/regiser", user);
  // },
  login(name, password) {
    const user = {user: name,password: password };
    return axios.post("/auth/login", user);
  },

  logout() {
    Cookies.remove('user')
    localStorage.removeItem('token');
    var token = localStorage.getItem('token')
    return true
  },
  
  getDevices() {
    const user = getUserLogged()
    return axios.get("/device/findMyDevices", {userid: user["id"]});
  },

  checkAuthentication() {
    return new Promise((resolve) => {
      const token = localStorage.getItem('token');
      const user = Cookies.get("user");
     
      const isAuthenticated = !!token && !!user;
      if (!isAuthenticated && !!token) {
        localStorage.removeItem('token');
      }
      resolve(isAuthenticated);
    });
  }

};
