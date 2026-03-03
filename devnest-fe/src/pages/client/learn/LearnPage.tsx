import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    MenuIcon,
    XIcon,
    BookOpenIcon,
    PlayCircleIcon,
    CheckCircleIcon,
    HelpCircleIcon,
    FileTextIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ThumbsUpIcon,
    ThumbsDownIcon,
    MessageSquareIcon,
    StickyNoteIcon,
    SkipBackIcon,
    SkipForwardIcon,
    PauseIcon,
    MaximizeIcon,
    SettingsIcon,
    SubtitlesIcon,
} from 'lucide-react'
import { courses } from '@/data/mockData'
import { ProgressBar } from '@/components/client/progressbar/ProgressBar'

export function LearnPage() {
    const { id } = useParams<{
        id: string
    }>()
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [currentLesson, setCurrentLesson] = useState({
        chapterIdx: 0,
        lessonIdx: 0,
    })
    const [expandedChapters, setExpandedChapters] = useState<Set<string>>(
        new Set(['c1', 'c2', 'c3', 'c4']),
    )
    const [activeTab, setActiveTab] = useState<'overview' | 'notes' | 'qa'>(
        'overview',
    )
    const [noteText, setNoteText] = useState('')
    const [noteSaved, setNoteSaved] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [qaText, setQaText] = useState('')
    const course = courses.find((c) => c.id === id) || courses[0]
    const allLessons = course.curriculum.flatMap((ch, ci) =>
        ch.lessons.map((l, li) => ({
            ...l,
            chapterIdx: ci,
            lessonIdx: li,
            chapterTitle: ch.title,
        })),
    )
    const currentChapter = course.curriculum[currentLesson.chapterIdx]
    const currentLessonData = currentChapter?.lessons[currentLesson.lessonIdx]
    const totalLessons = allLessons.length
    const completedLessons = allLessons.filter((l) => l.isCompleted).length
    const progress = Math.round((completedLessons / totalLessons) * 100)
    const currentLessonIndex = allLessons.findIndex(
        (l) =>
            l.chapterIdx === currentLesson.chapterIdx &&
            l.lessonIdx === currentLesson.lessonIdx,
    )
    const goToNext = () => {
        if (currentLessonIndex < allLessons.length - 1) {
            const next = allLessons[currentLessonIndex + 1]
            setCurrentLesson({
                chapterIdx: next.chapterIdx,
                lessonIdx: next.lessonIdx,
            })
        }
    }
    const goToPrev = () => {
        if (currentLessonIndex > 0) {
            const prev = allLessons[currentLessonIndex - 1]
            setCurrentLesson({
                chapterIdx: prev.chapterIdx,
                lessonIdx: prev.lessonIdx,
            })
        }
    }
    const toggleChapter = (chapterId: string) => {
        setExpandedChapters((prev) => {
            const next = new Set(prev)
            if (next.has(chapterId)) next.delete(chapterId)
            else next.add(chapterId)
            return next
        })
    }
    const handleSaveNote = () => {
        setNoteSaved(true)
        setTimeout(() => setNoteSaved(false), 2000)
    }
    return (
        <div className="flex flex-col h-screen bg-gray-900 overflow-hidden">
            {/* Top bar */}
            <header className="flex items-center justify-between px-4 h-14 bg-gray-900 border-b border-gray-700 flex-shrink-0 z-20">
                <div className="flex items-center gap-3 min-w-0">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
                        aria-label="Toggle sidebar"
                    >
                        <MenuIcon className="w-5 h-5" />
                    </button>
                    <Link to="/" className="flex items-center gap-2 flex-shrink-0">
                        <div className="w-7 h-7 bg-primary-600 rounded-lg flex items-center justify-center">
                            <BookOpenIcon className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-white hidden sm:block text-sm">
                            DevNest
                        </span>
                    </Link>
                    <span className="text-gray-600 hidden md:block">·</span>
                    <span className="text-gray-300 text-sm hidden md:block truncate max-w-xs">
                        {course.title}
                    </span>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="hidden sm:flex items-center gap-2">
                        <span className="text-xs text-gray-400">
                            {completedLessons}/{totalLessons}
                        </span>
                        <div className="w-28">
                            <ProgressBar
                                progress={progress}
                                showLabel={false}
                                size="sm"
                                color="green"
                            />
                        </div>
                        <span className="text-xs font-semibold text-emerald-400">
                            {progress}%
                        </span>
                    </div>
                    <Link
                        to={`/courses/${course.id}`}
                        className="text-xs text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-700 border border-gray-700"
                    >
                        Tổng quan
                    </Link>
                    <Link
                        to="/"
                        className="text-xs text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-700"
                    >
                        Thoát
                    </Link>
                </div>
            </header>

            {/* Main layout */}
            <div className="flex flex-1 overflow-hidden">
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
                            className="flex-shrink-0 bg-gray-800 border-r border-gray-700 overflow-hidden flex flex-col"
                        >
                            <div className="p-4 border-b border-gray-700 flex items-center justify-between flex-shrink-0">
                                <h3 className="font-semibold text-white text-sm">
                                    Nội dung khóa học
                                </h3>
                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                                >
                                    <XIcon className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto">
                                {course.curriculum.map((chapter, ci) => (
                                    <div key={chapter.id} className="border-b border-gray-700/50">
                                        <button
                                            onClick={() => toggleChapter(chapter.id)}
                                            className="w-full flex items-start justify-between p-4 hover:bg-gray-700/40 transition-colors text-left"
                                        >
                                            <div className="flex-1 min-w-0 pr-2">
                                                <p className="text-sm font-medium text-gray-200 leading-snug">
                                                    Chương {ci + 1}: {chapter.title}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-0.5">
                                                    {chapter.lessons.length} bài học
                                                </p>
                                            </div>
                                            {expandedChapters.has(chapter.id) ? (
                                                <ChevronUpIcon className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                                            ) : (
                                                <ChevronDownIcon className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                                            )}
                                        </button>

                                        {expandedChapters.has(chapter.id) && (
                                            <div>
                                                {chapter.lessons.map((lesson, li) => {
                                                    const isActive =
                                                        ci === currentLesson.chapterIdx &&
                                                        li === currentLesson.lessonIdx
                                                    return (
                                                        <button
                                                            key={lesson.id}
                                                            onClick={() =>
                                                                setCurrentLesson({
                                                                    chapterIdx: ci,
                                                                    lessonIdx: li,
                                                                })
                                                            }
                                                            className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-colors border-l-2 ${isActive ? 'bg-primary-600/20 border-primary-500' : 'hover:bg-gray-700/30 border-transparent'}`}
                                                        >
                                                            <div className="flex-shrink-0 mt-0.5">
                                                                {lesson.isCompleted ? (
                                                                    <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
                                                                ) : lesson.type === 'video' ? (
                                                                    <PlayCircleIcon
                                                                        className={`w-4 h-4 ${isActive ? 'text-primary-400' : 'text-gray-500'}`}
                                                                    />
                                                                ) : lesson.type === 'quiz' ? (
                                                                    <HelpCircleIcon className="w-4 h-4 text-amber-400" />
                                                                ) : (
                                                                    <FileTextIcon className="w-4 h-4 text-gray-500" />
                                                                )}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p
                                                                    className={`text-xs leading-snug line-clamp-2 ${isActive ? 'text-white font-medium' : 'text-gray-400'}`}
                                                                >
                                                                    {lesson.title}
                                                                </p>
                                                                <p className="text-xs text-gray-600 mt-0.5">
                                                                    {lesson.duration}
                                                                </p>
                                                            </div>
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

                {/* Center: Video + Content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Video area */}
                    <div className="bg-black flex-shrink-0">
                        <div className="max-w-5xl mx-auto w-full">
                            <div className="relative aspect-video bg-gray-900 flex items-center justify-center group">
                                <img
                                    src={course.thumbnail}
                                    alt="Video"
                                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <button
                                        onClick={() => setIsPlaying(!isPlaying)}
                                        className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all shadow-2xl hover:scale-105 mb-3"
                                    >
                                        {isPlaying ? (
                                            <PauseIcon className="w-9 h-9 text-primary-600" />
                                        ) : (
                                            <PlayCircleIcon className="w-9 h-9 text-primary-600" />
                                        )}
                                    </button>
                                    <p className="text-white font-semibold text-lg drop-shadow-lg">
                                        {currentLessonData?.title}
                                    </p>
                                    <p className="text-gray-300 text-sm mt-1">
                                        {currentLessonData?.duration}
                                    </p>
                                </div>

                                {/* Video controls */}
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    {/* Progress scrubber */}
                                    <div className="w-full bg-gray-600/60 rounded-full h-1.5 mb-3 cursor-pointer hover:h-2.5 transition-all">
                                        <div className="bg-primary-500 h-full rounded-full w-1/3 relative">
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100" />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between text-white">
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={goToPrev}
                                                className="hover:text-primary-400 transition-colors"
                                                aria-label="Previous"
                                            >
                                                <SkipBackIcon className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => setIsPlaying(!isPlaying)}
                                                className="hover:text-primary-400 transition-colors"
                                            >
                                                {isPlaying ? (
                                                    <PauseIcon className="w-6 h-6" />
                                                ) : (
                                                    <PlayCircleIcon className="w-6 h-6" />
                                                )}
                                            </button>
                                            <button
                                                onClick={goToNext}
                                                className="hover:text-primary-400 transition-colors"
                                                aria-label="Next"
                                            >
                                                <SkipForwardIcon className="w-5 h-5" />
                                            </button>
                                            <span className="text-xs text-gray-300">
                                                0:00 / {currentLessonData?.duration}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button className="text-xs text-gray-300 hover:text-white px-2 py-0.5 border border-gray-600 rounded">
                                                1x
                                            </button>
                                            <button
                                                className="hover:text-primary-400 transition-colors"
                                                aria-label="Subtitles"
                                            >
                                                <SubtitlesIcon className="w-4 h-4" />
                                            </button>
                                            <button
                                                className="hover:text-primary-400 transition-colors"
                                                aria-label="Settings"
                                            >
                                                <SettingsIcon className="w-4 h-4" />
                                            </button>
                                            <button
                                                className="hover:text-primary-400 transition-colors"
                                                aria-label="Fullscreen"
                                            >
                                                <MaximizeIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation bar */}
                    <div className="bg-gray-800 border-t border-gray-700 px-4 py-3 flex items-center justify-between flex-shrink-0">
                        <button
                            onClick={goToPrev}
                            disabled={currentLessonIndex === 0}
                            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-700"
                        >
                            <ChevronLeftIcon className="w-4 h-4" />
                            Bài trước
                        </button>

                        <div className="text-center hidden sm:block">
                            <p className="text-white text-sm font-medium truncate max-w-xs">
                                {currentLessonData?.title}
                            </p>
                            <p className="text-gray-500 text-xs mt-0.5">
                                {currentChapter?.title}
                            </p>
                        </div>

                        <button
                            onClick={goToNext}
                            disabled={currentLessonIndex === allLessons.length - 1}
                            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-700"
                        >
                            Bài tiếp
                            <ChevronRightIcon className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Bottom content tabs */}
                    <div className="flex-1 bg-white overflow-y-auto">
                        <div className="border-b border-gray-100 sticky top-0 bg-white z-10">
                            <div className="flex gap-0 px-4">
                                {[
                                    {
                                        id: 'overview',
                                        label: 'Tổng quan',
                                        icon: PlayCircleIcon,
                                    },
                                    {
                                        id: 'notes',
                                        label: 'Ghi chú',
                                        icon: StickyNoteIcon,
                                    },
                                    {
                                        id: 'qa',
                                        label: 'Hỏi & Đáp',
                                        icon: MessageSquareIcon,
                                    },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as typeof activeTab)}
                                        className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                                    >
                                        <tab.icon className="w-4 h-4" />
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="p-5 max-w-3xl">
                            {activeTab === 'overview' && (
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                                        {currentLessonData?.title}
                                    </h2>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        Trong bài học này, bạn sẽ tìm hiểu về các khái niệm cơ bản
                                        và cách áp dụng vào thực tế. Hãy chú ý theo dõi và thực hành
                                        theo từng bước hướng dẫn để nắm vững kiến thức.
                                    </p>
                                    <div className="flex gap-3">
                                        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600 px-4 py-2 border border-gray-200 rounded-xl hover:border-emerald-200 hover:bg-emerald-50 transition-colors">
                                            <ThumbsUpIcon className="w-4 h-4" /> Hữu ích
                                        </button>
                                        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-500 px-4 py-2 border border-gray-200 rounded-xl hover:border-red-200 hover:bg-red-50 transition-colors">
                                            <ThumbsDownIcon className="w-4 h-4" /> Không hữu ích
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'notes' && (
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-3">
                                        Ghi chú của bạn
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-3">
                                        Ghi chú sẽ được lưu tại mốc thời gian hiện tại trong video.
                                    </p>
                                    <textarea
                                        value={noteText}
                                        onChange={(e) => setNoteText(e.target.value)}
                                        placeholder="Ghi chú của bạn cho bài học này..."
                                        className="w-full h-32 p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                                    />
                                    <div className="flex items-center gap-3 mt-2">
                                        <button
                                            onClick={handleSaveNote}
                                            className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
                                        >
                                            Lưu ghi chú
                                        </button>
                                        {noteSaved && (
                                            <motion.span
                                                initial={{
                                                    opacity: 0,
                                                    x: -10,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    x: 0,
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                }}
                                                className="text-sm text-emerald-600 flex items-center gap-1"
                                            >
                                                <CheckCircleIcon className="w-4 h-4" /> Đã lưu!
                                            </motion.span>
                                        )}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'qa' && (
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-3">
                                        Hỏi & Đáp
                                    </h3>
                                    <div className="flex gap-3 mb-6">
                                        <img
                                            src="https://picsum.photos/seed/user1/40/40"
                                            alt="You"
                                            className="w-9 h-9 rounded-full flex-shrink-0 object-cover"
                                        />
                                        <div className="flex-1">
                                            <textarea
                                                value={qaText}
                                                onChange={(e) => setQaText(e.target.value)}
                                                placeholder="Đặt câu hỏi cho giảng viên..."
                                                className="w-full h-20 p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                                            />
                                            <button
                                                onClick={() => setQaText('')}
                                                className="mt-2 flex items-center gap-2 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
                                            >
                                                <MessageSquareIcon className="w-4 h-4" /> Gửi câu hỏi
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {[
                                            {
                                                q: 'Tại sao chúng ta cần sử dụng TypeScript thay vì JavaScript thuần?',
                                                a: 'TypeScript cung cấp type safety, giúp phát hiện lỗi sớm trong quá trình phát triển và cải thiện trải nghiệm developer với autocomplete tốt hơn.',
                                                user: 'Nguyễn Văn A',
                                                avatar: 'https://picsum.photos/seed/qa1/40/40',
                                                time: '2 ngày trước',
                                            },
                                            {
                                                q: 'Có thể dùng Vite thay cho Create React App không?',
                                                a: 'Hoàn toàn có thể! Vite nhanh hơn nhiều so với CRA và đang được khuyến nghị sử dụng cho các dự án mới.',
                                                user: 'Trần Thị B',
                                                avatar: 'https://picsum.photos/seed/qa2/40/40',
                                                time: '3 ngày trước',
                                            },
                                        ].map((item, i) => (
                                            <div key={i} className="bg-gray-50 rounded-xl p-4">
                                                <div className="flex items-start gap-3 mb-3">
                                                    <img
                                                        src={item.avatar}
                                                        alt={item.user}
                                                        className="w-8 h-8 rounded-full object-cover"
                                                    />
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-sm font-semibold text-gray-900">
                                                                {item.user}
                                                            </span>
                                                            <span className="text-xs text-gray-400">
                                                                {item.time}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-gray-700 mt-1">
                                                            {item.q}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="ml-11 bg-white rounded-lg p-3 border border-gray-100">
                                                    <p className="text-xs font-semibold text-primary-600 mb-1">
                                                        Giảng viên trả lời:
                                                    </p>
                                                    <p className="text-sm text-gray-700">{item.a}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
