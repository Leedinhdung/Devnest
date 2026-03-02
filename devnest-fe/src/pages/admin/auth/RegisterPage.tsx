import React, { useState } from 'react'
import logo from "@/assets/images/devnest.png"

import {
    GraduationCapIcon,
    MailIcon,
    LockIcon,
    UserIcon,
    EyeIcon,
    EyeOffIcon,
    ArrowRightIcon,
    CheckIcon,
    ShieldCheckIcon,
    ZapIcon,
    HeadphonesIcon,
} from 'lucide-react'
interface RegisterPageProps {
    onRegister: (name: string, email: string, password: string) => void
    onGoToLogin: () => void
}
const features = [
    {
        icon: ZapIcon,
        text: 'Quản lý khóa học dễ dàng',
    },
    {
        icon: ShieldCheckIcon,
        text: 'Bảo mật dữ liệu tuyệt đối',
    },
    {
        icon: HeadphonesIcon,
        text: 'Hỗ trợ 24/7',
    },
]
export function RegisterPage({ onRegister, onGoToLogin }: RegisterPageProps) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [agreed, setAgreed] = useState(false)
    const passwordStrength = (() => {
        if (!password) return 0
        let score = 0
        if (password.length >= 8) score++
        if (/[A-Z]/.test(password)) score++
        if (/[0-9]/.test(password)) score++
        if (/[^A-Za-z0-9]/.test(password)) score++
        return score
    })()
    const strengthLabel = ['', 'Yếu', 'Trung bình', 'Khá', 'Mạnh'][
        passwordStrength
    ]
    const strengthColor = [
        '',
        'bg-red-400',
        'bg-amber-400',
        'bg-blue-400',
        'bg-emerald-500',
    ][passwordStrength]
    const validate = () => {
        const newErrors: Record<string, string> = {}
        if (!name.trim()) newErrors.name = 'Vui lòng nhập họ tên.'
        if (!email.trim()) newErrors.email = 'Vui lòng nhập email.'
        else if (!/\S+@\S+\.\S+/.test(email))
            newErrors.email = 'Email không hợp lệ.'
        if (!password) newErrors.password = 'Vui lòng nhập mật khẩu.'
        else if (password.length < 6)
            newErrors.password = 'Mật khẩu tối thiểu 6 ký tự.'
        if (password !== confirmPassword)
            newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp.'
        if (!agreed) newErrors.agreed = 'Vui lòng đồng ý với điều khoản.'
        return newErrors
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const newErrors = validate()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }
        setErrors({})
        setIsLoading(true)
        await new Promise((r) => setTimeout(r, 1000))
        setIsLoading(false)
        onRegister(name, email, password)
    }
    return (
        <div className="min-h-screen flex">
            {/* Left Panel */}
            <div className="hidden lg:flex lg:w-[45%] bg-slate-900 flex-col rounded-3xl justify-between p-12 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-32 -right-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl" />
                </div>

                {/* Logo */}
                <div className="flex items-center  border-slate-800">
                    <div className="flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-xl">
                        <GraduationCapIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <img
                            src={logo}
                            alt="DevNest logo"
                            className="h-14 w-auto object-contain mx-auto mb-1"
                        />
                        <p className="text-slate-400 text-xs ml-4 ">
                            Quản trị hệ thống
                        </p>
                    </div>
                </div>
                {/* Content */}
                <div className="relative space-y-8">
                    <div>
                        <h2 className="text-4xl font-bold text-white leading-tight">
                            Bắt đầu hành trình
                            <br />
                            <span className="text-indigo-400">giảng dạy số</span>
                        </h2>
                        <p className="text-slate-400 mt-4 text-base leading-relaxed">
                            Tạo tài khoản miễn phí và bắt đầu quản lý khóa học của bạn ngay
                            hôm nay.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {features.map((f) => (
                            <div key={f.text} className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-indigo-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <f.icon className="w-4 h-4 text-indigo-400" />
                                </div>
                                <p className="text-slate-300 text-sm">{f.text}</p>
                            </div>
                        ))}
                    </div>

                    {/* Steps */}
                    <div className="space-y-3">
                        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
                            3 bước đơn giản
                        </p>
                        {['Tạo tài khoản', 'Thêm khóa học', 'Quản lý học viên'].map(
                            (step, i) => (
                                <div key={step} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
                                        <span className="text-white text-xs font-bold">
                                            {i + 1}
                                        </span>
                                    </div>
                                    <p className="text-slate-300 text-sm">{step}</p>
                                </div>
                            ),
                        )}
                    </div>
                </div>

                <p className="relative text-slate-600 text-xs">
                    © 2024 EduAdmin. All rights reserved.
                </p>
            </div>

            {/* Right Panel - Form */}
            <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-white overflow-y-auto">
                <div className="w-full max-w-md py-4">
                    {/* Mobile logo */}
                    <div className="flex items-center gap-3 mb-8 lg:hidden">
                        <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center">
                            <GraduationCapIcon className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-slate-900 font-bold text-lg">EduAdmin</p>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-900">Tạo tài khoản</h1>
                        <p className="text-slate-500 mt-2">
                            Điền thông tin bên dưới để bắt đầu.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Họ và tên
                            </label>
                            <div className="relative">
                                <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder-slate-400 ${errors.name ? 'border-red-300 bg-red-50' : 'border-slate-200'}`}
                                    placeholder="Nguyễn Văn A"
                                />
                            </div>
                            {errors.name && (
                                <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Email
                            </label>
                            <div className="relative">
                                <MailIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder-slate-400 ${errors.email ? 'border-red-300 bg-red-50' : 'border-slate-200'}`}
                                    placeholder="email@example.com"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Mật khẩu
                            </label>
                            <div className="relative">
                                <LockIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`w-full pl-10 pr-11 py-3 border rounded-xl text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder-slate-400 ${errors.password ? 'border-red-300 bg-red-50' : 'border-slate-200'}`}
                                    placeholder="Tối thiểu 6 ký tự"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? (
                                        <EyeOffIcon className="w-4 h-4" />
                                    ) : (
                                        <EyeIcon className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                            {/* Password strength */}
                            {password && (
                                <div className="mt-2">
                                    <div className="flex gap-1 mb-1">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div
                                                key={i}
                                                className={`h-1 flex-1 rounded-full transition-colors ${i <= passwordStrength ? strengthColor : 'bg-slate-200'}`}
                                            />
                                        ))}
                                    </div>
                                    <p
                                        className={`text-xs ${['', 'text-red-500', 'text-amber-500', 'text-blue-500', 'text-emerald-500'][passwordStrength]}`}
                                    >
                                        Độ mạnh: {strengthLabel}
                                    </p>
                                </div>
                            )}
                            {errors.password && (
                                <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Xác nhận mật khẩu
                            </label>
                            <div className="relative">
                                <LockIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type={showConfirm ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className={`w-full pl-10 pr-11 py-3 border rounded-xl text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder-slate-400 ${errors.confirmPassword ? 'border-red-300 bg-red-50' : confirmPassword && confirmPassword === password ? 'border-emerald-300' : 'border-slate-200'}`}
                                    placeholder="Nhập lại mật khẩu"
                                />
                                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                    {confirmPassword && confirmPassword === password && (
                                        <CheckIcon className="w-4 h-4 text-emerald-500" />
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirm(!showConfirm)}
                                        className="text-slate-400 hover:text-slate-600"
                                    >
                                        {showConfirm ? (
                                            <EyeOffIcon className="w-4 h-4" />
                                        ) : (
                                            <EyeIcon className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-xs text-red-500 mt-1">
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>

                        {/* Terms */}
                        <div>
                            <div className="flex items-start gap-2.5">
                                <button
                                    type="button"
                                    onClick={() => setAgreed(!agreed)}
                                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors flex-shrink-0 mt-0.5 ${agreed ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300'}`}
                                >
                                    {agreed && (
                                        <svg
                                            className="w-3 h-3 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={3}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    )}
                                </button>
                                <span className="text-sm text-slate-600">
                                    Tôi đồng ý với{' '}
                                    <button
                                        type="button"
                                        className="text-indigo-600 hover:text-indigo-700 font-medium"
                                    >
                                        Điều khoản dịch vụ
                                    </button>{' '}
                                    và{' '}
                                    <button
                                        type="button"
                                        className="text-indigo-600 hover:text-indigo-700 font-medium"
                                    >
                                        Chính sách bảo mật
                                    </button>
                                </span>
                            </div>
                            {errors.agreed && (
                                <p className="text-xs text-red-500 mt-1 ml-7">
                                    {errors.agreed}
                                </p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white py-3 rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-indigo-200 mt-2"
                        >
                            {isLoading ? (
                                <>
                                    <svg
                                        className="animate-spin w-4 h-4"
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
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                        />
                                    </svg>
                                    Đang tạo tài khoản...
                                </>
                            ) : (
                                <>
                                    Tạo tài khoản
                                    <ArrowRightIcon className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-sm text-slate-500 mt-6">
                        Đã có tài khoản?{' '}
                        <button
                            onClick={onGoToLogin}
                            className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
                        >
                            Đăng nhập
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}
