import type { JwtPayload } from "jwt-decode";
import type { UserData } from "../interfaces/UserData";
import { jwtDecode } from "jwt-decode";
class AuthService {
  getProfile() {
    return jwtDecode<UserData>(this.getToken());
  }
  getUserId() {
    return localStorage.getItem("userId");
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);

      if (decoded?.exp && decoded?.exp < Date.now() / 1000) {
        return true;
      }
    } catch {
      return true;
    }
  }

  getToken(): string {
    const loggedUser = localStorage.getItem("id_token") || "";
    return loggedUser;
  }

  login(idToken: string) {
    localStorage.setItem("id_token", idToken);

    try {
      const decoded = jwtDecode<UserData>(idToken);
      if (decoded.id) {
        localStorage.setItem("userId", decoded.id); // <-- NEW
      } else {
        console.warn("Decoded token missing user ID");
      }
    } catch (error) {
      console.error("Failed to decode token", error);
    }
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("userId");
  }
}

export default new AuthService();
