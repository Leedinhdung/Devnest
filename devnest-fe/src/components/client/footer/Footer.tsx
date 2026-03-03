import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    BookOpenIcon,
    FacebookIcon,
    YoutubeIcon,
    InstagramIcon,
    SendIcon,
} from 'lucide-react'
export function Footer() {
    const [email, setEmail] = useState('')
    const [subscribed, setSubscribed] = useState(false)
    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault()
        if (email) {
            setSubscribed(true)
            setEmail('')
        }
    }
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="flex items-center gap-2.5 mb-4">
                            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                                <BookOpenIcon className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold text-xl text-white">
                                Edu<span className="text-primary-400">Viet</span>
                            </span>
                        </Link>
                        <p className="text-sm text-gray-400 leading-relaxed mb-4">
                            Nền tảng học trực tuyến hàng đầu Việt Nam với hơn 500+ khóa học
                            chất lượng cao từ các chuyên gia hàng đầu.
                        </p>
                        <div className="flex items-center gap-3">
                            <a
                                href="#"
                                className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
                                aria-label="Facebook"
                            >
                                <FacebookIcon className="w-4 h-4" />
                            </a>
                            <a
                                href="#"
                                className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors"
                                aria-label="YouTube"
                            >
                                <YoutubeIcon className="w-4 h-4" />
                            </a>
                            <a
                                href="#"
                                className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-colors"
                                aria-label="Instagram"
                            >
                                <InstagramIcon className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Khóa học */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Danh mục</h3>
                        <ul className="space-y-2.5">
                            {[
                                'Lập trình',
                                'Thiết kế',
                                'Marketing',
                                'Kinh doanh',
                                'Ngoại ngữ',
                                'Nhiếp ảnh',
                            ].map((cat) => (
                                <li key={cat}>
                                    <Link
                                        to={`/courses?category=${cat}`}
                                        className="text-sm text-gray-400 hover:text-white transition-colors"
                                    >
                                        {cat}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Công ty */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">EduViet</h3>
                        <ul className="space-y-2.5">
                            {[
                                {
                                    label: 'Về chúng tôi',
                                    href: '/contact',
                                },
                                {
                                    label: 'Blog',
                                    href: '/blog',
                                },
                                {
                                    label: 'Liên hệ',
                                    href: '/contact',
                                },
                                {
                                    label: 'Trở thành giảng viên',
                                    href: '/contact',
                                },
                                {
                                    label: 'Chính sách bảo mật',
                                    href: '/',
                                },
                                {
                                    label: 'Điều khoản sử dụng',
                                    href: '/',
                                },
                            ].map((item) => (
                                <li key={item.label}>
                                    <Link
                                        to={item.href}
                                        className="text-sm text-gray-400 hover:text-white transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Nhận thông báo</h3>
                        <p className="text-sm text-gray-400 mb-4">
                            Đăng ký để nhận thông tin về khóa học mới và ưu đãi đặc biệt.
                        </p>
                        {subscribed ? (
                            <div className="bg-emerald-900/50 border border-emerald-700 rounded-lg p-3 text-sm text-emerald-400">
                                ✓ Đăng ký thành công! Cảm ơn bạn.
                            </div>
                        ) : (
                            <form onSubmit={handleSubscribe} className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Email của bạn"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-1 px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="p-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors flex-shrink-0"
                                    aria-label="Đăng ký"
                                >
                                    <SendIcon className="w-4 h-4" />
                                </button>
                            </form>
                        )}

                        <div className="mt-6">
                            <p className="text-xs text-gray-500 mb-2">Chứng nhận & Đối tác</p>
                            <div className="flex gap-2">
                                <div className="bg-gray-800 rounded px-2 py-1 text-xs text-gray-400">
                                    ISO 9001
                                </div>
                                <div className="bg-gray-800 rounded px-2 py-1 text-xs text-gray-400">
                                    GDPR
                                </div>
                                <div className="bg-gray-800 rounded px-2 py-1 text-xs text-gray-400">
                                    SSL
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-500">
                        © 2024 EduViet. Tất cả quyền được bảo lưu.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>🇻🇳 Tiếng Việt</span>
                        <span>₫ VND</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
