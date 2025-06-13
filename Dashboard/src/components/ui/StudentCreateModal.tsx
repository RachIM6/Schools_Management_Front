import { FC, useState } from "react";
import { X } from "lucide-react";
import { Gender, Major, EducationLevel } from "../../types";

interface StudentCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (studentData: any) => void;
}

export const StudentCreateModal: FC<StudentCreateModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    dateOfBirth: "",
    gender: "" as Gender | "",
    nationality: "",
    phoneNumber: "",
    country: "",
    streetAddress: "",
    city: "",
    stateOrProvince: "",
    postalCode: "",
    institutionName: "",
    major: "" as Major | "",
    educationLevel: "" as EducationLevel | "",
    institutionAddress: "",
    additionalInformation: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelationship: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

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
                Add New Student
              </h3>
              <button
                onClick={onClose}
                className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-gray-700">
                    Basic Information
                  </h4>

                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First Name*
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Name*
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Username*
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      required
                      value={formData.username}
                      onChange={handleChange}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email*
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password*
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                {/* Personal Information */}
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-gray-700">
                    Personal Information
                  </h4>

                  <div>
                    <label
                      htmlFor="dateOfBirth"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      id="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="gender"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Gender
                    </label>
                    <select
                      name="gender"
                      id="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="">Select Gender</option>
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="nationality"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nationality
                    </label>
                    <input
                      type="text"
                      name="nationality"
                      id="nationality"
                      value={formData.nationality}
                      onChange={handleChange}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="space-y-4">
                <h4 className="text-md font-medium text-gray-700">
                  Address Information
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      id="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="streetAddress"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="streetAddress"
                      id="streetAddress"
                      value={formData.streetAddress}
                      onChange={handleChange}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="stateOrProvince"
                      className="block text-sm font-medium text-gray-700"
                    >
                      State/Province
                    </label>
                    <input
                      type="text"
                      name="stateOrProvince"
                      id="stateOrProvince"
                      value={formData.stateOrProvince}
                      onChange={handleChange}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="postalCode"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>

              {/* Educational Information */}
              <div className="space-y-4">
                <h4 className="text-md font-medium text-gray-700">
                  Educational Information
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="institutionName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Institution Name
                    </label>
                    <input
                      type="text"
                      name="institutionName"
                      id="institutionName"
                      value={formData.institutionName}
                      onChange={handleChange}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="major"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Major
                    </label>
                    <select
                      name="major"
                      id="major"
                      value={formData.major}
                      onChange={handleChange}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="">Select Major</option>
                      <option value="COMPUTER_SCIENCE">Computer Science</option>
                      <option value="ENGINEERING">Engineering</option>
                      <option value="BUSINESS">Business</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="educationLevel"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Education Level
                    </label>
                    <select
                      name="educationLevel"
                      id="educationLevel"
                      value={formData.educationLevel}
                      onChange={handleChange}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="">Select Education Level</option>
                      <option value="BACHELOR">Bachelor</option>
                      <option value="MASTER">Master</option>
                      <option value="PHD">PhD</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="institutionAddress"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Institution Address
                    </label>
                    <input
                      type="text"
                      name="institutionAddress"
                      id="institutionAddress"
                      value={formData.institutionAddress}
                      onChange={handleChange}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="space-y-4">
                <h4 className="text-md font-medium text-gray-700">
                  Emergency Contact
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="emergencyContactName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Contact Name
                    </label>
                    <input
                      type="text"
                      name="emergencyContactName"
                      id="emergencyContactName"
                      value={formData.emergencyContactName}
                      onChange={handleChange}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="emergencyContactPhone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      name="emergencyContactPhone"
                      id="emergencyContactPhone"
                      value={formData.emergencyContactPhone}
                      onChange={handleChange}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="emergencyContactRelationship"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Relationship
                    </label>
                    <input
                      type="text"
                      name="emergencyContactRelationship"
                      id="emergencyContactRelationship"
                      value={formData.emergencyContactRelationship}
                      onChange={handleChange}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <label
                  htmlFor="additionalInformation"
                  className="block text-sm font-medium text-gray-700"
                >
                  Additional Information
                </label>
                <textarea
                  name="additionalInformation"
                  id="additionalInformation"
                  rows={3}
                  value={formData.additionalInformation}
                  onChange={handleChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Create Student
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
