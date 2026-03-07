import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Modal } from '@/components/ui/modal'
import { useAuth } from '@/context/AuthContext'
import { useGetCategories } from '@/hooks/category/category'
import { useGetSlugParams } from '@/hooks/common'
import { useCreateCourse, useGetCourseBySlug, useUpdateCourse } from '@/hooks/course/course'
import routes from '@/routes/routes'
import { CourseFormPayload } from '@/types/course.type'

import { uploadImageToCloudinary } from '@/utils/uploadCloundinary'
import { getYoutubeId } from '@/utils/youtube'
import { courseSchema } from '@/validators/course.validate'

import { zodResolver } from '@hookform/resolvers/zod'
import {
    ArrowLeftIcon,
    CheckCircleIcon,
    DollarSignIcon,
    ImageIcon,
    InfoIcon,
    LinkIcon,
    ListChecksIcon,
    PlusIcon,
    SaveIcon,
    TagIcon,
    ToggleLeftIcon,
    UploadCloudIcon,
    VideoIcon,
    XIcon
} from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import z from 'zod'

export function CourseFormPage() {
    const { user } = useAuth()
    const slug = useGetSlugParams("slug")
    const navigate = useNavigate();
    const [tagInput, setTagInput] = useState('')
    const [imageInputMode, setImageInputMode] = useState<'url' | 'upload'>('url')
    const [videoInputMode, setVideoInputMode] = useState<'url' | 'upload'>('url')
    const [openSuccessModal, setOpenSuccessModal] = useState(false)
    const { data: categories = [] } = useGetCategories()
    const { data: course } = useGetCourseBySlug(slug!)
    const isEdit = Boolean(course?._id)
    const createCourseAsync = useCreateCourse()
    const updateCourseAsync = useUpdateCourse()
    const {
        register,
        handleSubmit,
        watch,
        control,
        reset,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm<z.input<typeof courseSchema>>({
        resolver: zodResolver(courseSchema),
        defaultValues: {
            title: "",
            short_description: "",
            description: "",
            thumbnail: "",
            intro_video: "",
            category_id: "",
            level: "beginner",
            price: 0,
            discount_price: 0,
            status: "draft",
            tags: [],
            requirements: [],
            learning_outcomes: []
        }
    })

    const tags = watch("tags") || []
    const introVideo = watch("intro_video")
    const thumbnail = watch("thumbnail")
    const status = watch("status")

    const {
        fields: requirementFields,
        append: appendRequirement,
        remove: removeRequirement
    } = useFieldArray({
        control,
        name: "requirements"
    })
    const {
        fields: outcomeFields,
        append: appendOutcome,
        remove: removeOutcome
    } = useFieldArray({
        control,
        name: "learning_outcomes"
    })
    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && tagInput.trim()) {
            e.preventDefault()

            const newTag = tagInput.trim()
            if (!tags.includes(newTag)) {
                setValue("tags", [...tags, newTag])
            }
            setTagInput("")
        }
    }
    const handleRemoveTag = (tagToRemove: string) => {
        setValue(
            "tags",
            tags.filter((tag) => tag !== tagToRemove)
        )
    }
    const handleImageUpload = async (file: File) => {
        try {
            const imageUrl = await uploadImageToCloudinary(file)

            setValue("thumbnail", imageUrl)
        } catch (error) {
            console.error("Upload failed", error)
        }
    }
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()

    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleImageUpload(e.dataTransfer.files[0])
        }
    }
    const handleVideoUpload = (file: File) => {
        if (!file.type.startsWith("video/")) {
            alert("Vui lòng chọn file video hợp lệ (MP4, WebM, OGG).")
            return
        }

        if (file.size > 50 * 1024 * 1024) {
            alert("Kích thước video không được vượt quá 50MB.")
            return
        }

        const videoUrl = URL.createObjectURL(file)

        setValue("intro_video", videoUrl)
    }
    const handleVideoDragOver = (e: React.DragEvent) => {
        e.preventDefault()

    }

    const handleVideoDrop = (e: React.DragEvent) => {
        e.preventDefault()

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleVideoUpload(e.dataTransfer.files[0])
        }
    }
    const onSubmit = async (data: CourseFormPayload) => {
        try {
            const payload = {
                ...data,
                requirements: data.requirements?.map(r => r.value),
                learning_outcomes: data.learning_outcomes?.map(o => o.value),
            }

            if (isEdit) {
                await updateCourseAsync.mutateAsync({
                    slug: slug!,
                    ...payload
                })
            } else {
                await createCourseAsync.mutateAsync({
                    ...payload,
                    created_by: user?._id
                })
            }

            setOpenSuccessModal(true)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        const video = introVideo
        const thumb = thumbnail

        return () => {
            if (video?.startsWith("blob:")) URL.revokeObjectURL(video)
            if (thumb?.startsWith("blob:")) URL.revokeObjectURL(thumb)
        }
    }, [introVideo, thumbnail])
    useEffect(() => {
        if (course && isEdit) {
            reset({
                ...course,
                requirements: course.requirements?.map((r: string) => ({ value: r })),
                learning_outcomes: course.learning_outcomes?.map((o: string) => ({ value: o })),
            })
        }
    }, [course, isEdit, reset])
    const youtubeId = useMemo(() => getYoutubeId(introVideo), [introVideo])
    return (
        <div className="max-w-6xl mx-auto pb-24">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <Link to={routes.courses}

                    className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                >
                    <ArrowLeftIcon className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        {isEdit ? 'Chỉnh sửa khóa học' : 'Thêm khóa học mới'}
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Điền đầy đủ thông tin bên dưới để tạo khóa học
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Section 1: Thông tin cơ bản */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
                        <div className="p-2 bg-indigo-50 rounded-lg">
                            <InfoIcon className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                            <h2 className="text-sm font-semibold text-slate-900">
                                Thông tin cơ bản
                            </h2>
                            <p className="text-xs text-slate-400">
                                Tên, đường dẫn và mô tả khóa học
                            </p>
                        </div>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Tên khóa học <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                {...register('title')}
                                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="VD: React.js Nâng cao từ A-Z"
                            />
                            {errors.title && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.title.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Mô tả ngắn
                            </label>
                            <input
                                type="text"
                                {...register("short_description")}
                                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Mô tả ngắn gọn hiển thị trên thẻ khóa học..."
                            />
                            {errors.short_description && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.short_description.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Mô tả chi tiết
                            </label>
                            <textarea
                                {...register('description')}
                                rows={5}
                                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
                                placeholder="Nhập mô tả chi tiết về khóa học..."
                            />
                            {errors.description && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Section 2: Phương tiện */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
                        <div className="p-2 bg-purple-50 rounded-lg">
                            <ImageIcon className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <h2 className="text-sm font-semibold text-slate-900">
                                Phương tiện
                            </h2>
                            <p className="text-xs text-slate-400">
                                Ảnh bìa và video giới thiệu
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">

                        {/* THUMBNAIL */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-slate-700">
                                    Ảnh bìa khóa học
                                </label>

                                <div className="flex bg-slate-100 p-1 rounded-lg">
                                    <button
                                        type="button"
                                        onClick={() => setImageInputMode("url")}
                                        className={`px-3 py-1 text-xs rounded-md ${imageInputMode === "url"
                                            ? "bg-white shadow text-slate-800"
                                            : "text-slate-500"
                                            }`}
                                    >
                                        URL
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setImageInputMode("upload")}
                                        className={`px-3 py-1 text-xs rounded-md ${imageInputMode === "upload"
                                            ? "bg-white shadow text-slate-800"
                                            : "text-slate-500"
                                            }`}
                                    >
                                        Upload
                                    </button>
                                </div>
                            </div>

                            {imageInputMode === "url" ? (
                                <div className="relative">
                                    <LinkIcon className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                    <input
                                        type="url"
                                        {...register('thumbnail')}
                                        placeholder="https://example.com/image.jpg"
                                        className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                </div>
                            ) : (
                                <div
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                    className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-indigo-400 transition"
                                >
                                    <UploadCloudIcon className="mx-auto mb-2 text-indigo-500" />

                                    <p className="text-sm text-slate-600">
                                        Kéo thả ảnh hoặc{" "}
                                        <label className="text-indigo-600 cursor-pointer">
                                            chọn file
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => {
                                                    if (e.target.files) {
                                                        handleImageUpload(e.target.files[0])
                                                    }
                                                }}
                                            />
                                        </label>
                                    </p>

                                    <p className="text-xs text-slate-400 mt-1">
                                        PNG, JPG, WEBP (tối đa 5MB)
                                    </p>
                                </div>
                            )}
                            {thumbnail && (
                                <div className="aspect-video rounded-xl overflow-hidden border">
                                    <img
                                        src={thumbnail}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                        </div>

                        {/* VIDEO */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-slate-700">
                                    Video giới thiệu
                                </label>

                                <div className="flex bg-slate-100 p-1 rounded-lg">
                                    <button
                                        type="button"
                                        onClick={() => setVideoInputMode("url")}
                                        className={`px-3 py-1 text-xs rounded-md ${videoInputMode === "url"
                                            ? "bg-white shadow text-slate-800"
                                            : "text-slate-500"
                                            }`}
                                    >
                                        URL
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setVideoInputMode("upload")}
                                        className={`px-3 py-1 text-xs rounded-md ${videoInputMode === "upload"
                                            ? "bg-white shadow text-slate-800"
                                            : "text-slate-500"
                                            }`}
                                    >
                                        Upload
                                    </button>
                                </div>
                            </div>

                            {videoInputMode === "url" ? (
                                <div className="relative">
                                    <LinkIcon className="absolute left-3 top-3 w-4 h-4 text-slate-400" />

                                    <input
                                        type="url"
                                        {...register('intro_video')}
                                        placeholder="Dán link YouTube..."
                                        className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                </div>
                            ) : (
                                <div
                                    onDragOver={handleVideoDragOver}
                                    onDrop={handleVideoDrop}
                                    className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-indigo-400 transition"
                                >
                                    <VideoIcon className="mx-auto mb-2 text-indigo-500" />

                                    <p className="text-sm text-slate-600">
                                        Kéo thả video hoặc{" "}
                                        <label className="text-indigo-600 cursor-pointer">
                                            chọn file
                                            <input
                                                type="file"
                                                accept="video/*"
                                                className="hidden"
                                                onChange={(e) =>
                                                    e.target.files &&
                                                    handleVideoUpload(e.target.files[0])
                                                }
                                            />
                                        </label>
                                    </p>

                                    <p className="text-xs text-slate-400 mt-1">
                                        MP4, WebM (tối đa 50MB)
                                    </p>
                                </div>
                            )}

                            {introVideo && (
                                <div className="relative aspect-video rounded-xl overflow-hidden border bg-black">
                                    {youtubeId ? (
                                        <iframe
                                            src={`https://www.youtube.com/embed/${youtubeId}`}
                                            className="w-full h-full"
                                            allowFullScreen
                                        />
                                    ) : (
                                        <video
                                            src={introVideo}
                                            controls
                                            className="w-full h-full object-contain"
                                        />
                                    )}

                                    <button
                                        type="button"
                                        onClick={() => setValue("intro_video", "")}
                                        className="absolute top-2 right-2 bg-white p-1 rounded shadow hover:text-red-500"
                                    >
                                        <XIcon size={16} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Section 3: Phân loại */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
                        <div className="p-2 bg-cyan-50 rounded-lg">
                            <TagIcon className="w-5 h-5 text-cyan-600" />
                        </div>
                        <div>
                            <h2 className="text-sm font-semibold text-slate-900">
                                Phân loại
                            </h2>
                            <p className="text-xs text-slate-400">
                                Danh mục, trình độ và từ khóa
                            </p>
                        </div>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                    Danh mục
                                </label>
                                <select {...register("category_id")}
                                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                                >
                                    <option value="">Chọn danh mục</option>
                                    {categories.map((cat) => (
                                        <option key={cat._id} value={cat._id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                    Trình độ
                                </label>
                                <select
                                    {...register("level")}
                                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                                >
                                    <option value="beginner">Cơ bản</option>
                                    <option value="intermediate">Trung cấp</option>
                                    <option value="advanced">Nâng cao</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Từ khóa (Tags)
                            </label>
                            <div className="border border-slate-200 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent bg-white">
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium"
                                        >
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveTag(tag)}
                                                className="text-slate-400 hover:text-red-500"
                                            >
                                                <XIcon className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                                <input
                                    type="text"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={handleAddTag}
                                    className="w-full outline-none text-sm text-slate-800 px-1 py-0.5"
                                    placeholder="Nhập từ khóa và nhấn Enter..."
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 4: Giá cả */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
                        <div className="p-2 bg-emerald-50 rounded-lg">
                            <DollarSignIcon className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                            <h2 className="text-sm font-semibold text-slate-900">Giá cả</h2>
                            <p className="text-xs text-slate-400">Thiết lập học phí</p>
                        </div>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Giá gốc (VNĐ)
                            </label>
                            <input
                                type="number"
                                {...register("price", { valueAsNumber: true })}
                                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="0"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Giá khuyến mãi (VNĐ)
                            </label>
                            <input
                                type="number"
                                {...register("discount_price", { valueAsNumber: true })}
                                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="0"
                            />
                        </div>
                    </div>
                </div>

                {/* Section 5: Yêu cầu & Kết quả */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
                        <div className="p-2 bg-amber-50 rounded-lg">
                            <ListChecksIcon className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                            <h2 className="text-sm font-semibold text-slate-900">
                                Yêu cầu & Kết quả
                            </h2>
                            <p className="text-xs text-slate-400">
                                Học viên cần gì và sẽ học được gì
                            </p>
                        </div>
                    </div>
                    <div className="p-6 space-y-8">
                        {/* Requirements */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-3">
                                Yêu cầu đầu vào
                            </label>
                            <div className="space-y-3">
                                {requirementFields.map((field, index) => (
                                    <div key={field.id} className="flex gap-2">
                                        <input
                                            {...register(`requirements.${index}.value`)}
                                            className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-sm"
                                            placeholder="VD: Có kiến thức cơ bản về HTML/CSS..."
                                        />

                                        <button
                                            type="button"
                                            onClick={() => removeRequirement(index)}
                                            className="p-2 text-slate-400 hover:text-red-500"
                                        >
                                            <XIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={() => appendRequirement({ value: "" })}
                                    className="flex items-center gap-1 text-sm text-indigo-600"
                                >
                                    <PlusIcon className="w-4 h-4" />
                                    Thêm yêu cầu
                                </button>
                            </div>
                        </div>

                        {/* Learning Outcomes */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-3">
                                Kết quả đạt được
                            </label>
                            <div className="space-y-3">
                                {outcomeFields.map((field, index) => (
                                    <div key={field.id} className="flex gap-2">
                                        <input
                                            {...register(`learning_outcomes.${index}.value`)}
                                            className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-sm"
                                            placeholder="VD: Xây dựng được ứng dụng web hoàn chỉnh..."
                                        />

                                        <button
                                            type="button"
                                            onClick={() => removeOutcome(index)}
                                            className="p-2 text-slate-400 hover:text-red-500"
                                        >
                                            <XIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={() => appendOutcome({ value: "" })}
                                    className="flex items-center gap-1 text-sm text-indigo-600"
                                >
                                    <PlusIcon className="w-4 h-4" />
                                    Thêm kết quả
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 6: Trạng thái */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
                        <div className="p-2 bg-slate-100 rounded-lg">
                            <ToggleLeftIcon className="w-5 h-5 text-slate-600" />
                        </div>
                        <div>
                            <h2 className="text-sm font-semibold text-slate-900">
                                Trạng thái
                            </h2>
                            <p className="text-xs text-slate-400">
                                Chế độ hiển thị của khóa học
                            </p>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="flex gap-3 max-w-md">
                            <button
                                type="button"
                                onClick={() => setValue("status", "published")}
                                className={`flex-1 py-3 rounded-xl text-sm font-medium border transition-colors ${status === 'published' ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                            >

                                Xuất bản
                            </button>
                            <button
                                type="button"
                                onClick={() => setValue("status", "draft")}
                                className={`flex-1 py-3 rounded-xl text-sm font-medium border transition-colors ${status === 'draft' ? 'bg-amber-50 border-amber-300 text-amber-700' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                            >
                                Bản nháp
                            </button>
                        </div>
                        <p className="text-xs text-slate-500 mt-3">
                            {status === 'published'
                                ? 'Khóa học sẽ hiển thị công khai cho tất cả học viên.'
                                : 'Khóa học đang được ẩn, chỉ quản trị viên mới có thể xem.'}
                        </p>
                    </div>
                </div>
                {/* Sticky Footer */}
                <div className="fixed bottom-0 left-0 right-0 lg:left-64 bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-end gap-3 z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                    <button
                        type='button'
                        className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                        Hủy
                    </button>
                    <button
                        type='submit'
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-sm font-medium transition-colors shadow-sm shadow-indigo-200"
                    >
                        {isSubmitting ? (
                            <>
                                <svg
                                    className="animate-spin w-4 h-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                    />
                                </svg>
                                Đang lưu...
                            </>
                        ) : (
                            <>
                                <SaveIcon className="w-4 h-4" />
                                {isEdit ? "Cập nhật khóa học" : " Lưu khóa học"}
                            </>
                        )}
                    </button>
                </div>
            </form>
            <Dialog open={openSuccessModal} onOpenChange={setOpenSuccessModal}>
                <DialogContent className="sm:max-w-md text-center">
                    <div className="flex flex-col items-center gap-4 py-2">

                        {/* Icon */}
                        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100">
                            <CheckCircleIcon className="w-7 h-7 text-emerald-600" />
                        </div>

                        {/* Title */}
                        <DialogHeader>
                            <DialogTitle className="text-lg font-semibold text-slate-900">
                                {isEdit
                                    ? "Cập nhật khóa học thành công"
                                    : "Thêm khóa học thành công"}
                            </DialogTitle>
                        </DialogHeader>

                        {/* Description */}
                        <p className="text-sm text-slate-500 max-w-xs">
                            {isEdit
                                ? "Khóa học đã được cập nhật thành công."
                                : "Khóa học đã được tạo thành công."}
                        </p>

                        {/* Actions */}
                        <div className="flex gap-2 pt-2 w-full">
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => setOpenSuccessModal(false)}
                            >
                                Ở lại
                            </Button>

                            <Button
                                className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                                onClick={() => {
                                    setOpenSuccessModal(false)
                                    reset()
                                    navigate(routes.courses)
                                }}
                            >
                                Về danh sách khóa học
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div >
    )
}
