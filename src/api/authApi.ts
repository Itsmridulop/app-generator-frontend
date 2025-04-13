import axios, { AxiosInstance, AxiosResponse } from "axios";
import { UserResponse } from "../types/userType";

class Authentication {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:8080/api/v1/users",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async signup(userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<UserResponse> {
    try {
      const response: AxiosResponse<UserResponse> = await this.api.post(
        "/signup",
        userData,
      );
      this.saveToken(response.data.token);
      return response.data;
    } catch (error) {
      console.error("Error while signup", error);
      throw error;
    }
  }

  public async login(email: string, password: string): Promise<UserResponse> {
    try {
      const response: AxiosResponse<UserResponse> = await this.api.post(
        "/login",
        { email, password },
      );
      this.removeToken();
      this.saveToken(response.data.token);
      return response.data;
    } catch (error) {
      console.error("Error while login into this account", error);
      throw error;
    }
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem("authToken");
  }

  public saveToken(token: string): void {
    localStorage.setItem("authToken", token);
  }

  public removeToken(): void {
    localStorage.removeItem("authToken");
  }

  public gettoken(): string | null {
    return localStorage.getItem("authToken");
  }
}

const auth = new Authentication();
export { auth };
