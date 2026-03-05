import routes from '@/routes/routes'
import { IUser } from '@/types/auth.type'
import {
    CameraIcon,
    CheckIcon,
    ChevronRightIcon,
    EditIcon,
    KeyIcon,
    LogOutIcon,
    MailIcon,
    PhoneIcon,
    ShieldIcon,
    UserIcon,
    XIcon,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
interface UserProfileModalProps {
    isOpen: boolean
    onClose: () => void
    user: IUser
    onLogout: () => void
    onUpdateUser?: (user: Partial<IUser>) => void
}
type Tab = 'profile' | 'security'
export function UserProfileModal({
    user,
    isOpen,
    onClose,
}: UserProfileModalProps) {
    const [activeTab, setActiveTab] = useState<Tab>('profile')
    const [isEditing, setIsEditing] = useState(false)
    const [savedProfile, setSavedProfile] = useState(false)

    const [currentPw, setCurrentPw] = useState('')
    const [newPw, setNewPw] = useState('')
    const [confirmPw, setConfirmPw] = useState('')
    const [pwError, setPwError] = useState('')
    const [pwSuccess, setPwSuccess] = useState(false)
    const modalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!isOpen) {
            setIsEditing(false)
            setActiveTab('profile')
            setSavedProfile(false)
            setPwError('')
            setPwSuccess(false)
            setCurrentPw('')
            setNewPw('')
            setConfirmPw('')
        }
    }, [isOpen])
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                onClose()
            }
        }
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
            document.addEventListener('keydown', handleEsc)
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleEsc)
        }
    }, [isOpen, onClose])
    const handleChangePassword = () => {
        setPwError('')
        if (!currentPw) {
            setPwError('Nhập mật khẩu hiện tại.')
            return
        }
        if (newPw.length < 6) {
            setPwError('Mật khẩu mới tối thiểu 6 ký tự.')
            return
        }
        if (newPw !== confirmPw) {
            setPwError('Mật khẩu xác nhận không khớp.')
            return
        }
        setPwSuccess(true)
        setCurrentPw('')
        setNewPw('')
        setConfirmPw('')
        setTimeout(() => setPwSuccess(false), 3000)
    }
    if (!isOpen) return null
    const initials = user?.fullname
        .split(' ')
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-40" aria-hidden="true" />

            {/* Dropdown panel */}
            <div
                ref={modalRef}
                className="fixed top-16 right-4 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
                style={{
                    animation: 'dropdownIn 0.18s ease-out',
                }}
                role="dialog"
                aria-label="Hồ sơ người dùng"
            >
                {/* Profile Header */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 px-5 py-5">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                                <span className="text-white font-bold text-base">
                                    {initials}
                                </span>
                            </div>
                            <button className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center border-2 border-slate-900 hover:bg-indigo-500 transition-colors">
                                <CameraIcon className="w-2.5 h-2.5 text-white" />
                            </button>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-white font-semibold text-sm truncate">
                                {user?.fullname}
                            </p>
                            <p className="text-slate-400 text-xs truncate">{user?.email}</p>
                            <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded-full bg-indigo-600/30 text-indigo-300 text-xs font-medium">
                                {user?.role === 'admin' ? "Quản trị viên" : null}
                            </span>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1 rounded-lg text-slate-500 hover:text-slate-300 transition-colors flex-shrink-0"
                        >
                            <XIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-slate-100">
                    {(['profile', 'security'] as Tab[]).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-2.5 text-xs font-semibold transition-colors ${activeTab === tab ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            {tab === 'profile' ? '👤 Thông tin' : '🔒 Bảo mật'}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="p-4 max-h-80 overflow-y-auto">
                    {activeTab === 'profile' && (
                        <div className="space-y-3">
                            {savedProfile && (
                                <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">
                                    <CheckIcon className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                    <p className="text-xs text-emerald-700 font-medium">
                                        Đã lưu thay đổi!
                                    </p>
                                </div>
                            )}

                            {isEditing ? (
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-600 mb-1">
                                            Họ và tên
                                        </label>
                                        <input
                                            type="text"
                                            value={user?.fullname}
                                            className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-600 mb-1">
                                            Số điện thoại
                                        </label>
                                        <input
                                            type="tel"
                                            className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                                            placeholder="0901234567"
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="flex-1 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                                        >
                                            Hủy
                                        </button>
                                        <button
                                            className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium transition-colors"
                                        >
                                            Lưu
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-2.5">
                                        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50">
                                            <UserIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs text-slate-400">Họ và tên</p>
                                                <p className="text-sm font-medium text-slate-800 truncate">
                                                    {user?.fullname}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50">
                                            <MailIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs text-slate-400">Email</p>
                                                <p className="text-sm font-medium text-slate-800 truncate">
                                                    {user?.email}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50">
                                            <PhoneIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs text-slate-400">Điện thoại</p>
                                                <p className="text-sm font-medium text-slate-800">
                                                    Chưa cập nhật
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50">
                                            <ShieldIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs text-slate-400">Vai trò</p>
                                                <p className="text-sm font-medium text-slate-800">
                                                    {user?.role === 'admin' ? 'Quản trị viên' : null}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                                    >
                                        <EditIcon className="w-3.5 h-3.5" />
                                        Chỉnh sửa thông tin
                                    </button>
                                </>
                            )}
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="space-y-3">
                            {pwSuccess && (
                                <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">
                                    <CheckIcon className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                    <p className="text-xs text-emerald-700 font-medium">
                                        Đổi mật khẩu thành công!
                                    </p>
                                </div>
                            )}
                            {pwError && (
                                <div className="bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                                    <p className="text-xs text-red-600">{pwError}</p>
                                </div>
                            )}
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">
                                    Mật khẩu hiện tại
                                </label>
                                <input
                                    type="password"
                                    value={currentPw}
                                    onChange={(e) => setCurrentPw(e.target.value)}
                                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="••••••••"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">
                                    Mật khẩu mới
                                </label>
                                <input
                                    type="password"
                                    value={newPw}
                                    onChange={(e) => setNewPw(e.target.value)}
                                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Tối thiểu 6 ký tự"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">
                                    Xác nhận mật khẩu mới
                                </label>
                                <input
                                    type="password"
                                    value={confirmPw}
                                    onChange={(e) => setConfirmPw(e.target.value)}
                                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="••••••••"
                                />
                            </div>
                            <button
                                onClick={handleChangePassword}
                                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium transition-colors"
                            >
                                <KeyIcon className="w-3.5 h-3.5" />
                                Đổi mật khẩu
                            </button>
                        </div>
                    )}
                </div>

                <div className="px-4 pb-4 pt-2 border-t border-slate-100">
                    <Link to={routes.home}

                        className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors group"
                    >
                        <div className="flex items-center gap-2">
                            <LogOutIcon className="w-4 h-4" />
                            <span className="text-sm font-semibold">Trang chủ</span>
                        </div>
                        <ChevronRightIcon className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </Link>
                </div>
            </div>

            <style>{`
        @keyframes dropdownIn {
          from { opacity: 0; transform: scale(0.95) translateY(-8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
        </>
    )
}
