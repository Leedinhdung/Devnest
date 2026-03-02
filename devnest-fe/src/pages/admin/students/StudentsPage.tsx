import React, { useState } from 'react'
import {
    PlusIcon,
    SearchIcon,
    EditIcon,
    TrashIcon,
    EyeIcon,
    MailIcon,
    PhoneIcon,
    CalendarIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    DownloadIcon,
    FilterIcon,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Modal } from '@/components/ui/modal'

interface Student {
    id: number
    name: string
    email: string
    phone: string
    avatar: string
    enrolledCourses: number
    completedCourses: number
    progress: number
    status: 'active' | 'inactive' | 'suspended'
    joinDate: string
    lastActive: string
    totalSpent: string
    level: 'Mới' | 'Trung cấp' | 'Nâng cao'
}
const initialStudents: Student[] = [
    {
        id: 1,
        name: 'Nguyễn Văn An',
        email: 'an.nguyen@email.com',
        phone: '0901234567',
        avatar: 'NA',
        enrolledCourses: 5,
        completedCourses: 3,
        progress: 72,
        status: 'active',
        joinDate: '15/01/2024',
        lastActive: '2 giờ trước',
        totalSpent: '4.500.000đ',
        level: 'Trung cấp',
    },
    {
        id: 2,
        name: 'Trần Thị Bình',
        email: 'binh.tran@email.com',
        phone: '0912345678',
        avatar: 'TB',
        enrolledCourses: 8,
        completedCourses: 7,
        progress: 95,
        status: 'active',
        joinDate: '20/01/2024',
        lastActive: '1 ngày trước',
        totalSpent: '8.200.000đ',
        level: 'Nâng cao',
    },
    {
        id: 3,
        name: 'Lê Minh Cường',
        email: 'cuong.le@email.com',
        phone: '0923456789',
        avatar: 'LC',
        enrolledCourses: 2,
        completedCourses: 0,
        progress: 25,
        status: 'active',
        joinDate: '05/02/2024',
        lastActive: '3 ngày trước',
        totalSpent: '1.600.000đ',
        level: 'Mới',
    },
    {
        id: 4,
        name: 'Phạm Thị Dung',
        email: 'dung.pham@email.com',
        phone: '0934567890',
        avatar: 'PD',
        enrolledCourses: 4,
        completedCourses: 2,
        progress: 58,
        status: 'active',
        joinDate: '10/02/2024',
        lastActive: '5 giờ trước',
        totalSpent: '3.800.000đ',
        level: 'Trung cấp',
    },
    {
        id: 5,
        name: 'Hoàng Văn Em',
        email: 'em.hoang@email.com',
        phone: '0945678901',
        avatar: 'HE',
        enrolledCourses: 6,
        completedCourses: 5,
        progress: 88,
        status: 'active',
        joinDate: '15/02/2024',
        lastActive: '30 phút trước',
        totalSpent: '6.100.000đ',
        level: 'Nâng cao',
    },
    {
        id: 6,
        name: 'Vũ Thị Phương',
        email: 'phuong.vu@email.com',
        phone: '0956789012',
        avatar: 'VP',
        enrolledCourses: 1,
        completedCourses: 0,
        progress: 10,
        status: 'inactive',
        joinDate: '20/02/2024',
        lastActive: '2 tuần trước',
        totalSpent: '800.000đ',
        level: 'Mới',
    },
    {
        id: 7,
        name: 'Đặng Văn Giang',
        email: 'giang.dang@email.com',
        phone: '0967890123',
        avatar: 'DG',
        enrolledCourses: 3,
        completedCourses: 1,
        progress: 45,
        status: 'active',
        joinDate: '01/03/2024',
        lastActive: '1 giờ trước',
        totalSpent: '2.700.000đ',
        level: 'Trung cấp',
    },
    {
        id: 8,
        name: 'Ngô Thị Hạnh',
        email: 'hanh.ngo@email.com',
        phone: '0978901234',
        avatar: 'NH',
        enrolledCourses: 7,
        completedCourses: 6,
        progress: 91,
        status: 'active',
        joinDate: '05/03/2024',
        lastActive: '4 giờ trước',
        totalSpent: '7.500.000đ',
        level: 'Nâng cao',
    },
    {
        id: 9,
        name: 'Bùi Văn Ích',
        email: 'ich.bui@email.com',
        phone: '0989012345',
        avatar: 'BI',
        enrolledCourses: 2,
        completedCourses: 0,
        progress: 15,
        status: 'suspended',
        joinDate: '10/03/2024',
        lastActive: '1 tháng trước',
        totalSpent: '1.200.000đ',
        level: 'Mới',
    },
    {
        id: 10,
        name: 'Lý Thị Kim',
        email: 'kim.ly@email.com',
        phone: '0990123456',
        avatar: 'LK',
        enrolledCourses: 4,
        completedCourses: 3,
        progress: 78,
        status: 'active',
        joinDate: '15/03/2024',
        lastActive: '6 giờ trước',
        totalSpent: '4.200.000đ',
        level: 'Trung cấp',
    },
    {
        id: 11,
        name: 'Trịnh Văn Long',
        email: 'long.trinh@email.com',
        phone: '0901234568',
        avatar: 'TL',
        enrolledCourses: 9,
        completedCourses: 8,
        progress: 97,
        status: 'active',
        joinDate: '20/03/2024',
        lastActive: '15 phút trước',
        totalSpent: '9.800.000đ',
        level: 'Nâng cao',
    },
    {
        id: 12,
        name: 'Đinh Thị Mỹ',
        email: 'my.dinh@email.com',
        phone: '0912345679',
        avatar: 'DM',
        enrolledCourses: 1,
        completedCourses: 0,
        progress: 5,
        status: 'inactive',
        joinDate: '25/03/2024',
        lastActive: '3 tuần trước',
        totalSpent: '950.000đ',
        level: 'Mới',
    },
]
const avatarColors = [
    'from-indigo-400 to-indigo-600',
    'from-purple-400 to-purple-600',
    'from-cyan-400 to-cyan-600',
    'from-emerald-400 to-emerald-600',
    'from-amber-400 to-amber-600',
    'from-rose-400 to-rose-600',
    'from-teal-400 to-teal-600',
    'from-orange-400 to-orange-600',
]
const ITEMS_PER_PAGE = 8
interface StudentFormData {
    name: string
    email: string
    phone: string
    status: 'active' | 'inactive' | 'suspended'
    level: 'Mới' | 'Trung cấp' | 'Nâng cao'
}
const emptyForm: StudentFormData = {
    name: '',
    email: '',
    phone: '',
    status: 'active',
    level: 'Mới',
}
export function StudentsPage() {
    const [students, setStudents] = useState<Student[]>(initialStudents)
    const [search, setSearch] = useState('')
    const [filterStatus, setFilterStatus] = useState<
        'all' | 'active' | 'inactive' | 'suspended'
    >('all')
    const [filterLevel, setFilterLevel] = useState('all')
    const [currentPage, setCurrentPage] = useState(1)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isViewModalOpen, setIsViewModalOpen] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
    const [formData, setFormData] = useState<StudentFormData>(emptyForm)
    const filtered = students.filter((s) => {
        const matchSearch =
            s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.email.toLowerCase().includes(search.toLowerCase()) ||
            s.phone.includes(search)
        const matchStatus = filterStatus === 'all' || s.status === filterStatus
        const matchLevel = filterLevel === 'all' || s.level === filterLevel
        return matchSearch && matchStatus && matchLevel
    })
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
    const paginated = filtered.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE,
    )
    const handleAdd = () => {
        setFormData(emptyForm)
        setIsAddModalOpen(true)
    }
    const handleEdit = (student: Student) => {
        setSelectedStudent(student)
        setFormData({
            name: student.name,
            email: student.email,
            phone: student.phone,
            status: student.status,
            level: student.level,
        })
        setIsEditModalOpen(true)
    }
    const handleView = (student: Student) => {
        setSelectedStudent(student)
        setIsViewModalOpen(true)
    }
    const handleDeleteConfirm = (student: Student) => {
        setSelectedStudent(student)
        setIsDeleteModalOpen(true)
    }
    const handleDelete = () => {
        if (selectedStudent) {
            setStudents((prev) => prev.filter((s) => s.id !== selectedStudent.id))
        }
        setIsDeleteModalOpen(false)
    }
    const handleSaveAdd = () => {
        const newStudent: Student = {
            id: Date.now(),
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            avatar: formData.name.slice(0, 2).toUpperCase(),
            enrolledCourses: 0,
            completedCourses: 0,
            progress: 0,
            status: formData.status,
            joinDate: new Date().toLocaleDateString('vi-VN'),
            lastActive: 'Vừa xong',
            totalSpent: '0đ',
            level: formData.level,
        }
        setStudents((prev) => [newStudent, ...prev])
        setIsAddModalOpen(false)
    }
    const handleSaveEdit = () => {
        if (selectedStudent) {
            setStudents((prev) =>
                prev.map((s) =>
                    s.id === selectedStudent.id
                        ? {
                            ...s,
                            ...formData,
                        }
                        : s,
                ),
            )
        }
        setIsEditModalOpen(false)
    }
    const statusBadge = (status: Student['status']) => {
        if (status === 'active') return <Badge variant="success">Hoạt động</Badge>
        if (status === 'inactive')
            return <Badge variant="neutral">Không hoạt động</Badge>
        return <Badge variant="danger">Tạm khóa</Badge>
    }
    const levelBadge = (level: Student['level']) => {
        if (level === 'Nâng cao') return <Badge variant="purple">Nâng cao</Badge>
        if (level === 'Trung cấp') return <Badge variant="info">Trung cấp</Badge>
        return <Badge variant="neutral">Mới</Badge>
    }
    const StudentForm = () => (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Họ và tên <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            name: e.target.value,
                        })
                    }
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Nhập họ và tên..."
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Email <span className="text-red-500">*</span>
                </label>
                <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            email: e.target.value,
                        })
                    }
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="email@example.com"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Số điện thoại
                </label>
                <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            phone: e.target.value,
                        })
                    }
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="0901234567"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Trạng thái
                    </label>
                    <select
                        value={formData.status}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                status: e.target.value as Student['status'],
                            })
                        }
                        className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                    >
                        <option value="active">Hoạt động</option>
                        <option value="inactive">Không hoạt động</option>
                        <option value="suspended">Tạm khóa</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Trình độ
                    </label>
                    <select
                        value={formData.level}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                level: e.target.value as Student['level'],
                            })
                        }
                        className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                    >
                        <option>Mới</option>
                        <option>Trung cấp</option>
                        <option>Nâng cao</option>
                    </select>
                </div>
            </div>
        </div>
    )
    return (
        <div className="space-y-5">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-2 flex-1 w-full sm:w-auto">
                    <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2.5 flex-1 max-w-xs">
                        <SearchIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <input
                            type="text"
                            placeholder="Tìm tên, email, SĐT..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value)
                                setCurrentPage(1)
                            }}
                            className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none w-full"
                        />
                    </div>
                    <div className="flex gap-2">
                        <select
                            value={filterStatus}
                            onChange={(e) => {
                                setFilterStatus(e.target.value as typeof filterStatus)
                                setCurrentPage(1)
                            }}
                            className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-600 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="all">Tất cả trạng thái</option>
                            <option value="active">Hoạt động</option>
                            <option value="inactive">Không hoạt động</option>
                            <option value="suspended">Tạm khóa</option>
                        </select>
                        <select
                            value={filterLevel}
                            onChange={(e) => {
                                setFilterLevel(e.target.value)
                                setCurrentPage(1)
                            }}
                            className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-600 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="all">Tất cả trình độ</option>
                            <option>Mới</option>
                            <option>Trung cấp</option>
                            <option>Nâng cao</option>
                        </select>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors">
                        <DownloadIcon className="w-4 h-4" />
                        Xuất Excel
                    </button>
                    <button
                        onClick={handleAdd}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm shadow-indigo-200"
                    >
                        <PlusIcon className="w-4 h-4" />
                        Thêm học viên
                    </button>
                </div>
            </div>

            {/* Summary */}
            <div className="flex items-center gap-2 text-sm text-slate-500">
                <FilterIcon className="w-4 h-4" />
                <span>
                    Hiển thị{' '}
                    <span className="font-semibold text-slate-700">
                        {filtered.length}
                    </span>{' '}
                    học viên
                </span>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/50">
                                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    Học viên
                                </th>
                                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">
                                    Liên hệ
                                </th>
                                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">
                                    Khóa học
                                </th>
                                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden xl:table-cell">
                                    Tiến độ
                                </th>
                                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    Trạng thái
                                </th>
                                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">
                                    Trình độ
                                </th>
                                <th className="text-right px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {paginated.map((student, idx) => (
                                <tr
                                    key={student.id}
                                    className="hover:bg-slate-50/50 transition-colors"
                                >
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`w-9 h-9 rounded-full bg-gradient-to-br ${avatarColors[idx % avatarColors.length]} flex items-center justify-center flex-shrink-0`}
                                            >
                                                <span className="text-white text-xs font-bold">
                                                    {student.avatar}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-900">
                                                    {student.name}
                                                </p>
                                                <p className="text-xs text-slate-400 mt-0.5">
                                                    Tham gia {student.joinDate}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 hidden md:table-cell">
                                        <div className="space-y-1">
                                            <p className="text-xs text-slate-600 flex items-center gap-1.5">
                                                <MailIcon className="w-3.5 h-3.5 text-slate-400" />
                                                {student.email}
                                            </p>
                                            <p className="text-xs text-slate-600 flex items-center gap-1.5">
                                                <PhoneIcon className="w-3.5 h-3.5 text-slate-400" />
                                                {student.phone}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 hidden lg:table-cell">
                                        <div className="flex items-center gap-3">
                                            <div className="text-center">
                                                <p className="text-sm font-bold text-slate-800">
                                                    {student.enrolledCourses}
                                                </p>
                                                <p className="text-xs text-slate-400">Đăng ký</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm font-bold text-emerald-600">
                                                    {student.completedCourses}
                                                </p>
                                                <p className="text-xs text-slate-400">Hoàn thành</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 hidden xl:table-cell">
                                        <div className="w-28">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs font-semibold text-slate-700">
                                                    {student.progress}%
                                                </span>
                                            </div>
                                            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all ${student.progress >= 80 ? 'bg-emerald-500' : student.progress >= 50 ? 'bg-indigo-500' : 'bg-amber-400'}`}
                                                    style={{
                                                        width: `${student.progress}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4">{statusBadge(student.status)}</td>
                                    <td className="px-5 py-4 hidden sm:table-cell">
                                        {levelBadge(student.level)}
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center justify-end gap-1">
                                            <button
                                                onClick={() => handleView(student)}
                                                className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                                                title="Xem chi tiết"
                                            >
                                                <EyeIcon className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleEdit(student)}
                                                className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                                                title="Chỉnh sửa"
                                            >
                                                <EditIcon className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteConfirm(student)}
                                                className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                                title="Xóa"
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <SearchIcon className="w-8 h-8 text-slate-300" />
                        </div>
                        <p className="text-slate-500 font-medium">
                            Không tìm thấy học viên
                        </p>
                        <p className="text-slate-400 text-sm mt-1">
                            Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                        </p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-500">
                        Trang {currentPage} / {totalPages} · {filtered.length} học viên
                    </p>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeftIcon className="w-4 h-4" />
                        </button>
                        {Array.from(
                            {
                                length: totalPages,
                            },
                            (_, i) => i + 1,
                        ).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${currentPage === page ? 'bg-indigo-600 text-white' : 'border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRightIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            {/* Add Modal */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Thêm học viên mới"
                size="md"
                footer={
                    <>
                        <button
                            onClick={() => setIsAddModalOpen(false)}
                            className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                        >
                            Hủy
                        </button>
                        <button
                            onClick={handleSaveAdd}
                            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors"
                        >
                            Thêm học viên
                        </button>
                    </>
                }
            >
                <StudentForm />
            </Modal>

            {/* Edit Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Chỉnh sửa học viên"
                size="md"
                footer={
                    <>
                        <button
                            onClick={() => setIsEditModalOpen(false)}
                            className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                        >
                            Hủy
                        </button>
                        <button
                            onClick={handleSaveEdit}
                            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors"
                        >
                            Lưu thay đổi
                        </button>
                    </>
                }
            >
                <StudentForm />
            </Modal>

            {/* View Modal */}
            {selectedStudent && (
                <Modal
                    isOpen={isViewModalOpen}
                    onClose={() => setIsViewModalOpen(false)}
                    title="Hồ sơ học viên"
                    size="md"
                >
                    <div className="space-y-5">
                        {/* Profile header */}
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center">
                                <span className="text-white text-xl font-bold">
                                    {selectedStudent.avatar}
                                </span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">
                                    {selectedStudent.name}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                    {statusBadge(selectedStudent.status)}
                                    {levelBadge(selectedStudent.level)}
                                </div>
                            </div>
                        </div>

                        {/* Contact */}
                        <div className="space-y-2">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                Thông tin liên hệ
                            </p>
                            <div className="bg-slate-50 rounded-xl p-3 space-y-2">
                                <p className="text-sm text-slate-700 flex items-center gap-2">
                                    <MailIcon className="w-4 h-4 text-slate-400" />{' '}
                                    {selectedStudent.email}
                                </p>
                                <p className="text-sm text-slate-700 flex items-center gap-2">
                                    <PhoneIcon className="w-4 h-4 text-slate-400" />{' '}
                                    {selectedStudent.phone}
                                </p>
                                <p className="text-sm text-slate-700 flex items-center gap-2">
                                    <CalendarIcon className="w-4 h-4 text-slate-400" /> Tham gia:{' '}
                                    {selectedStudent.joinDate}
                                </p>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="space-y-2">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                Thống kê học tập
                            </p>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="bg-indigo-50 rounded-xl p-3 text-center">
                                    <p className="text-xl font-bold text-indigo-600">
                                        {selectedStudent.enrolledCourses}
                                    </p>
                                    <p className="text-xs text-slate-500 mt-0.5">Đăng ký</p>
                                </div>
                                <div className="bg-emerald-50 rounded-xl p-3 text-center">
                                    <p className="text-xl font-bold text-emerald-600">
                                        {selectedStudent.completedCourses}
                                    </p>
                                    <p className="text-xs text-slate-500 mt-0.5">Hoàn thành</p>
                                </div>
                                <div className="bg-amber-50 rounded-xl p-3 text-center">
                                    <p className="text-xl font-bold text-amber-600">
                                        {selectedStudent.progress}%
                                    </p>
                                    <p className="text-xs text-slate-500 mt-0.5">Tiến độ</p>
                                </div>
                            </div>
                        </div>

                        {/* Progress bar */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-slate-700">
                                    Tiến độ tổng thể
                                </span>
                                <span className="text-sm font-bold text-indigo-600">
                                    {selectedStudent.progress}%
                                </span>
                            </div>
                            <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full ${selectedStudent.progress >= 80 ? 'bg-emerald-500' : selectedStudent.progress >= 50 ? 'bg-indigo-500' : 'bg-amber-400'}`}
                                    style={{
                                        width: `${selectedStudent.progress}%`,
                                    }}
                                />
                            </div>
                        </div>

                        {/* Financial */}
                        <div className="flex items-center justify-between bg-slate-50 rounded-xl p-4">
                            <div>
                                <p className="text-xs text-slate-400">Tổng chi tiêu</p>
                                <p className="text-lg font-bold text-slate-900">
                                    {selectedStudent.totalSpent}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-slate-400">Hoạt động gần nhất</p>
                                <p className="text-sm font-medium text-slate-700">
                                    {selectedStudent.lastActive}
                                </p>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}

            {/* Delete Confirm */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Xác nhận xóa"
                size="sm"
                footer={
                    <>
                        <button
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                        >
                            Hủy
                        </button>
                        <button
                            onClick={handleDelete}
                            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors"
                        >
                            Xóa học viên
                        </button>
                    </>
                }
            >
                <div className="text-center py-2">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <TrashIcon className="w-6 h-6 text-red-600" />
                    </div>
                    <p className="text-slate-700 text-sm">
                        Bạn có chắc chắn muốn xóa học viên{' '}
                        <span className="font-semibold text-slate-900">
                            "{selectedStudent?.name}"
                        </span>
                        ?
                    </p>
                    <p className="text-slate-400 text-xs mt-2">
                        Hành động này không thể hoàn tác.
                    </p>
                </div>
            </Modal>
        </div>
    )
}
