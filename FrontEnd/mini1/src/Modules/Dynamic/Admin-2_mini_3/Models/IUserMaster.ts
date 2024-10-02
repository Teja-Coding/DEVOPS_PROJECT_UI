export interface IUSerMaster {
  userId: number;
  fullName: string;
  email: string;
  mobielNumber: number;
  gender: string;
  dob?: string;
  ssn: number;
  password?: string;
  activeStatus: string;
  createdDate?: string;
  updatedDate?: string;
  createdBy?: string;
  updatedBy?: string;
}
