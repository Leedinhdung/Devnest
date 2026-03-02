import React, { useState } from 'react'
import { MenuIcon, SearchIcon, BellIcon, RefreshCwIcon } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { UserProfileModal } from '@/pages/admin/auth/UserProfile'

interface UserInfo {
    name: string
    email: string
    phone?: string
    role: string
    avatar: string
    joinDate: string
}
interface HeaderProps {
    user: UserInfo
    onLogout: () => void
    onMenuToggle: () => void
    onUpdateUser?: (u: Partial<UserInfo>) => void
}

export function Header({ user, onLogout, onMenuToggle, onUpdateUser }: HeaderProps) {
    const location = useLocation()
    const [profileOpen, setProfileOpen] = useState(false)
    // Danh sách route dùng chung (giống Sidebar)
    const navItems = [
        { label: 'Tổng quan', href: '/quan-tri/tong-quan' },
        { label: 'Khóa học', href: '/quan-tri/khoa-hoc' },
        { label: 'Học viên', href: '/quan-tri/hoc-vien' },
        { label: 'Cài đặt', href: '/quan-tri/cai-dat' },
    ]

    const currentNav = navItems.find(
        (item) => item.href === location.pathname
    )

    const title = currentNav?.label || 'Trang'
    const subtitle = 'Quản trị hệ thống'

    const today = new Date().toLocaleDateString('vi-VN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
    return (
        <header className="bg-white border-b border-slate-100 px-4 sm:px-6 py-4 flex items-center gap-4 sticky top-0 z-10">

            {/* Mobile menu button */}
            <button
                onClick={onMenuToggle}
                className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Mở menu"
            >
                <MenuIcon className="w-5 h-5" />
            </button>

            {/* Page title */}
            <div className="flex-1 min-w-0">
                <h1 className="text-xl font-bold text-slate-900 leading-tight">
                    {title}
                </h1>
                <p className="text-xs text-slate-400 mt-0.5 hidden sm:block">
                    {subtitle} · {today}
                </p>
            </div>

            {/* Search */}
            <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 w-64">
                <SearchIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none w-full"
                />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
                <button className="p-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors">
                    <RefreshCwIcon className="w-4 h-4" />
                </button>

                <button className="relative p-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors">
                    <BellIcon className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
                </button>

                <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className={`w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center transition-all ${profileOpen ? 'ring-2 ring-indigo-500 ring-offset-2' : 'hover:ring-2 hover:ring-slate-200 hover:ring-offset-1'}`}
                    aria-label="Hồ sơ người dùng"
                >
                    <span className="text-white text-xs font-bold">Dũng</span>
                </button>
            </div>

            {/* User Profile Modal */}
            <UserProfileModal
                isOpen={profileOpen}
                onClose={() => setProfileOpen(false)}
                user={user}
                onLogout={() => {
                    setProfileOpen(false)
                    onLogout()
                }}
                onUpdateUser={onUpdateUser}
            />
        </header >
    )
}