import { Badge } from '@/components/ui/badge'
import { Modal } from '@/components/ui/modal'
import { useGetSlugParams } from '@/hooks/common'
import { useGetCourseBySlug } from '@/hooks/course'
import { useCreateSection, useDeleteSection, useGetSections, useUpdateSection } from '@/hooks/section'
import { SectionPayload, SectionResponse } from '@/types/section.type'
import {
    ArrowLeftIcon,
    CheckCircleIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    ClockIcon,
    EditIcon,
    EyeIcon,
    FileVideoIcon,
    GripVerticalIcon,
    LinkIcon,
    LockIcon,
    PlayCircleIcon,
    PlusIcon,
    TrashIcon,
    UnlockIcon,
    VideoIcon
} from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface Video {
    url: string
    type: 'youtube' | 'direct' | 'none'
}
interface Lesson {
    id: number
    title: string
    description: string
    duration: string
    video: Video
    isFree: boolean
    order: number
}

function getYoutubeId(url: string): string | null {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
}
function detectVideoType(url: string): 'youtube' | 'direct' | 'none' {
    if (!url) return 'none'
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube'
    return 'direct'
}
interface LessonFormData {
    title: string
    description: string
    duration: string
    videoUrl: string
    isFree: boolean
}
const emptyLessonForm: LessonFormData = {
    title: '',
    description: '',
    duration: '',
    videoUrl: '',
    isFree: false,
}
interface CourseContentPageProps {
    courseId: number
    onBack: () => void
}
export function CourseContentPage({
    courseId,
    onBack,
}: CourseContentPageProps) {
    const slug = useGetSlugParams("slug")
    const { data: sections = [] } = useGetSections()
    const { data: course } = useGetCourseBySlug(slug!)
    const createSectionAsync = useCreateSection()
    const updateSectionAsync = useUpdateSection()
    const deleteSectionAsync = useDeleteSection()
    // const [chapters, setChapters] = useState<Chapter[]>(initialChapters)
    // Chapter modal
    const [isSectionModalOpen, setIsSectionModalOpen] = useState(false)
    const [editingSection, setEditingSection] = useState<SectionPayload | null>(null)
    // Lesson modal
    const [isLessonModalOpen, setIsLessonModalOpen] = useState(false)
    const [editingLesson, setEditingLesson] = useState<Lesson | null>(null)
    const [targetSectionId, setTargetSectionId] = useState<string | null>(null)
    const [lessonForm, setLessonForm] = useState<LessonFormData>(emptyLessonForm)
    const [videoPreview, setVideoPreview] = useState(false)
    // Delete confirm
    const [deleteTarget, setDeleteTarget] = useState<{
        type: 'section' | 'lesson'
        sectionId: string
        lessonId?: string
    } | null>(null)
    const {
        register,
        reset,
        setValue,
        handleSubmit,
        formState: { error, isSubmitting }
    } = useForm()
    const onSubmit = async (data: { title: string }) => {
        try {
            if (editingSection) {
                await updateSectionAsync.mutateAsync({
                    id: editingSection._id,
                    title: data.title
                })
                setIsSectionModalOpen(false)
            } else {
                await createSectionAsync.mutateAsync(
                    {
                        course_id: course?._id,
                        title: data.title
                    }
                )
                setIsSectionModalOpen(false)
            }
            setEditingSection(null)
            reset()

        } catch (error) {
            console.log(error)
        }
    }
    const totalLessons = sections.reduce((sum, ch) => sum + ch.lessons.length, 0)
    const lessonsWithVideo = sections.reduce(
        (sum, ch) => sum + ch.lessons.filter((l) => l.video_url).length,
        0,
    )
    // Chapter actions
    const openEditSection = (section: SectionResponse) => {
        setEditingSection(section)
        setIsSectionModalOpen(true)
        setValue("title", section.title)
    }

    const deleteSection = (sectionId: string) => {
        deleteSectionAsync.mutateAsync(sectionId, {
            onSuccess: () => {
                setDeleteTarget(null)
            }
        })
        setDeleteTarget(null)
    }
    // Lesson actions
    const openAddLesson = (chapterId: number) => {
        setEditingLesson(null)
        setTargetChapterId(chapterId)
        setLessonForm(emptyLessonForm)
        setVideoPreview(false)
        setIsLessonModalOpen(true)
    }
    const openEditLesson = (chapterId: number, lesson: Lesson) => {
        setEditingLesson(lesson)
        setTargetChapterId(chapterId)
        setLessonForm({
            title: lesson.title,
            description: lesson.description,
            duration: lesson.duration,
            videoUrl: lesson.video.url,
            isFree: lesson.isFree,
        })
        setVideoPreview(false)
        setIsLessonModalOpen(true)
    }
    const saveLesson = () => {
        if (!lessonForm.title.trim() || targetChapterId === null) return
        const videoType = detectVideoType(lessonForm.videoUrl)
        const video: Video = {
            url: lessonForm.videoUrl,
            type: videoType,
        }
        if (editingLesson) {
            setChapters((prev) =>
                prev.map((ch) =>
                    ch.id === targetChapterId
                        ? {
                            ...ch,
                            lessons: ch.lessons.map((l) =>
                                l.id === editingLesson.id
                                    ? {
                                        ...l,
                                        title: lessonForm.title,
                                        description: lessonForm.description,
                                        duration: lessonForm.duration,
                                        video,
                                        isFree: lessonForm.isFree,
                                    }
                                    : l,
                            ),
                        }
                        : ch,
                ),
            )
        } else {
            const chapter = sections.find((ch) => ch._id === targetChapterId)
            const newLesson: Lesson = {
                id: Date.now(),
                title: lessonForm.title,
                description: lessonForm.description,
                duration: lessonForm.duration,
                video,
                isFree: lessonForm.isFree,
                order: (chapter?.lessons.length ?? 0) + 1,
            }
            setChapters((prev) =>
                prev.map((ch) =>
                    ch.id === targetChapterId
                        ? {
                            ...ch,
                            lessons: [...ch.lessons, newLesson],
                            isExpanded: true,
                        }
                        : ch,
                ),
            )
        }
        setIsLessonModalOpen(false)
    }
    const deleteLesson = () => {

    }
    const youtubeId = lessonForm.videoUrl
        ? getYoutubeId(lessonForm.videoUrl)
        : null

    return (
        <div className="space-y-5">
            {/* Back + Course Header */}
            <div className="flex items-start gap-4">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 font-medium transition-colors mt-0.5 flex-shrink-0"
                >
                    <ArrowLeftIcon className="w-4 h-4" />
                    Quay lại
                </button>
            </div>

            {/* Course Info Banner */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div
                    className={`h-2 bg-gradient-to-r from-indigo-500 to-purple-600`}
                />
                <div className="p-5 flex items-center gap-4">
                    <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center flex-shrink-0`}
                    >
                        <img src={course?.thumbnail} className="h-full w-full object-cover rounded-xl" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h1 className="text-lg font-bold text-slate-900 truncate">
                            {course?.title}
                        </h1>
                        <p className="text-sm text-slate-500 mt-0.5">
                            👨‍🏫 Lee Đình Dũng
                        </p>
                    </div>
                    <div className="hidden sm:flex items-center gap-6 flex-shrink-0">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-slate-900">
                                {sections.length}
                            </p>
                            <p className="text-xs text-slate-400 mt-0.5">Chương</p>
                        </div>
                        <div className="w-px h-10 bg-slate-100" />
                        <div className="text-center">
                            <p className="text-2xl font-bold text-slate-900">
                                {totalLessons}
                            </p>
                            <p className="text-xs text-slate-400 mt-0.5">Bài học</p>
                        </div>
                        <div className="w-px h-10 bg-slate-100" />
                        <div className="text-center">
                            <p className="text-2xl font-bold text-indigo-600">
                                {lessonsWithVideo}
                            </p>
                            <p className="text-xs text-slate-400 mt-0.5">Có video</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chapter List */}
            <div className="space-y-3">
                {sections.map((section, sectionIdx) => (
                    <div
                        key={section._id}
                        className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
                    >
                        {/* section Header */}
                        <div className="flex items-center gap-3 px-5 py-4">
                            <div className="text-slate-300 cursor-grab flex-shrink-0">
                                <GripVerticalIcon className="w-4 h-4" />
                            </div>
                            <button
                                className="flex items-center gap-2 flex-1 min-w-0 text-left"
                            >
                                <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                                    <span className="text-indigo-600 text-xs font-bold">
                                        {sectionIdx + 1}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-slate-900 truncate">
                                        {section.title}
                                    </p>
                                    <p className="text-xs text-slate-400 mt-0.5">
                                        {section.lessons.length} bài học
                                    </p>
                                </div>
                                {section.isExpanded ? (
                                    <ChevronDownIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                ) : (
                                    <ChevronRightIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                )}
                            </button>
                            <div className="flex items-center gap-1 flex-shrink-0">
                                <button
                                    onClick={() => openAddLesson(section.id)}
                                    className="flex items-center gap-1.5 text-xs text-indigo-600 font-medium hover:bg-indigo-50 px-2.5 py-1.5 rounded-lg transition-colors"
                                >
                                    <PlusIcon className="w-3.5 h-3.5" />
                                    <span className="hidden sm:inline">Thêm bài</span>
                                </button>
                                <button
                                    onClick={() => openEditSection(section)}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                                >
                                    <EditIcon className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setDeleteTarget({
                                        type: 'section',
                                        sectionId: section._id,
                                    })}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                >
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Lessons */}
                        {section.isExpanded && (
                            <div className="border-t border-slate-50">
                                {section.lessons.length === 0 ? (
                                    <div className="px-5 py-8 text-center">
                                        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <VideoIcon className="w-6 h-6 text-slate-300" />
                                        </div>
                                        <p className="text-sm text-slate-400">
                                            Chưa có bài học nào
                                        </p>
                                        <button
                                            onClick={() => openAddLesson(section.id)}
                                            className="mt-3 text-xs text-indigo-600 font-medium hover:text-indigo-700"
                                        >
                                            + Thêm bài học đầu tiên
                                        </button>
                                    </div>
                                ) : (
                                    <div className="divide-y divide-slate-50">
                                        {section.lessons.map((lesson, lessonIdx) => (
                                            <div
                                                key={lesson.id}
                                                className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50/50 transition-colors group"
                                            >
                                                <div className="text-slate-200 group-hover:text-slate-300 flex-shrink-0">
                                                    <GripVerticalIcon className="w-3.5 h-3.5" />
                                                </div>
                                                {/* Lesson number */}
                                                <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center flex-shrink-0">
                                                    <span className="text-slate-500 text-xs font-medium">
                                                        {lessonIdx + 1}
                                                    </span>
                                                </div>
                                                {/* Video indicator */}
                                                <div className="flex-shrink-0">
                                                    {lesson.video.type === 'youtube' ? (
                                                        <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                                                            <PlayCircleIcon className="w-4 h-4 text-red-500" />
                                                        </div>
                                                    ) : lesson.video.type === 'direct' ? (
                                                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                                            <FileVideoIcon className="w-4 h-4 text-blue-500" />
                                                        </div>
                                                    ) : (
                                                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                                                            <VideoIcon className="w-4 h-4 text-slate-300" />
                                                        </div>
                                                    )}
                                                </div>
                                                {/* Lesson info */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-sm font-medium text-slate-800 truncate">
                                                            {lesson.title}
                                                        </p>
                                                        {lesson.isFree ? (
                                                            <Badge variant="success">Miễn phí</Badge>
                                                        ) : (
                                                            <Badge variant="neutral">Trả phí</Badge>
                                                        )}
                                                    </div>
                                                    {lesson.description && (
                                                        <p className="text-xs text-slate-400 mt-0.5 truncate">
                                                            {lesson.description}
                                                        </p>
                                                    )}
                                                </div>
                                                {/* Duration */}
                                                {lesson.duration && (
                                                    <div className="flex items-center gap-1 text-xs text-slate-400 flex-shrink-0 hidden sm:flex">
                                                        <ClockIcon className="w-3.5 h-3.5" />
                                                        {lesson.duration}
                                                    </div>
                                                )}
                                                {/* Video status */}
                                                <div className="flex-shrink-0 hidden md:block">
                                                    {lesson.video.type !== 'none' ? (
                                                        <span className="text-xs text-emerald-600 flex items-center gap-1">
                                                            <CheckCircleIcon className="w-3.5 h-3.5" /> Có
                                                            video
                                                        </span>
                                                    ) : (
                                                        <span className="text-xs text-slate-300">
                                                            Chưa có video
                                                        </span>
                                                    )}
                                                </div>
                                                {/* Actions */}
                                                <div className="flex items-center gap-1 flex-shrink-0">
                                                    <button
                                                        onClick={() => openEditLesson(section._id, lesson)}
                                                        className="p-1.5 rounded-lg text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                                                    >
                                                        <EditIcon className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            setDeleteTarget({
                                                                type: 'lesson',
                                                                sectionId: section._id,
                                                                lessonId: lesson.id,
                                                            })
                                                        }
                                                        className="p-1.5 rounded-lg text-slate-300 hover:text-red-600 hover:bg-red-50 transition-colors"
                                                    >
                                                        <TrashIcon className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {/* Add lesson row */}
                                {section.lessons.length > 0 && (
                                    <div className="px-5 py-3 border-t border-slate-50">
                                        <button
                                            onClick={() => openAddLesson(section._id)}
                                            className="flex items-center gap-2 text-xs text-slate-400 hover:text-indigo-600 font-medium transition-colors"
                                        >
                                            <PlusIcon className="w-3.5 h-3.5" />
                                            Thêm bài học vào chương này
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Add Chapter Button */}
            <button
                type='button'
                onClick={() => setIsSectionModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-slate-200 rounded-2xl text-sm font-medium text-slate-400 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all"
            >
                <PlusIcon className="w-4 h-4" />
                Thêm chương mới
            </button>

            {/* Chapter Modal */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <Modal
                    isOpen={isSectionModalOpen}
                    onClose={() => setIsSectionModalOpen(false)}
                    title={editingSection ? 'Chỉnh sửa chương' : 'Thêm chương mới'}
                    size="sm"
                    footer={
                        <>
                            <button
                                onClick={() => setIsSectionModalOpen(false)}
                                className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                            >
                                Hủy
                            </button>
                            <button
                                type='submit'
                                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors"
                            >
                                {editingSection ? 'Lưu thay đổi' : 'Thêm chương'}
                            </button>
                        </>
                    }
                >

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            Tên chương <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            {...register("title")}
                            onKeyDown={(e) => e.key === 'Enter' && saveChapter()}
                            className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="VD: Giới thiệu khóa học..."
                            autoFocus
                        />
                    </div>

                </Modal>

                {/* Lesson Modal */}
                <Modal
                    isOpen={isLessonModalOpen}
                    onClose={() => setIsLessonModalOpen(false)}
                    title={editingLesson ? 'Chỉnh sửa bài học' : 'Thêm bài học mới'}
                    size="lg"
                    footer={
                        <>
                            <button
                                onClick={() => setIsLessonModalOpen(false)}
                                className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={saveLesson}
                                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors"
                            >
                                {editingLesson ? 'Lưu thay đổi' : 'Thêm bài học'}
                            </button>
                        </>
                    }
                >
                    <div className="space-y-4">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Tên bài học <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={lessonForm.title}
                                onChange={(e) =>
                                    setLessonForm({
                                        ...lessonForm,
                                        title: e.target.value,
                                    })
                                }
                                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Nhập tên bài học..."
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Mô tả bài học
                            </label>
                            <textarea
                                value={lessonForm.description}
                                onChange={(e) =>
                                    setLessonForm({
                                        ...lessonForm,
                                        description: e.target.value,
                                    })
                                }
                                rows={2}
                                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                                placeholder="Mô tả ngắn về nội dung bài học..."
                            />
                        </div>

                        {/* Duration + Free */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                    <ClockIcon className="w-3.5 h-3.5 inline mr-1" />
                                    Thời lượng
                                </label>
                                <input
                                    type="text"
                                    value={lessonForm.duration}
                                    onChange={(e) =>
                                        setLessonForm({
                                            ...lessonForm,
                                            duration: e.target.value,
                                        })
                                    }
                                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="VD: 12:30"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                    Quyền truy cập
                                </label>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() =>
                                            setLessonForm({
                                                ...lessonForm,
                                                isFree: true,
                                            })
                                        }
                                        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium border transition-colors ${lessonForm.isFree ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                                    >
                                        <UnlockIcon className="w-3.5 h-3.5" />
                                        Miễn phí
                                    </button>
                                    <button
                                        onClick={() =>
                                            setLessonForm({
                                                ...lessonForm,
                                                isFree: false,
                                            })
                                        }
                                        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium border transition-colors ${!lessonForm.isFree ? 'bg-indigo-50 border-indigo-300 text-indigo-700' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                                    >
                                        <LockIcon className="w-3.5 h-3.5" />
                                        Trả phí
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Video URL */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                <VideoIcon className="w-3.5 h-3.5 inline mr-1" />
                                Video bài học
                            </label>
                            <div className="flex gap-2">
                                <div className="flex-1 flex items-center gap-2 border border-slate-200 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent">
                                    <LinkIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                    <input
                                        type="url"
                                        value={lessonForm.videoUrl}
                                        onChange={(e) => {
                                            setLessonForm({
                                                ...lessonForm,
                                                videoUrl: e.target.value,
                                            })
                                            setVideoPreview(false)
                                        }}
                                        className="flex-1 bg-transparent text-sm text-slate-800 outline-none"
                                        placeholder="Dán link YouTube hoặc URL video..."
                                    />
                                    {lessonForm.videoUrl && (
                                        <button
                                            onClick={() =>
                                                setLessonForm({
                                                    ...lessonForm,
                                                    videoUrl: '',
                                                })
                                            }
                                            className="text-slate-300 hover:text-slate-500 text-xs"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                                {lessonForm.videoUrl && (
                                    <button
                                        onClick={() => setVideoPreview(!videoPreview)}
                                        className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors flex-shrink-0"
                                    >
                                        <EyeIcon className="w-4 h-4" />
                                        <span className="hidden sm:inline">Xem thử</span>
                                    </button>
                                )}
                            </div>

                            {/* Video type hint */}
                            {lessonForm.videoUrl && (
                                <div className="mt-2 flex items-center gap-2">
                                    {detectVideoType(lessonForm.videoUrl) === 'youtube' ? (
                                        <span className="text-xs text-red-500 flex items-center gap-1">
                                            <PlayCircleIcon className="w-3.5 h-3.5" /> YouTube video đã
                                            nhận diện
                                        </span>
                                    ) : (
                                        <span className="text-xs text-blue-500 flex items-center gap-1">
                                            <FileVideoIcon className="w-3.5 h-3.5" /> URL video trực
                                            tiếp
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* Video Preview */}
                            {videoPreview && lessonForm.videoUrl && (
                                <div className="mt-3 rounded-xl overflow-hidden bg-black aspect-video">
                                    {youtubeId ? (
                                        <iframe
                                            src={`https://www.youtube.com/embed/${youtubeId}`}
                                            className="w-full h-full"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            title="Video preview"
                                        />
                                    ) : (
                                        <video
                                            src={lessonForm.videoUrl}
                                            controls
                                            className="w-full h-full"
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </Modal>

                {/* Delete Confirm Modal */}
                <Modal
                    isOpen={deleteTarget !== null}
                    onClose={() => setDeleteTarget(null)}
                    title="Xác nhận xóa"
                    size="sm"
                    footer={
                        <>
                            <button
                                onClick={() => setDeleteTarget(null)}
                                className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={() => {
                                    if (!deleteTarget) return
                                    if (deleteTarget.type === 'section')
                                        deleteSection(deleteTarget.sectionId)
                                    else if (deleteTarget.lessonId)
                                        deleteLesson(deleteTarget.sectionId, deleteTarget.lessonId)
                                }}
                                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors"
                            >
                                Xóa
                            </button>
                        </>
                    }
                >
                    <div className="text-center py-2">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <TrashIcon className="w-6 h-6 text-red-600" />
                        </div>
                        <p className="text-slate-700 text-sm">
                            {deleteTarget?.type === 'section'
                                ? 'Xóa chương này sẽ xóa toàn bộ bài học bên trong.'
                                : 'Bạn có chắc muốn xóa bài học này?'}
                        </p>
                        <p className="text-slate-400 text-xs mt-2">
                            Hành động này không thể hoàn tác.
                        </p>
                    </div>
                </Modal>
            </form>
        </div>
    )
}
