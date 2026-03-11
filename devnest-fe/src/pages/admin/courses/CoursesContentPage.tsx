import { LessonModal } from '@/components/admin/course-content/LessonModal'
import { SectionModal } from '@/components/admin/course-content/SectionModal'
import { SortableLesson } from '@/components/admin/course-content/SortableLesson'
import { SortableSection } from '@/components/admin/course-content/SortableSection'
import { Modal } from '@/components/ui/modal'
import { useGetSlugParams } from '@/hooks/common'
import { useGetCourseBySlug } from '@/hooks/course'
import { useCreateLesson, useDeleteLesson, useReorderLesson, useUpdateLesson } from '@/hooks/lesson'
import { useCreateSection, useDeleteSection, useGetSections, useReorderSection, useUpdateSection } from '@/hooks/section'
import { LessonFormValues, LessonResponse } from '@/types/lesson.type'
import { UpdateSectionPayload } from '@/types/section.type'
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import {
    ArrowLeftIcon,
    BookOpen,
    ChevronDownIcon,
    ChevronRightIcon,
    ClockIcon,
    EditIcon,
    GripVerticalIcon,
    PlayCircleIcon,
    PlusIcon,
    TrashIcon,
    VideoIcon
} from 'lucide-react'
import { useEffect, useState } from 'react'

interface CourseContentPageProps {
    courseId: number
    onBack: () => void
}
type DeleteTarget =
    | { type: "section"; sectionId: string }
    | { type: "lesson"; sectionId: string; lessonId: string; slug: string }
    | null
