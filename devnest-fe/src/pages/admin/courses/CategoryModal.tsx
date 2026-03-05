import React, { useState } from 'react'
import {
    PlusIcon,
    EditIcon,
    TrashIcon,
    TagIcon,
    BookOpenIcon,
    XIcon,
    CheckIcon,
} from 'lucide-react'
import { Modal } from '@/components/ui/modal'
interface Category {
    id: number
    name: string
    description: string
    color: string
    courseCount: number
}
interface CategoryModalProps {
    isOpen: boolean
    onClose: () => void
    categories: Category[]
    onAddCategory: (category: Omit<Category, 'id' | 'courseCount'>) => void
    onEditCategory: (
        id: number,
        category: Omit<Category, 'id' | 'courseCount'>,
    ) => void
    onDeleteCategory: (id: number) => void
}
const colorOptions = [
    {
        name: 'indigo',
        bg: 'bg-indigo-100',
        text: 'text-indigo-700',
        dot: 'bg-indigo-500',
    },
    {
        name: 'purple',
        bg: 'bg-purple-100',
        text: 'text-purple-700',
        dot: 'bg-purple-500',
    },
    {
        name: 'cyan',
        bg: 'bg-cyan-100',
        text: 'text-cyan-700',
        dot: 'bg-cyan-500',
    },
    {
        name: 'emerald',
        bg: 'bg-emerald-100',
        text: 'text-emerald-700',
        dot: 'bg-emerald-500',
    },
    {
        name: 'amber',
        bg: 'bg-amber-100',
        text: 'text-amber-700',
        dot: 'bg-amber-500',
    },
    {
        name: 'rose',
        bg: 'bg-rose-100',
        text: 'text-rose-700',
        dot: 'bg-rose-500',
    },
    {
        name: 'orange',
        bg: 'bg-orange-100',
        text: 'text-orange-700',
        dot: 'bg-orange-500',
    },
    {
        name: 'teal',
        bg: 'bg-teal-100',
        text: 'text-teal-700',
        dot: 'bg-teal-500',
    },
]
function getColorClasses(colorName: string) {
    return colorOptions.find((c) => c.name === colorName) || colorOptions[0]
}
interface CategoryFormData {
    name: string
    description: string
    color: string
}
const emptyForm: CategoryFormData = {
    name: '',
    description: '',
    color: 'indigo',
}
export function CategoryModal({
    isOpen,
    onClose,
    categories,
    onAddCategory,
    onEditCategory,
    onDeleteCategory,
}: CategoryModalProps) {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingCategory, setEditingCategory] = useState<Category | null>(null)
    const [formData, setFormData] = useState<CategoryFormData>(emptyForm)
    const [deleteTarget, setDeleteTarget] = useState<Category | null>(null)
    const handleOpenAddForm = () => {
        setEditingCategory(null)
        setFormData(emptyForm)
        setIsFormOpen(true)
    }
    const handleOpenEditForm = (category: Category) => {
        setEditingCategory(category)
        setFormData({
            name: category.name,
            description: category.description,
            color: category.color,
        })
        setIsFormOpen(true)
    }
    const handleCloseForm = () => {
        setIsFormOpen(false)
        setEditingCategory(null)
        setFormData(emptyForm)
    }
    const handleSave = () => {
        if (!formData.name.trim()) return
        if (editingCategory) {
            onEditCategory(editingCategory.id, formData)
        } else {
            onAddCategory(formData)
        }
        handleCloseForm()
    }
    const handleDeleteConfirm = () => {
        if (deleteTarget) {
            onDeleteCategory(deleteTarget.id)
            setDeleteTarget(null)
        }
    }
    const handleClose = () => {
        setIsFormOpen(false)
        setEditingCategory(null)
        setFormData(emptyForm)
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
                            onClick={handleOpenAddForm}
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

                            <div className="space-y-3">
                                {/* Name */}
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1">
                                        Tên danh mục <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                name: e.target.value,
                                            })
                                        }
                                        className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                                        placeholder="VD: Lập trình, Thiết kế..."
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1">
                                        Mô tả
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                description: e.target.value,
                                            })
                                        }
                                        rows={2}
                                        className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none bg-white"
                                        placeholder="Mô tả ngắn về danh mục..."
                                    />
                                </div>

                                {/* Color Picker */}
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-2">
                                        Màu sắc
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {colorOptions.map((color) => (
                                            <button
                                                key={color.name}
                                                type="button"
                                                onClick={() =>
                                                    setFormData({
                                                        ...formData,
                                                        color: color.name,
                                                    })
                                                }
                                                className={`w-8 h-8 rounded-full ${color.dot} flex items-center justify-center transition-all ${formData.color === color.name ? 'ring-2 ring-offset-2 ring-slate-400 scale-110' : 'hover:scale-105'}`}
                                                title={color.name}
                                            >
                                                {formData.color === color.name && (
                                                    <CheckIcon className="w-4 h-4 text-white" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Preview */}
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1">
                                        Xem trước
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`text-xs font-semibold px-2 py-1 rounded-lg ${getColorClasses(formData.color).bg} ${getColorClasses(formData.color).text}`}
                                        >
                                            {formData.name || 'Tên danh mục'}
                                        </span>
                                    </div>
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
                                        onClick={handleSave}
                                        disabled={!formData.name.trim()}
                                        className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white text-xs font-medium transition-colors"
                                    >
                                        {editingCategory ? 'Lưu thay đổi' : 'Thêm danh mục'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Category List */}
                    {categories.length === 0 ? (
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
                            {categories.map((category) => {
                                const colorClasses = getColorClasses(category.color)
                                return (
                                    <div
                                        key={category.id}
                                        className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100 hover:border-slate-200 transition-colors"
                                    >
                                        {/* Color Dot */}
                                        <div
                                            className={`w-3 h-3 rounded-full ${colorClasses.dot} flex-shrink-0`}
                                        />

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className={`text-xs font-semibold px-2 py-0.5 rounded-md ${colorClasses.bg} ${colorClasses.text}`}
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

                                        {/* Course Count */}
                                        <div className="flex items-center gap-1 text-xs text-slate-400 flex-shrink-0">
                                            <BookOpenIcon className="w-3.5 h-3.5" />
                                            <span>{category.courseCount} khóa học</span>
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
                    {deleteTarget && deleteTarget.courseCount > 0 && (
                        <p className="text-amber-600 text-xs mt-2 bg-amber-50 rounded-lg px-3 py-2">
                            ⚠️ Danh mục này đang có {deleteTarget.courseCount} khóa học. Các
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
