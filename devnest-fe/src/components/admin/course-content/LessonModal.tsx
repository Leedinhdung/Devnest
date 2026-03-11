import { Modal } from "@/components/ui/modal"
import { LessonFormValues } from "@/types/lesson.type"
import { ClockIcon, EyeIcon, FileTextIcon, FileVideoIcon, LinkIcon, PlayCircleIcon, VideoIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

interface LessonModalProps {
    open: boolean
    onClose: () => void
    onSubmit: (data: LessonFormValues) => void
    defaultValue?: LessonFormValues | null
}

const defaultValues: LessonFormValues = {
    title: "",
    description: "",
    duration: "",
    video_url: "",
    lesson_type: "video",
    content: "",
    is_preview: false
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
export function LessonModal({
    open,
    onClose,
    onSubmit,
    defaultValue
}: LessonModalProps) {
    const [videoPreview, setVideoPreview] = useState(false)


    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue
    } = useForm<LessonFormValues>({
        defaultValues
    })

    const lessonType = watch("lesson_type")
    const videoUrl = watch("video_url")

    useEffect(() => {
        if (defaultValue) {
            reset(defaultValue)
        } else {
            reset(defaultValues)
        }
    }, [defaultValue, reset])
    const youtubeId = videoUrl
        ? getYoutubeId(videoUrl)
        : null

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Modal
                isOpen={open}
                onClose={() => {
                    onClose()
                    reset()
                }}
                title={defaultValue ? 'Chỉnh sửa bài học' : 'Thêm bài học mới'}
                size="lg"
                footer={
                    <>
                        <button
                            type='button'
                            onClick={onClose}
                            className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                        >
                            Hủy
                        </button>
                        <button
                            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors"
                        >
                            {defaultValue ? 'Lưu thay đổi' : 'Thêm bài học'}
                        </button>
                    </>
                }
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            Tên bài học <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            {...register('title')}
                            className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Nhập tên bài học..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            Mô tả bài học
                        </label>
                        <textarea
                            {...register('description')}
                            rows={2}
                            className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                            placeholder="Mô tả ngắn về nội dung bài học..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            Loại bài học
                        </label>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => setValue("lesson_type", "video")}
                                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium border transition-colors ${lessonType === "video"
                                    ? "bg-indigo-50 border-indigo-300 text-indigo-700"
                                    : "border-slate-200 text-slate-500 hover:bg-slate-50"
                                    }`}
                            >
                                <VideoIcon className="w-4 h-4" /> Video
                            </button>

                            <button
                                type="button"
                                onClick={() => setValue("lesson_type", "article")}
                                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium border transition-colors ${lessonType === "article"
                                    ? "bg-amber-50 border-amber-300 text-amber-700"
                                    : "border-slate-200 text-slate-500 hover:bg-slate-50"
                                    }`}
                            >
                                <FileTextIcon className="w-4 h-4" /> Bài viết
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                <ClockIcon className="w-3.5 h-3.5 inline mr-1" />
                                {lessonType === 'article' ? 'Thời gian đọc' : 'Thời lượng'}
                            </label>
                            <input
                                type="text"
                                {...register("duration")}
                                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder={
                                    lessonType === 'article' ? 'VD: 5 phút' : 'VD: 12:30'
                                }
                            />
                        </div>
                        {/* <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                    Quyền truy cập
                                </label>
                                <div className="flex gap-2">
                                    <button

                                        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium border transition-colors ${lessonForm.isFree ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                                    >
                                        <UnlockIcon className="w-3.5 h-3.5" /> Miễn phí
                                    </button>
                                    <button

                                        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium border transition-colors ${!lessonForm.isFree ? 'bg-indigo-50 border-indigo-300 text-indigo-700' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                                    >
                                        <LockIcon className="w-3.5 h-3.5" /> Trả phí
                                    </button>
                                </div>
                            </div> */}
                    </div>
                    {lessonType === 'video' ? (
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
                                        {...register("video_url")}
                                        className="flex-1 bg-transparent text-sm text-slate-800 outline-none"
                                        placeholder="Dán link YouTube hoặc URL video..."
                                    />
                                    {videoUrl && (
                                        <button
                                            type='button'
                                            className="text-slate-300 hover:text-slate-500 text-xs"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                                {videoUrl && (
                                    <button
                                        type='button'
                                        onClick={() => setVideoPreview(!videoPreview)}
                                        className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors flex-shrink-0"
                                    >
                                        <EyeIcon className="w-4 h-4" />
                                        <span className="hidden sm:inline">Xem thử</span>
                                    </button>
                                )}
                            </div>
                            {videoUrl && (
                                <div className="mt-2 flex items-center gap-2">
                                    {detectVideoType(videoUrl) === 'youtube' ? (
                                        <span className="text-xs text-red-500 flex items-center gap-1">
                                            <PlayCircleIcon className="w-3.5 h-3.5" /> YouTube video
                                            đã nhận diện
                                        </span>
                                    ) : (
                                        <span className="text-xs text-blue-500 flex items-center gap-1">
                                            <FileVideoIcon className="w-3.5 h-3.5" /> URL video trực
                                            tiếp
                                        </span>
                                    )}
                                </div>
                            )}
                            {videoPreview && videoUrl && (
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
                                            src={videoUrl}
                                            controls
                                            className="w-full h-full"
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                <FileTextIcon className="w-3.5 h-3.5 inline mr-1" />
                                Nội dung bài viết
                            </label>
                            <textarea
                                {...register("content")}
                                rows={10}
                                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
                                placeholder="Viết nội dung bài học tại đây... Hỗ trợ văn bản thuần."
                            />
                            <p className="text-xs text-slate-400 mt-1.5">
                                Bạn có thể viết nội dung bài học dạng văn bản để học viên đọc
                                hiểu.
                            </p>
                        </div>
                    )}
                </div>
            </Modal>
        </form>
    )
}