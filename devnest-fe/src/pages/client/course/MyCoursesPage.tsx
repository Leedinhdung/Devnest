import React, { useState, Children } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    PlayCircleIcon,
    SearchIcon,
    BookOpenIcon,
    CheckCircleIcon,
    ClockIcon,
    AwardIcon,
    TrendingUpIcon,
    XIcon,
} from 'lucide-react'
import { courses } from '@/data/mockData'
import { ProgressBar } from '@/components/client/progressbar/ProgressBar'
import { StarRating } from '@/components/client/rating/StarRating'
import { CategoryBadge } from '@/components/client/category/CategoryBadge'

const filterOptions = ['Tất cả', 'Đang học', 'Hoàn thành', 'Chưa bắt đầu']
const containerVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.07,
        },
    },
}
const itemVariants = {
    hidden: {
        opacity: 0,
        y: 16,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
        },
    },
}
export function MyCoursesPage() {
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('Tất cả')
    const purchasedCourses = courses.filter((c) => c.isPurchased)
    const filtered = purchasedCourses.filter((c) => {
        const matchSearch =
            !search ||
            c.title.toLowerCase().includes(search.toLowerCase()) ||
            c.instructor.toLowerCase().includes(search.toLowerCase())
        const progress = c.progress || 0
        const matchFilter =
            filter === 'Tất cả' ||
            (filter === 'Đang học' && progress > 0 && progress < 100) ||
            (filter === 'Hoàn thành' && progress >= 100) ||
            (filter === 'Chưa bắt đầu' && progress === 0)
        return matchSearch && matchFilter
    })
    const totalProgress = purchasedCourses.reduce(
        (acc, c) => acc + (c.progress || 0),
        0,
    )
    const avgProgress =
        purchasedCourses.length > 0
            ? Math.round(totalProgress / purchasedCourses.length)
            : 0
    const completedCount = purchasedCourses.filter(
        (c) => (c.progress || 0) >= 100,
    ).length
    const inProgressCount = purchasedCourses.filter(
        (c) => (c.progress || 0) > 0 && (c.progress || 0) < 100,
    ).length
    const notStartedCount = purchasedCourses.filter(
        (c) => (c.progress || 0) === 0,
    ).length
    return (
        <main className="w-full min-h-screen bg-gray-50 pt-16">
            {/* Header */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                                Khóa học của tôi
                            </h1>
                            <p className="text-gray-500 mt-1">
                                {purchasedCourses.length} khóa học · {completedCount} đã hoàn
                                thành
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
                {/* Stats */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
                >
                    {[
                        {
                            icon: BookOpenIcon,
                            value: purchasedCourses.length,
                            label: 'Tổng khóa học',
                            color: 'text-primary-600',
                            bg: 'bg-primary-50',
                        },
                        {
                            icon: TrendingUpIcon,
                            value: inProgressCount,
                            label: 'Đang học',
                            color: 'text-blue-600',
                            bg: 'bg-blue-50',
                        },
                        {
                            icon: CheckCircleIcon,
                            value: completedCount,
                            label: 'Hoàn thành',
                            color: 'text-emerald-600',
                            bg: 'bg-emerald-50',
                        },
                        {
                            icon: AwardIcon,
                            value: completedCount,
                            label: 'Chứng chỉ',
                            color: 'text-amber-600',
                            bg: 'bg-amber-50',
                        },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-3"
                        >
                            <div
                                className={`w-11 h-11 ${stat.bg} rounded-xl flex items-center justify-center flex-shrink-0`}
                            >
                                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                            </div>
                            <div>
                                <div className={`text-2xl font-bold ${stat.color}`}>
                                    {stat.value}
                                </div>
                                <div className="text-xs text-gray-500">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Overall progress */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        delay: 0.1,
                    }}
                    className="bg-white rounded-2xl border border-gray-100 p-5 mb-6"
                >
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-gray-900">Tiến độ tổng thể</h3>
                        <span className="text-2xl font-bold text-primary-600">
                            {avgProgress}%
                        </span>
                    </div>
                    <ProgressBar
                        progress={avgProgress}
                        showLabel={false}
                        size="lg"
                        color="primary"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                        Bạn đã hoàn thành trung bình {avgProgress}% các khóa học đã đăng ký
                    </p>
                </motion.div>

                {/* Search & Filter */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <div className="relative flex-1">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm khóa học..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-9 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                        />
                        {search && (
                            <button
                                onClick={() => setSearch('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <XIcon className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                    <div className="flex gap-2 overflow-x-auto">
                        {filterOptions.map((opt) => (
                            <button
                                key={opt}
                                onClick={() => setFilter(opt)}
                                className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${filter === opt ? 'bg-primary-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Course list */}
                {filtered.length === 0 ? (
                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        className="text-center py-16 bg-white rounded-2xl border border-gray-100"
                    >
                        <BookOpenIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Không tìm thấy khóa học
                        </h3>
                        <p className="text-gray-500 mb-4">
                            {search
                                ? 'Thử tìm kiếm với từ khóa khác'
                                : 'Bạn chưa có khóa học nào trong danh mục này'}
                        </p>
                        <Link
                            to="/courses"
                            className="text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                        >
                            Khám phá khóa học →
                        </Link>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-4"
                    >
                        {filtered.map((course) => {
                            const progress = course.progress || 0
                            const isCompleted = progress >= 100
                            const isNotStarted = progress === 0
                            return (
                                <motion.div
                                    key={course.id}
                                    variants={itemVariants}
                                    className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-card transition-shadow duration-200"
                                >
                                    <div className="flex flex-col sm:flex-row">
                                        {/* Thumbnail */}
                                        <div className="relative sm:w-52 flex-shrink-0">
                                            <img
                                                src={course.thumbnail}
                                                alt={course.title}
                                                className="w-full h-36 sm:h-full object-cover"
                                            />
                                            {isCompleted && (
                                                <div className="absolute inset-0 bg-emerald-900/60 flex items-center justify-center">
                                                    <div className="text-center">
                                                        <CheckCircleIcon className="w-10 h-10 text-emerald-400 mx-auto mb-1" />
                                                        <span className="text-white text-xs font-semibold">
                                                            Hoàn thành
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 p-5">
                                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                                        <CategoryBadge
                                                            category={course.category}
                                                            size="sm"
                                                        />
                                                        {isCompleted && (
                                                            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                                                ✓ Hoàn thành
                                                            </span>
                                                        )}
                                                        {isNotStarted && (
                                                            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                                                                Chưa bắt đầu
                                                            </span>
                                                        )}
                                                    </div>
                                                    <h3 className="font-bold text-gray-900 mb-1 line-clamp-2 text-base">
                                                        {course.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 mb-2">
                                                        {course.instructor}
                                                    </p>
                                                    <StarRating
                                                        rating={course.rating}
                                                        reviewCount={course.reviewCount}
                                                        size="sm"
                                                    />
                                                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                                        <span className="flex items-center gap-1">
                                                            <ClockIcon className="w-3.5 h-3.5" />
                                                            {course.duration}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <BookOpenIcon className="w-3.5 h-3.5" />
                                                            {course.curriculum.reduce(
                                                                (acc, ch) => acc + ch.lessons.length,
                                                                0,
                                                            )}{' '}
                                                            bài học
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3 flex-shrink-0">
                                                    <Link
                                                        to={`/learn/${course.id}`}
                                                        className={`flex items-center gap-2 font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm ${isCompleted ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-primary-600 text-white hover:bg-primary-700'}`}
                                                    >
                                                        <PlayCircleIcon className="w-4 h-4" />
                                                        {isCompleted
                                                            ? 'Xem lại'
                                                            : isNotStarted
                                                                ? 'Bắt đầu'
                                                                : 'Tiếp tục'}
                                                    </Link>
                                                    {isCompleted && (
                                                        <button className="flex items-center gap-1.5 text-sm text-amber-600 font-medium hover:text-amber-700 transition-colors">
                                                            <AwardIcon className="w-4 h-4" />
                                                            Chứng chỉ
                                                        </button>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Progress */}
                                            <div className="mt-4">
                                                <ProgressBar
                                                    progress={progress}
                                                    size="sm"
                                                    color={isCompleted ? 'green' : 'primary'}
                                                    label={
                                                        isCompleted
                                                            ? 'Đã hoàn thành'
                                                            : isNotStarted
                                                                ? 'Chưa bắt đầu'
                                                                : `${progress}% hoàn thành`
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </motion.div>
                )}

                {/* Recommended section */}
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
                    className="mt-10"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-900">
                            Có thể bạn sẽ thích
                        </h2>
                        <Link
                            to="/courses"
                            className="text-sm text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                        >
                            Xem tất cả →
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {courses
                            .filter((c) => !c.isPurchased)
                            .slice(0, 3)
                            .map((course) => (
                                <Link
                                    key={course.id}
                                    to={`/courses/${course.id}`}
                                    className="flex gap-3 bg-white rounded-xl border border-gray-100 p-3 hover:shadow-card transition-shadow group"
                                >
                                    <img
                                        src={course.thumbnail}
                                        alt={course.title}
                                        className="w-20 h-14 rounded-lg object-cover flex-shrink-0"
                                    />
                                    <div className="min-w-0">
                                        <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
                                            {course.title}
                                        </h4>
                                        <p className="text-xs text-gray-500 mt-0.5">
                                            {course.instructor}
                                        </p>
                                        <StarRating
                                            rating={course.rating}
                                            showCount={false}
                                            size="sm"
                                        />
                                    </div>
                                </Link>
                            ))}
                    </div>
                </motion.div>
            </div>
        </main>
    )
}
