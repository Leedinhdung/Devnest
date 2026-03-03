import { ProgressBar } from '@/components/client/progressbar/ProgressBar'
import { courses, userProfile } from '@/data/mockData'
import { motion } from 'framer-motion'
import {
    AwardIcon,
    BookOpenIcon,
    CameraIcon,
    CheckCircleIcon,
    ClockIcon,
    EditIcon,
    FlameIcon,
    GithubIcon,
    LinkedinIcon,
    TrendingUpIcon,
    TwitterIcon,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const containerVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
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
export function ProfilePage() {
    const [activeTab, setActiveTab] = useState<
        'courses' | 'certificates' | 'activity'
    >('courses')
    const purchasedCourses = courses.filter((c) => c.isPurchased)
    const tabs = [
        {
            id: 'courses',
            label: 'Khóa học đang học',
        },
        {
            id: 'certificates',
            label: 'Chứng chỉ',
        },
        {
            id: 'activity',
            label: 'Hoạt động',
        },
    ] as const
    return (
        <main className="w-full min-h-screen bg-gray-50 pt-16">
            {/* Cover & Avatar */}
            <div className="relative">
                <div className="h-48 md:h-64 bg-gradient-to-r from-primary-600 via-primary-700 to-indigo-800 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-10 left-20 w-40 h-40 bg-white rounded-full blur-3xl" />
                        <div className="absolute bottom-10 right-20 w-60 h-60 bg-accent-400 rounded-full blur-3xl" />
                    </div>
                </div>

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-16 sm:-mt-12 mb-6 relative z-10">
                        <div className="relative">
                            <img
                                src={userProfile.avatar}
                                alt={userProfile.name}
                                className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl border-4 border-white shadow-xl object-cover"
                            />
                            <button className="absolute bottom-1 right-1 w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center shadow-md hover:bg-primary-700 transition-colors">
                                <CameraIcon className="w-4 h-4 text-white" />
                            </button>
                        </div>

                        <div className="flex-1 pb-2">
                            <h1 className="text-2xl font-bold text-gray-900">
                                {userProfile.name}
                            </h1>
                            <p className="text-gray-500 text-sm">{userProfile.email}</p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="inline-flex items-center gap-1 bg-primary-100 text-primary-700 text-xs font-medium px-2.5 py-1 rounded-full">
                                    <TrendingUpIcon className="w-3 h-3" />
                                    {userProfile.level}
                                </span>
                                <span className="text-sm text-gray-500">
                                    Tham gia từ {userProfile.joinDate}
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white text-sm font-semibold rounded-xl hover:bg-primary-700 transition-colors">
                                <EditIcon className="w-4 h-4" />
                                Chỉnh sửa
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Left sidebar */}
                    <div className="space-y-5">
                        {/* Bio */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            className="bg-white rounded-2xl border border-gray-100 p-5"
                        >
                            <h3 className="font-bold text-gray-900 mb-3">Giới thiệu</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {userProfile.bio}
                            </p>

                            <div className="flex gap-3 mt-4">
                                <a
                                    href="#"
                                    className="p-2 bg-gray-100 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-colors text-gray-500"
                                >
                                    <LinkedinIcon className="w-4 h-4" />
                                </a>
                                <a
                                    href="#"
                                    className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-gray-500"
                                >
                                    <GithubIcon className="w-4 h-4" />
                                </a>
                                <a
                                    href="#"
                                    className="p-2 bg-gray-100 rounded-lg hover:bg-sky-100 hover:text-sky-500 transition-colors text-gray-500"
                                >
                                    <TwitterIcon className="w-4 h-4" />
                                </a>
                            </div>
                        </motion.div>

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
                            transition={{
                                delay: 0.1,
                            }}
                            className="bg-white rounded-2xl border border-gray-100 p-5"
                        >
                            <h3 className="font-bold text-gray-900 mb-4">Thống kê</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    {
                                        icon: BookOpenIcon,
                                        value: userProfile.totalCourses,
                                        label: 'Khóa học',
                                        color: 'text-primary-600',
                                        bg: 'bg-primary-50',
                                    },
                                    {
                                        icon: CheckCircleIcon,
                                        value: userProfile.completedCourses,
                                        label: 'Hoàn thành',
                                        color: 'text-emerald-600',
                                        bg: 'bg-emerald-50',
                                    },
                                    {
                                        icon: AwardIcon,
                                        value: userProfile.certificates,
                                        label: 'Chứng chỉ',
                                        color: 'text-amber-600',
                                        bg: 'bg-amber-50',
                                    },
                                    {
                                        icon: ClockIcon,
                                        value: `${userProfile.totalHours}h`,
                                        label: 'Giờ học',
                                        color: 'text-purple-600',
                                        bg: 'bg-purple-50',
                                    },
                                ].map((stat) => (
                                    <div
                                        key={stat.label}
                                        className={`${stat.bg} rounded-xl p-3 text-center`}
                                    >
                                        <stat.icon
                                            className={`w-5 h-5 ${stat.color} mx-auto mb-1`}
                                        />
                                        <div className={`text-xl font-bold ${stat.color}`}>
                                            {stat.value}
                                        </div>
                                        <div className="text-xs text-gray-500">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Streak */}
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
                                delay: 0.2,
                            }}
                            className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border border-orange-100 p-5"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                                    <FlameIcon className="w-5 h-5 text-orange-500" />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 text-lg">
                                        {userProfile.streak} ngày
                                    </p>
                                    <p className="text-xs text-gray-500">Chuỗi học liên tiếp</p>
                                </div>
                            </div>
                            <div className="flex gap-1">
                                {Array.from(
                                    {
                                        length: 7,
                                    },
                                    (_, i) => (
                                        <div
                                            key={i}
                                            className={`flex-1 h-2 rounded-full ${i < userProfile.streak % 7 ? 'bg-orange-400' : 'bg-orange-100'}`}
                                        />
                                    ),
                                )}
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                Tiếp tục học để duy trì chuỗi!
                            </p>
                        </motion.div>

                        {/* Skills */}
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
                                delay: 0.3,
                            }}
                            className="bg-white rounded-2xl border border-gray-100 p-5"
                        >
                            <h3 className="font-bold text-gray-900 mb-3">Kỹ năng</h3>
                            <div className="flex flex-wrap gap-2">
                                {userProfile.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1.5 bg-primary-50 text-primary-700 text-sm font-medium rounded-lg"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Main content */}
                    <div className="lg:col-span-2">
                        {/* Tabs */}
                        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {activeTab === 'courses' && (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="space-y-4"
                            >
                                {purchasedCourses.length === 0 ? (
                                    <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                                        <BookOpenIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                        <p className="text-gray-500">
                                            Bạn chưa đăng ký khóa học nào
                                        </p>
                                        <Link
                                            to="/courses"
                                            className="text-primary-600 font-semibold text-sm mt-2 inline-block hover:text-primary-700"
                                        >
                                            Khám phá khóa học →
                                        </Link>
                                    </div>
                                ) : (
                                    purchasedCourses.map((course) => (
                                        <motion.div key={course.id} variants={itemVariants}>
                                            <div className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4">
                                                <img
                                                    src={course.thumbnail}
                                                    alt={course.title}
                                                    className="w-24 h-16 rounded-xl object-cover flex-shrink-0"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-semibold text-gray-900 text-sm line-clamp-1">
                                                        {course.title}
                                                    </h4>
                                                    <p className="text-xs text-gray-500 mb-2">
                                                        {course.instructor}
                                                    </p>
                                                    <ProgressBar
                                                        progress={course.progress || 0}
                                                        size="sm"
                                                        label={`${course.progress || 0}% hoàn thành`}
                                                    />
                                                </div>
                                                <Link
                                                    to={`/learn/${course.id}`}
                                                    className="flex-shrink-0 self-center bg-primary-600 text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                                                >
                                                    Học tiếp
                                                </Link>
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </motion.div>
                        )}

                        {activeTab === 'certificates' && (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid sm:grid-cols-2 gap-4"
                            >
                                {purchasedCourses.filter((c) => (c.progress || 0) >= 100)
                                    .length === 0 ? (
                                    <div className="sm:col-span-2 text-center py-12 bg-white rounded-2xl border border-gray-100">
                                        <AwardIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                        <p className="text-gray-500">
                                            Hoàn thành khóa học để nhận chứng chỉ
                                        </p>
                                    </div>
                                ) : null}

                                {/* Sample certificates */}
                                {[
                                    {
                                        title: 'React & TypeScript Fundamentals',
                                        date: '15/09/2024',
                                        id: 'CERT-001',
                                    },
                                    {
                                        title: 'UI/UX Design Basics',
                                        date: '20/08/2024',
                                        id: 'CERT-002',
                                    },
                                    {
                                        title: 'Python for Beginners',
                                        date: '10/07/2024',
                                        id: 'CERT-003',
                                    },
                                ].map((cert, i) => (
                                    <motion.div
                                        key={cert.id}
                                        variants={itemVariants}
                                        className="bg-gradient-to-br from-primary-50 to-indigo-50 rounded-2xl border border-primary-100 p-5"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                                                <AwardIcon className="w-5 h-5 text-primary-600" />
                                            </div>
                                            <span className="text-xs text-primary-600 font-medium bg-primary-100 px-2 py-1 rounded-full">
                                                #{cert.id}
                                            </span>
                                        </div>
                                        <h4 className="font-bold text-gray-900 text-sm mb-1">
                                            {cert.title}
                                        </h4>
                                        <p className="text-xs text-gray-500 mb-3">
                                            Hoàn thành: {cert.date}
                                        </p>
                                        <button className="w-full text-xs font-semibold text-primary-600 border border-primary-200 py-2 rounded-lg hover:bg-primary-50 transition-colors">
                                            Tải chứng chỉ
                                        </button>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}

                        {activeTab === 'activity' && (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                }}
                                className="bg-white rounded-2xl border border-gray-100 p-5"
                            >
                                <h3 className="font-bold text-gray-900 mb-4">
                                    Hoạt động gần đây
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        {
                                            icon: '▶️',
                                            text: 'Đã xem bài "JSX và Components"',
                                            time: '2 giờ trước',
                                            course: 'React & TypeScript',
                                        },
                                        {
                                            icon: '✅',
                                            text: 'Hoàn thành bài "Cài đặt môi trường"',
                                            time: '1 ngày trước',
                                            course: 'React & TypeScript',
                                        },
                                        {
                                            icon: '📝',
                                            text: 'Đã ghi chú bài "Figma Components"',
                                            time: '2 ngày trước',
                                            course: 'UI/UX Design',
                                        },
                                        {
                                            icon: '🏆',
                                            text: 'Đạt điểm 90/100 bài quiz',
                                            time: '3 ngày trước',
                                            course: 'Python Data Science',
                                        },
                                        {
                                            icon: '▶️',
                                            text: 'Bắt đầu học "Python Fundamentals"',
                                            time: '5 ngày trước',
                                            course: 'Python Data Science',
                                        },
                                    ].map((activity, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <span className="text-xl flex-shrink-0">
                                                {activity.icon}
                                            </span>
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-900">{activity.text}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">
                                                    {activity.course} · {activity.time}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}
