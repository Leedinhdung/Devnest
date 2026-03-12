import { motion } from 'framer-motion'
import { BarChart2Icon, BookmarkIcon, ClockIcon, UsersIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

import { CategoryBadge } from '@/components/client/category/CategoryBadge'
import { StarRating } from '@/components/client/rating/StarRating'
import { formatPrice } from '@/data/mockData'
import routes from '@/routes/routes'
import { CourseResponse } from '@/types/course.type'
interface CourseCardProps {
    course: CourseResponse
    showProgress?: boolean
    variant?: 'default' | 'horizontal'
}
export function CourseCard({
    course,
    showProgress = false,
    variant = 'default',
}: CourseCardProps) {
    console.log(course.category_id)
    const discount = course.discount_price
        ? Math.round(((course.price - course.discount_price) / course.price) * 100)
        : 0
    if (variant === 'horizontal') {
        return (
            <motion.div
                whileHover={{
                    y: -2,
                }}
                transition={{
                    duration: 0.2,
                }}
            >
                <Link
                    to={routes.courseDetail.replace(':id', course._id)}
                    className="flex gap-4 bg-white rounded-xl border border-gray-100 p-4 hover:shadow-card transition-shadow duration-200 group"
                >
                    <div className="relative flex-shrink-0 w-40 h-28 rounded-lg overflow-hidden">
                        <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* {course.isBestseller && (
                            <span className="absolute top-2 left-2 bg-accent-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                                Bán chạy
                            </span>
                        )} */}
                    </div>
                    <div className="flex-1 min-w-0">
                        <CategoryBadge category={course.category_id?.name ?? "Khác"} size="sm" />
                        <h3 className="font-semibold text-gray-900 mt-1 line-clamp-2 group-hover:text-primary-600 transition-colors">
                            {course.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-0.5">Lee Đình Dũng</p>
                        <StarRating
                            rating={course.rating_avg}
                            // reviewCount={course.reviewCount}
                            size="sm"
                        />
                        {/* {showProgress && course.progress !== undefined && (
                            <div className="mt-2">
                                <ProgressBar progress={course.progress} size="sm" />
                            </div>
                        )} */}
                        <div className="flex items-center gap-3 mt-2">
                            <span className="font-bold text-primary-600">
                                {formatPrice(course.price)}
                            </span>
                            <span className="text-sm text-gray-400 line-through">
                                {formatPrice(course.price)}
                            </span>
                        </div>
                    </div>
                </Link>
            </motion.div>
        )
    }
    return (
        <motion.div
            whileHover={{
                y: -4,
            }}
            transition={{
                duration: 0.2,
            }}
            className="h-full"
        >
            <Link
                to={routes.courseDetail.replace(':id', course._id)}
                className="flex flex-col h-full bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-card-hover transition-shadow duration-300 group"
            >
                {/* Thumbnail */}
                <div className="relative overflow-hidden aspect-video">
                    <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Badges */}
                    {/* <div className="absolute top-3 left-3 flex gap-2">
                        {course.isBestseller && (
                            <span className="bg-accent-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                                🔥 Bán chạy
                            </span>
                        )}
                        {course.isNew && (
                            <span className="bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                                ✨ Mới
                            </span>
                        )}
                    </div> */}

                    {/* Discount badge */}
                    {discount > 0 && (
                        <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            -{discount}%
                        </div>
                    )}

                    {/* Bookmark */}
                    <button
                        className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
                        onClick={(e) => e.preventDefault()}
                        aria-label="Lưu khóa học"
                    >
                        <BookmarkIcon className="w-4 h-4 text-gray-600" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-4">
                    <div className="flex items-center justify-between mb-2">
                        <CategoryBadge category={course.category_id?.name ?? "Khác"} size="sm" />
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                            {course.level}
                        </span>
                    </div>

                    <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors leading-snug mb-1">
                        {course.title}
                    </h3>

                    <p className="text-sm text-gray-500 mb-2">Lee Đình Dũng</p>

                    <StarRating
                        rating={course.rating_avg}
                        // reviewCount={course.reviewCount}
                        size="sm"
                    />

                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                            <UsersIcon className="w-3.5 h-3.5" />
                            {(course.total_students ?? 0).toLocaleString('vi-VN')}
                        </span>
                        <span className="flex items-center gap-1">
                            <ClockIcon className="w-3.5 h-3.5" />
                            {course.total_duration}
                        </span>
                        <span className="flex items-center gap-1">
                            <BarChart2Icon className="w-3.5 h-3.5" />
                            {course.level}
                        </span>
                    </div>

                    {/* {showProgress && course.progress !== undefined && (
                        <div className="mt-3">
                            <ProgressBar
                                progress={course.progress}
                                size="sm"
                                label="Tiến độ"
                            />
                        </div>
                    )} */}

                    <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                            <span className="text-lg font-bold text-primary-600">
                                {formatPrice(course.discount_price ?? course.price)}
                            </span>

                            {course.discount_price && course.price > course.discount_price && (
                                <span className="text-sm text-gray-400 line-through">
                                    {formatPrice(course.price)}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}
