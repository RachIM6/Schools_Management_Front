export type Route =
  | "home"
  | "login"
  | "register"
  | "dashboard"
  | "students"
  | "teachers"
  | "departments"
  | "schedules"
  | "internship-agents"
  | "recovery-agents"
  | "admins"
  | "staff"
  | "courses"
  | "attendance"
  | "grades"
  | "communication"
  | "settings";

export interface NavItem {
  name: string;
  route: Route;
  icon: string;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: "super-admin" | "sub-admin";
  createdAt: string;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  departmentId: string;
  department?: Department;
  enrollmentDate: string;
  profilePicture?: string;
  internshipStatus: "assigned" | "unassigned" | "completed";
  isActive: boolean;
  grade?: string;
  avatar?: string;
  attendance?: number;
  performance?: number;
}

export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  departmentId: string;
  department?: Department;
  hireDate: string;
  profilePicture?: string;
  status: "active" | "on-leave";
  subject?: string;
  avatar?: string;
  classes?: number;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  headOfDepartmentId: string;
  headOfDepartment?: Teacher;
  memberCount?: number;
}

export interface DepartmentMember {
  id: string;
  departmentId: string;
  memberId: string;
  memberType: "student" | "teacher";
}

export interface ScheduleEntry {
  id: string;
  title: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  assignedTo: string;
  assigneeType: "teacher" | "department";
  location: string;
}

export interface InternshipAgent {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  office: string;
  assignedStudentsCount: number;
}

export interface RecoveryAgent {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  departmentId: string;
  studentsUnderRecoveryCount: number;
}

export interface StudentAssignment {
  id: string;
  studentId: string;
  agentId: string;
  agentType: "internship" | "recovery";
  assignedDate: string;
}

export interface Course {
  id: string;
  name: string;
  teacher: string;
  students: number;
  schedule: string;
}

export interface Stat {
  name: string;
  value: string | number;
  change: number;
  icon: string;
}
