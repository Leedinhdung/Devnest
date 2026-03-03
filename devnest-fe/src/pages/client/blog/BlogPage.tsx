import { BlogCard } from '@/components/client/blog/BlogCard'
import { blogPosts } from '@/data/mockData'
import { motion } from 'framer-motion'
import { SearchIcon, SendIcon, XIcon } from 'lucide-react'
import React, { useState } from 'react'
const blogCategories = [
  'Tất cả',
  'Lập trình',
  'Thiết kế',
  'Marketing',
  'Giáo dục',
  'Kinh nghiệm',
]
const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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
export function BlogPage() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Tất cả')
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSent, setNewsletterSent] = useState(false)
  const filtered = blogPosts.filter((post) => {
    const matchSearch =
      !search ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      post.author.toLowerCase().includes(search.toLowerCase())
    const matchCategory =
      selectedCategory === 'Tất cả' || post.category === selectedCategory
    return matchSearch && matchCategory
  })
  const featuredPost = filtered[0]
  const regularPosts = filtered.slice(1)
  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault()
    if (newsletterEmail) {
      setNewsletterSent(true)
      setNewsletterEmail('')
    }
  }
  return (
    <main className="w-full min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
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
              duration: 0.5,
            }}
          >
            <span className="inline-block bg-primary-50 text-primary-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              📝 Blog & Kiến thức
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Blog EduViet
            </h1>
            <p className="text-gray-500 max-w-xl mx-auto mb-7 text-lg">
              Kiến thức, kinh nghiệm và xu hướng mới nhất từ các chuyên gia hàng
              đầu
            </p>

            <div className="relative max-w-md mx-auto">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XIcon className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category filter */}
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
            delay: 0.1,
          }}
          className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide"
        >
          {blogCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedCategory === cat ? 'bg-primary-600 text-white shadow-sm shadow-primary-200' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'}`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {filtered.length === 0 ? (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            className="text-center py-20"
          >
            <span className="text-5xl mb-4 block">📝</span>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Không tìm thấy bài viết
            </h3>
            <p className="text-gray-500 mb-4">
              Thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác
            </p>
            <button
              onClick={() => {
                setSearch('')
                setSelectedCategory('Tất cả')
              }}
              className="text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              Xóa bộ lọc
            </button>
          </motion.div>
        ) : (
          <>
            {/* Featured post */}
            {featuredPost && (
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
                  duration: 0.5,
                  delay: 0.15,
                }}
                className="mb-10"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1 h-5 bg-primary-600 rounded-full" />
                  <h2 className="font-bold text-gray-900">Bài viết nổi bật</h2>
                </div>
                <BlogCard post={featuredPost} variant="featured" />
              </motion.div>
            )}

            {/* Regular posts grid */}
            {regularPosts.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-1 h-5 bg-accent-500 rounded-full" />
                  <h2 className="font-bold text-gray-900">Bài viết mới nhất</h2>
                  <span className="text-sm text-gray-400 ml-1">
                    ({regularPosts.length} bài)
                  </span>
                </div>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {regularPosts.map((post) => (
                    <motion.div key={post.id} variants={itemVariants}>
                      <BlogCard post={post} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}
          </>
        )}

        {/* Newsletter CTA */}
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
          className="mt-14 bg-gradient-to-r from-primary-600 to-indigo-700 rounded-2xl p-8 md:p-10 text-center text-white overflow-hidden relative"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full" />
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">
              Đăng ký nhận bài viết mới
            </h3>
            <p className="text-primary-200 mb-6 max-w-md mx-auto">
              Nhận thông báo khi có bài viết mới từ các chuyên gia. Không spam,
              hủy đăng ký bất cứ lúc nào.
            </p>
            {newsletterSent ? (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                className="inline-flex items-center gap-2 bg-white/20 text-white px-6 py-3 rounded-xl font-medium"
              >
                ✓ Đăng ký thành công! Cảm ơn bạn.
              </motion.div>
            ) : (
              <form
                onSubmit={handleNewsletter}
                className="flex gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  placeholder="Email của bạn"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                  required
                />
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-semibold px-5 py-3 rounded-xl transition-colors flex-shrink-0"
                >
                  <SendIcon className="w-4 h-4" />
                  Đăng ký
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  )
}
