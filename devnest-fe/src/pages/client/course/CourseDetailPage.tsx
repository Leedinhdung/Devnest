import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    PlayCircleIcon,
    ClockIcon,
    UsersIcon,
    BarChart2Icon,
    GlobeIcon,
    CheckCircleIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    StarIcon,
    ShoppingCartIcon,
    BookmarkIcon,
    ShareIcon,
    FileTextIcon,
    HelpCircleIcon,
    LockIcon,
    ChevronRightIcon,
    MonitorIcon,
    InfinityIcon,
    AwardIcon,
    SmartphoneIcon,
    ThumbsUpIcon,
} from 'lucide-react'
import { courses, formatPrice } from '@/data/mockData'
import { StarRating } from '@/components/client/rating/StarRating'
import { CategoryBadge } from '@/components/client/category/CategoryBadge'
import { CourseCard } from '@/components/client/course/CourseCard'
import routes from '@/routes/routes'
export function CourseDetailPage() {
    const { id } = useParams<{
        id: string
    }>()
    const [expandedChapters, setExpandedChapters] = useState<Set<string>>(
        new Set(['c1']),
    )
    const [activeTab, setActiveTab] = useState<
        'overview' | 'curriculum' | 'instructor' | 'reviews'
    >('overview')
    const course = courses.find((c) => c.id === id) || courses[0]
    const relatedCourses = courses
        .filter((c) => c.category === course.category && c.id !== course.id)
        .slice(0, 3)
    const totalLessons = course.curriculum.reduce(
        (acc, ch) => acc + ch.lessons.length,
        0,
    )
    const discount = Math.round(
        ((course.originalPrice - course.price) / course.originalPrice) * 100,
    )
    const toggleChapter = (chapterId: string) => {
        setExpandedChapters((prev) => {
            const next = new Set(prev)
            if (next.has(chapterId)) next.delete(chapterId)
            else next.add(chapterId)
            return next
        })
    }
    const tabs = [
        {
            id: 'overview',
            label: 'Tổng quan',
        },
        {
            id: 'curriculum',
            label: 'Nội dung',
        },
        {
            id: 'instructor',
            label: 'Giảng viên',
        },
        {
            id: 'reviews',
            label: 'Đánh giá',
        },
    ] as const
    return (
        <main className="w-full min-h-screen bg-gray-50 pt-16">
            {/* Hero */}
            <div className="bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-gray-400 mb-5">
                        <Link to="/" className="hover:text-white transition-colors">
                            Trang chủ
                        </Link>
                        <ChevronRightIcon className="w-4 h-4" />
                        <Link to="/courses" className="hover:text-white transition-colors">
                            Khóa học
                        </Link>
                        <ChevronRightIcon className="w-4 h-4" />
                        <span className="text-gray-300 line-clamp-1">{course.title}</span>
                    </nav>

                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <CategoryBadge category={course.category} size="md" />
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mt-3 mb-4 leading-tight">
                                {course.title}
                            </h1>
                            <p className="text-gray-300 mb-5 leading-relaxed text-lg">
                                {course.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-4 mb-5">
                                {course.isBestseller && (
                                    <span className="bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                        🔥 Bán chạy nhất
                                    </span>
                                )}
                                {course.isNew && (
                                    <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                        ✨ Mới
                                    </span>
                                )}
                                <StarRating
                                    rating={course.rating}
                                    reviewCount={course.reviewCount}
                                    size="md"
                                />
                                <span className="text-gray-300 text-sm flex items-center gap-1.5">
                                    <UsersIcon className="w-4 h-4" />
                                    {course.studentCount.toLocaleString('vi-VN')} học viên
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-5 text-sm text-gray-300 mb-5">
                                <span className="flex items-center gap-1.5">
                                    <ClockIcon className="w-4 h-4 text-gray-400" />
                                    {course.duration}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <BarChart2Icon className="w-4 h-4 text-gray-400" />
                                    {course.level}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <GlobeIcon className="w-4 h-4 text-gray-400" />
                                    {course.language}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <FileTextIcon className="w-4 h-4 text-gray-400" />
                                    Cập nhật {course.lastUpdated}
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <img
                                    src={course.instructorAvatar}
                                    alt={course.instructor}
                                    className="w-9 h-9 rounded-full object-cover ring-2 ring-primary-400"
                                />
                                <span className="text-sm text-gray-300">
                                    Giảng viên:{' '}
                                    <button
                                        onClick={() => setActiveTab('instructor')}
                                        className="text-primary-400 font-semibold hover:text-primary-300 transition-colors"
                                    >
                                        {course.instructor}
                                    </button>
                                </span>
                            </div>
                        </div>

                        {/* Sidebar placeholder for desktop layout spacing */}
                        <div className="hidden lg:block" />
                    </div>
                </div>
            </div>

            {/* Mobile sticky buy bar */}
            <div className="lg:hidden sticky top-16 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
                <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-gray-900">
                        {formatPrice(course.price)}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                        {formatPrice(course.originalPrice)}
                    </span>
                    <span className="text-xs font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">
                        -{discount}%
                    </span>
                </div>
                {course.isPurchased ? (
                    <Link
                        to={`/learn/${course.id}`}
                        className="bg-primary-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-primary-700 transition-colors"
                    >
                        Tiếp tục học
                    </Link>
                ) : (
                    <Link to={routes.buyCourse.replace(':id', course.id)} className="bg-accent-500 text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-accent-600 transition-colors">
                        Mua ngay
                    </Link>
                )}
            </div>

            {/* Main content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left: tabs + content */}
                    <div className="lg:col-span-2 order-2 lg:order-1">
                        {/* Tabs */}
                        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 overflow-x-auto">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex-1 min-w-max py-2 px-4 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 10,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.3,
                                }}
                                className="space-y-6"
                            >
                                {/* What you'll learn */}
                                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                                        Bạn sẽ học được gì?
                                    </h2>
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        {course.objectives.map((obj, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <CheckCircleIcon className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-700 text-sm leading-relaxed">
                                                    {obj}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Requirements */}
                                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                                        Yêu cầu
                                    </h2>
                                    <ul className="space-y-2.5">
                                        {course.requirements.map((req, i) => (
                                            <li
                                                key={i}
                                                className="flex items-start gap-3 text-sm text-gray-700"
                                            >
                                                <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                                                {req}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Tags */}
                                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">Tags</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {course.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1.5 bg-gray-100 hover:bg-primary-50 hover:text-primary-700 text-gray-700 rounded-lg text-sm font-medium cursor-pointer transition-colors"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Curriculum Tab */}
                        {activeTab === 'curriculum' && (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 10,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.3,
                                }}
                            >
                                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                                    <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900">
                                                Nội dung khóa học
                                            </h2>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {course.curriculum.length} chương · {totalLessons} bài
                                                học · {course.duration}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                const allIds = new Set(
                                                    course.curriculum.map((c) => c.id),
                                                )
                                                setExpandedChapters(
                                                    expandedChapters.size === allIds.size
                                                        ? new Set()
                                                        : allIds,
                                                )
                                            }}
                                            className="text-sm text-primary-600 font-medium hover:text-primary-700 transition-colors"
                                        >
                                            {expandedChapters.size === course.curriculum.length
                                                ? 'Thu gọn tất cả'
                                                : 'Mở rộng tất cả'}
                                        </button>
                                    </div>

                                    {course.curriculum.map((chapter, ci) => (
                                        <div
                                            key={chapter.id}
                                            className="border-b border-gray-50 last:border-0"
                                        >
                                            <button
                                                onClick={() => toggleChapter(chapter.id)}
                                                className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors text-left"
                                            >
                                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                                    {expandedChapters.has(chapter.id) ? (
                                                        <ChevronUpIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                                    ) : (
                                                        <ChevronDownIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                                    )}
                                                    <div className="min-w-0">
                                                        <span className="font-semibold text-gray-900 block">
                                                            Chương {ci + 1}: {chapter.title}
                                                        </span>
                                                    </div>
                                                </div>
                                                <span className="text-sm text-gray-500 flex-shrink-0 ml-3">
                                                    {chapter.lessons.length} bài
                                                </span>
                                            </button>

                                            {expandedChapters.has(chapter.id) && (
                                                <motion.div
                                                    initial={{
                                                        opacity: 0,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                    }}
                                                    transition={{
                                                        duration: 0.2,
                                                    }}
                                                >
                                                    {chapter.lessons.map((lesson) => (
                                                        <div
                                                            key={lesson.id}
                                                            className="flex items-center gap-3 px-5 py-3 bg-gray-50/60 border-t border-gray-50 hover:bg-gray-50 transition-colors"
                                                        >
                                                            <div className="flex-shrink-0">
                                                                {lesson.type === 'video' ? (
                                                                    <PlayCircleIcon
                                                                        className={`w-4 h-4 ${lesson.isPreview ? 'text-primary-500' : 'text-gray-400'}`}
                                                                    />
                                                                ) : lesson.type === 'quiz' ? (
                                                                    <HelpCircleIcon className="w-4 h-4 text-amber-500" />
                                                                ) : (
                                                                    <FileTextIcon className="w-4 h-4 text-gray-400" />
                                                                )}
                                                            </div>
                                                            <span
                                                                className={`flex-1 text-sm ${lesson.isCompleted ? 'text-gray-400 line-through' : 'text-gray-700'}`}
                                                            >
                                                                {lesson.title}
                                                            </span>
                                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                                {lesson.isCompleted && (
                                                                    <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
                                                                )}
                                                                {lesson.isPreview && !lesson.isCompleted && (
                                                                    <span className="text-xs text-primary-600 font-medium bg-primary-50 px-2 py-0.5 rounded-full">
                                                                        Xem trước
                                                                    </span>
                                                                )}
                                                                {!lesson.isPreview && !course.isPurchased && (
                                                                    <LockIcon className="w-3.5 h-3.5 text-gray-400" />
                                                                )}
                                                                <span className="text-xs text-gray-400">
                                                                    {lesson.duration}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Instructor Tab */}
                        {activeTab === 'instructor' && (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 10,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.3,
                                }}
                            >
                                <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
                                    <div className="flex flex-col sm:flex-row items-start gap-5 mb-6">
                                        <img
                                            src={course.instructorAvatar}
                                            alt={course.instructor}
                                            className="w-24 h-24 rounded-2xl object-cover flex-shrink-0 shadow-md"
                                        />
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900">
                                                {course.instructor}
                                            </h2>
                                            <p className="text-primary-600 font-medium mb-3">
                                                Giảng viên cao cấp · {course.category}
                                            </p>
                                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                                <span className="flex items-center gap-1.5">
                                                    <StarIcon className="w-4 h-4 text-amber-400 fill-current" />
                                                    <span className="font-semibold">{course.rating}</span>{' '}
                                                    đánh giá trung bình
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <UsersIcon className="w-4 h-4 text-gray-400" />
                                                    <span className="font-semibold">
                                                        {course.studentCount.toLocaleString('vi-VN')}
                                                    </span>{' '}
                                                    học viên
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <PlayCircleIcon className="w-4 h-4 text-gray-400" />
                                                    <span className="font-semibold">
                                                        {course.curriculum.length}
                                                    </span>{' '}
                                                    khóa học
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed text-base">
                                        {course.instructorBio}
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        {/* Reviews Tab */}
                        {activeTab === 'reviews' && (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 10,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.3,
                                }}
                                className="space-y-4"
                            >
                                {/* Rating summary */}
                                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-5">
                                        Đánh giá học viên
                                    </h2>
                                    <div className="flex flex-col sm:flex-row items-center gap-8">
                                        <div className="text-center flex-shrink-0">
                                            <div className="text-6xl font-bold text-gray-900 leading-none">
                                                {course.rating}
                                            </div>
                                            <div className="flex justify-center mt-2 mb-1">
                                                {[1, 2, 3, 4, 5].map((i) => (
                                                    <StarIcon
                                                        key={i}
                                                        className="w-5 h-5 text-amber-400 fill-current"
                                                    />
                                                ))}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Đánh giá khóa học
                                            </div>
                                        </div>
                                        <div className="flex-1 w-full space-y-2">
                                            {[
                                                {
                                                    stars: 5,
                                                    pct: 72,
                                                },
                                                {
                                                    stars: 4,
                                                    pct: 18,
                                                },
                                                {
                                                    stars: 3,
                                                    pct: 6,
                                                },
                                                {
                                                    stars: 2,
                                                    pct: 2,
                                                },
                                                {
                                                    stars: 1,
                                                    pct: 2,
                                                },
                                            ].map(({ stars, pct }) => (
                                                <div key={stars} className="flex items-center gap-3">
                                                    <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                                                        <div
                                                            className="h-full bg-amber-400 rounded-full transition-all duration-700"
                                                            style={{
                                                                width: `${pct}%`,
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="flex items-center gap-0.5 w-20 justify-end flex-shrink-0">
                                                        {[...Array(stars)].map((_, j) => (
                                                            <StarIcon
                                                                key={j}
                                                                className="w-3 h-3 text-amber-400 fill-current"
                                                            />
                                                        ))}
                                                        <span className="text-xs text-gray-500 ml-1">
                                                            {pct}%
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Sample reviews */}
                                <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
                                    {[
                                        {
                                            name: 'Nguyễn Thị Hương',
                                            avatar: 'https://picsum.photos/seed/rev1/50/50',
                                            rating: 5,
                                            date: '12/11/2024',
                                            comment:
                                                'Khóa học rất hay và chi tiết. Giảng viên giải thích rõ ràng, dễ hiểu. Tôi đã học được rất nhiều kiến thức mới và áp dụng được vào công việc ngay sau khi hoàn thành.',
                                        },
                                        {
                                            name: 'Trần Văn Đức',
                                            avatar: 'https://picsum.photos/seed/rev2/50/50',
                                            rating: 5,
                                            date: '08/11/2024',
                                            comment:
                                                'Nội dung phong phú, cập nhật mới nhất. Bài tập thực hành rất bổ ích. Sẽ giới thiệu cho bạn bè và đồng nghiệp!',
                                        },
                                        {
                                            name: 'Lê Thị Mai',
                                            avatar: 'https://picsum.photos/seed/rev3/50/50',
                                            rating: 4,
                                            date: '01/11/2024',
                                            comment:
                                                'Khóa học tốt, giảng viên nhiệt tình. Chỉ tiếc là một số phần hơi nhanh, cần xem lại nhiều lần mới hiểu hết.',
                                        },
                                    ].map((review, i) => (
                                        <div
                                            key={i}
                                            className={i > 0 ? 'border-t border-gray-100 pt-6' : ''}
                                        >
                                            <div className="flex items-start gap-3">
                                                <img
                                                    src={review.avatar}
                                                    alt={review.name}
                                                    className="w-11 h-11 rounded-full object-cover flex-shrink-0"
                                                />
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="font-semibold text-gray-900">
                                                            {review.name}
                                                        </span>
                                                        <span className="text-xs text-gray-400">
                                                            {review.date}
                                                        </span>
                                                    </div>
                                                    <div className="flex mb-2">
                                                        {[...Array(review.rating)].map((_, j) => (
                                                            <StarIcon
                                                                key={j}
                                                                className="w-4 h-4 text-amber-400 fill-current"
                                                            />
                                                        ))}
                                                    </div>
                                                    <p className="text-sm text-gray-700 leading-relaxed">
                                                        {review.comment}
                                                    </p>
                                                    <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 mt-2 transition-colors">
                                                        <ThumbsUpIcon className="w-3.5 h-3.5" /> Hữu ích
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Related courses */}
                        {relatedCourses.length > 0 && (
                            <div className="mt-8">
                                <h3 className="font-bold text-gray-900 text-xl mb-4">
                                    Khóa học liên quan
                                </h3>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {relatedCourses.map((c) => (
                                        <CourseCard key={c.id} course={c} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sticky Sidebar */}
                    <div className="order-1 lg:order-2">
                        <div className="lg:sticky lg:top-20">
                            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                                {/* Thumbnail with play button */}
                                <div className="relative aspect-video group cursor-pointer">
                                    <img
                                        src={course.thumbnail}
                                        alt={course.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                            <PlayCircleIcon className="w-8 h-8 text-primary-600" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-2.5 py-1 rounded-full">
                                        Xem trước miễn phí
                                    </div>
                                </div>

                                <div className="p-5">
                                    {/* Price */}
                                    <div className="flex items-baseline gap-3 mb-1">
                                        <span className="text-3xl font-bold text-gray-900">
                                            {formatPrice(course.price)}
                                        </span>
                                        <span className="text-lg text-gray-400 line-through">
                                            {formatPrice(course.originalPrice)}
                                        </span>
                                        <span className="text-sm font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                                            -{discount}%
                                        </span>
                                    </div>
                                    <p className="text-xs text-red-500 font-semibold mb-4 flex items-center gap-1">
                                        ⏰ Ưu đãi kết thúc trong 2 ngày!
                                    </p>

                                    {/* CTA Buttons */}
                                    {course.isPurchased ? (
                                        <Link
                                            to={`/learn/${course.id}`}
                                            className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 rounded-xl transition-colors mb-3 text-base"
                                        >
                                            <PlayCircleIcon className="w-5 h-5" />
                                            Tiếp tục học
                                        </Link>
                                    ) : (
                                        <>
                                            <Link to={routes.buyCourse.replace(":id", course.id)} className="w-full flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-bold py-3.5 rounded-xl transition-colors mb-3 text-base">
                                                <ShoppingCartIcon className="w-5 h-5" />
                                                Mua ngay
                                            </Link>
                                            <button className="w-full flex items-center justify-center gap-2 bg-white border-2 border-primary-600 text-primary-600 font-bold py-3 rounded-xl hover:bg-primary-50 transition-colors mb-3">
                                                Thêm vào giỏ hàng
                                            </button>
                                        </>
                                    )}

                                    {/* Secondary actions */}
                                    <div className="flex gap-2 mb-4">
                                        <button className="flex-1 flex items-center justify-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                            <BookmarkIcon className="w-4 h-4" /> Lưu
                                        </button>
                                        <button className="flex-1 flex items-center justify-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                            <ShareIcon className="w-4 h-4" /> Chia sẻ
                                        </button>
                                    </div>

                                    <p className="text-xs text-center text-gray-500 mb-4">
                                        🔒 Đảm bảo hoàn tiền trong 30 ngày
                                    </p>

                                    {/* Course includes */}
                                    <div className="space-y-2.5">
                                        <p className="font-semibold text-gray-900 text-sm mb-3">
                                            Khóa học bao gồm:
                                        </p>
                                        {[
                                            {
                                                icon: ClockIcon,
                                                text: `${course.duration} video bài giảng`,
                                            },
                                            {
                                                icon: FileTextIcon,
                                                text: `${totalLessons} bài học`,
                                            },
                                            {
                                                icon: InfinityIcon,
                                                text: 'Truy cập trọn đời',
                                            },
                                            {
                                                icon: SmartphoneIcon,
                                                text: 'Học trên mọi thiết bị',
                                            },
                                            {
                                                icon: MonitorIcon,
                                                text: 'Tài nguyên có thể tải về',
                                            },
                                            {
                                                icon: AwardIcon,
                                                text: 'Chứng chỉ hoàn thành',
                                            },
                                        ].map(({ icon: Icon, text }) => (
                                            <div
                                                key={text}
                                                className="flex items-center gap-2.5 text-sm text-gray-700"
                                            >
                                                <Icon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                                <span>{text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
