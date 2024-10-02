import axios from "axios";
import { IPlan } from "../Models/IPlan";
import { ICategory } from "../Models/ICategory";

export class PlanService {
  private static Base_URL = "http://localhost:8081/dashboard/admin1";

  public static getAllPlans(): Promise<{ data: IPlan[] }> {
    return axios.get(`${this.Base_URL}/plans`);
  }

  public static getAPlan(planId: number): Promise<{ data: IPlan }> {
    return axios.get(`${this.Base_URL}/plan/${planId}`);
  }

  public static createAPlan(planObj: IPlan): Promise<{ data: boolean }> {
    return axios.post(`${this.Base_URL}/plan`, planObj);
  }

  public static updateAPlan(
    planObj: IPlan,
    planId: number
  ): Promise<{ data: boolean }> {
    return axios.put(`${this.Base_URL}/update/${planId}`, planObj);
  }

  public static deletePlan(planId: number): Promise<{ data: boolean }> {
    return axios.delete(`${this.Base_URL}/plan/${planId}`);
  }

  public static getAllCategorys(): Promise<{ data: ICategory[] }> {
    return axios.get(`${this.Base_URL}/categories`);
  }

  public static updateStatus(
    planObj: string,
    planId: number
  ): Promise<{ data: boolean }> {
    return axios.put(`${this.Base_URL}/status/${planId}/${planObj}`);
  }
}
