import { useCart } from '@/context/CartContext'
import routes from '@/routes/routes'
import { AnimatePresence, motion } from 'framer-motion'
import {
    BellIcon,
    BookmarkIcon,
    BookOpenIcon,
    ChevronDownIcon,
    LayoutDashboardIcon,
    LogOutIcon,
    MenuIcon,
    SearchIcon,
    ShoppingCartIcon,
    UserIcon,
    XIcon,
} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const navLinks = [
    {
        label: 'Khóa học',
        href: routes.coursesList,
    },
    {
        label: 'Blog',
        href: routes.blog,
    },
    {
        label: 'Liên hệ',
        href: routes.contact,
    },
]
export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileOpen, setIsMobileOpen] = useState(false)
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [isLoggedIn] = useState(true) // Mock logged in state
    const location = useLocation()
    const navigate = useNavigate()
    const { cartCount } = useCart()
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    useEffect(() => {
        setIsMobileOpen(false)
    }, [location])
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            navigate(`/courses?search=${encodeURIComponent(searchQuery)}`)
        }
    }
    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-nav border-b border-gray-100' : 'bg-white border-b border-gray-100'}`}
        >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
                        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                            <BookOpenIcon className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-xl text-gray-900">
                            Edu<span className="text-primary-600">Viet</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                to={link.href}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === link.href ? 'text-primary-600 bg-primary-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Search */}
                    <form
                        onSubmit={handleSearch}
                        className="hidden md:flex items-center flex-1 max-w-xs mx-4"
                    >
                        <div className="relative w-full">
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm khóa học..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            />
                        </div>
                    </form>

                    {/* Right side */}
                    <div className="hidden md:flex items-center gap-2">
                        {isLoggedIn ? (
                            <>
                                <Link
                                    to={routes.myCourses}
                                    className="text-sm font-medium text-gray-600 hover:text-primary-600 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Khóa học của tôi
                                </Link>

                                <Link
                                    to={routes.cart}
                                    className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <ShoppingCartIcon className="w-5 h-5" />
                                    {cartCount > 0 && (
                                        <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>

                                <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                                    <BellIcon className="w-5 h-5" />
                                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                                </button>
                                <div className="relative">
                                    <button
                                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                        className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <img
                                            src="https://picsum.photos/seed/user1/200/200"
                                            alt="Avatar"
                                            className="w-8 h-8 rounded-full object-cover ring-2 ring-primary-100"
                                        />
                                        <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                                    </button>

                                    <AnimatePresence>
                                        {isUserMenuOpen && (
                                            <motion.div
                                                initial={{
                                                    opacity: 0,
                                                    y: 8,
                                                    scale: 0.95,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0,
                                                    scale: 1,
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    y: 8,
                                                    scale: 0.95,
                                                }}
                                                transition={{
                                                    duration: 0.15,
                                                }}
                                                className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50"
                                                onMouseLeave={() => setIsUserMenuOpen(false)}
                                            >
                                                <div className="px-4 py-2 border-b border-gray-100 mb-1">
                                                    <p className="font-semibold text-gray-900 text-sm">
                                                        Nguyễn Thành Long
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        thanh.long@email.com
                                                    </p>
                                                </div>
                                                <Link
                                                    to={routes.profile}
                                                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                                >
                                                    <UserIcon className="w-4 h-4 text-gray-400" />
                                                    Hồ sơ của tôi
                                                </Link>
                                                <Link
                                                    to={routes.myCourses}
                                                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                                >
                                                    <LayoutDashboardIcon className="w-4 h-4 text-gray-400" />
                                                    Khóa học đã mua
                                                </Link>
                                                <Link
                                                    to={routes.myFavorites}
                                                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                                >
                                                    <BookmarkIcon className="w-4 h-4 text-gray-400" />
                                                    Khóa học yêu thích
                                                </Link>
                                                <div className="border-t border-gray-100 mt-1 pt-1">
                                                    <Link
                                                        to={routes.login}
                                                        className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                                    >
                                                        <LogOutIcon className="w-4 h-4" />
                                                        Đăng xuất
                                                    </Link>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    to={routes.login}
                                    className="text-sm font-medium text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Đăng nhập
                                </Link>
                                <Link
                                    to="/login"
                                    className="text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-lg transition-colors"
                                >
                                    Đăng ký
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center gap-2 md:hidden">
                        <Link
                            to={routes.cart}
                            className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ShoppingCartIcon className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <button
                            onClick={() => setIsMobileOpen(!isMobileOpen)}
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMobileOpen ? (
                                <XIcon className="w-5 h-5" />
                            ) : (
                                <MenuIcon className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            height: 0,
                        }}
                        animate={{
                            opacity: 1,
                            height: 'auto',
                        }}
                        exit={{
                            opacity: 0,
                            height: 0,
                        }}
                        transition={{
                            duration: 0.2,
                        }}
                        className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
                    >
                        <div className="px-4 py-4 space-y-1">
                            {/* Mobile Search */}
                            <form onSubmit={handleSearch} className="mb-3">
                                <div className="relative">
                                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm khóa học..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-9 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                            </form>

                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    to={link.href}
                                    className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${location.pathname === link.href ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:bg-gray-50'}`}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {isLoggedIn ? (
                                <>
                                    <Link
                                        to={routes.myCourses}
                                        className="block px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Khóa học của tôi
                                    </Link>
                                    <Link
                                        to={routes.profile}
                                        className="block px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Hồ sơ
                                    </Link>
                                </>
                            ) : (
                                <div className="flex gap-2 pt-2">
                                    <Link
                                        to={routes.login}
                                        className="flex-1 text-center py-2.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50"
                                    >
                                        Đăng nhập
                                    </Link>
                                    <Link
                                        to="/login"
                                        className="flex-1 text-center py-2.5 text-sm font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700"
                                    >
                                        Đăng ký
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
