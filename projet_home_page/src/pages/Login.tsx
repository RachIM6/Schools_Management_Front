import { FC, useState } from "react";
import { School } from "lucide-react";
import { HomeFooter } from "../components/layout/HomeFooter";
import { useRouter } from "next/navigation";

export const Login: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock login failure
      if (email === "fail@example.com") {
        throw new Error("Invalid credentials");
      }

      // Handle successful login
      console.log("Login successful:", { email, password, rememberMe });

      // Redirect user
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } catch (error) {
      console.error("Login error:", error);
      alert(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
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

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <div className="flex-grow flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div
              className="inline-flex items-center cursor-pointer"
              onClick={() => handleNavigate("home")}
            >
              <School className="h-10 w-10 text-blue-600 dark:text-blue-400" />
              <span className="ml-2 text-2xl font-bold dark:text-white">
                EMSI-School
              </span>
            </div>
            <h2 className="mt-8 text-3xl font-extrabold dark:text-white">
              Sign in to your account
            </h2>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              Or{" "}
              <a
                href="/register"
                className="font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                register as a new student
              </a>
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg px-8 py-10 mt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                  placeholder="your.email@example.com"
                  disabled={isLoading}
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Password
                  </label>
                  <a
                    href="/forgot-password"
                    className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Forgot password?
                  </a>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:border-gray-700 dark:bg-gray-700"
                  disabled={isLoading}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={isLoading}
                >
                  {isLoading ? (
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
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            <p>
              By signing in, you agree to our{" "}
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
