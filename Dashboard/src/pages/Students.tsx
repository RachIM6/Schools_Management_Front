import { FC, useState } from "react";
import {
  Search,
  Filter,
  UserPlus,
  Eye,
  Pencil,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { Student, UserStatus } from "../types";
import { PageHeader } from "../components/ui/PageHeader";
import { StudentCreateModal } from "../components/ui/StudentCreateModal";
import { StudentEditModal } from "../components/ui/StudentEditModal";
import { StudentViewModal } from "../components/ui/StudentViewModal";

export const Students: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const itemsPerPage = 10;

  // Mock data
  const students: Student[] = [
    {
      id: "1",
      firstName: "Emma",
      lastName: "Thompson",
      username: "ethompson",
      email: "emma.thompson@example.com",
      status: "ACTIVE",
      dateOfBirth: "1999-05-15",
      gender: "FEMALE",
      nationality: "British",
      phoneNumber: "+44123456789",
      country: "United Kingdom",
      city: "London",
      institutionName: "University of London",
      major: "COMPUTER_SCIENCE",
      educationLevel: "BACHELOR",
    },
    {
      id: "2",
      firstName: "Michael",
      lastName: "Johnson",
      username: "mjohnson",
      email: "michael.johnson@example.com",
      status: "ACTIVE",
      dateOfBirth: "2000-03-22",
      gender: "MALE",
      nationality: "American",
      phoneNumber: "+15551234567",
      country: "USA",
      city: "New York",
      institutionName: "NYU",
      major: "ENGINEERING",
      educationLevel: "BACHELOR",
    },
    {
      id: "3",
      firstName: "Sophia",
      lastName: "Williams",
      username: "swilliams",
      email: "sophia.williams@example.com",
      status: "INACTIVE",
      dateOfBirth: "1998-11-10",
      gender: "FEMALE",
      nationality: "Canadian",
      phoneNumber: "+16137778888",
      country: "Canada",
      city: "Toronto",
      institutionName: "University of Toronto",
      major: "BUSINESS",
      educationLevel: "MASTER",
    },
    {
      id: "4",
      firstName: "Daniel",
      lastName: "Brown",
      username: "dbrown",
      email: "daniel.brown@example.com",
      status: "ACTIVE",
      dateOfBirth: "1997-07-05",
      gender: "MALE",
      nationality: "Australian",
      phoneNumber: "+61234567890",
      country: "Australia",
      city: "Sydney",
      institutionName: "University of Sydney",
      major: "COMPUTER_SCIENCE",
      educationLevel: "PHD",
    },
    {
      id: "5",
      firstName: "Olivia",
      lastName: "Davis",
      username: "odavis",
      email: "olivia.davis@example.com",
      status: "ACTIVE",
      dateOfBirth: "2001-01-30",
      gender: "FEMALE",
      nationality: "French",
      phoneNumber: "+33123456789",
      country: "France",
      city: "Paris",
      institutionName: "Sorbonne University",
      major: "OTHER",
      educationLevel: "BACHELOR",
    },
  ];

  const filteredStudents = students.filter(
    (student) =>
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setShowViewModal(true);
  };

  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setShowEditModal(true);
  };

  const handleToggleStatus = (student: Student) => {
    // In a real application, you would update the student's status in the database
    console.log(`Toggling status for student: ${student.id}`);
  };

  const handleCreateStudent = () => {
    setShowCreateModal(true);
  };

  const handleCreateSubmit = (studentData: any) => {
    // In a real application, you would send this data to the server
    console.log("Creating student:", studentData);
  };

  const handleEditSubmit = (studentData: any) => {
    // In a real application, you would send this data to the server
    console.log("Updating student:", studentData);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Students Management"
        description="Manage student profiles, registrations, and academic records."
      />

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-64 md:w-96">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="flex gap-2">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Filter size={16} className="mr-2" />
            Filter
          </button>
          <button
            onClick={handleCreateStudent}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <UserPlus size={16} className="mr-2" />
            Add Student
          </button>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  First Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Last Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Username
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {student.firstName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        student.status === "ACTIVE"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {student.status === "ACTIVE" ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleViewStudent(student)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleEditStudent(student)}
                        className="text-amber-600 hover:text-amber-900"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(student)}
                        className={
                          student.status === "ACTIVE"
                            ? "text-red-600 hover:text-red-900"
                            : "text-green-600 hover:text-green-900"
                        }
                      >
                        {student.status === "ACTIVE" ? (
                          <ToggleRight size={18} />
                        ) : (
                          <ToggleLeft size={18} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">
                    {(currentPage - 1) * itemsPerPage + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(
                      currentPage * itemsPerPage,
                      filteredStudents.length
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">{filteredStudents.length}</span>{" "}
                  results
                </p>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === 1
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-500 hover:bg-gray-50 cursor-pointer"
                    }`}
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {/* Page numbers */}
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === index + 1
                          ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === totalPages
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-500 hover:bg-gray-50 cursor-pointer"
                    }`}
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Student Modals */}
      <StudentCreateModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateSubmit}
      />

      <StudentEditModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleEditSubmit}
        student={selectedStudent}
      />

      <StudentViewModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        student={selectedStudent}
      />
    </div>
  );
};
