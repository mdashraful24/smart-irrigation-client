import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, Droplets, CheckCircle, Mail, Lock, User } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from 'sweetalert2';
import useAuth from "../../../hooks/useAuth";

// Premium SweetAlert2 styling
const showSuccessAlert = (name) => {
    Swal.fire({
        // title: 'Welcome Aboard! 🎉',
        html: `
            <div style="text-align: center;">
                <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">✨</div>
                <h3 style="color: #166534; font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem;">
                    Account Created Successfully!
                </h3>
                <p style="color: #374151; font-size: 1rem; margin-bottom: 1rem;">
                    Hello <strong style="color: #16a34a;">${name}</strong>, welcome to Smart Irrigation!<br/>
                    Your farming journey begins now.
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
        timer: 3000,
        timerProgressBar: false,
        didOpen: (popup) => {
            popup.addEventListener('mouseenter', Swal.stopTimer);
            popup.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });
};

const SignUp = () => {
    window.scrollTo(0, 0);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { setUser, createUser, userProfileUpdate } = useAuth();

    const [firebaseError, setFirebaseError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Create validation schema with Yup
    const validationSchema = yup.object().shape({
        fullName: yup
            .string()
            .required(t('errors.fullNameRequired', 'Full name is required'))
            .min(2, t('errors.fullNameShort', 'Full name must be at least 2 characters'))
            .trim(),
        email: yup
            .string()
            .required(t('errors.emailRequired'))
            .email(t('errors.emailInvalid'))
            .lowercase()
            .trim(),
        password: yup
            .string()
            .required(t('errors.passwordRequired'))
            .min(8, t('errors.passwordMin8', 'Password must be at least 8 characters'))
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                t('errors.passwordComplex', 'Password must contain an uppercase, lowercase, and a number')
            ),
        confirmPassword: yup
            .string()
            .required(t('errors.confirmPassword', 'Please confirm your password'))
            .oneOf([yup.ref('password')], t('errors.passwordsMismatch', 'Passwords do not match')),
    });

    // Initialize react-hook-form
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
        setError,
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    });

    // Watch password field for real-time validation checks
    const password = watch('password', '');

    // Password validation checks for UI
    const passwordChecks = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    // Helper function to get user-friendly error messages
    const getFirebaseErrorMessage = (error) => {
        switch (error.code) {
            case 'auth/email-already-in-use':
                return t('errors.emailInUse', 'This email is already registered. Please try logging in.');
            case 'auth/invalid-email':
                return t('errors.invalidEmail', 'Invalid email address format.');
            case 'auth/weak-password':
                return t('errors.weakPassword', 'Password is too weak. Please choose a stronger password.');
            case 'auth/operation-not-allowed':
                return t('errors.operationNotAllowed', 'Email/password sign up is not enabled. Please contact support.');
            default:
                return t('errors.signupFailed', 'Failed to create account. Please try again.');
        }
    };

    const onSubmit = async (data) => {
        setFirebaseError("");

        try {
            // Create user with Firebase
            const userCredential = await createUser(data.email, data.password);

            // Update user profile with full name
            await userProfileUpdate({
                displayName: data.fullName
            });

            // Update the user in context
            setUser({
                ...userCredential.user,
                displayName: data.fullName
            });

            // Show premium success alert
            await showSuccessAlert(data.fullName);

            // Redirect to dashboard or home page
            navigate('/');

        } catch (error) {
            console.error("Signup error:", error);

            // Show error alert for Firebase errors
            // Swal.fire({
            //     title: 'Oops...',
            //     text: getFirebaseErrorMessage(error),
            //     icon: 'error',
            //     confirmButtonColor: '#dc2626',
            //     background: '#ffffff',
            //     customClass: {
            //         popup: 'rounded-2xl',
            //         confirmButton: 'px-6 py-2 rounded-lg',
            //     }
            // });

            // Set field-specific errors
            if (error.code === 'auth/email-already-in-use') {
                setError('email', {
                    type: 'manual',
                    message: t('errors.emailInUse', 'This email is already registered')
                });
            }
        }
    };

    return (
        <div className="md:min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Logo/Brand */}
                <div className="text-center mb-6">
                    <Link to="/" className="inline-flex items-center gap-2">
                        <Droplets className="w-8 h-8 text-green-600" />
                        <span className="text-3xl font-bold text-green-600">{t('brand')}</span>
                    </Link>
                    <h1 className="mt-4 text-2xl font-bold">{t('signup.title')}</h1>
                    <p className="mt-2 leading-relaxed">{t('signup.subtitle')}</p>
                </div>

                {/* Sign Up Form */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-md p-6 md:p-8">
                    {/* Firebase Error Message */}
                    {firebaseError && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-600">{firebaseError}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Full Name Field */}
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium mb-1">
                                {t('signup.fullName')}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    id="fullName"
                                    {...register('fullName')}
                                    placeholder="John Doe"
                                    className={`w-full pl-10 pr-4 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 ${errors.fullName ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    disabled={isSubmitting}
                                />
                            </div>
                            {errors.fullName && (
                                <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
                            )}
                        </div>

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
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                            )}

                            {/* Password Requirements */}
                            <div className="mt-2 grid md:grid-cols-2 place-items-start gap-2 text-sm break-all">
                                <div className="flex items-center">
                                    <CheckCircle className={`w-4 h-4 mr-2 ${passwordChecks.length ? 'text-green-500' : 'text-gray-300'
                                        }`} />
                                    <span className={passwordChecks.length ? 'text-green-600' : 'text-gray-500'}>
                                        {t('signup.pw_length', 'At least 8 characters')}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <CheckCircle className={`w-4 h-4 mr-2 ${passwordChecks.uppercase ? 'text-green-500' : 'text-gray-300'
                                        }`} />
                                    <span className={passwordChecks.uppercase ? 'text-green-600' : 'text-gray-500'}>
                                        {t('signup.pw_upper', 'One uppercase letter')}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <CheckCircle className={`w-4 h-4 mr-2 ${passwordChecks.lowercase ? 'text-green-500' : 'text-gray-300'
                                        }`} />
                                    <span className={passwordChecks.lowercase ? 'text-green-600' : 'text-gray-500'}>
                                        {t('signup.pw_lower', 'One lowercase letter')}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <CheckCircle className={`w-4 h-4 mr-2 ${passwordChecks.number ? 'text-green-500' : 'text-gray-300'
                                        }`} />
                                    <span className={passwordChecks.number ? 'text-green-600' : 'text-gray-500'}>
                                        {t('signup.pw_number', 'One number')}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                                {t('signup.confirmPassword')}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    {...register('confirmPassword')}
                                    placeholder="••••••••"
                                    className={`w-full pl-10 pr-12 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    disabled={isSubmitting}
                                />
                                <button
                                    type="button"
                                    onClick={toggleConfirmPasswordVisibility}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                    disabled={isSubmitting}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="w-5" />
                                    ) : (
                                        <Eye className="w-5" />
                                    )}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                            )}
                            {watch('confirmPassword') && password === watch('confirmPassword') && !errors.confirmPassword && (
                                <p className="mt-2 text-sm text-green-600 flex items-center">
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    {t('signup.passwordsMatch', 'Passwords match')}
                                </p>
                            )}
                        </div>


                        {/* Terms Agreement */}
                        {/* <div className="flex items-start">
                            <input
                                type="checkbox"
                                id="terms"
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded mt-1"
                                required
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                                I agree to the{" "}
                                <Link to="/terms" className="text-green-600 hover:text-green-700 font-medium">
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link to="/privacy" className="text-green-600 hover:text-green-700 font-medium">
                                    Privacy Policy
                                </Link>
                            </label>
                        </div> */}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full mt-3 py-2.5 px-4 rounded-lg font-medium text-white transition duration-200 shadow-md ${isSubmitting
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
                                    {t('signup.creating')}
                                </span>
                            ) : (
                                t('signup.createButton')
                            )}
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm">
                            {t('signup.already')}{' '}
                            <Link
                                to="/auth/login"
                                className="font-semibold text-green-600 hover:text-green-700"
                            >
                                {t('signup.signIn')}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
