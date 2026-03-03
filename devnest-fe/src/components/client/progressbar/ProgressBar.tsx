import React from 'react'
interface ProgressBarProps {
    progress: number
    showLabel?: boolean
    size?: 'sm' | 'md' | 'lg'
    color?: 'primary' | 'green' | 'orange'
    label?: string
}
export function ProgressBar({
    progress,
    showLabel = true,
    size = 'md',
    color = 'primary',
    label,
}: ProgressBarProps) {
    const clampedProgress = Math.min(100, Math.max(0, progress))
    const heightClasses = {
        sm: 'h-1.5',
        md: 'h-2.5',
        lg: 'h-4',
    }
    const colorClasses = {
        primary: 'bg-primary-600',
        green: 'bg-emerald-500',
        orange: 'bg-accent-500',
    }
    const trackClasses = {
        primary: 'bg-primary-100',
        green: 'bg-emerald-100',
        orange: 'bg-accent-100',
    }
    return (
        <div className="w-full">
            {(showLabel || label) && (
                <div className="flex justify-between items-center mb-1.5">
                    {label && <span className="text-sm text-gray-600">{label}</span>}
                    {showLabel && (
                        <span className="text-sm font-semibold text-gray-700 ml-auto">
                            {clampedProgress}%
                        </span>
                    )}
                </div>
            )}
            <div
                className={`w-full rounded-full ${heightClasses[size]} ${trackClasses[color]} overflow-hidden`}
            >
                <div
                    className={`${heightClasses[size]} rounded-full ${colorClasses[color]} transition-all duration-500 ease-out`}
                    style={{
                        width: `${clampedProgress}%`,
                    }}
                    role="progressbar"
                    aria-valuenow={clampedProgress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                />
            </div>
        </div>
    )
}
