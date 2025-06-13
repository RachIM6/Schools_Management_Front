// Navigation and Layout Types
export type Route =
  | "dashboard"
  | "students"
  | "teachers"
  | "pedagogies"
  | "admins"
  | "departments"
  | "internships"
  | "recovery"
  | "settings";

export interface NavItem {
  name: string;
  route: Route;
  icon: string;
}

// User Types
export type Gender = "MALE" | "FEMALE";
export type Major = "COMPUTER_SCIENCE" | "ENGINEERING" | "BUSINESS" | "OTHER";
export type EducationLevel = "BACHELOR" | "MASTER" | "PHD" | "OTHER";
export type UserStatus = "ACTIVE" | "INACTIVE";

// Base User Interface
export interface BaseUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  status: UserStatus;
  dateOfBirth?: string;
  gender?: Gender;
  nationality?: string;
  phoneNumber?: string;
  country?: string;
  streetAddress?: string;
  city?: string;
  stateOrProvince?: string;
  postalCode?: string;
}

// Student Interface
export interface Student extends BaseUser {
  institutionName?: string;
  major?: Major;
  educationLevel?: EducationLevel;
  institutionAddress?: string;
  additionalInformation?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelationship?: string;
}

// Teacher Interface
export interface Teacher extends BaseUser {
  // Teacher specific fields can be added here
}

// Pedagogy Interface
export interface Pedagogy extends BaseUser {
  departmentName?: string;
  specialization?: string;
}

// Admin Interface
export interface Admin extends BaseUser {
  // Admin specific fields can be added here
}

// Department Interface
export interface Department {
  id: string;
  name: string;
  description?: string;
  departmentChef?: string; // User ID
  filiereChef?: string; // User ID
  departmentMembers?: string[]; // Array of User IDs
}

// Filiere (Program) Interface
export interface Filiere {
  id: string;
  name: string;
  description?: string;
  departmentId: string;
}

// Module Interface
export interface Module {
  id: string;
  name: string;
  description?: string;
  filiereId: string;
}

// Pagination Interface
export interface PaginationParams {
  page: number;
  limit: number;
  total: number;
}

// API Response Interface
export interface ApiResponse<T> {
  data: T;
  pagination?: PaginationParams;
  message?: string;
  success: boolean;
}

export interface Stat {
  name: string;
  value: string | number;
  change: number;
  icon: string;
}
