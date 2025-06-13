"use client";

import { useState } from "react";
import { BaseUser, UserStatus } from "../types";
import {
  Search,
  UserPlus,
  Eye,
  Pencil,
  ToggleLeft,
  ToggleRight,
  Trash2,
} from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";

interface RecoveryResponsible extends BaseUser {
  department?: string;
  role?: string;
}

export function Recovery() {
  const [responsibles, setResponsibles] = useState<RecoveryResponsible[]>([
    {
      id: "1",
      firstName: "Michael",
      lastName: "Brown",
      username: "michaelb",
      email: "michael.brown@example.com",
      status: "ACTIVE" as UserStatus,
      department: "Finance",
      role: "Fee Recovery Manager",
    },
    {
      id: "2",
      firstName: "Emily",
      lastName: "Davis",
      username: "emilyd",
      email: "emily.davis@example.com",
      status: "ACTIVE" as UserStatus,
      department: "Accounting",
      role: "Payment Coordinator",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentResponsible, setCurrentResponsible] =
    useState<RecoveryResponsible | null>(null);
  const [isViewMode, setIsViewMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Form state
  const [formData, setFormData] = useState<Partial<RecoveryResponsible>>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    status: "ACTIVE" as UserStatus,
    department: "",
    role: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "status" ? (value as UserStatus) : value,
    }));
  };

  const handleAddResponsible = () => {
    setIsModalOpen(true);
    setIsViewMode(false);
    setCurrentResponsible(null);
    setFormData({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      status: "ACTIVE" as UserStatus,
      department: "",
      role: "",
    });
  };

  const handleEditResponsible = (responsible: RecoveryResponsible) => {
    setIsModalOpen(true);
    setIsViewMode(false);
    setCurrentResponsible(responsible);
    setFormData({
      ...responsible,
    });
  };

  const handleViewResponsible = (responsible: RecoveryResponsible) => {
    setIsModalOpen(true);
    setIsViewMode(true);
    setCurrentResponsible(responsible);
    setFormData(responsible);
  };

  const handleDeleteResponsible = (id: string) => {
    const updatedResponsibles = responsibles.filter(
      (responsible) => responsible.id !== id
    );
    setResponsibles(updatedResponsibles);
  };

  const handleToggleStatus = (id: string) => {
    const updatedResponsibles = responsibles.map((responsible) =>
      responsible.id === id
        ? {
            ...responsible,
            status:
              responsible.status === "ACTIVE"
                ? ("INACTIVE" as UserStatus)
                : ("ACTIVE" as UserStatus),
          }
        : responsible
    );
    setResponsibles(updatedResponsibles);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (currentResponsible) {
      // Update existing responsible
      const updatedResponsibles = responsibles.map((responsible) =>
        responsible.id === currentResponsible.id
          ? ({ ...responsible, ...formData } as RecoveryResponsible)
          : responsible
      );
      setResponsibles(updatedResponsibles);
    } else {
      // Create new responsible
      const newResponsible: RecoveryResponsible = {
        id: Math.random().toString(36).substring(2, 9),
        ...(formData as RecoveryResponsible),
      };
      setResponsibles([...responsibles, newResponsible]);
    }

    setIsModalOpen(false);
  };

  const filteredResponsibles = responsibles.filter(
    (responsible) =>
      responsible.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      responsible.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      responsible.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      responsible.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (responsible.department &&
        responsible.department
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      (responsible.role &&
        responsible.role.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Fee Recovery Responsibles"
        description="Manage staff responsible for fee collection and payment processing."
      />

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-64 md:w-96">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search responsibles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleAddResponsible}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <UserPlus size={16} className="mr-2" />
            Add Responsible
          </button>
        </div>
      </div>

      {/* Responsibles Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
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
                  Department
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Role
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
              {filteredResponsibles.map((responsible) => (
                <tr key={responsible.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {responsible.firstName} {responsible.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {responsible.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {responsible.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {responsible.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {responsible.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        responsible.status === "ACTIVE"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {responsible.status === "ACTIVE" ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleViewResponsible(responsible)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleEditResponsible(responsible)}
                        className="text-amber-600 hover:text-amber-900"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(responsible.id)}
                        className={
                          responsible.status === "ACTIVE"
                            ? "text-red-600 hover:text-red-900"
                            : "text-green-600 hover:text-green-900"
                        }
                      >
                        {responsible.status === "ACTIVE" ? (
                          <ToggleRight size={18} />
                        ) : (
                          <ToggleLeft size={18} />
                        )}
                      </button>
                      <button
                        onClick={() => handleDeleteResponsible(responsible.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Responsible Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                {isViewMode
                  ? "Responsible Details"
                  : currentResponsible
                  ? "Edit Responsible"
                  : "Add New Responsible"}
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department || ""}
                    onChange={handleInputChange}
                    disabled={isViewMode}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role || ""}
                    onChange={handleInputChange}
                    disabled={isViewMode}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status || "ACTIVE"}
                    onChange={handleInputChange}
                    disabled={isViewMode}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>
                </div>
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
                    {currentResponsible
                      ? "Update Responsible"
                      : "Create Responsible"}
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
