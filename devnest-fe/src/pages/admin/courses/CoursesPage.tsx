import React, { useState } from 'react'
import {
    PlusIcon,
    SearchIcon,
    FilterIcon,
    EditIcon,
    TrashIcon,
    EyeIcon,
    BookOpenIcon,
    UsersIcon,
    StarIcon,
    VideoIcon,
    MoreVerticalIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    TagIcon,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Modal } from '@/components/ui/modal'
import { CategoryModal } from '@/pages/admin/courses/CategoryModal'
import { useGetCategories } from '@/hooks/category/category'
import CourseForm from '@/components/admin/course/CourseForm'

interface Course {
    id: number
    name: string
    instructor: string
    category: string
    students: number
    rating: number
    price: string
    duration: string
    lessons: number
    status: 'active' | 'draft' | 'archived'
    thumbnail: string
    createdAt: string
    revenue: string
}

const initialCourses: Course[] = [
    {
        id: 1,
        name: 'React.js Nâng cao',
        instructor: 'Nguyễn Văn Hùng',
        category: 'Lập trình',
        students: 342,
        rating: 4.9,
        price: '1.200.000đ',
        duration: '32h',
        lessons: 85,
        status: 'active',
        thumbnail: 'RE',
        createdAt: '15/01/2024',
        revenue: '34.2M',
    },
    {
        id: 2,
        name: 'Python cho người mới bắt đầu',
        instructor: 'Trần Thị Mai',
        category: 'Lập trình',
        students: 289,
        rating: 4.8,
        price: '800.000đ',
        duration: '24h',
        lessons: 62,
        status: 'active',
        thumbnail: 'PY',
        createdAt: '20/01/2024',
        revenue: '28.9M',
    },
    {
        id: 3,
        name: 'UI/UX Design Masterclass',
        instructor: 'Lê Hoàng Nam',
        category: 'Thiết kế',
        students: 215,
        rating: 4.7,
        price: '1.500.000đ',
        duration: '40h',
        lessons: 98,
        status: 'active',
        thumbnail: 'UX',
        createdAt: '05/02/2024',
        revenue: '21.5M',
    },
    {
        id: 4,
        name: 'Digital Marketing Toàn diện',
        instructor: 'Phạm Thị Lan',
        category: 'Marketing',
        students: 198,
        rating: 4.6,
        price: '950.000đ',
        duration: '28h',
        lessons: 74,
        status: 'active',
        thumbnail: 'DM',
        createdAt: '10/02/2024',
        revenue: '19.8M',
    },
    {
        id: 5,
        name: 'Node.js & Express Backend',
        instructor: 'Hoàng Minh Tuấn',
        category: 'Lập trình',
        students: 176,
        rating: 4.8,
        price: '1.100.000đ',
        duration: '36h',
        lessons: 90,
        status: 'active',
        thumbnail: 'NJ',
        createdAt: '15/02/2024',
        revenue: '17.6M',
    },
    {
        id: 6,
        name: 'Figma từ cơ bản đến nâng cao',
        instructor: 'Vũ Thị Hoa',
        category: 'Thiết kế',
        students: 154,
        rating: 4.5,
        price: '700.000đ',
        duration: '20h',
        lessons: 55,
        status: 'active',
        thumbnail: 'FG',
        createdAt: '20/02/2024',
        revenue: '15.4M',
    },
    {
        id: 7,
        name: 'JavaScript ES6+ Chuyên sâu',
        instructor: 'Đặng Văn Khoa',
        category: 'Lập trình',
        students: 132,
        rating: 4.7,
        price: '900.000đ',
        duration: '26h',
        lessons: 68,
        status: 'draft',
        thumbnail: 'JS',
        createdAt: '01/03/2024',
        revenue: '13.2M',
    },
    {
        id: 8,
        name: 'SEO & Content Marketing',
        instructor: 'Ngô Thị Bích',
        category: 'Marketing',
        students: 98,
        rating: 4.4,
        price: '650.000đ',
        duration: '18h',
        lessons: 48,
        status: 'draft',
        thumbnail: 'SE',
        createdAt: '05/03/2024',
        revenue: '9.8M',
    },
    {
        id: 9,
        name: 'Kinh doanh Online từ A-Z',
        instructor: 'Bùi Văn Thắng',
        category: 'Kinh doanh',
        students: 87,
        rating: 4.3,
        price: '1.300.000đ',
        duration: '30h',
        lessons: 78,
        status: 'archived',
        thumbnail: 'KD',
        createdAt: '10/03/2024',
        revenue: '8.7M',
    },
]
const categoryColors: Record<string, string> = {
    'Lập trình': 'bg-indigo-100 text-indigo-700',
    'Thiết kế': 'bg-purple-100 text-purple-700',
    Marketing: 'bg-cyan-100 text-cyan-700',
    'Kinh doanh': 'bg-emerald-100 text-emerald-700',
}
const thumbnailColors: Record<string, string> = {
    RE: 'from-blue-500 to-indigo-600',
    PY: 'from-yellow-500 to-orange-500',
    UX: 'from-purple-500 to-pink-500',
    DM: 'from-cyan-500 to-blue-500',
    NJ: 'from-emerald-500 to-teal-600',
    FG: 'from-violet-500 to-purple-600',
    JS: 'from-amber-400 to-yellow-500',
    SE: 'from-orange-500 to-red-500',
    KD: 'from-teal-500 to-emerald-600',
}
const ITEMS_PER_PAGE = 6
interface CourseFormData {
    name: string
    instructor: string
    category: string
    price: string
    duration: string
    lessons: string
    status: 'active' | 'draft' | 'archived'
}
const emptyForm: CourseFormData = {
    name: '',
    instructor: '',
    category: 'Lập trình',
    price: '',
    duration: '',
    lessons: '',
    status: 'draft',
}
interface CoursesPageProps {
    onManageContent?: (courseId: number) => void
}
export function CoursesPage({ onManageContent }: CoursesPageProps) {
    const [courses, setCourses] = useState<Course[]>(initialCourses)
    const { data: categories = [] } = useGetCategories()
    const [search, setSearch] = useState('')
    const [filterStatus, setFilterStatus] = useState<
        'all' | 'active' | 'draft' | 'archived'
    >('all')
    const [filterCategory, setFilterCategory] = useState('all')
    const [currentPage, setCurrentPage] = useState(1)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isViewModalOpen, setIsViewModalOpen] = useState(false)
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
    const [formData, setFormData] = useState<CourseFormData>(emptyForm)
    const [openMenuId, setOpenMenuId] = useState<number | null>(null)
    const filtered = courses.filter((c) => {
        const matchSearch =
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.instructor.toLowerCase().includes(search.toLowerCase())
        const matchStatus = filterStatus === 'all' || c.status === filterStatus
        const matchCategory =
            filterCategory === 'all' || c.category === filterCategory
        return matchSearch && matchStatus && matchCategory
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
    const handleEdit = (course: Course) => {
        setSelectedCourse(course)
        setFormData({
            name: course.name,
            instructor: course.instructor,
            category: course.category,
            price: course.price,
            duration: course.duration,
            lessons: String(course.lessons),
            status: course.status,
        })
        setIsEditModalOpen(true)
        setOpenMenuId(null)
    }
    const handleView = (course: Course) => {
        setSelectedCourse(course)
        setIsViewModalOpen(true)
        setOpenMenuId(null)
    }
    const handleDeleteConfirm = (course: Course) => {
        setSelectedCourse(course)
        setIsDeleteModalOpen(true)
        setOpenMenuId(null)
    }
    const handleDelete = () => {
        if (selectedCourse)
            setCourses((prev) => prev.filter((c) => c.id !== selectedCourse.id))
        setIsDeleteModalOpen(false)
    }
    const handleSaveAdd = () => {
        const newCourse: Course = {
            id: Date.now(),
            name: formData.name,
            instructor: formData.instructor,
            category: formData.category,
            students: 0,
            rating: 0,
            price: formData.price,
            duration: formData.duration,
            lessons: Number(formData.lessons),
            status: formData.status,
            thumbnail: formData.name.slice(0, 2).toUpperCase(),
            createdAt: new Date().toLocaleDateString('vi-VN'),
            revenue: '0',
        }
        setCourses((prev) => [newCourse, ...prev])
        setIsAddModalOpen(false)
    }
    const handleSaveEdit = () => {
        if (selectedCourse)
            setCourses((prev) =>
                prev.map((c) =>
                    c.id === selectedCourse.id
                        ? {
                            ...c,
                            ...formData,
                            lessons: Number(formData.lessons),
                        }
                        : c,
                ),
            )
        setIsEditModalOpen(false)
    }
    const statusBadge = (status: Course['status']) => {
        if (status === 'active') return <Badge variant="success">Đang mở</Badge>
        if (status === 'draft') return <Badge variant="warning">Nháp</Badge>
        return <Badge variant="neutral">Lưu trữ</Badge>
    }

    return (
        <div className="space-y-5">
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-2 flex-1 w-full sm:w-auto">
                    <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2.5 flex-1 max-w-xs">
                        <SearchIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <input
                            type="text"
                            placeholder="Tìm khóa học, giảng viên..."
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
                            <option value="active">Đang mở</option>
                            <option value="draft">Nháp</option>
                            <option value="archived">Lưu trữ</option>
                        </select>
                        <select
                            value={filterCategory}
                            onChange={(e) => {
                                setFilterCategory(e.target.value)
                                setCurrentPage(1)
                            }}
                            className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-600 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="all">Tất cả danh mục</option>
                            {categories && categories.map((cat) => (
                                <option key={cat.slug}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                        onClick={() => setIsCategoryModalOpen(true)}
                        className="flex items-center gap-2 border border-slate-200 hover:bg-slate-50 text-slate-600 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
                    >
                        <TagIcon className="w-4 h-4" /> Danh mục
                    </button>
                    <button
                        onClick={handleAdd}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm shadow-indigo-200"
                    >
                        <PlusIcon className="w-4 h-4" /> Thêm khóa học
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500">
                <FilterIcon className="w-4 h-4" />
                <span>
                    Hiển thị{' '}
                    <span className="font-semibold text-slate-700">
                        {filtered.length}
                    </span>{' '}
                    khóa học
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {paginated.map((course) => (
                    <div
                        key={course.id}
                        className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                    >
                        <div
                            className={`h-28 bg-gradient-to-br ${thumbnailColors[course.thumbnail] || 'from-slate-500 to-slate-700'} flex items-center justify-center relative`}
                        >
                            <span className="text-white text-3xl font-black opacity-30">
                                {course.thumbnail}
                            </span>
                            <div className="absolute top-3 left-3">
                                <span
                                    className={`text-xs font-semibold px-2 py-1 rounded-lg ${categoryColors[course.category] || 'bg-slate-100 text-slate-700'}`}
                                >
                                    {course.category}
                                </span>
                            </div>
                            <div className="absolute top-3 right-3">
                                {statusBadge(course.status)}
                            </div>
                            <div className="absolute bottom-3 right-3">
                                <div className="relative">
                                    <button
                                        onClick={() =>
                                            setOpenMenuId(openMenuId === course.id ? null : course.id)
                                        }
                                        className="p-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-white transition-colors"
                                    >
                                        <MoreVerticalIcon className="w-4 h-4" />
                                    </button>
                                    {openMenuId === course.id && (
                                        <div className="absolute right-0 bottom-8 bg-white rounded-xl shadow-xl border border-slate-100 py-1 w-40 z-10">
                                            <button
                                                onClick={() => handleView(course)}
                                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                                            >
                                                <EyeIcon className="w-4 h-4 text-slate-400" /> Xem chi
                                                tiết
                                            </button>
                                            <button
                                                onClick={() => handleEdit(course)}
                                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                                            >
                                                <EditIcon className="w-4 h-4 text-indigo-400" /> Chỉnh
                                                sửa
                                            </button>
                                            <button
                                                onClick={() => handleDeleteConfirm(course)}
                                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                                            >
                                                <TrashIcon className="w-4 h-4" /> Xóa
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-slate-900 text-sm leading-snug mb-1 line-clamp-2">
                                {course.name}
                            </h3>
                            <p className="text-xs text-slate-500 mb-3">
                                👨‍🏫 {course.instructor}
                            </p>
                            <div className="grid grid-cols-3 gap-2 mb-3">
                                <div className="text-center">
                                    <p className="text-xs text-slate-400 flex items-center justify-center gap-1 mb-0.5">
                                        <UsersIcon className="w-3 h-3" />
                                    </p>
                                    <p className="text-sm font-semibold text-slate-700">
                                        {course.students}
                                    </p>
                                    <p className="text-xs text-slate-400">Học viên</p>
                                </div>
                                <div className="text-center border-x border-slate-100">
                                    <p className="text-xs text-slate-400 flex items-center justify-center gap-1 mb-0.5">
                                        <StarIcon className="w-3 h-3 fill-amber-400 text-amber-400" />
                                    </p>
                                    <p className="text-sm font-semibold text-slate-700">
                                        {course.rating || '—'}
                                    </p>
                                    <p className="text-xs text-slate-400">Đánh giá</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs text-slate-400 flex items-center justify-center gap-1 mb-0.5">
                                        <VideoIcon className="w-3 h-3" />
                                    </p>
                                    <p className="text-sm font-semibold text-slate-700">
                                        {course.lessons}
                                    </p>
                                    <p className="text-xs text-slate-400">Bài học</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                                <div>
                                    <p className="text-xs text-slate-400">Học phí</p>
                                    <p className="text-sm font-bold text-indigo-600">
                                        {course.price}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-slate-400">Doanh thu</p>
                                    <p className="text-sm font-bold text-emerald-600">
                                        {course.revenue}
                                    </p>
                                </div>
                            </div>
                            {onManageContent && (
                                <button
                                    onClick={() => onManageContent(course.id)}
                                    className="mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-xs font-semibold transition-colors"
                                >
                                    <BookOpenIcon className="w-3.5 h-3.5" /> Quản lý bài học
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-500">
                        Trang {currentPage} / {totalPages}
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

            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Thêm khóa học mới"
                size="lg"
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
                            Thêm khóa học
                        </button>
                    </>
                }
            >
                <CourseForm categories={categories} />
            </Modal>

            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Chỉnh sửa khóa học"
                size="lg"
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
                <CourseForm categories={categories} />
            </Modal>

            {selectedCourse && (
                <Modal
                    isOpen={isViewModalOpen}
                    onClose={() => setIsViewModalOpen(false)}
                    title="Chi tiết khóa học"
                    size="md"
                >
                    <div className="space-y-4">
                        <div
                            className={`h-32 rounded-xl bg-gradient-to-br ${thumbnailColors[selectedCourse.thumbnail] || 'from-slate-500 to-slate-700'} flex items-center justify-center`}
                        >
                            <span className="text-white text-5xl font-black opacity-30">
                                {selectedCourse.thumbnail}
                            </span>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">
                                {selectedCourse.name}
                            </h3>
                            <p className="text-sm text-slate-500 mt-1">
                                Giảng viên: {selectedCourse.instructor}
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                {
                                    label: 'Danh mục',
                                    value: selectedCourse.category,
                                },
                                {
                                    label: 'Trạng thái',
                                    value: statusBadge(selectedCourse.status),
                                    raw: true,
                                },
                                {
                                    label: 'Học viên',
                                    value: selectedCourse.students,
                                },
                                {
                                    label: 'Đánh giá',
                                    value: `⭐ ${selectedCourse.rating}`,
                                },
                                {
                                    label: 'Học phí',
                                    value: selectedCourse.price,
                                },
                                {
                                    label: 'Doanh thu',
                                    value: selectedCourse.revenue,
                                },
                                {
                                    label: 'Thời lượng',
                                    value: selectedCourse.duration,
                                },
                                {
                                    label: 'Số bài học',
                                    value: selectedCourse.lessons,
                                },
                            ].map((item) => (
                                <div key={item.label} className="bg-slate-50 rounded-xl p-3">
                                    <p className="text-xs text-slate-400 mb-1">{item.label}</p>
                                    {item.raw ? (
                                        item.value
                                    ) : (
                                        <p className="text-sm font-semibold text-slate-700">
                                            {item.value}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </Modal>
            )}

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
                            Xóa khóa học
                        </button>
                    </>
                }
            >
                <div className="text-center py-2">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <TrashIcon className="w-6 h-6 text-red-600" />
                    </div>
                    <p className="text-slate-700 text-sm">
                        Bạn có chắc chắn muốn xóa khóa học{' '}
                        <span className="font-semibold text-slate-900">
                            "{selectedCourse?.name}"
                        </span>
                        ?
                    </p>
                    <p className="text-slate-400 text-xs mt-2">
                        Hành động này không thể hoàn tác.
                    </p>
                </div>
            </Modal>

            <CategoryModal
                isOpen={isCategoryModalOpen}
                onClose={() => setIsCategoryModalOpen(false)}
                categories={categories}
            />
        </div>
    )
}
