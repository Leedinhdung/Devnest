import { BlogCard } from '@/components/client/blog/BlogCard'
import { blogPosts } from '@/data/mockData'
import { containerVariants, itemVariants } from '@/lib/animations/motion'
import { motion } from 'framer-motion'
import { ChevronRightIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

const BlogSection = () => {
    const recentPosts = blogPosts.slice(0, 3)
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
    )
}

export default BlogSection