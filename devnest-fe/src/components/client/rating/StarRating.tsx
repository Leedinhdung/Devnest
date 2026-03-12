import React from 'react'
import { StarIcon } from 'lucide-react'
interface StarRatingProps {
    rating: number
    reviewCount?: number
    size?: 'sm' | 'md' | 'lg'
    showCount?: boolean
}
export function StarRating({
    rating,
    reviewCount,
    size = 'sm',
    showCount = true,
}: StarRatingProps) {
    const sizeClasses = {
        sm: 'w-3.5 h-3.5',
        md: 'w-4 h-4',
        lg: 'w-5 h-5',
    }
    const textClasses = {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
    }
    const stars = Array.from(
        {
            length: 5,
        },
        (_, i) => {
            const filled = i < Math.floor(rating)
            const partial = !filled && i < rating
            return {
                filled,
                partial,
            }
        },
    )
    return (
        <div className="flex items-center gap-1">
            <span className={`font-semibold text-amber-500 ${textClasses[size]}`}>
                {(rating ?? 0).toFixed(1)}
            </span>
            <div className="flex items-center gap-0.5">
                {stars.map((star, i) => (
                    <div key={i} className="relative">
                        <StarIcon
                            className={`${sizeClasses[size]} text-gray-200`}
                            fill="currentColor"
                        />
                        {(star.filled || star.partial) && (
                            <div
                                className="absolute inset-0 overflow-hidden"
                                style={{
                                    width: star.partial ? `${(rating % 1) * 100}%` : '100%',
                                }}
                            >
                                <StarIcon
                                    className={`${sizeClasses[size]} text-amber-400`}
                                    fill="currentColor"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {showCount && reviewCount !== undefined && (
                <span className={`text-gray-500 ${textClasses[size]}`}>
                    ({reviewCount.toLocaleString('vi-VN')})
                </span>
            )}
        </div>
    )
}
