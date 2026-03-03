import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    BookOpenIcon,
    EyeIcon,
    EyeOffIcon,
    CheckCircleIcon,
    ArrowRightIcon,
    GithubIcon,
} from 'lucide-react'
type Mode = 'login' | 'register' | 'forgot'
interface FormState {
    name: string
    email: string
    password: string
    confirmPassword: string
}
interface FormErrors {
    name?: string
    email?: string
    password?: string
    confirmPassword?: string
}
export function LoginPage() {
    const [mode, setMode] = useState<Mode>('login')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [forgotSent, setForgotSent] = useState(false)
    const [form, setForm] = useState<FormState>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [errors, setErrors] = useState<FormErrors>({})
    const navigate = useNavigate()
    const validate = (): boolean => {
        const newErrors: FormErrors = {}
        if (mode === 'register' && !form.name.trim()) {
            newErrors.name = 'Vui lòng nhập họ tên'
        }
        if (!form.email.trim()) {
            newErrors.email = 'Vui lòng nhập email'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = 'Email không hợp lệ'
        }
        if (mode !== 'forgot') {
            if (!form.password) {
                newErrors.password = 'Vui lòng nhập mật khẩu'
            } else if (form.password.length < 6) {
                newErrors.password = 'Mật khẩu tối thiểu 6 ký tự'
            }
        }
        if (mode === 'register') {
            if (!form.confirmPassword) {
                newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu'
            } else if (form.password !== form.confirmPassword) {
                newErrors.confirmPassword = 'Mật khẩu không khớp'
            }
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validate()) return
        setIsLoading(true)
        await new Promise((r) => setTimeout(r, 1500))
        setIsLoading(false)
        if (mode === 'forgot') {
            setForgotSent(true)
        } else {
            navigate('/')
        }
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }))
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }))
        }
    }
    const switchMode = (newMode: Mode) => {
        setMode(newMode)
        setErrors({})
        setForgotSent(false)
    }
    return (
        <div className="min-h-screen w-full flex">
            {/* Left panel - decorative */}
            <div className="hidden lg:flex lg:w-1/2 hero-gradient flex-col justify-between p-12 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
                </div>

                <Link to="/" className="flex items-center gap-2.5 relative z-10">
                    <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <BookOpenIcon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-xl text-white">
                        Edu<span className="text-accent-400">Viet</span>
                    </span>
                </Link>

                <div className="relative z-10">
                    <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
                        Học không giới hạn,
                        <br />
                        <span className="text-accent-400">phát triển không ngừng</span>
                    </h2>
                    <p className="text-white/70 text-lg mb-8">
                        Tham gia cùng 150,000+ học viên đang học tập trên EduViet
                    </p>

                    <div className="space-y-3">
                        {[
                            '500+ khóa học từ các chuyên gia hàng đầu',
                            'Học mọi lúc, mọi nơi trên mọi thiết bị',
                            'Chứng chỉ được công nhận bởi doanh nghiệp',
                            'Hỗ trợ 24/7 từ đội ngũ chuyên nghiệp',
                        ].map((item) => (
                            <div key={item} className="flex items-center gap-3">
                                <CheckCircleIcon className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                                <span className="text-white/80 text-sm">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 flex items-center gap-4">
                    <div className="flex -space-x-3">
                        {['seed/a1', 'seed/a2', 'seed/a3', 'seed/a4'].map((seed, i) => (
                            <img
                                key={i}
                                src={`https://picsum.photos/${seed}/40/40`}
                                alt="Student"
                                className="w-9 h-9 rounded-full border-2 border-white/30 object-cover"
                            />
                        ))}
                    </div>
                    <p className="text-white/70 text-sm">
                        <span className="text-white font-semibold">2,000+</span> học viên
                        mới tháng này
                    </p>
                </div>
            </div>

            {/* Right panel - form */}
            <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
                <div className="w-full max-w-md">
                    {/* Mobile logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-2 justify-center mb-8 lg:hidden"
                    >
                        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                            <BookOpenIcon className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-xl text-gray-900">
                            Edu<span className="text-primary-600">Viet</span>
                        </span>
                    </Link>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={mode}
                            initial={{
                                opacity: 0,
                                y: 16,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                y: -16,
                            }}
                            transition={{
                                duration: 0.25,
                            }}
                        >
                            <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-8">
                                {/* Header */}
                                <div className="mb-6">
                                    <h1 className="text-2xl font-bold text-gray-900">
                                        {mode === 'login' && 'Đăng nhập'}
                                        {mode === 'register' && 'Tạo tài khoản'}
                                        {mode === 'forgot' && 'Quên mật khẩu'}
                                    </h1>
                                    <p className="text-gray-500 text-sm mt-1">
                                        {mode === 'login' && 'Chào mừng bạn quay lại EduViet!'}
                                        {mode === 'register' &&
                                            'Bắt đầu hành trình học tập của bạn'}
                                        {mode === 'forgot' &&
                                            'Nhập email để nhận link đặt lại mật khẩu'}
                                    </p>
                                </div>

                                {/* Forgot password success */}
                                {mode === 'forgot' && forgotSent ? (
                                    <div className="text-center py-6">
                                        <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <CheckCircleIcon className="w-7 h-7 text-emerald-500" />
                                        </div>
                                        <h3 className="font-bold text-gray-900 mb-2">
                                            Email đã được gửi!
                                        </h3>
                                        <p className="text-sm text-gray-500 mb-4">
                                            Kiểm tra hộp thư <strong>{form.email}</strong> để đặt lại
                                            mật khẩu.
                                        </p>
                                        <button
                                            onClick={() => switchMode('login')}
                                            className="text-primary-600 font-semibold text-sm hover:text-primary-700"
                                        >
                                            ← Quay lại đăng nhập
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        {/* Social login */}
                                        {mode !== 'forgot' && (
                                            <div className="space-y-2 mb-5">
                                                <button className="w-full flex items-center justify-center gap-3 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                                        <path
                                                            fill="#4285F4"
                                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                        />
                                                        <path
                                                            fill="#34A853"
                                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                        />
                                                        <path
                                                            fill="#FBBC05"
                                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                        />
                                                        <path
                                                            fill="#EA4335"
                                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                        />
                                                    </svg>
                                                    Tiếp tục với Google
                                                </button>
                                                <button className="w-full flex items-center justify-center gap-3 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                                    <GithubIcon className="w-5 h-5" />
                                                    Tiếp tục với GitHub
                                                </button>
                                            </div>
                                        )}

                                        {mode !== 'forgot' && (
                                            <div className="relative mb-5">
                                                <div className="absolute inset-0 flex items-center">
                                                    <div className="w-full border-t border-gray-100" />
                                                </div>
                                                <div className="relative flex justify-center text-xs text-gray-400">
                                                    <span className="bg-white px-3">
                                                        hoặc đăng nhập bằng email
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Form */}
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            {mode === 'register' && (
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                        Họ và tên
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={form.name}
                                                        onChange={handleChange}
                                                        placeholder="Nguyễn Văn A"
                                                        className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-transparent'}`}
                                                    />
                                                    {errors.name && (
                                                        <p className="text-red-500 text-xs mt-1">
                                                            {errors.name}
                                                        </p>
                                                    )}
                                                </div>
                                            )}

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={form.email}
                                                    onChange={handleChange}
                                                    placeholder="email@example.com"
                                                    className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-transparent'}`}
                                                />
                                                {errors.email && (
                                                    <p className="text-red-500 text-xs mt-1">
                                                        {errors.email}
                                                    </p>
                                                )}
                                            </div>

                                            {mode !== 'forgot' && (
                                                <div>
                                                    <div className="flex items-center justify-between mb-1.5">
                                                        <label className="text-sm font-medium text-gray-700">
                                                            Mật khẩu
                                                        </label>
                                                        {mode === 'login' && (
                                                            <button
                                                                type="button"
                                                                onClick={() => switchMode('forgot')}
                                                                className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                                                            >
                                                                Quên mật khẩu?
                                                            </button>
                                                        )}
                                                    </div>
                                                    <div className="relative">
                                                        <input
                                                            type={showPassword ? 'text' : 'password'}
                                                            name="password"
                                                            value={form.password}
                                                            onChange={handleChange}
                                                            placeholder="••••••••"
                                                            className={`w-full px-4 py-2.5 pr-10 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all ${errors.password ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-transparent'}`}
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                        >
                                                            {showPassword ? (
                                                                <EyeOffIcon className="w-4 h-4" />
                                                            ) : (
                                                                <EyeIcon className="w-4 h-4" />
                                                            )}
                                                        </button>
                                                    </div>
                                                    {errors.password && (
                                                        <p className="text-red-500 text-xs mt-1">
                                                            {errors.password}
                                                        </p>
                                                    )}
                                                </div>
                                            )}

                                            {mode === 'register' && (
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                        Xác nhận mật khẩu
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type={showConfirmPassword ? 'text' : 'password'}
                                                            name="confirmPassword"
                                                            value={form.confirmPassword}
                                                            onChange={handleChange}
                                                            placeholder="••••••••"
                                                            className={`w-full px-4 py-2.5 pr-10 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all ${errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-transparent'}`}
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setShowConfirmPassword(!showConfirmPassword)
                                                            }
                                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                        >
                                                            {showConfirmPassword ? (
                                                                <EyeOffIcon className="w-4 h-4" />
                                                            ) : (
                                                                <EyeIcon className="w-4 h-4" />
                                                            )}
                                                        </button>
                                                    </div>
                                                    {errors.confirmPassword && (
                                                        <p className="text-red-500 text-xs mt-1">
                                                            {errors.confirmPassword}
                                                        </p>
                                                    )}
                                                </div>
                                            )}

                                            {mode === 'register' && (
                                                <label className="flex items-start gap-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className="mt-0.5 rounded text-primary-600"
                                                        required
                                                    />
                                                    <span className="text-xs text-gray-600">
                                                        Tôi đồng ý với{' '}
                                                        <a
                                                            href="#"
                                                            className="text-primary-600 hover:underline"
                                                        >
                                                            Điều khoản sử dụng
                                                        </a>{' '}
                                                        và{' '}
                                                        <a
                                                            href="#"
                                                            className="text-primary-600 hover:underline"
                                                        >
                                                            Chính sách bảo mật
                                                        </a>
                                                    </span>
                                                </label>
                                            )}

                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold py-3 rounded-xl transition-colors"
                                            >
                                                {isLoading ? (
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                ) : (
                                                    <>
                                                        {mode === 'login' && 'Đăng nhập'}
                                                        {mode === 'register' && 'Tạo tài khoản'}
                                                        {mode === 'forgot' && 'Gửi link đặt lại'}
                                                        <ArrowRightIcon className="w-4 h-4" />
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    </>
                                )}

                                {/* Switch mode */}
                                {!forgotSent && (
                                    <div className="mt-5 text-center text-sm text-gray-500">
                                        {mode === 'login' ? (
                                            <>
                                                Chưa có tài khoản?{' '}
                                                <button
                                                    onClick={() => switchMode('register')}
                                                    className="text-primary-600 font-semibold hover:text-primary-700"
                                                >
                                                    Đăng ký ngay
                                                </button>
                                            </>
                                        ) : mode === 'register' ? (
                                            <>
                                                Đã có tài khoản?{' '}
                                                <button
                                                    onClick={() => switchMode('login')}
                                                    className="text-primary-600 font-semibold hover:text-primary-700"
                                                >
                                                    Đăng nhập
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                onClick={() => switchMode('login')}
                                                className="text-primary-600 font-semibold hover:text-primary-700"
                                            >
                                                ← Quay lại đăng nhập
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
