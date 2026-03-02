import {
    CameraIcon,
    CheckIcon,
    ChevronRightIcon,
    LogOutIcon,
    XIcon
} from 'lucide-react'
import { useRef, useState } from 'react'
interface UserInfo {
    name: string
    email: string
    phone?: string
    role: string
    avatar: string
    joinDate: string
}
interface UserProfileModalProps {
    isOpen: boolean
    onClose: () => void
    user: UserInfo
    onLogout: () => void
    onUpdateUser?: (user: Partial<UserInfo>) => void
}
type Tab = 'profile' | 'security'
export function UserProfileModal({
    isOpen,
    onClose,
    onLogout,
}: UserProfileModalProps) {
    const [activeTab, setActiveTab] = useState<Tab>('profile')
    const modalRef = useRef<HTMLDivElement>(null)



    if (!isOpen) return null
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
                                    Dũng
                                </span>
                            </div>
                            <button className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center border-2 border-slate-900 hover:bg-indigo-500 transition-colors">
                                <CameraIcon className="w-2.5 h-2.5 text-white" />
                            </button>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-white font-semibold text-sm truncate">
                                Dũng
                            </p>
                            <p className="text-slate-400 text-xs truncate">admin@gmail.com</p>
                            <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded-full bg-indigo-600/30 text-indigo-300 text-xs font-medium">
                                quản trị viên
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

                            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">
                                <CheckIcon className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                <p className="text-xs text-emerald-700 font-medium">
                                    Đã lưu thay đổi!
                                </p>
                            </div>



                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1">
                                        Họ và tên
                                    </label>
                                    <input
                                        type="text"

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
                            {/* ) : ( */}
                            {/* <>
                                    <div className="space-y-2.5">
                                        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50">
                                            <UserIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs text-slate-400">Họ và tên</p>
                                                <p className="text-sm font-medium text-slate-800 truncate">
                                                    {user.name}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50">
                                            <MailIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs text-slate-400">Email</p>
                                                <p className="text-sm font-medium text-slate-800 truncate">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50">
                                            <PhoneIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs text-slate-400">Điện thoại</p>
                                                <p className="text-sm font-medium text-slate-800">
                                                    {user.phone || 'Chưa cập nhật'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50">
                                            <ShieldIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs text-slate-400">Vai trò</p>
                                                <p className="text-sm font-medium text-slate-800">
                                                    {user.role}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                       
                                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                                    >
                                        <EditIcon className="w-3.5 h-3.5" />
                                        Chỉnh sửa thông tin
                                    </button>
                                </> */}
                            {/* )} */}
                        </div>
                    )}

                    {/* {activeTab === 'security' && (
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
                    )} */}
                </div>

                {/* Logout */}
                <div className="px-4 pb-4 pt-2 border-t border-slate-100">
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors group"
                    >
                        <div className="flex items-center gap-2">
                            <LogOutIcon className="w-4 h-4" />
                            <span className="text-sm font-semibold">Đăng xuất</span>
                        </div>
                        <ChevronRightIcon className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </button>
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
