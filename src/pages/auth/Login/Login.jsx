import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, Droplets, Mail, Lock } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from 'sweetalert2';
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

// Premium SweetAlert2 styling for success
const showSuccessAlert = (email) => {
    Swal.fire({
        title: 'Welcome Back! 👋',
        html: `
            <div style="text-align: center;">
                <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🌱</div>
                <h3 style="color: #166534; font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem;">
                    Login Successful!
                </h3>
                <p style="color: #374151; font-size: 1rem; margin-bottom: 1rem;">
                    You've successfully signed in as<br/>
                    <strong style="color: #16a34a;">${email}</strong>
                </p>
            </div>
        `,
        // icon: 'success',
        icon: false,
        iconColor: '#16a34a',
        background: '#ffffff',
        showConfirmButton: false,
        confirmButtonColor: '#16a34a',
        showCancelButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        customClass: {
            popup: 'rounded-2xl shadow-2xl',
            confirmButton: 'px-8 py-3 text-base font-medium rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105',
            title: 'text-2xl font-bold text-gray-800',
            htmlContainer: 'text-gray-600',
        },
        timer: 2000,
        timerProgressBar: false,
        didOpen: (popup) => {
            popup.addEventListener('mouseenter', Swal.stopTimer);
            popup.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });
};

const Login = () => {
    window.scrollTo(0, 0);
    const navigate = useNavigate();
    const { signIn } = useAuth();
    const { t } = useTranslation();

    const [showPassword, setShowPassword] = useState(false);
    const [firebaseError, setFirebaseError] = useState("");

    // Create validation schema with Yup
    const validationSchema = yup.object().shape({
        email: yup
            .string()
            .required(t('errors.emailRequired'))
            .email(t('errors.emailInvalid'))
            .lowercase()
            .trim(),
        password: yup
            .string()
            .required(t('errors.passwordRequired'))
            .min(6, t('errors.passwordShort', 'Password must be at least 6 characters')),
    });

    // Initialize react-hook-form
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Helper function to get user-friendly error messages
    const getFirebaseErrorMessage = (error) => {
        switch (error.code) {
            case 'auth/user-not-found':
                return t('errors.userNotFound', 'No account found with this email address.');
            case 'auth/wrong-password':
                return t('errors.wrongPassword', 'Incorrect password. Please try again.');
            case 'auth/invalid-email':
                return t('errors.invalidEmail', 'Invalid email address format.');
            case 'auth/user-disabled':
                return t('errors.userDisabled', 'This account has been disabled. Please contact support.');
            case 'auth/too-many-requests':
                return t('errors.tooManyRequests', 'Too many failed attempts. Please try again later.');
            default:
                return t('errors.loginFailed', 'Failed to sign in. Please check your credentials.');
        }
    };

    const onSubmit = async (data) => {
        setFirebaseError("");

        try {
            // Sign in with Firebase
            const userCredential = await signIn(data.email, data.password);

            // Show ONLY success alert
            await showSuccessAlert(data.email);

            // Redirect to dashboard or home page
            navigate('/');

        } catch (error) {
            console.error("Login error:", error);

            // NO error alert - just set form errors and display message
            const errorMessage = getFirebaseErrorMessage(error);

            // Set field-specific errors
            setFirebaseError(errorMessage);

            if (error.code === 'auth/user-not-found') {
                setError('email', {
                    type: 'manual',
                    message: t('errors.userNotFound', 'No account found with this email')
                });
            } else if (error.code === 'auth/wrong-password') {
                setError('password', {
                    type: 'manual',
                    message: t('errors.wrongPassword', 'Incorrect password')
                });
            }
        }
    };

    const pageTitle = t('nav.login');
    const brand = t('brand');

    return (
        <div className="md:min-h-screen flex items-center justify-center p-4">
            <Helmet>
                <title>
                    {pageTitle ? `${pageTitle} | ${brand}` : ` ${brand}`}
                </title>
            </Helmet>

            <div className="max-w-md w-full">
                {/* Logo/Brand */}
                <div className="text-center mb-6">
                    <Link to="/" className="inline-flex items-center gap-2">
                        <Droplets className="w-8 h-8 text-green-600" />
                        <span className="text-3xl font-bold text-green-600">{t('brand')}</span>
                    </Link>
                    <h1 className="mt-4 text-2xl font-bold">{t('login.welcome')}</h1>
                    <p className="mt-2">{t('login.signin')}</p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 md:p-8">
                    {/* Firebase Error Message - Still show in UI */}
                    {firebaseError && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-600">{firebaseError}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-1">
                                {t('login.email')}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    {...register('email')}
                                    placeholder="farmer@example.com"
                                    className={`w-full pl-10 pr-4 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 ${errors.email ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    disabled={isSubmitting}
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium mb-1">
                                {t('login.password')}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    {...register('password')}
                                    placeholder="••••••••"
                                    className={`w-full pl-10 pr-12 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 ${errors.password ? 'border-red-500' : 'border-gray-300'
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
                                        <EyeOff className="w-5" />
                                    ) : (
                                        <Eye className="w-5" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
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
                            className={`w-full mt-2 py-2.5 px-4 rounded-lg font-medium text-white transition duration-200 shadow-md ${isSubmitting
                                ? 'bg-green-800 cursor-not-allowed'
                                : 'bg-green-600 hover:bg-green-700 hover:shadow-lg active:scale-95'
                                }`}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {t('login.signing')}
                                </span>
                            ) : (
                                t('login.signinButton')
                            )}
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm">
                            {t('login.noAccount')}{' '}
                            <Link
                                to="/auth/register"
                                className="font-semibold text-green-600 hover:text-green-700 transition-colors"
                            >
                                {t('login.createAccount')}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
