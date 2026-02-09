import { useState } from "react";
import { Link } from "react-router";
import { Eye, EyeOff, Droplets } from "lucide-react";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formErrors = validateForm();

        if (Object.keys(formErrors).length === 0) {
            // Here you would typically make an API call
            console.log("Form submitted:", formData);

            // Simulate API call delay
            setTimeout(() => {
                alert("Login successful! Welcome to Smart Irrigation System");
                setIsSubmitting(false);
                // Reset form after successful login
                setFormData({ email: "", password: "" });
            }, 1000);
        } else {
            setErrors(formErrors);
            setIsSubmitting(false);
        }
    };

    return (
        <div className="md:min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2">
                        <Droplets className="w-8 h-8 text-green-600" />
                        <span className="text-3xl font-bold text-green-600">Smart Irrigation</span>
                    </Link>
                    <h1 className="mt-4 text-2xl font-bold">Welcome to Smart Irrigation</h1>
                    <p className="mt-2">Sign in to access your irrigation dashboard</p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 md:p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="admin@irrigation.com"
                                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 ${errors.email ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                disabled={isSubmitting}
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 ${errors.password ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    disabled={isSubmitting}
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                    disabled={isSubmitting}
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                            )}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        {/* <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                                    Remember me
                                </label>
                            </div>
                            <Link
                                to="/auth/forgot-password"
                                className="text-sm font-medium text-green-600 hover:text-green-700"
                            >
                                Forgot password?
                            </Link>
                        </div> */}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full mt-4 py-3 px-4 rounded-lg font-medium text-white transition duration-200 shadow-md ${isSubmitting
                                ? 'bg-green-400 cursor-not-allowed'
                                : 'bg-green-600 hover:bg-green-700 hover:shadow-lg active:scale-95'
                                }`}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </span>
                            ) : (
                                'Sign in'
                            )}
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm">
                            Don't have an account?{' '}
                            <Link
                                to="/auth/register"
                                className="font-semibold text-green-600 hover:text-green-700"
                            >
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Demo Credentials (Optional) */}
                {/* <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100">
                    <h3 className="text-sm font-medium text-green-800 mb-2 flex items-center gap-2">
                        <Droplets className="w-4 h-4" />
                        Demo Access
                    </h3>
                    <div className="text-sm text-green-700 space-y-1">
                        <p>Email: <span className="font-mono bg-green-100 px-2 py-1 rounded">admin@smartirrigation.com</span></p>
                        <p>Password: <span className="font-mono bg-green-100 px-2 py-1 rounded">demo123</span></p>
                    </div>
                    <p className="text-xs text-green-600 mt-2">
                        Use these credentials to test the irrigation dashboard
                    </p>
                </div> */}

                {/* Back to Home */}
                {/* <div className="mt-6 text-center">
                    <Link
                        to="/"
                        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Home
                    </Link>
                </div> */}
            </div>
        </div>
    );
};

export default Login;
