import BestSellerSection from '@/components/client/home/BestSellerSection'
import BlogSection from '@/components/client/home/BlogSection'
import CategorySection from '@/components/client/home/CategorySection'
import HeroSection from '@/components/client/home/HeroSection'
import NewCoursesSection from '@/components/client/home/NewCoursesSection'
import StatsSection from '@/components/client/home/StatsSection'
import { StarRating } from '@/components/client/rating/StarRating'
import { homeBenefits } from '@/data/home.data'
import { testimonials } from '@/data/mockData'
import { containerVariants, itemVariants } from '@/lib/animations/motion'
import { motion } from 'framer-motion'
import { ArrowRightIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

const HomePage = () => {
    return (
        <main className="w-full">
            {/* Hero Section */}
            <HeroSection />

            {/* Stats */}
            <StatsSection />

            {/* Categories */}
            <CategorySection />

            {/* Bestseller Courses */}

            <BestSellerSection />
            {/* Why Choose Us */}
            <section className="bg-gradient-to-br from-primary-50 to-indigo-50 py-16 rounded-3xl">
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
                            Tại sao chọn DevNest?
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
                        {homeBenefits.map((item) => (
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
            <NewCoursesSection />

            {/* Testimonials */}
            <section className="bg-gray-50 py-16 rounded-3xl">
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
                            Hàng nghìn học viên đã thay đổi sự nghiệp nhờ DevNest
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
            <BlogSection />

            {/* CTA Banner */}
            <section className="bg-primary-600 py-16 rounded-3xl">
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
                            Tham gia cùng 150,000+ học viên đang học tập trên DevNest. Dùng
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
export default HomePage