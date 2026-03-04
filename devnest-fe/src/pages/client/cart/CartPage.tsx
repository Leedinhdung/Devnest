import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    ShoppingCartIcon,
    TrashIcon,
    TagIcon,
    ArrowRightIcon,
    BookOpenIcon,
    ClockIcon,
    BarChart2Icon,
    CheckIcon,
    ChevronRightIcon,
} from 'lucide-react'
import routes from '@/routes/routes'

export function CartPage() {
    
    return (
            <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
                {/* Progress Steps */}
                <div className="flex items-center justify-center mb-10">
                    <div className="flex items-center gap-0">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                                1
                            </div>
                            <span className="text-sm font-semibold text-blue-600">
                                Giỏ hàng
                            </span>
                        </div>
                        <ChevronRightIcon className="w-5 h-5 text-gray-300 mx-3" />
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center text-sm font-bold">
                                2
                            </div>
                            <span className="text-sm text-gray-400">Thanh toán</span>
                        </div>
                        <ChevronRightIcon className="w-5 h-5 text-gray-300 mx-3" />
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center text-sm font-bold">
                                3
                            </div>
                            <span className="text-sm text-gray-400">Xác nhận</span>
                        </div>
                    </div>
                </div>

                {/* Page Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Giỏ hàng của bạn
                        {/* {items.length > 0 && (
                            <span className="ml-2 text-lg font-normal text-gray-500">
                                ({items.length} khóa học)
                            </span>
                        )} */}
                    </h1>
                </div>

                {/* {items.length === 0  ? ( */}
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                            <ShoppingCartIcon className="w-12 h-12 text-blue-400" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">
                            Giỏ hàng trống
                        </h2>
                        <p className="text-gray-500 mb-8 max-w-sm">
                            Bạn chưa thêm khóa học nào vào giỏ hàng. Khám phá hàng trăm khóa
                            học chất lượng cao!
                        </p>
                        <Link
                            to={routes.coursesList}
                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                        >
                            <BookOpenIcon className="w-5 h-5" />
                            Khám phá khóa học
                        </Link>
                    </div>
                {/* ) : ( */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        {/* <div className="lg:col-span-2 space-y-4">
                            {items.map((item) => (
                                <div
                                    key={item.course.id}
                                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex gap-4 group"
                                >
                                    <img
                                        src={item.course.image}
                                        alt={item.course.title}
                                        className="w-28 h-20 object-cover rounded-xl flex-shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1 line-clamp-2">
                                            {item.course.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 mb-2">
                                            {item.course.instructor}
                                        </p>
                                        <div className="flex items-center gap-3 text-xs text-gray-400">
                                            <span className="flex items-center gap-1">
                                                <BarChart2Icon className="w-3.5 h-3.5" />
                                                {item.course.level}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <ClockIcon className="w-3.5 h-3.5" />
                                                {item.course.duration}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end justify-between flex-shrink-0">
                                        <button
                                            onClick={() => removeFromCart(item.course.id)}
                                            className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            aria-label="Xóa khỏi giỏ hàng"
                                        >
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                        <div className="text-right">
                                            <div className="font-bold text-blue-600 text-sm">
                                                {formatPrice(item.course.price)}
                                            </div>
                                            {item.course.originalPrice > item.course.price && (
                                                <div className="text-xs text-gray-400 line-through">
                                                    {formatPrice(item.course.originalPrice)}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <Link
                                to="/courses"
                                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium mt-2 transition-colors"
                            >
                                ← Tiếp tục mua sắm
                            </Link>
                        </div> */}

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                                <h2 className="text-lg font-bold text-gray-900 mb-5">
                                    Tóm tắt đơn hàng
                                </h2>

                                {/* <div className="space-y-3 mb-5">
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Tạm tính</span>
                                        <span>{formatPrice(totalPrice)}</span>
                                    </div>
                                    {originalTotal > totalPrice && (
                                        <div className="flex justify-between text-sm text-green-600">
                                            <span>Tiết kiệm</span>
                                            <span>-{formatPrice(originalTotal - totalPrice)}</span>
                                        </div>
                                    )}
                                    {couponApplied && (
                                        <div className="flex justify-between text-sm text-green-600">
                                            <span>Mã giảm giá (10%)</span>
                                            <span>-{formatPrice(discount)}</span>
                                        </div>
                                    )}
                                    <div className="border-t pt-3 flex justify-between font-bold text-gray-900">
                                        <span>Tổng cộng</span>
                                        <span className="text-blue-600 text-lg">
                                            {formatPrice(finalTotal)}
                                        </span>
                                    </div>
                                </div> */}

                                {/* Coupon */}
                                {/* <div className="mb-5">
                                    <label className="text-xs font-medium text-gray-600 mb-1.5 block flex items-center gap-1">
                                        <TagIcon className="w-3.5 h-3.5" />
                                        Mã giảm giá
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={coupon}
                                            onChange={(e) => {
                                                setCoupon(e.target.value)
                                                setCouponError('')
                                            }}
                                            placeholder="Nhập mã..."
                                            className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                        <button
                                            onClick={handleApplyCoupon}
                                            className="bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium px-3 py-2 rounded-xl transition-colors whitespace-nowrap"
                                        >
                                            Áp dụng
                                        </button>
                                    </div>
                                    {couponError && (
                                        <p className="text-xs text-red-500 mt-1">{couponError}</p>
                                    )}
                                    {couponApplied && (
                                        <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                                            <CheckIcon className="w-3 h-3" /> Mã giảm giá đã được áp
                                            dụng!
                                        </p>
                                    )}
                                    <p className="text-xs text-gray-400 mt-1">Thử: HOCNHANH</p>
                                </div> */}

                                {/* <button
                                    onClick={() => navigate('/checkout')}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                                >
                                    Tiến hành thanh toán
                                    <ArrowRightIcon className="w-4 h-4" />
                                </button> */}

                                {/* <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-400">
                                    <span className="flex items-center gap-1">
                                        <CheckIcon className="w-3 h-3 text-green-500" />
                                        Bảo mật SSL
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <CheckIcon className="w-3 h-3 text-green-500" />
                                        Hoàn tiền 30 ngày
                                    </span>
                                </div> */}
                            </div>
                        </div>
                    </div>
                {/* )} */}
            </main>
    )
}
