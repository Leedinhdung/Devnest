import React, { useState } from 'react'
import {
    UserIcon,
    BellIcon,
    ShieldIcon,
    GlobeIcon,
    SaveIcon,
} from 'lucide-react'
interface ToggleProps {
    enabled: boolean
    onToggle: () => void
    label: string
    description?: string
}
function Toggle({ enabled, onToggle, label, description }: ToggleProps) {
    return (
        <div className="flex items-center justify-between py-3">
            <div>
                <p className="text-sm font-medium text-slate-800">{label}</p>
                {description && (
                    <p className="text-xs text-slate-400 mt-0.5">{description}</p>
                )}
            </div>
            <button
                onClick={onToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${enabled ? 'bg-indigo-600' : 'bg-slate-200'}`}
                role="switch"
                aria-checked={enabled}
            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`}
                />
            </button>
        </div>
    )
}
export function SettingsPage() {
    const [notifications, setNotifications] = useState({
        email: true,
        sms: false,
        push: true,
        newStudent: true,
        courseComplete: true,
        payment: true,
    })
    const [saved, setSaved] = useState(false)
    const handleSave = () => {
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }
    return (
        <div className="max-w-3xl space-y-6">
            {/* Profile Settings */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 rounded-lg">
                        <UserIcon className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold text-slate-900">
                            Thông tin tài khoản
                        </h2>
                        <p className="text-xs text-slate-400">
                            Cập nhật thông tin cá nhân của bạn
                        </p>
                    </div>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                            <span className="text-white text-xl font-bold">AD</span>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-900">Admin</p>
                            <p className="text-xs text-slate-400">admin@edu.vn</p>
                            <button className="text-xs text-indigo-600 font-medium mt-1 hover:text-indigo-700">
                                Thay đổi ảnh đại diện
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Họ và tên
                            </label>
                            <input
                                type="text"
                                defaultValue="Admin"
                                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Email
                            </label>
                            <input
                                type="email"
                                defaultValue="admin@edu.vn"
                                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Số điện thoại
                            </label>
                            <input
                                type="tel"
                                defaultValue="0901234567"
                                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Vai trò
                            </label>
                            <input
                                type="text"
                                defaultValue="Quản trị viên"
                                disabled
                                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-400 bg-slate-50 cursor-not-allowed"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
                    <div className="p-2 bg-amber-50 rounded-lg">
                        <BellIcon className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold text-slate-900">Thông báo</h2>
                        <p className="text-xs text-slate-400">Quản lý cài đặt thông báo</p>
                    </div>
                </div>
                <div className="px-6 divide-y divide-slate-50">
                    <Toggle
                        enabled={notifications.email}
                        onToggle={() =>
                            setNotifications((n) => ({
                                ...n,
                                email: !n.email,
                            }))
                        }
                        label="Thông báo qua Email"
                        description="Nhận thông báo quan trọng qua email"
                    />
                    <Toggle
                        enabled={notifications.sms}
                        onToggle={() =>
                            setNotifications((n) => ({
                                ...n,
                                sms: !n.sms,
                            }))
                        }
                        label="Thông báo qua SMS"
                        description="Nhận tin nhắn SMS cho các sự kiện quan trọng"
                    />
                    <Toggle
                        enabled={notifications.push}
                        onToggle={() =>
                            setNotifications((n) => ({
                                ...n,
                                push: !n.push,
                            }))
                        }
                        label="Thông báo đẩy"
                        description="Nhận thông báo trực tiếp trên trình duyệt"
                    />
                    <Toggle
                        enabled={notifications.newStudent}
                        onToggle={() =>
                            setNotifications((n) => ({
                                ...n,
                                newStudent: !n.newStudent,
                            }))
                        }
                        label="Học viên mới đăng ký"
                        description="Thông báo khi có học viên mới"
                    />
                    <Toggle
                        enabled={notifications.courseComplete}
                        onToggle={() =>
                            setNotifications((n) => ({
                                ...n,
                                courseComplete: !n.courseComplete,
                            }))
                        }
                        label="Hoàn thành khóa học"
                        description="Thông báo khi học viên hoàn thành khóa học"
                    />
                    <Toggle
                        enabled={notifications.payment}
                        onToggle={() =>
                            setNotifications((n) => ({
                                ...n,
                                payment: !n.payment,
                            }))
                        }
                        label="Thanh toán mới"
                        description="Thông báo khi có giao dịch thanh toán"
                    />
                </div>
            </div>

            {/* Security */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
                    <div className="p-2 bg-emerald-50 rounded-lg">
                        <ShieldIcon className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold text-slate-900">Bảo mật</h2>
                        <p className="text-xs text-slate-400">
                            Quản lý mật khẩu và xác thực
                        </p>
                    </div>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            Mật khẩu hiện tại
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Mật khẩu mới
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Xác nhận mật khẩu
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <div>
                            <p className="text-sm font-medium text-slate-800">
                                Xác thực hai yếu tố (2FA)
                            </p>
                            <p className="text-xs text-slate-400 mt-0.5">
                                Tăng cường bảo mật tài khoản
                            </p>
                        </div>
                        <button className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg font-medium transition-colors">
                            Kích hoạt
                        </button>
                    </div>
                </div>
            </div>

            {/* System Settings */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
                    <div className="p-2 bg-purple-50 rounded-lg">
                        <GlobeIcon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold text-slate-900">Hệ thống</h2>
                        <p className="text-xs text-slate-400">
                            Cấu hình ngôn ngữ và múi giờ
                        </p>
                    </div>
                </div>
                <div className="p-6 grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            Ngôn ngữ
                        </label>
                        <select className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                            <option>Tiếng Việt</option>
                            <option>English</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            Múi giờ
                        </label>
                        <select className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                            <option>GMT+7 (Hà Nội)</option>
                            <option>GMT+0 (UTC)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            Định dạng ngày
                        </label>
                        <select className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                            <option>DD/MM/YYYY</option>
                            <option>MM/DD/YYYY</option>
                            <option>YYYY-MM-DD</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            Đơn vị tiền tệ
                        </label>
                        <select className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                            <option>VND (₫)</option>
                            <option>USD ($)</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${saved ? 'bg-emerald-600 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-200'}`}
                >
                    <SaveIcon className="w-4 h-4" />
                    {saved ? 'Đã lưu!' : 'Lưu cài đặt'}
                </button>
            </div>
        </div>
    )
}
