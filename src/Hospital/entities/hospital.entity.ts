import { Timestamp } from "typeorm";


export class HospitalEntity {
    plenome_id: number;
    HealthFacilityID: string;
    hospital_name: string;
    contact_no: string;
    address: string;
    state?: string;
    district?: string;
    pincode: string;
    website?: string;
    email?: string;
    hospital_reg_no: string;
    hospital_reg_date: Date;
    hospital_reg_expiry_date: Date;
    specialty?: any;
    services?: any; 
    image?: string;
    logo?: string;
    bedcount?: number;
    description?: string;
    created_at: Timestamp;
  }
  