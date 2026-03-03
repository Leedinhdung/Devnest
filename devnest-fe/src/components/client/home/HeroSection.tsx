import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRightIcon, CheckCircleIcon, PlayCircleIcon, StarIcon, TrendingUpIcon } from 'lucide-react'
const HeroSection = () => {
    return (
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
    )
}

export default HeroSection