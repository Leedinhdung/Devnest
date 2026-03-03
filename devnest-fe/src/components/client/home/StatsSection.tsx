import React from 'react'
import { motion } from 'framer-motion'
import { AwardIcon, BookOpenIcon, StarIcon, UsersIcon } from 'lucide-react'
import { containerVariants, itemVariants } from '@/lib/animations/motion'
const StatsSection = () => {
    return (
        <section className="bg-white">
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
    )
}

export default StatsSection