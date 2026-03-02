import React from 'react'
import logo from "@/assets/images/devnest.png"
import {
    GraduationCapIcon,
    LayoutDashboardIcon,
    BookOpenIcon,
    UsersIcon,
    SettingsIcon,
    ChevronRightIcon,
    BarChart3Icon,
    BellIcon,
    LogOutIcon,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
interface NavItem {
    label: string
    icon: React.ElementType
    badge?: number
    href: string
}
const navItems: NavItem[] = [
    {
        label: 'Tổng quan',
        href: '/quan-tri/tong-quan',
        icon: LayoutDashboardIcon,
    },
    {
        label: 'Khóa học',
        href: '/quan-tri/khoa-hoc',
        icon: BookOpenIcon,
        badge: 3,
    },
    {
        label: 'Học viên',
        href: '/quan-tri/hoc-vien',
        icon: UsersIcon,
    },
    {

        label: 'Cài đặt',
        href: '/quan-tri/cai-dat',
        icon: SettingsIcon,
    },
]
interface SidebarProps {
    isOpen: boolean
    onClose: () => void
}
export function Sidebar({
    isOpen,
    onClose,
}: SidebarProps) {
    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-20 bg-slate-900/50 backdrop-blur-sm lg:hidden"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed top-0 left-0 z-30 h-full w-64 bg-slate-900 flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto
        `}
                aria-label="Điều hướng chính"
            >
                {/* Logo */}
                <div className="flex items-center px-6 py-2 border-b border-slate-800">

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

                {/* Navigation */}
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto sidebar-scroll">
                    <p className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Menu chính
                    </p>
                    {navItems.map((item) => {
                        const Icon = item.icon
                        return (
                            <NavLink
                                key={item.href}
                                to={item.href}
                                onClick={onClose}
                                className={({ isActive }) =>
                                    `
        w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
        nav-item-transition group
        ${isActive
                                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/30'
                                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                    }
        `
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <Icon
                                            className={`w-5 h-5 flex-shrink-0 ${isActive
                                                ? 'text-white'
                                                : 'text-slate-500 group-hover:text-slate-300'
                                                }`}
                                        />
                                        <span className="flex-1 text-left">{item.label}</span>

                                        {item.badge && (
                                            <span
                                                className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${isActive
                                                    ? 'bg-indigo-500 text-white'
                                                    : 'bg-slate-700 text-slate-300'
                                                    }`}
                                            >
                                                {item.badge}
                                            </span>
                                        )}

                                        {isActive && (
                                            <ChevronRightIcon className="w-4 h-4 text-indigo-300" />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        )
                    })}

                    <div className="pt-4 mt-4 border-t border-slate-800" >
                        <p className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Báo cáo
                        </p>
                        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 nav-item-transition group">
                            <BarChart3Icon className="w-5 h-5 text-slate-500 group-hover:text-slate-300" />
                            <span>Thống kê</span>
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 nav-item-transition group">
                            <BellIcon className="w-5 h-5 text-slate-500 group-hover:text-slate-300" />
                            <span>Thông báo</span>
                            <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full font-semibold bg-red-500/20 text-red-400">
                                5
                            </span>
                        </button>
                    </div>
                </nav>

                {/* User profile */}
                <div className="px-3 py-4 border-t border-slate-800">
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800 cursor-pointer nav-item-transition group">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs font-bold">AD</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-medium truncate">Admin</p>
                            <p className="text-slate-500 text-xs truncate">admin@edu.vn</p>
                        </div>
                        <LogOutIcon className="w-4 h-4 text-slate-600 group-hover:text-slate-400 flex-shrink-0" />
                    </div>
                </div>
            </aside >
        </>
    )
}
