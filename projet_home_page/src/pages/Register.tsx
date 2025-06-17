import { FC, useState } from "react";
import { School, ArrowLeft, ArrowRight } from "lucide-react";
import { HomeFooter } from "../components/layout/HomeFooter";
import { useRouter } from "next/navigation";

// Registration Progress Component
interface RegistrationProgressProps {
  currentStep: number;
  totalSteps: number;
}

const RegistrationProgress: FC<RegistrationProgressProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <div className="py-4 px-6 bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium dark:text-white">
          Step {currentStep} of {totalSteps}
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {Math.round((currentStep / totalSteps) * 100)}% Complete
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export const Register: FC = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",

    // Contact Info
    emailAddress: "",
    phoneNumber: "",
    country: "",
    streetAddress: "",
    city: "",
    stateOrProvince: "",
    postalCode: "",

    // Account Info
    username: "",
    password: "",
    confirmPassword: "",

    // Educational Info
    institutionName: "",
    major: "",
    educationLevel: "",
    institutionAddress: "",
    additionalInformation: "",

    // Emergency Contact
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelationship: "",
  });

  const totalSteps = 5;

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Call the student registration API endpoint
      const response = await fetch("/api/auth/students/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Registration failed. Please try again."
        );
      }

      alert(
        "Registration successful! Please check your email to verify your account."
      );

      // Redirect to login page
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      console.error("Registration error:", error);
      alert(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNavigate = (route: string) => {
    switch (route) {
      case "home":
        router.push("/");
        break;
      default:
        router.push("/");
    }
  };

  const renderPersonalInfoStep = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
        Personal Information
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Please provide your personal details
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="dateOfBirth"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Date of Birth
        </label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          max={(() => {
            const date = new Date();
            date.setFullYear(date.getFullYear() - 16);
            return date.toISOString().split("T")[0];
          })()}
          required
          className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          You must be at least 16 years old to register.
        </p>
      </div>

      <div>
        <label
          htmlFor="gender"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Gender
        </label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
        >
          <option value="">Select gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="nationality"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Nationality
        </label>
        <input
          type="text"
          id="nationality"
          name="nationality"
          value={formData.nationality}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
        />
      </div>
    </div>
  );

  const renderContactInfoStep = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
        Contact Information
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        How can we reach you?
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="emailAddress"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email Address
          </label>
          <input
            type="email"
            id="emailAddress"
            name="emailAddress"
            value={formData.emailAddress}
            onChange={handleChange}
            pattern="[a-zA-Z0-9._%+-]+@gmail\.com$"
            required
            className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Must be a valid Gmail address (@gmail.com)
          </p>
        </div>

        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            pattern="^[+]?[0-9\s\-()]{7,20}$"
            placeholder="+1234567890 or (123) 456-7890"
            className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="country"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Country
        </label>
        <input
          type="text"
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="streetAddress"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Street Address
        </label>
        <input
          type="text"
          id="streetAddress"
          name="streetAddress"
          value={formData.streetAddress}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="stateOrProvince"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            State/Province
          </label>
          <input
            type="text"
            id="stateOrProvince"
            name="stateOrProvince"
            value={formData.stateOrProvince}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="postalCode"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Postal Code
          </label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            pattern="^[A-Za-z0-9\s\-]{3,20}$"
            className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>
    </div>
  );

  const renderAccountInfoStep = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
        Account Information
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Create your login credentials
      </p>

      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          pattern="^[a-zA-Z0-9._-]{3,50}$"
          required
          className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          3-50 characters. Only letters, numbers, dots, underscores, and hyphens
          allowed.
        </p>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,128}$"
          required
          className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Password must be 8-128 characters and include: uppercase letter,
          lowercase letter, number, and special character.
        </p>
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
        />
      </div>
    </div>
  );

  const renderEducationalInfoStep = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
        Educational Information
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Tell us about your educational background
      </p>

      <div>
        <label
          htmlFor="institutionName"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Current/Previous Institution Name
        </label>
        <input
          type="text"
          id="institutionName"
          name="institutionName"
          value={formData.institutionName}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="major"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Major/Field of Study
          </label>
          <select
            id="major"
            name="major"
            value={formData.major}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select major</option>
            <option value="COMPUTER_SCIENCE">Computer Science</option>
            <option value="ENGINEERING">Engineering</option>
            <option value="BUSINESS">Business</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="educationLevel"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Education Level
          </label>
          <select
            id="educationLevel"
            name="educationLevel"
            value={formData.educationLevel}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select level</option>
            <option value="BACHELOR">Bachelor</option>
            <option value="MASTER">Master</option>
            <option value="PHD">PhD</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="institutionAddress"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Institution Address
        </label>
        <input
          type="text"
          id="institutionAddress"
          name="institutionAddress"
          value={formData.institutionAddress}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="additionalInformation"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Additional Information
        </label>
        <textarea
          id="additionalInformation"
          name="additionalInformation"
          value={formData.additionalInformation}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
        />
      </div>
    </div>
  );

  const renderEmergencyContactStep = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
        Emergency Contact
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Who should we contact in case of emergency?
      </p>

      <div>
        <label
          htmlFor="emergencyContactName"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Full Name
        </label>
        <input
          type="text"
          id="emergencyContactName"
          name="emergencyContactName"
          value={formData.emergencyContactName}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="emergencyContactPhone"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Phone Number
        </label>
        <input
          type="tel"
          id="emergencyContactPhone"
          name="emergencyContactPhone"
          value={formData.emergencyContactPhone}
          onChange={handleChange}
          pattern="^[+]?[0-9\s\-()]{7,20}$"
          placeholder="+1234567890 or (123) 456-7890"
          className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="emergencyContactRelationship"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Relationship
        </label>
        <select
          id="emergencyContactRelationship"
          name="emergencyContactRelationship"
          value={formData.emergencyContactRelationship}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
        >
          <option value="">Select relationship</option>
          <option value="Parent">Parent</option>
          <option value="Guardian">Guardian</option>
          <option value="Spouse">Spouse</option>
          <option value="Sibling">Sibling</option>
          <option value="Friend">Friend</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <div className="flex-grow flex flex-col items-center pt-16 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-3xl">
          <div className="text-center mb-8">
            <div
              className="inline-flex items-center cursor-pointer"
              onClick={() => handleNavigate("home")}
            >
              <School className="h-10 w-10 text-blue-600 dark:text-blue-400" />
              <span className="ml-2 text-2xl font-bold dark:text-white">
                Schools Management
              </span>
            </div>
            <h2 className="mt-8 text-3xl font-extrabold dark:text-white">
              Student Registration
            </h2>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                Sign in
              </a>
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <RegistrationProgress currentStep={step} totalSteps={totalSteps} />

            <form onSubmit={handleSubmit}>
              <div className="px-6 py-8">
                {step === 1 && renderPersonalInfoStep()}
                {step === 2 && renderContactInfoStep()}
                {step === 3 && renderAccountInfoStep()}
                {step === 4 && renderEducationalInfoStep()}
                {step === 5 && renderEmergencyContactStep()}
              </div>

              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t dark:border-gray-700 flex justify-between">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </button>
                )}
                {step < totalSteps ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className={`inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      step === 1 ? "ml-auto" : ""
                    }`}
                  >
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      "Submit Registration"
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            <p>
              By registering, you agree to our{" "}
              <a
                href="#"
                className="font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
      <HomeFooter />
    </div>
  );
};
