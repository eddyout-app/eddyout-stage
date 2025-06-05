export type UserLogin = {
  email: string;
  password: string;
};

export type UserData = {
  _id: string;
  email: string;
  password?: string;
  username?: string | null;
  firstname?: string | null;
  lastname?: string | null;
  phone?: string | null;
  dietaryRestrictions?: string | null;
  allergies?: string | null;
  medicalConditions?: string | null;
  emergencyContactName?: string | null;
  emergencyContactPhone?: string | null;
  medicalTraining?: boolean | null;
  preferredPaymentMethod?: string | null;
  paymentHandle?: string | null;
  createdAt: string;
  updatedAt: string;
};
