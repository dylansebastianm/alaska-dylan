export interface UserData {
  id: string;
  name: string;
  surname: string;
  phone: string;
  age: number;
  loan_amount?: number; 
  loan_weeks?: number;
  check?: boolean;
}


export interface ApiResponse {
  status: number
  success: boolean
  data: UserData
}

