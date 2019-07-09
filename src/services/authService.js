import * as jwt from "jsonwebtoken";
import * as moment from "moment";

class authService {
  isValidToken(token) {
    return moment().isBefore(this.getTokenExpiration(token));
  }
  getTokenExpiration(token) {
    const exp = jwt.decode(token).exp;
    return moment.unix(exp);
  }
  isAuthenticated() {
    const token = this.getToken();
    return token && this.isValidToken(token) ? true : false;
  }
  saveToken(token) {
    localStorage.setItem("auth_token", token);
  }
  getToken() {
    return localStorage.getItem("auth_token");
  }
  decode(token) {
    return jwt.decode(token);
  }
  getUsername() {
    const token = this.getToken();
    return this.decode(token).username;
  }
  invalidateUser() {
    localStorage.removeItem("auth_token");
  }
}

export default new authService();
