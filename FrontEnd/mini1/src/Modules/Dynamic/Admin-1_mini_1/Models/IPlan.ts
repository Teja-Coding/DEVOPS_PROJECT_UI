export interface IPlan {
  planId?: number;
  planName: string;
  planStartDate: string;
  planEndDate: string;
  categoryId: number;
  activeSwitch?: string | null;
  createdDate?: string;
  updatedDate?: string;
  createdBy?: string;
  updateBy?: string;
}
