import React from 'react'
import { TrendingUpIcon, TrendingDownIcon, BoxIcon } from 'lucide-react'
interface StatCardProps {
    title: string
    value: string | number
    change?: number
    changeLabel?: string
    icon: BoxIcon
    iconColor?: string
    iconBg?: string
}
export function StatCard({
    title,
    value,
    change,
    changeLabel,
    icon: Icon,
    iconColor = 'text-indigo-600',
    iconBg = 'bg-indigo-50',
}: StatCardProps) {
    const isPositive = change !== undefined && change >= 0
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
                    <p className="text-3xl font-bold text-slate-900 tracking-tight">
                        {value}
                    </p>
                    {change !== undefined && (
                        <div className="flex items-center gap-1.5 mt-2">
                            <div
                                className={`flex items-center gap-0.5 text-xs font-semibold ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}
                            >
                                {isPositive ? (
                                    <TrendingUpIcon className="w-3.5 h-3.5" />
                                ) : (
                                    <TrendingDownIcon className="w-3.5 h-3.5" />
                                )}
                                {isPositive ? '+' : ''}
                                {change}%
                            </div>
                            {changeLabel && (
                                <span className="text-xs text-slate-400">{changeLabel}</span>
                            )}
                        </div>
                    )}
                </div>
                <div className={`${iconBg} p-3 rounded-xl`}>
                    <Icon className={`w-6 h-6 ${iconColor}`} />
                </div>
            </div>
        </div>
    )
}
