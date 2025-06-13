"use client";

import { useState } from "react";
import { Department } from "../types";
import { Search, Plus, Eye, Pencil, Trash2 } from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";

export function Departments() {
  const [departments, setDepartments] = useState<Department[]>([
    {
      id: "1",
      name: "Computer Science",
      description: "Department of Computer Science and Information Technology",
      departmentChef: "user123",
      filiereChef: "user456",
      departmentMembers: ["user789", "user101"],
    },
    {
      id: "2",
      name: "Engineering",
      description: "Department of Engineering and Applied Sciences",
      departmentChef: "user202",
      filiereChef: "user303",
      departmentMembers: ["user404", "user505"],
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState<Department | null>(
    null
  );
  const [isViewMode, setIsViewMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Form state
  const [formData, setFormData] = useState<Partial<Department>>({
    name: "",
    description: "",
    departmentChef: "",
    filiereChef: "",
    departmentMembers: [],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMembersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const members = e.target.value.split(",").map((member) => member.trim());
    setFormData((prev) => ({ ...prev, departmentMembers: members }));
  };

  const handleAddDepartment = () => {
    setIsModalOpen(true);
    setIsViewMode(false);
    setCurrentDepartment(null);
    setFormData({
      name: "",
      description: "",
      departmentChef: "",
      filiereChef: "",
      departmentMembers: [],
    });
  };

  const handleEditDepartment = (department: Department) => {
    setIsModalOpen(true);
    setIsViewMode(false);
    setCurrentDepartment(department);
    setFormData({
      ...department,
      departmentMembers: department.departmentMembers || [],
    });
  };

  const handleViewDepartment = (department: Department) => {
    setIsModalOpen(true);
    setIsViewMode(true);
    setCurrentDepartment(department);
    setFormData(department);
  };

  const handleDeleteDepartment = (id: string) => {
    const updatedDepartments = departments.filter(
      (department) => department.id !== id
    );
    setDepartments(updatedDepartments);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (currentDepartment) {
      // Update existing department
      const updatedDepartments = departments.map((department) =>
        department.id === currentDepartment.id
          ? ({ ...department, ...formData } as Department)
          : department
      );
      setDepartments(updatedDepartments);
    } else {
      // Create new department
      const newDepartment: Department = {
        id: Math.random().toString(36).substring(2, 9),
        ...(formData as Department),
      };
      setDepartments([...departments, newDepartment]);
    }

    setIsModalOpen(false);
  };

  const filteredDepartments = departments.filter(
    (department) =>
      department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (department.description &&
        department.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      (department.departmentChef &&
        department.departmentChef
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      (department.filiereChef &&
        department.filiereChef.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Departments Management"
        description="Manage academic departments, their leadership, and member assignments."
      />

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-64 md:w-96">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleAddDepartment}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus size={16} className="mr-2" />
            Add Department
          </button>
        </div>
      </div>

      {/* Departments Table */}
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
                  Description
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Department Chef
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Filière Chef
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
              {filteredDepartments.map((department) => (
                <tr key={department.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {department.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 line-clamp-2">
                    {department.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {department.departmentChef || "Not assigned"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {department.filiereChef || "Not assigned"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleViewDepartment(department)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleEditDepartment(department)}
                        className="text-amber-600 hover:text-amber-900"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteDepartment(department.id)}
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

      {/* Department Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                {isViewMode
                  ? "Department Details"
                  : currentDepartment
                  ? "Edit Department"
                  : "Add New Department"}
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
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleInputChange}
                    disabled={isViewMode}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description || ""}
                    onChange={handleInputChange}
                    disabled={isViewMode}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department Chef (User ID)
                  </label>
                  <input
                    type="text"
                    name="departmentChef"
                    value={formData.departmentChef || ""}
                    onChange={handleInputChange}
                    disabled={isViewMode}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Filière Chef (User ID)
                  </label>
                  <input
                    type="text"
                    name="filiereChef"
                    value={formData.filiereChef || ""}
                    onChange={handleInputChange}
                    disabled={isViewMode}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department Members (User IDs, comma separated)
                  </label>
                  <input
                    type="text"
                    name="departmentMembers"
                    value={formData.departmentMembers?.join(", ") || ""}
                    onChange={handleMembersChange}
                    disabled={isViewMode}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
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
                    {currentDepartment
                      ? "Update Department"
                      : "Create Department"}
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
