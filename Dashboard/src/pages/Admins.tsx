"use client";

import { useState } from "react";
import { Admin } from "../types";
import {
  Search,
  UserPlus,
  Eye,
  Pencil,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";

export function Admins() {
  const [admins, setAdmins] = useState<Admin[]>([
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      email: "john.doe@example.com",
      status: "ACTIVE",
      dateOfBirth: "1985-05-15",
      gender: "MALE",
      nationality: "USA",
      phoneNumber: "+1234567890",
      country: "United States",
      streetAddress: "123 Main St",
      city: "New York",
      stateOrProvince: "NY",
      postalCode: "10001",
    },
    {
      id: "2",
      firstName: "Jane",
      lastName: "Smith",
      username: "janesmith",
      email: "jane.smith@example.com",
      status: "ACTIVE",
      dateOfBirth: "1990-08-20",
      gender: "FEMALE",
      nationality: "Canada",
      phoneNumber: "+1987654321",
      country: "Canada",
      streetAddress: "456 Maple Ave",
      city: "Toronto",
      stateOrProvince: "ON",
      postalCode: "M5V 2N4",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(null);
  const [isViewMode, setIsViewMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Form state
  const [formData, setFormData] = useState<Partial<Admin>>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    status: "ACTIVE",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAdmin = () => {
    setIsModalOpen(true);
    setIsViewMode(false);
    setCurrentAdmin(null);
    setFormData({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      status: "ACTIVE",
    });
  };

  const handleEditAdmin = (admin: Admin) => {
    setIsModalOpen(true);
    setIsViewMode(false);
    setCurrentAdmin(admin);
    setFormData({
      ...admin,
      password: "", // Don't populate password for security
    });
  };

  const handleViewAdmin = (admin: Admin) => {
    setIsModalOpen(true);
    setIsViewMode(true);
    setCurrentAdmin(admin);
    setFormData(admin);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (currentAdmin) {
      // Update existing admin
      const updatedAdmins = admins.map((admin) =>
        admin.id === currentAdmin.id
          ? ({ ...admin, ...formData } as Admin)
          : admin
      );
      setAdmins(updatedAdmins);
    } else {
      // Create new admin
      const newAdmin: Admin = {
        id: Math.random().toString(36).substring(2, 9),
        ...(formData as Admin),
      };
      setAdmins([...admins, newAdmin]);
    }

    setIsModalOpen(false);
  };

  const handleToggleStatus = (id: string) => {
    const updatedAdmins = admins.map((admin) =>
      admin.id === id
        ? {
            ...admin,
            status: admin.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
          }
        : admin
    );
    setAdmins(updatedAdmins);
  };

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admins Management"
        description="Manage administrator accounts and permissions."
      />

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-64 md:w-96">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search admins..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleAddAdmin}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <UserPlus size={16} className="mr-2" />
            Add Admin
          </button>
        </div>
      </div>

      {/* Admins Table */}
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
              {filteredAdmins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {admin.firstName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {admin.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {admin.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {admin.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        admin.status === "ACTIVE"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {admin.status === "ACTIVE" ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleViewAdmin(admin)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleEditAdmin(admin)}
                        className="text-amber-600 hover:text-amber-900"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(admin.id)}
                        className={
                          admin.status === "ACTIVE"
                            ? "text-red-600 hover:text-red-900"
                            : "text-green-600 hover:text-green-900"
                        }
                      >
                        {admin.status === "ACTIVE" ? (
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
      </div>

      {/* Admin Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                {isViewMode
                  ? "Admin Profile"
                  : currentAdmin
                  ? "Edit Admin"
                  : "Add New Admin"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName || ""}
                    onChange={handleInputChange}
                    disabled={isViewMode}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName || ""}
                    onChange={handleInputChange}
                    disabled={isViewMode}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username || ""}
                    onChange={handleInputChange}
                    disabled={isViewMode}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleInputChange}
                    disabled={isViewMode}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {!isViewMode && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password{" "}
                      {currentAdmin && "(Leave blank to keep unchanged)"}
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password || ""}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required={!currentAdmin}
                    />
                  </div>
                )}

                {isViewMode && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth
                      </label>
                      <input
                        type="text"
                        value={formData.dateOfBirth || "Not specified"}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gender
                      </label>
                      <input
                        type="text"
                        value={formData.gender || "Not specified"}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nationality
                      </label>
                      <input
                        type="text"
                        value={formData.nationality || "Not specified"}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        value={formData.phoneNumber || "Not specified"}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        value={formData.country || "Not specified"}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        value={formData.streetAddress || "Not specified"}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={formData.city || "Not specified"}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State/Province
                      </label>
                      <input
                        type="text"
                        value={formData.stateOrProvince || "Not specified"}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        value={formData.postalCode || "Not specified"}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md mr-2"
                >
                  {isViewMode ? "Close" : "Cancel"}
                </button>
                {!isViewMode && (
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                  >
                    {currentAdmin ? "Update Admin" : "Create Admin"}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
