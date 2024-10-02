import axios from "axios";
import { IUSerMaster } from "../Models/IUserMaster";
import { IUser } from "../Models/IUser";
import { ILogin } from "../Models/ILogin";
import { IActiveAccount } from "../Models/IActiveAccount";

export class UserManagementService {
  private static Base_URL = "http://localhost:8083/usermanagement/";

  public static getAllUsers(): Promise<{ data: IUSerMaster[] }> {
    return axios.get(`${this.Base_URL}/users`);
  }

  public static getAUser(userId: number): Promise<{ data: IUser }> {
    return axios.get(`${this.Base_URL}/user/${userId}`);
  }

  public static updateAUser(
    userObj: IUser,
    userId: number
  ): Promise<{ data: boolean }> {
    return axios.put(`${this.Base_URL}/update/${userId}`, userObj);
  }

  public static deleteUser(userId: number): Promise<{ data: boolean }> {
    return axios.delete(`${this.Base_URL}/user/${userId}`);
  }

  public static activeStatus(
    userId: number,
    activeStatus: string
  ): Promise<{ data: boolean }> {
    return axios.put(`${this.Base_URL}/status/${userId}/${activeStatus}`);
  }

  public static userRegistration(userObj: IUser): Promise<{ data: boolean }> {
    return axios.post(`${this.Base_URL}/userreg`, userObj);
  }
  public static userLogin(loginObj: ILogin): Promise<{ data: boolean }> {
    return axios.post(`${this.Base_URL}/login`, loginObj);
  }
  public static userActivate(
    activeObj: IActiveAccount
  ): Promise<{ data: boolean }> {
    return axios.post(`${this.Base_URL}/activate`, activeObj);
  }
  public static userForgotPassword(email: string): Promise<{ data: boolean }> {
    return axios.post(`${this.Base_URL}/forgotpassword/${email}`);
  }
}
