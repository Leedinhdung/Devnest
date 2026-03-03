import React from 'react'
import { Link } from 'react-router-dom'
import { CalendarIcon, ClockIcon, ArrowRightIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { BlogPost } from '@/data/mockData'
import { CategoryBadge } from '@/components/client/category/CategoryBadge'

interface BlogCardProps {
    post: BlogPost
    variant?: 'default' | 'featured' | 'compact'
}
export function BlogCard({ post, variant = 'default' }: BlogCardProps) {
    if (variant === 'featured') {
        return (
            <motion.div
                whileHover={{
                    y: -3,
                }}
                transition={{
                    duration: 0.2,
                }}
            >
                <Link
                    to={`/blog/${post.id}`}
                    className="group relative flex flex-col md:flex-row gap-0 bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-card-hover transition-shadow duration-300"
                >
                    <div className="relative md:w-1/2 aspect-video md:aspect-auto overflow-hidden">
                        <img
                            src={post.thumbnail}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
                    </div>
                    <div className="flex flex-col justify-center p-6 md:p-8 md:w-1/2">
                        <CategoryBadge category={post.category} size="sm" />
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-3 mb-3 group-hover:text-primary-600 transition-colors leading-snug">
                            {post.title}
                        </h2>
                        <p className="text-gray-600 line-clamp-3 mb-4">{post.excerpt}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                            <div className="flex items-center gap-1.5">
                                <img
                                    src={post.authorAvatar}
                                    alt={post.author}
                                    className="w-6 h-6 rounded-full"
                                />
                                <span>{post.author}</span>
                            </div>
                            <span className="flex items-center gap-1">
                                <CalendarIcon className="w-3.5 h-3.5" />
                                {post.date}
                            </span>
                            <span className="flex items-center gap-1">
                                <ClockIcon className="w-3.5 h-3.5" />
                                {post.readTime} phút đọc
                            </span>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-primary-600 font-semibold text-sm group-hover:gap-2.5 transition-all">
                            Đọc tiếp <ArrowRightIcon className="w-4 h-4" />
                        </span>
                    </div>
                </Link>
            </motion.div>
        )
    }
    if (variant === 'compact') {
        return (
            <motion.div
                whileHover={{
                    x: 4,
                }}
                transition={{
                    duration: 0.2,
                }}
            >
                <Link to={`/blog/${post.id}`} className="flex gap-3 group">
                    <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-20 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
                            {post.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                            {post.date} · {post.readTime} phút
                        </p>
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
                to={`/blog/${post.id}`}
                className="flex flex-col h-full bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-card-hover transition-shadow duration-300 group"
            >
                <div className="relative overflow-hidden aspect-video">
                    <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
                <div className="flex flex-col flex-1 p-5">
                    <CategoryBadge category={post.category} size="sm" />
                    <h3 className="font-semibold text-gray-900 mt-2 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors leading-snug">
                        {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 flex-1">
                        {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                        <div className="flex items-center gap-2">
                            <img
                                src={post.authorAvatar}
                                alt={post.author}
                                className="w-7 h-7 rounded-full"
                            />
                            <span className="text-sm text-gray-600">{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                            <ClockIcon className="w-3.5 h-3.5" />
                            {post.readTime} phút
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}
