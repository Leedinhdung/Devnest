import { CategoryResponse } from "@/types/category.type"
import { useState } from "react"
interface Course {
    id: number
    name: string
    instructor: string
    category: string
    students: number
    rating: number
    price: string
    duration: string
    lessons: number
    status: 'active' | 'draft' | 'archived'
    thumbnail: string
    createdAt: string
    revenue: string
}
interface CourseFormData {
    name: string
    instructor: string
    category: string
    price: string
    duration: string
    lessons: string
    status: 'active' | 'draft' | 'archived'
}
const emptyForm: CourseFormData = {
    name: '',
    instructor: '',
    category: 'Lập trình',
    price: '',
    duration: '',
    lessons: '',
    status: 'draft',
}
interface CategoryProps {
    categories: CategoryResponse[]
}

const CourseForm = ({ categories }: CategoryProps) => {
    const [formData, setFormData] = useState<CourseFormData>(emptyForm)
    return (
        <div className="space-y-4" >
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Tên khóa học <span className="text-red-500">*</span>
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
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Nhập tên khóa học..."
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Giảng viên <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={formData.instructor}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            instructor: e.target.value,
                        })
                    }
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Tên giảng viên..."
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Danh mục
                    </label>
                    <select
                        value={formData.category}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                category: e.target.value,
                            })
                        }
                        className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                    >
                        {categories && categories.map((cat) => (
                            <option key={cat.slug}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Trạng thái
                    </label>
                    <select
                        value={formData.status}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                status: e.target.value as Course['status'],
                            })
                        }
                        className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                    >
                        <option value="active">Đang mở</option>
                        <option value="draft">Nháp</option>
                        <option value="archived">Lưu trữ</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Học phí
                    </label>
                    <input
                        type="text"
                        value={formData.price}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                price: e.target.value,
                            })
                        }
                        className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="VD: 1.200.000đ"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Thời lượng
                    </label>
                    <input
                        type="text"
                        value={formData.duration}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                duration: e.target.value,
                            })
                        }
                        className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="VD: 32h"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Số bài học
                    </label>
                    <input
                        type="number"
                        value={formData.lessons}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                lessons: e.target.value,
                            })
                        }
                        className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="85"
                    />
                </div>
            </div>
        </div >
    )
}
export default CourseForm