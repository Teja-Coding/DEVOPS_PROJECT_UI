import axios from "axios";
import { IRResponse } from "../Models/IRResponse";
import { IRRequest } from "../Models/IRRequest";

export class ReportService {
  private static Base_URL = "http://localhost:8082/dashboard/admin2";

  public static getAllPlans(): Promise<{ data: string[] }> {
    return axios.get(`${this.Base_URL}/plans`);
  }

  public static getAllStatus(): Promise<{ data: string[] }> {
    return axios.get(`${this.Base_URL}/status`);
  }

  // public static getAPdf(): Promise<{ data: Blob }> {
  //   return axios.get(`${this.Base_URL}/pdf`);
  // }
  // public static getAExcel(): Promise<{ blob: Blob }> {
  //   return axios.get(`${this.Base_URL}/excel`);
  // }

  public static search(planObj: IRRequest): Promise<{ data: IRResponse[] }> {
    return axios.post(`${this.Base_URL}/search`, planObj);
  }
}
