import { BlogCard } from '@/components/client/blog/BlogCard'
import { CategoryBadge } from '@/components/client/category/CategoryBadge'
import { blogPosts } from '@/data/mockData'
import { motion } from 'framer-motion'
import {
    ArrowLeftIcon,
    BookmarkIcon,
    CalendarIcon,
    ClockIcon,
    FacebookIcon,
    HeartIcon,
    MessageSquareIcon,
    ReplyIcon,
    ShareIcon,
    ThumbsUpIcon,
    TwitterIcon,
} from 'lucide-react'
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
export function BlogDetailPage() {
  const { id } = useParams<{
    id: string
  }>()
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [commentText, setCommentText] = useState('')
  const post = blogPosts.find((p) => p.id === id) || blogPosts[0]
  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3)
  const handleComment = (e: React.FormEvent) => {
    e.preventDefault()
    setCommentText('')
  }
  // Simple content renderer
  const renderContent = (content: string) => {
    return content
      .trim()
      .split('\n')
      .map((line, i) => {
        const trimmed = line.trim()
        if (!trimmed) return null
        if (trimmed.startsWith('## ')) {
          return (
            <h2 key={i} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              {trimmed.slice(3)}
            </h2>
          )
        }
        if (trimmed.startsWith('### ')) {
          return (
            <h3
              key={i}
              className="text-xl font-semibold text-gray-900 mt-6 mb-3"
            >
              {trimmed.slice(4)}
            </h3>
          )
        }
        if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
          return (
            <p key={i} className="font-semibold text-gray-900 mb-2">
              {trimmed.slice(2, -2)}
            </p>
          )
        }
        if (trimmed.startsWith('- ')) {
          return (
            <li key={i} className="text-gray-700 mb-1.5 ml-4 list-disc">
              {trimmed.slice(2)}
            </li>
          )
        }
        if (
          trimmed.startsWith('1. ') ||
          trimmed.startsWith('2. ') ||
          trimmed.startsWith('3. ')
        ) {
          return (
            <li key={i} className="text-gray-700 mb-1.5 ml-4 list-decimal">
              {trimmed.slice(3)}
            </li>
          )
        }
        return (
          <p key={i} className="text-gray-700 leading-relaxed mb-4">
            {trimmed}
          </p>
        )
      })
      .filter(Boolean)
  }
  return (
    <main className="w-full min-h-screen bg-gray-50 pt-16">
      {/* Article header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
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
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors group"
            >
              <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Quay lại Blog
            </Link>

            <CategoryBadge category={post.category} size="md" />

            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mt-3 mb-4 leading-tight">
              {post.title}
            </h1>

            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Author + meta */}
            <div className="flex flex-wrap items-center gap-5 mb-5">
              <div className="flex items-center gap-3">
                <img
                  src={post.authorAvatar}
                  alt={post.author}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-gray-100"
                />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {post.author}
                  </p>
                  <p className="text-xs text-gray-500">
                    Chuyên gia {post.category}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <CalendarIcon className="w-4 h-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <ClockIcon className="w-4 h-4" />
                  {post.readTime} phút đọc
                </span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full hover:bg-primary-50 hover:text-primary-700 cursor-pointer transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main article */}
          <article className="lg:col-span-3">
            {/* Thumbnail */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.5,
              }}
              className="mb-8"
            >
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full rounded-2xl object-cover aspect-video shadow-md"
              />
            </motion.div>

            {/* Content */}
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
                delay: 0.2,
              }}
              className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 mb-6"
            >
              <div className="prose-content text-base">
                {renderContent(post.content)}
              </div>
            </motion.div>

            {/* Engagement bar */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6 flex items-center justify-between flex-wrap gap-3">
              <div className="flex gap-2">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${liked ? 'bg-primary-50 text-primary-600 border border-primary-200' : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-primary-50 hover:text-primary-600'}`}
                >
                  <ThumbsUpIcon className="w-4 h-4" />
                  Hữu ích {liked ? '(125)' : '(124)'}
                </button>
                <button
                  onClick={() => setBookmarked(!bookmarked)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${bookmarked ? 'bg-amber-50 text-amber-600 border border-amber-200' : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-amber-50 hover:text-amber-600'}`}
                >
                  <BookmarkIcon
                    className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`}
                  />
                  {bookmarked ? 'Đã lưu' : 'Lưu bài'}
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-4 h-4" />
                </button>
                <button
                  className="p-2 bg-sky-50 text-sky-500 rounded-lg hover:bg-sky-100 transition-colors"
                  aria-label="Twitter"
                >
                  <TwitterIcon className="w-4 h-4" />
                </button>
                <button
                  className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Share"
                >
                  <ShareIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Author bio */}
            <div className="bg-gradient-to-r from-primary-50 to-indigo-50 rounded-2xl border border-primary-100 p-6 mb-6">
              <div className="flex items-start gap-4">
                <img
                  src={post.authorAvatar}
                  alt={post.author}
                  className="w-16 h-16 rounded-2xl object-cover flex-shrink-0 shadow-sm"
                />
                <div>
                  <p className="font-bold text-gray-900 text-lg">
                    {post.author}
                  </p>
                  <p className="text-primary-600 text-sm font-medium mb-2">
                    Chuyên gia {post.category}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Chuyên gia với nhiều năm kinh nghiệm trong lĩnh vực{' '}
                    {post.category.toLowerCase()}. Đam mê chia sẻ kiến thức và
                    giúp đỡ cộng đồng học tập.
                  </p>
                  <button className="mt-3 px-4 py-1.5 border border-primary-300 text-primary-600 text-sm font-medium rounded-lg hover:bg-primary-50 transition-colors">
                    Theo dõi tác giả
                  </button>
                </div>
              </div>
            </div>

            {/* Comments */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 text-lg mb-5 flex items-center gap-2">
                <MessageSquareIcon className="w-5 h-5 text-primary-600" />
                Bình luận (8)
              </h3>

              {/* Comment input */}
              <form onSubmit={handleComment} className="flex gap-3 mb-7">
                <img
                  src="https://picsum.photos/seed/user1/40/40"
                  alt="You"
                  className="w-9 h-9 rounded-full flex-shrink-0 object-cover"
                />
                <div className="flex-1">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Viết bình luận của bạn..."
                    className="w-full h-20 p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                  />
                  <button
                    type="submit"
                    className="mt-2 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Gửi bình luận
                  </button>
                </div>
              </form>

              {/* Sample comments */}
              <div className="space-y-5">
                {[
                  {
                    name: 'Nguyễn Văn Hùng',
                    avatar: 'https://picsum.photos/seed/c1/40/40',
                    time: '2 giờ trước',
                    comment:
                      'Bài viết rất hay và bổ ích! Cảm ơn tác giả đã chia sẻ những kiến thức quý giá này. Tôi đã học được rất nhiều điều mới.',
                    likes: 12,
                  },
                  {
                    name: 'Trần Thị Bích',
                    avatar: 'https://picsum.photos/seed/c2/40/40',
                    time: '5 giờ trước',
                    comment:
                      'Tôi đã áp dụng những tips này và thấy hiệu quả rõ rệt. Recommend cho mọi người đọc bài này!',
                    likes: 8,
                  },
                  {
                    name: 'Lê Minh Tuấn',
                    avatar: 'https://picsum.photos/seed/c3/40/40',
                    time: '1 ngày trước',
                    comment:
                      'Nội dung chi tiết và dễ hiểu. Mong tác giả tiếp tục ra thêm nhiều bài viết như thế này về chủ đề này.',
                    likes: 5,
                  },
                ].map((comment, i) => (
                  <div key={i} className="flex gap-3">
                    <img
                      src={comment.avatar}
                      alt={comment.name}
                      className="w-9 h-9 rounded-full flex-shrink-0 object-cover"
                    />
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900 text-sm">
                            {comment.name}
                          </span>
                          <span className="text-xs text-gray-400">
                            {comment.time}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {comment.comment}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 mt-1.5 px-1">
                        <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors">
                          <HeartIcon className="w-3.5 h-3.5" /> {comment.likes}
                        </button>
                        <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-primary-600 transition-colors">
                          <ReplyIcon className="w-3.5 h-3.5" /> Trả lời
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-20 space-y-5">
              {/* Author card */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h3 className="font-bold text-gray-900 mb-4 text-sm">
                  Về tác giả
                </h3>
                <div className="text-center">
                  <img
                    src={post.authorAvatar}
                    alt={post.author}
                    className="w-16 h-16 rounded-2xl mx-auto mb-3 object-cover shadow-sm"
                  />
                  <p className="font-semibold text-gray-900">{post.author}</p>
                  <p className="text-xs text-gray-500 mt-0.5 mb-3">
                    Chuyên gia {post.category}
                  </p>
                  <button className="w-full py-2 border border-primary-200 text-primary-600 text-sm font-medium rounded-lg hover:bg-primary-50 transition-colors">
                    Theo dõi
                  </button>
                </div>
              </div>

              {/* Related posts */}
              {relatedPosts.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                  <h3 className="font-bold text-gray-900 mb-4 text-sm">
                    Bài viết liên quan
                  </h3>
                  <div className="space-y-4">
                    {relatedPosts.map((p) => (
                      <BlogCard key={p.id} post={p} variant="compact" />
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h3 className="font-bold text-gray-900 mb-3 text-sm">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full hover:bg-primary-50 hover:text-primary-700 cursor-pointer transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
