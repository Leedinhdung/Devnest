import { Badge } from '@/components/ui/badge'
import { Modal } from '@/components/ui/modal'
import { useGetCategories } from '@/hooks/category'
import { useDeleteCourse, useGetCourses } from '@/hooks/course'
import { CategoryModal } from '@/pages/admin/courses/CategoryModal'
import routes from '@/routes/routes'
import { CourseResponse } from '@/types/course.type'
import {
    BookOpenIcon,
    EditIcon,
    FilterIcon,
    MoreVerticalIcon,
    PlusIcon,
    SearchIcon,
    StarIcon,
    TagIcon,
    TrashIcon,
    UsersIcon,
    VideoIcon
} from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export function CoursesPage() {
    const { data: categories = [] } = useGetCategories()
    const { data: courses = [] } = useGetCourses()
    const deleteCourseAsync = useDeleteCourse()
    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    const [filterStatus, setFilterStatus] = useState<
        'all' | 'draft' | 'published'
    >('all')
    const [filterCategory, setFilterCategory] = useState('all')
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [selectedCourse, setSelectedCourse] = useState<CourseResponse | null>(null)
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)

    const [openMenuId, setOpenMenuId] = useState<string | null>(null)
    const handleDeleteConfirm = (course: CourseResponse) => {
        setSelectedCourse(course)
        setIsDeleteModalOpen(true)
        setOpenMenuId(null)
    }
    const handleDelete = () => {
        if (!selectedCourse) return
        deleteCourseAsync.mutateAsync(selectedCourse.slug)
        setIsDeleteModalOpen(false)
        setSelectedCourse(null)
    }

    const statusBadge = (status: string) => {
        if (status === 'draft') return <Badge variant="warning">Nháp</Badge>
        if (status === 'published') return <Badge variant="success">Đang mở</Badge>
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

                            }}
                            className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none w-full"
                        />
                    </div>
                    <div className="flex gap-2">
                        <select
                            value={filterStatus}
                            onChange={(e) => {
                                setFilterStatus(e.target.value as typeof filterStatus)

                            }}
                            className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-600 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="all">Tất cả trạng thái</option>
                            <option value="active">Đang mở</option>
                            <option value="draft">Nháp</option>
                        </select>
                        <select
                            value={filterCategory}
                            onChange={(e) => {
                                setFilterCategory(e.target.value)

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
                    <Link to={routes.addCourse}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm shadow-indigo-200"
                    >
                        <PlusIcon className="w-4 h-4" /> Thêm khóa học
                    </Link>
                </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500">
                <FilterIcon className="w-4 h-4" />
                <span>
                    Hiển thị{' '}
                    <span className="font-semibold text-slate-700">
                        1
                    </span>{' '}
                    khóa học
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {courses.map((course) => (
                    <div
                        key={course._id}
                        className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                    >
                        <div
                            className={`h-28 bg-gradient-to-br bg-slate-300 flex items-center justify-center relative overflow-hidden`}
                        >
                            {course.thumbnail ? (
                                <img
                                    src={course.thumbnail}
                                    alt={course.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center w-full h-full text-slate-400 text-sm">
                                    No Image
                                </div>
                            )}


                            <div className="absolute top-3 left-3">
                                <span
                                    className={`text-xs font-semibold px-2 py-1 rounded-lg bg-slate-400`}
                                >
                                    Frontend
                                </span>
                            </div>
                            <div className="absolute top-3 right-3">
                                {statusBadge(course.status)}
                            </div>
                            <div className="absolute bottom-3 right-3">
                                <div className="relative">
                                    <button
                                        onClick={() =>
                                            setOpenMenuId(openMenuId === course._id ? null : course._id)
                                        }
                                        className="p-1.5 bg-gray-500/20 hover:bg-gray-500/30 backdrop-blur-sm rounded-lg text-white transition-colors"
                                    >
                                        <MoreVerticalIcon className="w-4 h-4" />
                                    </button>
                                    {openMenuId === course._id && (
                                        <div className="absolute right-8 bottom-2 bg-white rounded-xl shadow-xl border border-slate-100 py-1 w-40 z-10">
                                            {/* <button
                                                onClick={() => handleView(course)}
                                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                                            >
                                                <EyeIcon className="w-4 h-4 text-slate-400" /> Xem chi
                                                tiết
                                            </button> */}
                                            <button
                                                onClick={() => navigate(routes.editCourse.replace(":slug", course.slug))}
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
                                {course.title}
                            </h3>
                            <p className="text-xs text-slate-500 mb-3">
                                👨‍🏫 Lee Đình Dũng
                            </p>
                            <div className="grid grid-cols-3 gap-2 mb-3">
                                <div className="text-center">
                                    <p className="text-xs text-slate-400 flex items-center justify-center gap-1 mb-0.5">
                                        <UsersIcon className="w-3 h-3" />
                                    </p>
                                    <p className="text-sm font-semibold text-slate-700">
                                        {course.total_students}
                                    </p>
                                    <p className="text-xs text-slate-400">Học viên</p>
                                </div>
                                <div className="text-center border-x border-slate-100">
                                    <p className="text-xs text-slate-400 flex items-center justify-center gap-1 mb-0.5">
                                        <StarIcon className="w-3 h-3 fill-amber-400 text-amber-400" />
                                    </p>
                                    <p className="text-sm font-semibold text-slate-700">
                                        {course.rating_avg || '—'}
                                    </p>
                                    <p className="text-xs text-slate-400">Đánh giá</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs text-slate-400 flex items-center justify-center gap-1 mb-0.5">
                                        <VideoIcon className="w-3 h-3" />
                                    </p>
                                    <p className="text-sm font-semibold text-slate-700">
                                        20
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
                                        20m
                                    </p>
                                </div>
                            </div>

                            <Link to={routes.courseLesson.replace(':slug', course.slug)}
                                className="mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-xs font-semibold transition-colors"
                            >
                                <BookOpenIcon className="w-3.5 h-3.5" /> Quản lý bài học
                            </Link>

                        </div>
                    </div>
                ))}
            </div>

            {/* {totalPages > 1 && (
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
            )} */}

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
                        Bạn có chắc chắn muốn xóa khóa học {""}
                        <span className="font-semibold text-slate-900">
                            {selectedCourse?.title}
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
