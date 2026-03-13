import { ProgressBar } from '@/components/client/progressbar/ProgressBar'
import { useGetSlugParams } from '@/hooks/common'
import { useGetCourseBySlug } from '@/hooks/course'
import routes from '@/routes/routes'
import { AnimatePresence, motion } from 'framer-motion'
import {
    BookOpenIcon,
    CheckCircleIcon,
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronUpIcon,
    CircleCheckBig,
    ClockIcon,
    FileTextIcon,
    MenuIcon,
    MessagesSquare,
    MoreHorizontalIcon,
    PlayCircleIcon,
    ThumbsUpIcon,
    XIcon
} from 'lucide-react'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
export function LearnPage() {
    const slug = useGetSlugParams("slug")
    const { data: course, isLoading } = useGetCourseBySlug(slug!)
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [currentLesson, setCurrentLesson] = useState({
        sectionIdx: 0,
        lessonIdx: 0,
    })
    const [expandedSections, setExpandedSections] = useState<Set<string>>(
        new Set(),
    )
    const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set())
    const [qaPanelOpen, setQaPanelOpen] = useState(false)
    // Article reading progress state
    const articleRef = useRef<HTMLDivElement>(null)
    const [readingProgress, setReadingProgress] = useState(0)
    if (isLoading || !course) {
        return <div>Loading...</div>
    }
    const allLessons =
        course?.curriculum?.flatMap((ch, ci) =>
            ch.lessons.map((l, li) => ({
                ...l,
                sectionIdx: ci,
                lessonIdx: li,
                sectionTitle: ch.title,
            })),
        ) ?? []
    const currentSection = course?.curriculum?.[currentLesson.sectionIdx]
    const currentLessonData = currentSection?.lessons[currentLesson.lessonIdx]
    const totalLessons = allLessons.length
    const markLessonComplete = (lessonId: string) => {
        setCompletedLessons((prev) => {
            const next = new Set(prev)
            next.add(lessonId)
            return next
        })
    }
    const completedCount = allLessons.filter((l) =>
        completedLessons.has(l._id)
    ).length
    const progress =
        totalLessons > 0
            ? Math.round((completedCount / totalLessons) * 100)
            : 0
    const currentLessonIndex = allLessons.findIndex(
        (l) =>
            l.sectionIdx === currentLesson.sectionIdx &&
            l.lessonIdx === currentLesson.lessonIdx,
    )
    const goToNext = () => {
        if (currentLessonIndex < allLessons.length - 1) {
            const next = allLessons[currentLessonIndex + 1]
            setCurrentLesson({
                sectionIdx: next.sectionIdx,
                lessonIdx: next.lessonIdx,
            })
            setReadingProgress(0)
        }
    }
    const goToPrev = () => {
        if (currentLessonIndex > 0) {
            const prev = allLessons[currentLessonIndex - 1]
            setCurrentLesson({
                sectionIdx: prev.sectionIdx,
                lessonIdx: prev.lessonIdx,
            })
            setReadingProgress(0)
        }
    }
    const toggleSection = (sectionId: string) => {
        setExpandedSections((prev) => {
            const next = new Set(prev)
            if (next.has(sectionId)) next.delete(sectionId)
            else next.add(sectionId)
            return next
        })
    }
    const handleArticleScroll = () => {
        if (!articleRef.current) return
        const { scrollTop, scrollHeight, clientHeight } = articleRef.current
        const windowHeight = scrollHeight - clientHeight
        const currentProgress =
            windowHeight > 0 ? (scrollTop / windowHeight) * 100 : 0
        setReadingProgress(currentProgress)
    }
    const getYoutubeEmbed = (url?: string) => {
        if (!url) return ''
        const id = url.split('v=')[1]?.split('&')[0]
        return `https://www.youtube.com/embed/${id}`
    }
    return (
        <div className="flex flex-col h-screen bg-gray-50 overflow-hidden font-sans">
            {/* Top bar */}
            <header className="flex items-center justify-between px-4 h-14 bg-white border-b border-gray-200 flex-shrink-0 z-20">
                <div className="flex items-center gap-3 min-w-0">

                    <Link to="/" className="flex items-center gap-2 flex-shrink-0">
                        <div className="w-7 h-7 bg-primary-600 rounded-lg flex items-center justify-center">
                            <BookOpenIcon className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-gray-900 hidden sm:block text-sm">
                            EduViet
                        </span>
                    </Link>
                    <span className="text-gray-400 hidden md:block">·</span>
                    <span className="text-gray-600 text-sm hidden md:block truncate max-w-xs font-medium">
                        {course.title}
                    </span>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="hidden sm:flex items-center gap-2">
                        <span className="text-xs text-gray-500 font-medium">
                            {completedCount}/{totalLessons}
                        </span>
                        <div className="w-28">
                            <ProgressBar
                                progress={progress}
                                showLabel={false}
                                size="sm"
                                color="green"
                            />
                        </div>
                        <span className="text-xs font-semibold text-emerald-600">
                            {progress}%
                        </span>
                    </div>
                    <Link
                        to={routes.courseDetail.replace(":slug", currentLessonData.slug)}
                        className="text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-100 border border-gray-200"
                    >
                        Tổng quan
                    </Link>
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                        aria-label="Toggle sidebar"
                    >
                        <MenuIcon className="w-5 h-5" />
                    </button>
                    <Link
                        to="/"
                        className="text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-100"
                    >
                        Thoát
                    </Link>
                </div>
            </header>

            {/* Main layout */}
            <div className="flex flex-1 overflow-hidden relative">

                {/* Center: Media + Content */}
                <div className="flex-1 flex flex-col overflow-hidden relative">
                    {/* Media area (Video OR Article) */}
                    {currentLessonData?.lesson_type === 'article' ? (
                        <div
                            ref={articleRef}
                            onScroll={handleArticleScroll}
                            className="flex-1 bg-white overflow-y-auto relative"
                        >
                            {/* Sticky Progress Bar */}
                            <div className="sticky top-0 left-0 w-full h-1 bg-gray-100 z-10">
                                <div
                                    className="h-full bg-primary-500 transition-all duration-150 ease-out"
                                    style={{
                                        width: `${readingProgress}%`,
                                    }}
                                />
                            </div>

                            {/* Article Header */}
                            <div className="bg-primary-50 mx-10 mt-5 rounded-3xl py-16 px-6 flex flex-col items-center justify-center text-center border border-primary-100">
                                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                                    <FileTextIcon className="w-8 h-8 text-primary-600" />
                                </div>

                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 max-w-3xl leading-tight">
                                    {currentLessonData.title}
                                </h1>

                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <span className="flex items-center gap-1.5">
                                        <BookOpenIcon className="w-4 h-4 text-primary-500" />
                                        {currentSection?.title}
                                    </span>

                                    <span className="text-gray-300">•</span>

                                    <span className="flex items-center gap-1.5">
                                        <ClockIcon className="w-4 h-4 text-primary-500" />
                                        {currentLessonData.duration} phút đọc
                                    </span>
                                </div>
                            </div>

                            {/* Article Content */}
                            <div className="max-w-3xl mx-auto px-6 py-12 pb-32">
                                <div
                                    className="prose-custom text-gray-800
                    [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mb-4 [&>h2]:mt-10 [&>h2]:pb-2 [&>h2]:border-b [&>h2]:border-gray-100
                    [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-gray-800 [&>h3]:mb-3 [&>h3]:mt-8
                    [&>p]:text-gray-600 [&>p]:leading-relaxed [&>p]:mb-6 [&>p]:text-[1.05rem]
                    [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul>li]:text-gray-600 [&>ul>li]:mb-2 [&>ul>li]:leading-relaxed
                    [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol>li]:text-gray-600 [&>ol>li]:mb-2 [&>ol>li]:leading-relaxed
                    [&>pre]:bg-gray-900 [&>pre]:text-gray-100 [&>pre]:p-5 [&>pre]:rounded-xl [&>pre]:overflow-x-auto [&>pre]:mb-6 [&>pre]:shadow-md [&>pre]:text-sm [&>pre]:leading-relaxed
                    [&>code]:bg-gray-100 [&>code]:text-pink-600 [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded-md [&>code]:text-sm [&>code]:font-mono
                    [&>blockquote]:border-l-4 [&>blockquote]:border-primary-500 [&>blockquote]:bg-gray-50 [&>blockquote]:p-5 [&>blockquote]:italic [&>blockquote]:text-gray-700 [&>blockquote]:mb-6 [&>blockquote]:rounded-r-xl
                    [&>strong]:font-semibold [&>strong]:text-gray-900
                    [&>a]:text-primary-600 [&>a]:underline [&>a]:underline-offset-2
                  "
                                    dangerouslySetInnerHTML={{
                                        __html: currentLessonData.content || '',
                                    }}
                                />

                                {/* Mark as Complete Button */}
                                <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col items-center">
                                    <p className="text-gray-500 mb-4 text-sm">
                                        Bạn đã đọc xong bài viết này?
                                    </p>
                                    <button onClick={() => markLessonComplete(currentLessonData._id)}
                                        className="bg-primary-50 hover:bg-primary-100 flex items-center gap-2 px-8 py-3.5  text-gray-600 font-medium rounded-xl  hover:shadow-lg hover:shadow-emerald-500/20 transition-all active:scale-95">
                                        <CheckCircleIcon className="w-5 h-5" />
                                        Đánh dấu hoàn thành
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 bg-black flex flex-col min-h-0">
                            <div className="flex-1 flex items-center justify-center bg-black">
                                <div className="w-full max-w-6xl aspect-video">
                                    <iframe
                                        className="w-full h-full rounded-lg"
                                        src={getYoutubeEmbed(currentLessonData?.video_url)}
                                        title="Course video"
                                        allow="autoplay; encrypted-media"
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation bar (Bottom) */}
                    <div className="bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between flex-shrink-0 z-10">
                        <button
                            onClick={goToPrev}
                            disabled={currentLessonIndex === 0}
                            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-100"
                        >
                            <ChevronLeftIcon className="w-4 h-4" />
                            Bài trước
                        </button>
                        <div className="text-center hidden sm:block">
                            <p className="text-gray-900 text-sm font-semibold truncate max-w-xs">
                                {currentLessonData?.title}
                            </p>
                            <p className="text-gray-500 text-xs mt-0.5 font-medium">
                                {currentSection?.title}
                            </p>
                        </div>
                        <button
                            onClick={goToNext}
                            disabled={currentLessonIndex === allLessons.length - 1}
                            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-100"
                        >
                            Bài tiếp
                            <ChevronRightIcon className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Floating Q&A Button */}
                    <button
                        onClick={() => setQaPanelOpen(true)}
                        className="absolute bottom-20 right-6 z-20 flex items-center gap-2 bg-white text-gray-700 px-5 py-3 rounded-full shadow-lg border border-gray-200 font-medium hover:bg-gray-50 hover:text-primary-600 transition-all hover:scale-105 active:scale-95"
                    >
                        <MessagesSquare className="w-5 h-5" />
                        Hỏi & Đáp
                    </button>
                </div>
                {/* Sidebar */}
                <AnimatePresence>
                    {sidebarOpen && (
                        <motion.aside
                            initial={{
                                width: 0,
                                opacity: 0,
                            }}
                            animate={{
                                width: 320,
                                opacity: 1,
                            }}
                            exit={{
                                width: 0,
                                opacity: 0,
                            }}
                            transition={{
                                duration: 0.2,
                                ease: 'easeInOut',
                            }}
                            className="flex-shrink-0 bg-white border-r border-gray-200 overflow-hidden flex flex-col z-10"
                        >
                            <div className="p-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
                                <h3 className="font-semibold text-gray-900 text-sm">
                                    Nội dung khóa học
                                </h3>
                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <XIcon className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto">
                                {course.curriculum.map((section, ci) => (
                                    <div key={section._id} className="border-b border-gray-100">
                                        <button
                                            onClick={() => toggleSection(section._id)}
                                            className="w-full flex items-start justify-between p-4 hover:bg-gray-50 transition-colors text-left"
                                        >
                                            <div className="flex-1 min-w-0 pr-2">
                                                <p className="text-sm font-semibold text-gray-800 leading-snug">
                                                    Chương {ci + 1}: {section.title}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-0.5 font-medium">
                                                    {section.lessons.length} bài học
                                                </p>
                                            </div>
                                            {expandedSections.has(section._id) ? (
                                                <ChevronUpIcon className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                                            ) : (
                                                <ChevronDownIcon className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                                            )}
                                        </button>
                                        {expandedSections.has(section._id) && (
                                            <div>
                                                {section.lessons.map((lesson, li) => {
                                                    const isActive =
                                                        ci === currentLesson.sectionIdx &&
                                                        li === currentLesson.lessonIdx
                                                    return (
                                                        <button
                                                            key={lesson._id}
                                                            onClick={() => {
                                                                setCurrentLesson({
                                                                    sectionIdx: ci,
                                                                    lessonIdx: li,
                                                                })
                                                                setReadingProgress(0)
                                                            }}
                                                            className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-l-2 ${isActive ? 'bg-primary-50 border-primary-500' : 'hover:bg-gray-50 border-transparent'}`}
                                                        >
                                                            <div className="flex-shrink-0 mt-0.5">
                                                                {lesson.lesson_type === 'video' ? (
                                                                    <PlayCircleIcon
                                                                        className={`w-4 h-4 ${isActive ? 'text-primary-600' : 'text-gray-400'}`}
                                                                    />
                                                                ) : (
                                                                    <FileTextIcon
                                                                        className={`w-4 h-4 ${isActive ? 'text-primary-600' : 'text-gray-400'}`}
                                                                    />
                                                                )}


                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p
                                                                    className={`text-xs leading-snug line-clamp-2 ${isActive ? 'text-gray-900 font-semibold' : 'text-gray-600 font-medium'}`}
                                                                >
                                                                    {lesson.title}
                                                                </p>
                                                                <p className="text-xs text-gray-400 mt-0.5">
                                                                    {lesson.lesson_type === 'article'
                                                                        ? `${lesson.duration ?? 0} phút đọc`
                                                                        : lesson.duration}
                                                                </p>
                                                            </div>
                                                            {completedLessons.has(lesson._id) ? (
                                                                <CircleCheckBig className="w-4 h-4 text-emerald-500" />
                                                            ) : ''}
                                                        </button>
                                                    )
                                                })}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.aside>
                    )}
                </AnimatePresence>

            </div>

            {/* Q&A Slide-in Panel */}
            <AnimatePresence>
                {qaPanelOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            exit={{
                                opacity: 0,
                            }}
                            onClick={() => setQaPanelOpen(false)}
                            className="fixed inset-0 bg-black/30 z-40"
                        />

                        {/* Panel */}
                        <motion.div
                            initial={{
                                x: '100%',
                            }}
                            animate={{
                                x: 0,
                            }}
                            exit={{
                                x: '100%',
                            }}
                            transition={{
                                type: 'spring',
                                damping: 25,
                                stiffness: 200,
                            }}
                            className="fixed top-0 right-0 bottom-0 w-full max-w-[450px] bg-white shadow-2xl z-50 flex flex-col"
                        >
                            {/* Panel Header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                                <h2 className="text-lg font-bold text-gray-900">
                                    21 bình luận
                                </h2>
                                <button
                                    onClick={() => setQaPanelOpen(false)}
                                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <XIcon className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Panel Content (Scrollable) */}
                            <div className="flex-1 overflow-y-auto p-5">
                                {/* Input Area */}
                                <div className="flex gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center overflow-hidden">
                                        <img
                                            src="https://i.pravatar.cc/150?img=11"
                                            alt="You"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <input className="bg-gray-100 rounded-2xl px-4 py-3 text-sm text-gray-500 cursor-text hover:bg-gray-200 transition-colors w-full" placeholder=' Nhập bình luận mới của bạn' />


                                    </div>
                                </div>

                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-xs text-gray-400 italic">
                                        Nếu thấy bình luận spam, các bạn bấm report giúp admin nhé
                                    </span>
                                </div>

                                {/* Comments List */}
                                <div className="space-y-6">
                                    {/* Comment 1 */}
                                    <div className="flex gap-3">
                                        <img
                                            src="https://i.pravatar.cc/150?img=32"
                                            alt="zone Ri"
                                            className="w-10 h-10 rounded-full flex-shrink-0 object-cover"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-baseline gap-2 mb-1">
                                                <span className="font-semibold text-sm text-blue-600 hover:underline cursor-pointer">
                                                    zone Ri
                                                </span>
                                                <span className="text-xs text-gray-400">
                                                    8 tháng trước
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-800 leading-relaxed mb-2">
                                                01/07/2025 Mình thử không dùng{' '}
                                                <code className="bg-gray-100 text-teal-600 px-1.5 py-0.5 rounded text-xs font-mono">
                                                    app.use(express.json());
                                                </code>{' '}
                                                thì nó vẫn work bình thường :V có vẻ nó đã được tích hợp
                                                chăn
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4 text-xs font-semibold text-blue-600">
                                                    <button className="hover:underline">Thích</button>
                                                    <button className="hover:underline">Phản hồi</button>
                                                </div>
                                                <div className="flex items-center gap-3 text-gray-400">
                                                    <div className="flex items-center gap-1 text-xs">
                                                        <ThumbsUpIcon className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />
                                                        <span>3</span>
                                                    </div>
                                                    <button className="hover:text-gray-600">
                                                        <MoreHorizontalIcon className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Comment 2 */}
                                    <div className="flex gap-3">
                                        <img
                                            src="https://i.pravatar.cc/150?img=12"
                                            alt="Phúc Trang Mạnh"
                                            className="w-10 h-10 rounded-full flex-shrink-0 object-cover"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-baseline gap-2 mb-1">
                                                <span className="font-semibold text-sm text-blue-600 hover:underline cursor-pointer">
                                                    Phúc Trang Mạnh
                                                </span>
                                                <span className="text-xs text-gray-400">
                                                    một năm trước
                                                </span>
                                            </div>
                                            <div className="mb-2 rounded-lg overflow-hidden border border-gray-200">
                                                <img
                                                    src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop"
                                                    alt="Code screenshot"
                                                    className="w-full h-auto"
                                                />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4 text-xs font-semibold text-blue-600">
                                                    <button className="hover:underline">Thích</button>
                                                    <button className="hover:underline">Phản hồi</button>
                                                </div>
                                                <div className="flex items-center gap-3 text-gray-400">
                                                    <button className="hover:text-gray-600">
                                                        <MoreHorizontalIcon className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Comment 3 */}
                                    <div className="flex gap-3">
                                        <img
                                            src="https://i.pravatar.cc/150?img=68"
                                            alt="Nguyễn Văn A"
                                            className="w-10 h-10 rounded-full flex-shrink-0 object-cover"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-baseline gap-2 mb-1">
                                                <span className="font-semibold text-sm text-blue-600 hover:underline cursor-pointer">
                                                    Nguyễn Văn A
                                                </span>
                                                <span className="text-xs text-gray-400">
                                                    2 ngày trước
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-800 leading-relaxed mb-2">
                                                Bài giảng rất chi tiết và dễ hiểu. Cảm ơn admin nhiều ạ!
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4 text-xs font-semibold text-blue-600">
                                                    <button className="hover:underline">Thích</button>
                                                    <button className="hover:underline">Phản hồi</button>
                                                </div>
                                                <div className="flex items-center gap-3 text-gray-400">
                                                    <div className="flex items-center gap-1 text-xs">
                                                        <ThumbsUpIcon className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />
                                                        <span>12</span>
                                                    </div>
                                                    <button className="hover:text-gray-600">
                                                        <MoreHorizontalIcon className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}
