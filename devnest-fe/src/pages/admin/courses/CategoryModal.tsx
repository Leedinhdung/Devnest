import { Modal } from '@/components/ui/modal'
import { useCreateCategory, useDeleteCategory, useUpdateCategory } from '@/hooks/category'
import { CategoryPayload, CategoryResponse } from '@/types/category.type'
import { categorySchema } from '@/validators/category.validate'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    EditIcon,
    PlusIcon,
    TagIcon,
    TrashIcon,
    XIcon
} from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface CategoryModalProps {
    isOpen: boolean
    onClose: () => void
    categories: CategoryResponse[]
}

export function CategoryModal({
    isOpen,
    onClose,
    categories,
}: CategoryModalProps) {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingCategory, setEditingCategory] = useState<CategoryResponse | null>(null)

    const [deleteTarget, setDeleteTarget] = useState<CategoryResponse | null>(null)
    const createCategoryAsync = useCreateCategory();
    const updateCategoryAsync = useUpdateCategory()
    const deleteCategoryAsync = useDeleteCategory()
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<CategoryPayload>({
        resolver: zodResolver(categorySchema)
    })
    const onSubmit = (data: CategoryPayload) => {
        if (editingCategory) {
            updateCategoryAsync.mutate(
                {
                    slug: editingCategory.slug,
                    ...data,
                },
                { onSuccess: handleClose }
            )
        } else {
            createCategoryAsync.mutate(data, {
                onSuccess: handleClose,
            })
        }
    }
    const handleOpenEditForm = (category: CategoryResponse) => {
        setIsFormOpen(true)
        setEditingCategory(category)
        setValue("name", category.name)
        setValue("description", category.description || "")
    }
    const handleCloseForm = () => {
        setIsFormOpen(false)
        setEditingCategory(null)
    }
    const handleDeleteConfirm = () => {
        if (!deleteTarget) return

        deleteCategoryAsync.mutate(deleteTarget.slug, {
            onSuccess: () => {
                setDeleteTarget(null)
            }
        })
    }
    const handleClose = () => {
        setIsFormOpen(false)
        setEditingCategory(null)
        setDeleteTarget(null)
        onClose()
    }
    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={handleClose}
                title="Quản lý danh mục"
                size="lg"
                footer={
                    <button
                        onClick={handleClose}
                        className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                        Đóng
                    </button>
                }
            >
                <div className="space-y-4">
                    {/* Add Category Button */}
                    {!isFormOpen && (
                        <button
                            onClick={() => setIsFormOpen(true)}
                            className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-slate-200 rounded-xl text-sm font-medium text-slate-500 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all"
                        >
                            <PlusIcon className="w-4 h-4" />
                            Thêm danh mục mới
                        </button>
                    )}

                    {/* Add/Edit Form */}
                    {isFormOpen && (
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-semibold text-slate-800">
                                    {editingCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
                                </h3>
                                <button
                                    onClick={handleCloseForm}
                                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
                                >
                                    <XIcon className="w-4 h-4" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                                {/* Name */}
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1">
                                        Tên danh mục <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        {...register('name')}
                                        className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                                        placeholder="VD: Lập trình, Thiết kế..."
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1">
                                        Mô tả
                                    </label>
                                    <textarea
                                        {...register('description')}
                                        rows={2}
                                        className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none bg-white"
                                        placeholder="Mô tả ngắn về danh mục..."
                                    />
                                </div>
                                {/* Actions */}
                                <div className="flex justify-end gap-2 pt-2">
                                    <button
                                        onClick={handleCloseForm}
                                        className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        disabled={isSubmitting}
                                        className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white text-xs font-medium transition-colors"
                                    >
                                        {editingCategory ? 'Lưu thay đổi' : 'Thêm danh mục'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Category List */}
                    {categories && categories.length === 0 ? (
                        <div className="text-center py-8">
                            <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <TagIcon className="w-7 h-7 text-slate-300" />
                            </div>
                            <p className="text-sm text-slate-500 font-medium">
                                Chưa có danh mục nào
                            </p>
                            <p className="text-xs text-slate-400 mt-1">
                                Thêm danh mục để phân loại khóa học của bạn
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {categories && categories.map((category) => {
                                return (
                                    <div
                                        key={category.slug}
                                        className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100 hover:border-slate-200 transition-colors"
                                    >
                                        {/* Color Dot */}
                                        <div
                                            className={`w-3 h-3 rounded-full flex-shrink-0 bg-primary-400`}
                                        />

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className={`text-xs font-medium px-2 py-0.5 rounded-md bg-purple-300 text-primary-900`}
                                                >
                                                    {category.name}
                                                </span>
                                            </div>
                                            {category.description && (
                                                <p className="text-xs text-slate-400 mt-1 truncate">
                                                    {category.description}
                                                </p>
                                            )}
                                        </div>
                                        {/* Actions */}
                                        <div className="flex items-center gap-1 flex-shrink-0">
                                            <button
                                                onClick={() => handleOpenEditForm(category)}
                                                className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                                                title="Chỉnh sửa"
                                            >
                                                <EditIcon className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => setDeleteTarget(category)}
                                                className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                                title="Xóa"
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
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
                            onClick={handleDeleteConfirm}
                            disabled={deleteCategoryAsync.isPending}
                            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors"
                        >
                            Xóa danh mục
                        </button>
                    </>
                }
            >
                <div className="text-center py-2">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <TrashIcon className="w-6 h-6 text-red-600" />
                    </div>
                    <p className="text-slate-700 text-sm">
                        Bạn có chắc chắn muốn xóa danh mục{' '}
                        <span className="font-semibold text-slate-900">
                            "{deleteTarget?.name}"
                        </span>
                        ?
                    </p>
                    {deleteTarget && (
                        <p className="text-amber-600 text-xs mt-2 bg-amber-50 rounded-lg px-3 py-2">
                            ⚠️ Danh mục này đang có 9 khóa học. Các
                            khóa học sẽ không bị xóa.
                        </p>
                    )}
                    <p className="text-slate-400 text-xs mt-2">
                        Hành động này không thể hoàn tác.
                    </p>
                </div>
            </Modal>
        </>
    )
}
