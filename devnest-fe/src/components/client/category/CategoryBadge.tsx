import React from "react"

interface CategoryBadgeProps {
    category?: string
    size?: "sm" | "md"
}

const badgeColors = [
    "bg-blue-100 text-blue-700 border-blue-200",
    "bg-purple-100 text-purple-700 border-purple-200",
    "bg-green-100 text-green-700 border-green-200",
    "bg-yellow-100 text-yellow-700 border-yellow-200",
    "bg-red-100 text-red-700 border-red-200",
    "bg-pink-100 text-pink-700 border-pink-200",
    "bg-teal-100 text-teal-700 border-teal-200",
    "bg-orange-100 text-orange-700 border-orange-200",
]

export function CategoryBadge({ category, size = "sm" }: CategoryBadgeProps) {
    // tạo index dựa trên string category
    const index =
        category?.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
        badgeColors.length

    const colorClass = badgeColors[index]

    const sizeClasses = {
        sm: "text-xs px-2 py-0.5",
        md: "text-sm px-3 py-1",
    }

    return (
        <span
            className={`inline-flex items-center rounded-full font-medium border ${colorClass} ${sizeClasses[size]}`}
        >
            {category}
        </span>
    )
}