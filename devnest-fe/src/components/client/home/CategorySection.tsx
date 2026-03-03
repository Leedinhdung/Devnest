import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRightIcon } from 'lucide-react'
import { containerVariants, itemVariants } from '@/lib/animations/motion'
const CategorySection = () => {
    return (
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
    )
}

export default CategorySection