import { CourseCard } from '@/components/client/course/CourseCard'
import { courses } from '@/data/mockData'
import { AnimatePresence, motion } from 'framer-motion'
import {
    BookmarkIcon,
    BookOpenIcon,
    SearchIcon,
    TrashIcon,
    XIcon
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const sortOptions = [
    {
        value: 'newest',
        label: 'Mới nhất',
    },
    {
        value: 'rating',
        label: 'Đánh giá cao nhất',
    },
    {
        value: 'price-asc',
        label: 'Giá thấp → cao',
    },
    {
        value: 'price-desc',
        label: 'Giá cao → thấp',
    },
]
export function FavoritesPage() {
    const initialFavorites = courses.slice(0, 6).map((c) => c.id)
    const [favoriteIds, setFavoriteIds] = useState<string[]>(initialFavorites)
    const [search, setSearch] = useState('')
    const [sortBy, setSortBy] = useState('newest')
    const [removingId, setRemovingId] = useState<string | null>(null)
    const favoriteCourses = courses
        .filter((c) => favoriteIds.includes(c.id))
        .filter(
            (c) =>
                !search ||
                c.title.toLowerCase().includes(search.toLowerCase()) ||
                c.instructor.toLowerCase().includes(search.toLowerCase()),
        )
        .sort((a, b) => {
            switch (sortBy) {
                case 'rating':
                    return b.rating - a.rating
                case 'price-asc':
                    return a.price - b.price
                case 'price-desc':
                    return b.price - a.price
                default:
                    return 0
            }
        })
    const handleRemove = (id: string) => {
        setRemovingId(id)
        setTimeout(() => {
            setFavoriteIds((prev) => prev.filter((fid) => fid !== id))
            setRemovingId(null)
        }, 300)
    }
    const containerVariants = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
            },
        },
    }
    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 20,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
            },
        },
    }
    return (
        <main className="w-full min-h-screen bg-gray-50 pt-16">
            {/* Header */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                                    <BookmarkIcon className="w-5 h-5 text-amber-600 fill-amber-500" />
                                </div>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                                    Khóa học yêu thích
                                </h1>
                            </div>
                            <p className="text-gray-500 mt-1 ml-13">
                                {favoriteIds.length} khóa học đã lưu
                            </p>
                        </div>
                        <Link
                            to="/courses"
                            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
                        >
                            <BookOpenIcon className="w-4 h-4" />
                            Khám phá thêm
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search & Sort */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <div className="relative flex-1">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm trong danh sách yêu thích..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                        />
                        {search && (
                            <button
                                onClick={() => setSearch('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                                <XIcon className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                            </button>
                        )}
                    </div>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-700 min-w-[160px]"
                    >
                        {sortOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Results count */}
                <p className="text-sm text-gray-500 mb-4">
                    Hiển thị{' '}
                    <span className="font-semibold text-gray-900">
                        {favoriteCourses.length}
                    </span>{' '}
                    khóa học
                </p>

                {/* Empty state */}
                {favoriteCourses.length === 0 ? (
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        className="text-center py-20 bg-white rounded-2xl border border-gray-100"
                    >
                        <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <BookmarkIcon className="w-10 h-10 text-amber-300" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {search
                                ? 'Không tìm thấy khóa học'
                                : 'Chưa có khóa học yêu thích'}
                        </h3>
                        <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                            {search
                                ? 'Thử tìm kiếm với từ khóa khác'
                                : 'Lưu các khóa học bạn quan tâm để xem lại sau. Nhấn vào biểu tượng bookmark trên mỗi khóa học để lưu.'}
                        </p>
                        <Link
                            to="/courses"
                            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                        >
                            <BookOpenIcon className="w-4 h-4" />
                            Khám phá khóa học
                        </Link>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        <AnimatePresence>
                            {favoriteCourses.map((course) => (
                                <motion.div
                                    key={course.id}
                                    variants={itemVariants}
                                    animate={
                                        removingId === course.id
                                            ? {
                                                opacity: 0,
                                                scale: 0.9,
                                            }
                                            : {
                                                opacity: 1,
                                                scale: 1,
                                            }
                                    }
                                    transition={{
                                        duration: 0.3,
                                    }}
                                    className="relative group"
                                >
                                    {/* Bookmark badge */}
                                    <div className="absolute top-3 left-3 z-10 w-7 h-7 bg-amber-500 rounded-full flex items-center justify-center shadow-md">
                                        <BookmarkIcon className="w-3.5 h-3.5 text-white fill-white" />
                                    </div>

                                    {/* Remove button - shows on hover */}
                                    <button
                                        onClick={() => handleRemove(course.id)}
                                        className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-50 hover:text-red-500 text-gray-500"
                                        title="Xóa khỏi danh sách yêu thích"
                                    >
                                        <TrashIcon className="w-3.5 h-3.5" />
                                    </button>

                                    <CourseCard course={course} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}

                {/* Tips banner */}
                {favoriteCourses.length > 0 && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}
                        viewport={{
                            once: true,
                        }}
                        className="mt-10 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-100 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                    >
                        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                            <BookmarkIcon className="w-6 h-6 text-amber-600" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-gray-900 mb-1">
                                Đừng để khóa học chờ quá lâu!
                            </h3>
                            <p className="text-sm text-gray-600">
                                Bạn có {favoriteCourses.length} khóa học đang chờ. Bắt đầu học
                                ngay hôm nay để không bỏ lỡ ưu đãi giảm giá.
                            </p>
                        </div>
                        <Link
                            to="/courses"
                            className="flex-shrink-0 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
                        >
                            Mua ngay
                        </Link>
                    </motion.div>
                )}
            </div>
        </main>
    )
}
