import { useState } from "react";
import { Link } from "react-router";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

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
                alert("Login successful! (This is a demo)");
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
        <div className="md:min-h-screen md:bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-block">
                        <span className="text-3xl font-bold text-orange-600">Malta</span>
                    </Link>
                    <h1 className="mt-4 text-2xl font-bold">Welcome back</h1>
                    <p className="mt-2 text-gray-600">Sign in to your account to continue</p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-2xl border md:border-none border-gray-300 shadow-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200 ${errors.email ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                disabled={isSubmitting}
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200 ${errors.password ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                disabled={isSubmitting}
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition duration-200 ${isSubmitting
                                ? 'bg-orange-400 cursor-not-allowed'
                                : 'bg-orange-600 hover:bg-orange-700'
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
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link
                                to="/auth/register"
                                className="font-medium text-orange-600 hover:text-orange-700"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Demo Credentials */}
                {/* <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-sm font-medium text-blue-800 mb-2">Demo Credentials</h3>
                    <div className="text-sm text-blue-700 space-y-1">
                        <p>Email: <span className="font-mono">demo@example.com</span></p>
                        <p>Password: <span className="font-mono">demo123</span></p>
                    </div>
                    <p className="text-xs text-blue-600 mt-2">
                        Try these credentials to test the login form
                    </p>
                </div> */}
            </div>
        </div>
    );
};

export default Login;
