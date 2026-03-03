import { BlogCard } from '@/components/client/blog/BlogCard'
import { CourseCard } from '@/components/client/course/CourseCard'
import { StarRating } from '@/components/client/rating/StarRating'
import { blogPosts, courses, testimonials } from '@/data/mockData'
import { motion } from 'framer-motion'
import {
    ArrowRightIcon,
    AwardIcon,
    BookOpenIcon,
    CheckCircleIcon,
    ChevronRightIcon,
    PlayCircleIcon,
    StarIcon,
    TrendingUpIcon,
    UsersIcon,
} from 'lucide-react'
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
            duration: 0.5,
        },
    },
}
export function HomePage() {
    const featuredCourses = courses.filter((c) => c.isBestseller).slice(0, 4)
    const newCourses = courses.filter((c) => c.isNew).slice(0, 4)
    const recentPosts = blogPosts.slice(0, 3)
    return (
        <main className="w-full">
            {/* Hero Section */}
            <section className="hero-gradient min-h-[600px] flex items-center relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-800/10 rounded-full blur-3xl" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{
                                opacity: 0,
                                x: -30,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                            }}
                            transition={{
                                duration: 0.7,
                            }}
                        >
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
                                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                <span className="text-sm text-white/90 font-medium">
                                    Hơn 500+ khóa học chất lượng cao
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                                Học kỹ năng mới,{' '}
                                <span className="text-accent-400">thay đổi</span> tương lai của
                                bạn
                            </h1>

                            <p className="text-lg text-white/70 mb-8 leading-relaxed max-w-lg">
                                Khám phá hàng trăm khóa học từ các chuyên gia hàng đầu. Học theo
                                tốc độ của bạn, bất cứ đâu, bất cứ lúc nào.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-10">
                                <Link
                                    to="/courses"
                                    className="inline-flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-accent-500/30 hover:-translate-y-0.5"
                                >
                                    Khám phá khóa học
                                    <ArrowRightIcon className="w-5 h-5" />
                                </Link>
                                <Link
                                    to="/courses/1"
                                    className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200"
                                >
                                    <PlayCircleIcon className="w-5 h-5" />
                                    Xem demo miễn phí
                                </Link>
                            </div>

                            {/* Social proof */}
                            <div className="flex flex-wrap items-center gap-6">
                                <div className="flex -space-x-3">
                                    {['seed/s1', 'seed/s2', 'seed/s3', 'seed/s4'].map(
                                        (seed, i) => (
                                            <img
                                                key={i}
                                                src={`https://picsum.photos/${seed}/40/40`}
                                                alt="Student"
                                                className="w-9 h-9 rounded-full border-2 border-white/30 object-cover"
                                            />
                                        ),
                                    )}
                                </div>
                                <div>
                                    <div className="flex items-center gap-1 mb-0.5">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <StarIcon
                                                key={i}
                                                className="w-4 h-4 text-amber-400 fill-current"
                                            />
                                        ))}
                                    </div>
                                    <p className="text-sm text-white/70">
                                        <span className="text-white font-semibold">150,000+</span>{' '}
                                        học viên tin tưởng
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Hero visual */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                x: 30,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                            }}
                            transition={{
                                duration: 0.7,
                                delay: 0.2,
                            }}
                            className="hidden lg:block"
                        >
                            <div className="relative">
                                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <img
                                            src="https://picsum.photos/seed/hero1/300/200"
                                            alt="Learning"
                                            className="rounded-xl w-full h-32 object-cover"
                                        />
                                        <img
                                            src="https://picsum.photos/seed/hero2/300/200"
                                            alt="Learning"
                                            className="rounded-xl w-full h-32 object-cover"
                                        />
                                    </div>
                                    <img
                                        src="https://picsum.photos/seed/hero3/600/250"
                                        alt="Learning"
                                        className="rounded-xl w-full h-40 object-cover"
                                    />
                                </div>

                                {/* Floating cards */}
                                <motion.div
                                    animate={{
                                        y: [0, -8, 0],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}
                                    className="absolute -top-4 -left-4 bg-white rounded-xl shadow-xl p-3 flex items-center gap-3"
                                >
                                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                                        <CheckCircleIcon className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Hoàn thành</p>
                                        <p className="text-sm font-semibold text-gray-900">
                                            React Hooks
                                        </p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    animate={{
                                        y: [0, 8, 0],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                        delay: 1.5,
                                    }}
                                    className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-xl p-3 flex items-center gap-3"
                                >
                                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                        <TrendingUpIcon className="w-5 h-5 text-primary-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Tiến độ học</p>
                                        <p className="text-sm font-semibold text-gray-900">
                                            +65% tuần này
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                        }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8"
                    >
                        {[
                            {
                                icon: BookOpenIcon,
                                value: '500+',
                                label: 'Khóa học',
                                color: 'text-primary-600',
                                bg: 'bg-primary-50',
                            },
                            {
                                icon: UsersIcon,
                                value: '150K+',
                                label: 'Học viên',
                                color: 'text-emerald-600',
                                bg: 'bg-emerald-50',
                            },
                            {
                                icon: AwardIcon,
                                value: '50+',
                                label: 'Giảng viên',
                                color: 'text-accent-600',
                                bg: 'bg-accent-50',
                            },
                            {
                                icon: StarIcon,
                                value: '4.8/5',
                                label: 'Đánh giá TB',
                                color: 'text-amber-600',
                                bg: 'bg-amber-50',
                            },
                        ].map((stat) => (
                            <motion.div
                                key={stat.label}
                                variants={itemVariants}
                                className="text-center"
                            >
                                <div
                                    className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mx-auto mb-3`}
                                >
                                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                                <div className={`text-3xl font-bold ${stat.color} mb-1`}>
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-500">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Categories */}
            <section className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                        transition={{
                            duration: 0.5,
                        }}
                        className="flex items-center justify-between mb-8"
                    >
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                                Danh mục khóa học
                            </h2>
                            <p className="text-gray-500 mt-1">
                                Khám phá các lĩnh vực học tập đa dạng
                            </p>
                        </div>
                        <Link
                            to="/courses"
                            className="hidden sm:flex items-center gap-1 text-primary-600 font-semibold hover:gap-2 transition-all"
                        >
                            Xem tất cả <ChevronRightIcon className="w-4 h-4" />
                        </Link>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                        }}
                        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
                    >
                        {[
                            {
                                name: 'Lập trình',
                                icon: '💻',
                                count: 245,
                                color: 'hover:border-blue-300 hover:bg-blue-50',
                            },
                            {
                                name: 'Thiết kế',
                                icon: '🎨',
                                count: 128,
                                color: 'hover:border-purple-300 hover:bg-purple-50',
                            },
                            {
                                name: 'Marketing',
                                icon: '📈',
                                count: 96,
                                color: 'hover:border-green-300 hover:bg-green-50',
                            },
                            {
                                name: 'Kinh doanh',
                                icon: '💼',
                                count: 87,
                                color: 'hover:border-yellow-300 hover:bg-yellow-50',
                            },
                            {
                                name: 'Ngoại ngữ',
                                icon: '🌍',
                                count: 74,
                                color: 'hover:border-red-300 hover:bg-red-50',
                            },
                            {
                                name: 'Nhiếp ảnh',
                                icon: '📷',
                                count: 52,
                                color: 'hover:border-pink-300 hover:bg-pink-50',
                            },
                        ].map((cat) => (
                            <motion.div key={cat.name} variants={itemVariants}>
                                <Link
                                    to={`/courses?category=${cat.name}`}
                                    className={`flex flex-col items-center p-4 bg-white rounded-2xl border border-gray-100 transition-all duration-200 cursor-pointer group ${cat.color}`}
                                >
                                    <span className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-200">
                                        {cat.icon}
                                    </span>
                                    <span className="font-semibold text-gray-900 text-sm text-center">
                                        {cat.name}
                                    </span>
                                    <span className="text-xs text-gray-500 mt-0.5">
                                        {cat.count} khóa học
                                    </span>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Bestseller Courses */}
            <section className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                        className="flex items-center justify-between mb-8"
                    >
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                                🔥 Khóa học bán chạy
                            </h2>
                            <p className="text-gray-500 mt-1">
                                Được học viên tin tưởng và đánh giá cao nhất
                            </p>
                        </div>
                        <Link
                            to="/courses"
                            className="hidden sm:flex items-center gap-1 text-primary-600 font-semibold hover:gap-2 transition-all"
                        >
                            Xem tất cả <ChevronRightIcon className="w-4 h-4" />
                        </Link>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                        }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {featuredCourses.map((course) => (
                            <motion.div key={course.id} variants={itemVariants}>
                                <CourseCard course={course} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="bg-gradient-to-br from-primary-50 to-indigo-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                        className="text-center mb-12"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                            Tại sao chọn EduViet?
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Chúng tôi cam kết mang đến trải nghiệm học tập tốt nhất với nội
                            dung chất lượng cao và hỗ trợ tận tâm.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                        }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {[
                            {
                                icon: '🎯',
                                title: 'Nội dung thực tế',
                                desc: 'Khóa học được thiết kế bởi các chuyên gia với kinh nghiệm thực tế, không chỉ lý thuyết suông.',
                            },
                            {
                                icon: '⏰',
                                title: 'Học mọi lúc, mọi nơi',
                                desc: 'Truy cập khóa học trên mọi thiết bị. Học theo tốc độ của bạn, không áp lực thời gian.',
                            },
                            {
                                icon: '🏆',
                                title: 'Chứng chỉ được công nhận',
                                desc: 'Nhận chứng chỉ hoàn thành được nhiều doanh nghiệp hàng đầu Việt Nam công nhận.',
                            },
                            {
                                icon: '💬',
                                title: 'Hỗ trợ 24/7',
                                desc: 'Đội ngũ hỗ trợ và cộng đồng học viên sẵn sàng giải đáp mọi thắc mắc của bạn.',
                            },
                            {
                                icon: '🔄',
                                title: 'Cập nhật liên tục',
                                desc: 'Nội dung khóa học được cập nhật thường xuyên để theo kịp xu hướng mới nhất.',
                            },
                            {
                                icon: '💰',
                                title: 'Giá cả hợp lý',
                                desc: 'Học phí phải chăng với nhiều ưu đãi hấp dẫn. Hoàn tiền trong 30 ngày nếu không hài lòng.',
                            },
                        ].map((item) => (
                            <motion.div
                                key={item.title}
                                variants={itemVariants}
                                className="bg-white rounded-2xl p-6 border border-white shadow-sm"
                            >
                                <span className="text-3xl mb-4 block">{item.icon}</span>
                                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* New Courses */}
            <section className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                        className="flex items-center justify-between mb-8"
                    >
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                                ✨ Khóa học mới nhất
                            </h2>
                            <p className="text-gray-500 mt-1">
                                Nội dung mới, cập nhật xu hướng mới nhất
                            </p>
                        </div>
                        <Link
                            to="/courses"
                            className="hidden sm:flex items-center gap-1 text-primary-600 font-semibold hover:gap-2 transition-all"
                        >
                            Xem tất cả <ChevronRightIcon className="w-4 h-4" />
                        </Link>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                        }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {newCourses.map((course) => (
                            <motion.div key={course.id} variants={itemVariants}>
                                <CourseCard course={course} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                        className="text-center mb-12"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                            Học viên nói gì về chúng tôi?
                        </h2>
                        <p className="text-gray-600">
                            Hàng nghìn học viên đã thay đổi sự nghiệp nhờ EduViet
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                        }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {testimonials.map((t) => (
                            <motion.div
                                key={t.id}
                                variants={itemVariants}
                                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
                            >
                                <StarRating rating={t.rating} showCount={false} size="sm" />
                                <p className="text-gray-700 text-sm leading-relaxed mt-3 mb-4 italic">
                                    "{t.content}"
                                </p>
                                <div className="flex items-center gap-3">
                                    <img
                                        src={t.avatar}
                                        alt={t.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-900 text-sm">
                                            {t.name}
                                        </p>
                                        <p className="text-xs text-gray-500">{t.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Blog Preview */}
            <section className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                        className="flex items-center justify-between mb-8"
                    >
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                                📝 Bài viết mới nhất
                            </h2>
                            <p className="text-gray-500 mt-1">
                                Kiến thức và kinh nghiệm từ các chuyên gia
                            </p>
                        </div>
                        <Link
                            to="/blog"
                            className="hidden sm:flex items-center gap-1 text-primary-600 font-semibold hover:gap-2 transition-all"
                        >
                            Xem tất cả <ChevronRightIcon className="w-4 h-4" />
                        </Link>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                        }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        {recentPosts.map((post) => (
                            <motion.div key={post.id} variants={itemVariants}>
                                <BlogCard post={post} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="bg-primary-600 py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Bắt đầu hành trình học tập ngay hôm nay
                        </h2>
                        <p className="text-primary-200 text-lg mb-8 max-w-2xl mx-auto">
                            Tham gia cùng 150,000+ học viên đang học tập trên EduViet. Dùng
                            thử miễn phí 7 ngày.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/courses"
                                className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 font-bold px-8 py-4 rounded-xl hover:bg-primary-50 transition-colors"
                            >
                                Bắt đầu học miễn phí
                                <ArrowRightIcon className="w-5 h-5" />
                            </Link>
                            <Link
                                to="/contact"
                                className="inline-flex items-center justify-center gap-2 bg-primary-700 text-white font-semibold px-8 py-4 rounded-xl hover:bg-primary-800 transition-colors border border-primary-500"
                            >
                                Liên hệ tư vấn
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    )
}
