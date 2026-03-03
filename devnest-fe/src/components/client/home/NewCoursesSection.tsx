import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRightIcon } from 'lucide-react'
import { CourseCard } from '@/components/client/course/CourseCard'
import { courses } from '@/data/mockData'
import { containerVariants, itemVariants } from '@/lib/animations/motion'

const NewCoursesSection = () => {
    const newCourses = courses.filter((c) => c.isNew).slice(0, 4)
    return (
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
    )
}

export default NewCoursesSection