import { FC } from "react";
import { X } from "lucide-react";
import { Student } from "../../types";

interface StudentViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
}

export const StudentViewModal: FC<StudentViewModalProps> = ({
  isOpen,
  onClose,
  student,
}) => {
  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div
            className="absolute inset-0 bg-gray-500 opacity-75"
            onClick={onClose}
          ></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Student Profile
              </h3>
              <button
                onClick={onClose}
                className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Basic Information */}
              <div>
                <h4 className="text-md font-medium text-gray-700 mb-3">
                  Basic Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      First Name
                    </p>
                    <p className="text-sm text-gray-900">{student.firstName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Last Name
                    </p>
                    <p className="text-sm text-gray-900">{student.lastName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Username
                    </p>
                    <p className="text-sm text-gray-900">{student.username}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-sm text-gray-900">{student.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        student.status === "ACTIVE"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {student.status === "ACTIVE" ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div>
                <h4 className="text-md font-medium text-gray-700 mb-3">
                  Personal Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Date of Birth
                    </p>
                    <p className="text-sm text-gray-900">
                      {student.dateOfBirth || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Gender</p>
                    <p className="text-sm text-gray-900">
                      {student.gender === "MALE"
                        ? "Male"
                        : student.gender === "FEMALE"
                        ? "Female"
                        : "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Nationality
                    </p>
                    <p className="text-sm text-gray-900">
                      {student.nationality || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Phone Number
                    </p>
                    <p className="text-sm text-gray-900">
                      {student.phoneNumber || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div>
                <h4 className="text-md font-medium text-gray-700 mb-3">
                  Address Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Country</p>
                    <p className="text-sm text-gray-900">
                      {student.country || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Street Address
                    </p>
                    <p className="text-sm text-gray-900">
                      {student.streetAddress || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">City</p>
                    <p className="text-sm text-gray-900">
                      {student.city || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      State/Province
                    </p>
                    <p className="text-sm text-gray-900">
                      {student.stateOrProvince || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Postal Code
                    </p>
                    <p className="text-sm text-gray-900">
                      {student.postalCode || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Educational Information */}
              <div>
                <h4 className="text-md font-medium text-gray-700 mb-3">
                  Educational Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Institution Name
                    </p>
                    <p className="text-sm text-gray-900">
                      {student.institutionName || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Major</p>
                    <p className="text-sm text-gray-900">
                      {student.major === "COMPUTER_SCIENCE"
                        ? "Computer Science"
                        : student.major === "ENGINEERING"
                        ? "Engineering"
                        : student.major === "BUSINESS"
                        ? "Business"
                        : student.major === "OTHER"
                        ? "Other"
                        : "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Education Level
                    </p>
                    <p className="text-sm text-gray-900">
                      {student.educationLevel === "BACHELOR"
                        ? "Bachelor"
                        : student.educationLevel === "MASTER"
                        ? "Master"
                        : student.educationLevel === "PHD"
                        ? "PhD"
                        : student.educationLevel === "OTHER"
                        ? "Other"
                        : "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Institution Address
                    </p>
                    <p className="text-sm text-gray-900">
                      {student.institutionAddress || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div>
                <h4 className="text-md font-medium text-gray-700 mb-3">
                  Emergency Contact
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Contact Name
                    </p>
                    <p className="text-sm text-gray-900">
                      {student.emergencyContactName || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Contact Phone
                    </p>
                    <p className="text-sm text-gray-900">
                      {student.emergencyContactPhone || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Relationship
                    </p>
                    <p className="text-sm text-gray-900">
                      {student.emergencyContactRelationship || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              {student.additionalInformation && (
                <div>
                  <h4 className="text-md font-medium text-gray-700 mb-3">
                    Additional Information
                  </h4>
                  <p className="text-sm text-gray-900">
                    {student.additionalInformation}
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end mt-6 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
