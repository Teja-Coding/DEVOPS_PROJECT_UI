import axios from "axios";
import { IRequest } from "../models/IRequest";
import { IViewData } from "../models/IViewData";

export class ArServices {
  private static Base_URL = "http://localhost:8084/app";

  public static getACitizen(appId: number): Promise<{ data: IRequest }> {
    return axios.get(`${this.Base_URL}/citizen/${appId}`);
  }
  public static getAllCitizen(): Promise<{ data: IViewData[] }> {
    return axios.get(`${this.Base_URL}/all`);
  }
  public static updateACitizen(
    appId: number,
    data: IRequest
  ): Promise<{ data: IViewData }> {
    return axios.put(`${this.Base_URL}/update/${appId}`, data);
  }
  public static deleteACitizen(appId: number): Promise<{ data: string }> {
    return axios.delete(`${this.Base_URL}/delete/${appId}`);
  }
  public static createACitizen(data: IRequest): Promise<{ data: string }> {
    return axios.post(`${this.Base_URL}/register`, data);
  }
}
