import logo from "@/assets/images/devnest.png"
import {
    ArrowRightIcon,
    BookOpenIcon,
    EyeIcon,
    EyeOffIcon,
    GraduationCapIcon,
    LockIcon,
    MailIcon,
    StarIcon,
    UsersIcon,
} from 'lucide-react'
import React, { useState } from 'react'
interface LoginPageProps {
    onLogin: (email: string, password: string) => void
    onGoToRegister: () => void
}
export function LoginPage({ onLogin, onGoToRegister }: LoginPageProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        if (!email || !password) {
            setError('Vui lòng nhập đầy đủ thông tin.')
            return
        }
        setIsLoading(true)
        // Simulate API call
        await new Promise((r) => setTimeout(r, 900))
        setIsLoading(false)
        onLogin(email, password)
    }
    return (
        <div className="min-h-screen flex">
            {/* Left Panel - Branding */}
            <div className="hidden lg:flex lg:w-[45%] bg-slate-900 flex-col justify-between p-12 md:rounded-xl relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl" />
                </div>

                {/* Logo */}
                <div className="flex items-center border-slate-800">

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

                {/* Main content */}
                <div className="relative space-y-6">
                    <div>
                        <h2 className="text-4xl font-bold text-white leading-tight">
                            Quản lý khóa học
                            <br />
                            <span className="text-indigo-400">chuyên nghiệp</span>
                        </h2>
                        <p className="text-slate-400 mt-4 text-base leading-relaxed">
                            Hệ thống quản trị toàn diện giúp bạn theo dõi học viên, quản lý
                            khóa học và tối ưu doanh thu.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                        {[
                            {
                                icon: UsersIcon,
                                value: '3,842',
                                label: 'Học viên',
                            },
                            {
                                icon: BookOpenIcon,
                                value: '48',
                                label: 'Khóa học',
                            },
                            {
                                icon: StarIcon,
                                value: '4.8',
                                label: 'Đánh giá',
                            },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="bg-white/5 rounded-2xl p-4 border border-white/10"
                            >
                                <stat.icon className="w-5 h-5 text-indigo-400 mb-2" />
                                <p className="text-white font-bold text-xl">{stat.value}</p>
                                <p className="text-slate-400 text-xs mt-0.5">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Testimonial */}
                    <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                        <p className="text-slate-300 text-sm leading-relaxed italic">
                            "EduAdmin giúp tôi quản lý hơn 300 học viên một cách dễ dàng. Giao
                            diện trực quan, báo cáo chi tiết."
                        </p>
                        <div className="flex items-center gap-3 mt-4">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                                <span className="text-white text-xs font-bold">NT</span>
                            </div>
                            <div>
                                <p className="text-white text-sm font-medium">
                                    Nguyễn Thị Thanh
                                </p>
                                <p className="text-slate-500 text-xs">
                                    Giảng viên · React & Node.js
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="relative">
                    <p className="text-slate-600 text-xs">
                        © 2024 EduAdmin. All rights reserved.
                    </p>
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-white">
                <div className="w-full max-w-md">
                    {/* Mobile logo */}
                    <div className="flex items-center gap-3 mb-8 lg:hidden">
                        <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center">
                            <GraduationCapIcon className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-slate-900 font-bold text-lg">EduAdmin</p>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-900">Đăng nhập</h1>
                        <p className="text-slate-500 mt-2">
                            Chào mừng trở lại! Vui lòng đăng nhập để tiếp tục.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
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
                                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder-slate-400"
                                    placeholder="admin@edu.vn"
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="block text-sm font-medium text-slate-700">
                                    Mật khẩu
                                </label>
                                <button
                                    type="button"
                                    className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                                >
                                    Quên mật khẩu?
                                </button>
                            </div>
                            <div className="relative">
                                <LockIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-11 py-3 border border-slate-200 rounded-xl text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder-slate-400"
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOffIcon className="w-4 h-4" />
                                    ) : (
                                        <EyeIcon className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Remember me */}
                        <div className="flex items-center gap-2.5">
                            <button
                                type="button"
                                onClick={() => setRememberMe(!rememberMe)}
                                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors flex-shrink-0 ${rememberMe ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300'}`}
                            >
                                {rememberMe && (
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
                            <span className="text-sm text-slate-600">Ghi nhớ đăng nhập</span>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                                <p className="text-sm text-red-600">{error}</p>
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white py-3 rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-indigo-200"
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
                                    Đang đăng nhập...
                                </>
                            ) : (
                                <>
                                    Đăng nhập
                                    <ArrowRightIcon className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-slate-200" />
                        <span className="text-xs text-slate-400">hoặc</span>
                        <div className="flex-1 h-px bg-slate-200" />
                    </div>

                    <p className="text-center text-sm text-slate-500">
                        Chưa có tài khoản?{' '}
                        <button
                            onClick={onGoToRegister}
                            className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
                        >
                            Đăng ký ngay
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}
