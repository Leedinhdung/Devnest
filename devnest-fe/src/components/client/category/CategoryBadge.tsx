import React from 'react'
interface CategoryBadgeProps {
    category: string
    size?: 'sm' | 'md'
    variant?: 'default' | 'outline' | 'solid'
}
const categoryColors: Record<string, string> = {
    'Lập trình': 'bg-blue-100 text-blue-700 border-blue-200',
    'Thiết kế': 'bg-purple-100 text-purple-700 border-purple-200',
    Marketing: 'bg-green-100 text-green-700 border-green-200',
    'Kinh doanh': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'Ngoại ngữ': 'bg-red-100 text-red-700 border-red-200',
    'Nhiếp ảnh': 'bg-pink-100 text-pink-700 border-pink-200',
    'Giáo dục': 'bg-teal-100 text-teal-700 border-teal-200',
    'Kinh nghiệm': 'bg-orange-100 text-orange-700 border-orange-200',
}
export function CategoryBadge({
    category,
    size = 'sm',
    variant = 'default',
}: CategoryBadgeProps) {
    const colorClass =
        categoryColors[category] || 'bg-gray-100 text-gray-700 border-gray-200'
    const sizeClasses = {
        sm: 'text-xs px-2 py-0.5',
        md: 'text-sm px-3 py-1',
    }
    return (
        <span
            className={`inline-flex items-center rounded-full font-medium border ${colorClass} ${sizeClasses[size]}`}
        >
            {category}
        </span>
    )
}