export function CourseContentPage({
    onBack,
}: CourseContentPageProps) {
    const slug = useGetSlugParams("slug")
    const { data: sections = [] } = useGetSections()
    const { data: course } = useGetCourseBySlug(slug!)
    const createSectionAsync = useCreateSection()
    const updateSectionAsync = useUpdateSection()
    const deleteSectionAsync = useDeleteSection()
    const reorderSectionAsync = useReorderSection()

    const createLessonAsync = useCreateLesson()
    const updateLessonAsync = useUpdateLesson()
    const deleteLessonAsync = useDeleteLesson()
    const reorderLessonAsync = useReorderLesson()
    // Section modal
    const [isSectionModalOpen, setIsSectionModalOpen] = useState(false)
    const [editingSection, setEditingSection] = useState<UpdateSectionPayload | null>(null)
    const [expandedSections, setExpandedSections] = useState<string[]>([])
    const [targetSectionId, setTargetSectionId] = useState<string | null>(null)
    const [localSections, setLocalSections] = useState(sections)
    // Lesson modal
    const [isLessonModalOpen, setIsLessonModalOpen] = useState(false)
    const [editingLesson, setEditingLesson] = useState<LessonResponse | null>(null)


    useEffect(() => {
        setLocalSections(sections)
    }, [sections])
    // Delete confirm
    const [deleteTarget, setDeleteTarget] = useState<DeleteTarget>(null)
    const toggleSection = (id: string) => {
        setExpandedSections(prev =>
            prev.includes(id)
                ? prev.filter(s => s !== id)
                : [...prev, id]
        )
    }

    const onSubmitSection = async (data: { title: string }) => {
        try {
            if (editingSection) {
                await updateSectionAsync.mutateAsync({
                    id: editingSection.id,
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

        } catch (error) {
            console.log(error)
        }
    }
    const onSubmitLesson = async (data: LessonFormValues) => {
        try {
            if (editingLesson) {
                await updateLessonAsync.mutateAsync({
                    slug: editingLesson.slug,
                    data
                })
                setIsLessonModalOpen(false)
            } else {
                await createLessonAsync.mutateAsync(
                    {
                        course_id: course!._id,
                        section_id: targetSectionId!,
                        ...data
                    }
                )
            }
            setEditingLesson(null)
            setIsLessonModalOpen(false)

        } catch (error) {
            console.log(error)
        }
    }
    const totalLessons = localSections.reduce((sum, ch) => sum + ch.lessons.length, 0)
    const lessonsWithVideo = localSections.reduce(
        (sum, ch) => sum + ch.lessons.filter((l) => l.video_url).length,
        0,
    )
    // Chapter actions
    const openEditSection = (section: UpdateSectionPayload) => {
        setEditingSection(section)
        setIsSectionModalOpen(true)
    }
    const openCreateLesson = (sectionId: string) => {
        setEditingLesson(null)
        setTargetSectionId(sectionId)
        setIsLessonModalOpen(true)
    }
    const openEditLesson = (lesson: LessonResponse) => {
        setEditingLesson(lesson)
        setTargetSectionId(lesson.section_id)
        setIsLessonModalOpen(true)
    }
    const deleteSection = async (sectionId: string) => {
        try {
            await deleteSectionAsync.mutateAsync(sectionId)
            setDeleteTarget(null)
        } catch (error) {
            console.error(error)
        }
    }
    // Lesson actions

    const deleteLesson = async (slug: string) => {
        try {
            await deleteLessonAsync.mutateAsync(slug)
            setDeleteTarget(null)
        } catch (error) {
            console.error(error)
        }
    }
    const handleConfirmDelete = async () => {
        if (!deleteTarget) return

        if (deleteTarget.type === "section") {
            await deleteSection(deleteTarget.sectionId)
        }

        if (deleteTarget.type === "lesson") {
            await deleteLesson(deleteTarget.slug)
        }

        setDeleteTarget(null)
    }
    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event

        if (!over || active.id === over.id) return

        const activeId = active.id as string
        const overId = over.id as string

        const oldSectionIndex = localSections.findIndex(s => s._id === activeId)
        const newSectionIndex = localSections.findIndex(s => s._id === overId)

        if (oldSectionIndex !== -1 && newSectionIndex !== -1) {
            const newSections = arrayMove(localSections, oldSectionIndex, newSectionIndex)

            setLocalSections(newSections)

            const payload = newSections.map((section, index) => ({
                id: section._id,
                order_index: index + 1
            }))

            await reorderSectionAsync.mutateAsync(payload)

            return
        }

        const sectionIndex = localSections.findIndex(section =>
            section.lessons.some(lesson => lesson._id === activeId)
        )

        if (sectionIndex === -1) return

        const section = localSections[sectionIndex]

        const oldLessonIndex = section.lessons.findIndex(l => l._id === activeId)
        const newLessonIndex = section.lessons.findIndex(l => l._id === overId)

        if (oldLessonIndex === -1 || newLessonIndex === -1) return

        const newLessons = arrayMove(section.lessons, oldLessonIndex, newLessonIndex)

        const newSections = [...localSections]

        newSections[sectionIndex] = {
            ...section,
            lessons: newLessons
        }

        setLocalSections(newSections)

        const payload = newLessons.map((lesson, index) => ({
            id: lesson._id,
            order_index: index + 1
        }))

        await reorderLessonAsync.mutateAsync(payload)
    }
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
                                {localSections.length}
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
            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <div className="space-y-3">
                    <SortableContext
                        items={localSections.map(s => s._id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {localSections.map((section, sectionIdx) => (
                            <SortableSection key={section._id} id={section._id}>
                                {(listeners) => (
                                    <div
                                        className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
                                    >
                                        {/* section Header */}
                                        <div className="flex items-center gap-3 px-5 py-4">
                                            <div {...listeners} className="text-slate-300 cursor-grab flex-shrink-0">
                                                <GripVerticalIcon className="w-4 h-4" />
                                            </div>
                                            <button
                                                onClick={() => toggleSection(section._id)}
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
                                                {expandedSections.includes(section._id) ? (
                                                    <ChevronDownIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                                ) : (
                                                    <ChevronRightIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                                )}
                                            </button>
                                            <div className="flex items-center gap-1 flex-shrink-0">
                                                <button
                                                    onClick={() => {
                                                        setTargetSectionId(section._id)
                                                        setIsLessonModalOpen(true)
                                                    }}
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
                                                    type='button'
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
                                        {expandedSections.includes(section._id) && (
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
                                                            onClick={() => openCreateLesson(section._id)}
                                                            className="mt-3 text-xs text-indigo-600 font-medium hover:text-indigo-700"
                                                        >
                                                            + Thêm bài học đầu tiên
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <SortableContext
                                                        items={section.lessons.map(l => l._id)}
                                                        strategy={verticalListSortingStrategy}
                                                    >
                                                        <div className="divide-y divide-slate-50">
                                                            {section.lessons.map((lesson, lessonIdx) => (
                                                                <SortableLesson
                                                                    key={lesson._id}
                                                                    lesson={lesson}
                                                                    sectionId={section._id}
                                                                >
                                                                    {(listeners) => (
                                                                        <div className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50/50 transition-colors group">

                                                                            <div {...listeners} className="text-slate-200 group-hover:text-slate-300 flex-shrink-0">
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
                                                                                {lesson.lesson_type === "video" ? (
                                                                                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                                                                                        <PlayCircleIcon className="w-4 h-4 text-red-500" />
                                                                                    </div>
                                                                                ) : lesson.lesson_type === "article" ? (
                                                                                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                                                                        <BookOpen className="w-4 h-4 text-blue-500" />
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

                                                                            {/* Actions */}
                                                                            <div className="flex items-center gap-1 flex-shrink-0">
                                                                                <button
                                                                                    onClick={() => openEditLesson(lesson)}
                                                                                    className="p-1.5 rounded-lg text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                                                                                >
                                                                                    <EditIcon className="w-3.5 h-3.5" />
                                                                                </button>

                                                                                <button
                                                                                    onClick={() =>
                                                                                        setDeleteTarget({
                                                                                            type: "lesson",
                                                                                            sectionId: section._id,
                                                                                            lessonId: lesson._id,
                                                                                            slug: lesson.slug
                                                                                        })
                                                                                    }
                                                                                    className="p-1.5 rounded-lg text-slate-300 hover:text-red-600 hover:bg-red-50 transition-colors"
                                                                                >
                                                                                    <TrashIcon className="w-3.5 h-3.5" />
                                                                                </button>
                                                                            </div>

                                                                        </div>
                                                                    )}
                                                                </SortableLesson>
                                                            ))}
                                                        </div>
                                                    </SortableContext>
                                                )}
                                                {/* Add lesson row */}
                                                {section.lessons.length > 0 && (
                                                    <div className="px-5 py-3 border-t border-slate-50">
                                                        <button
                                                            onClick={() => openCreateLesson(section._id)}
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
                                )}
                            </SortableSection>
                        ))}
                    </SortableContext>
                </div>
            </DndContext >
            {/* Add Chapter Button */}
            <button
                type='button'
                onClick={() => {
                    setIsSectionModalOpen(true)
                    setEditingSection(null)
                }
                }
                className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-slate-200 rounded-2xl text-sm font-medium text-slate-400 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all"
            >
                <PlusIcon className="w-4 h-4" />
                Thêm chương mới
            </button >

            {/* Chapter Modal */}
            < SectionModal
                open={isSectionModalOpen}
                onClose={() => {
                    setIsSectionModalOpen(false)
                    setEditingSection(null)
                }}
                defaultValue={editingSection}
                onSubmit={onSubmitSection}
            />
            {/* Lesson Modal */}
            < LessonModal
                key={editingLesson?._id || "create"}
                open={isLessonModalOpen}
                onClose={() => setIsLessonModalOpen(false)}
                defaultValue={
                    editingLesson
                        ? {
                            title: editingLesson.title || "",
                            description: editingLesson.description || "",
                            duration: editingLesson.duration || "",
                            video_url: editingLesson.video_url || "",
                            lesson_type: editingLesson.lesson_type || "video",
                            content: editingLesson.content || "",
                            is_preview: editingLesson.is_preview ?? false
                        }
                        : null
                }
                onSubmit={onSubmitLesson}
            />
            {/* Delete Confirm Modal */}
            < Modal
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
                            onClick={handleConfirmDelete}
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
            </Modal >

        </div >
    )
}
