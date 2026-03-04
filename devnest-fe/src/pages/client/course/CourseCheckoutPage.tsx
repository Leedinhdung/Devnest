import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
    ShieldCheckIcon,
    ClockIcon,
    UsersIcon,
    StarIcon,
    PlayCircleIcon,
    TagIcon,
    ChevronRightIcon,
    CheckIcon,
    XIcon,
    TrophyIcon,
    SmartphoneIcon,
    InfinityIcon,
} from 'lucide-react'
import { courses } from '@/data/mockData'
import { CategoryBadge } from '@/components/client/category/CategoryBadge'

export function CourseCheckoutPage() {
    const { courseId } = useParams<{
        courseId: string
    }>()
    const navigate = useNavigate()
    const course = courses.find((c) => c.id === courseId) || courses[0]
    const [couponCode, setCouponCode] = useState('')
    const [appliedCoupon, setAppliedCoupon] = useState<{
        code: string
        discount: number
    } | null>(null)
    const [couponError, setCouponError] = useState('')
    const [couponLoading, setCouponLoading] = useState(false)
    const VALID_COUPONS: Record<string, number> = {
        HOCNHANH20: 20,
        SALE50: 50,
        NEWUSER30: 30,
    }
    const discount = appliedCoupon
        ? (course.price * appliedCoupon.discount) / 100
        : 0
    const finalPrice = course.price - discount
    const handleApplyCoupon = () => {
        if (!couponCode.trim()) return
        setCouponLoading(true)
        setCouponError('')
        setTimeout(() => {
            const upperCode = couponCode.toUpperCase().trim()
            if (VALID_COUPONS[upperCode]) {
                setAppliedCoupon({
                    code: upperCode,
                    discount: VALID_COUPONS[upperCode],
                })
                setCouponError('')
            } else {
                setCouponError('Mã giảm giá không hợp lệ hoặc đã hết hạn')
                setAppliedCoupon(null)
            }
            setCouponLoading(false)
        }, 800)
    }
    const handleRemoveCoupon = () => {
        setAppliedCoupon(null)
        setCouponCode('')
        setCouponError('')
    }
    const handleProceedToPayment = () => {
        navigate(`/payment?courseId=${course.id}&price=${finalPrice}`)
    }
    const formatPrice = (price: number) =>
        price === 0 ? 'Miễn phí' : price.toLocaleString('vi-VN') + 'đ'
    return (
        <>
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <nav className="flex items-center gap-2 text-sm text-gray-500">
                        <Link to="/" className="hover:text-blue-600 transition-colors">
                            Trang chủ
                        </Link>
                        <ChevronRightIcon className="w-4 h-4" />
                        <Link
                            to="/courses"
                            className="hover:text-blue-600 transition-colors"
                        >
                            Khóa học
                        </Link>
                        <ChevronRightIcon className="w-4 h-4" />
                        <Link
                            to={`/courses/${course.id}`}
                            className="hover:text-blue-600 transition-colors line-clamp-1 max-w-xs"
                        >
                            {course.title}
                        </Link>
                        <ChevronRightIcon className="w-4 h-4" />
                        <span className="text-gray-900 font-medium">Thanh toán</span>
                    </nav>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">
                    Xác nhận đơn hàng
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Course Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Course Card */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-6">
                            <h2 className="font-bold text-gray-900 text-lg mb-4">
                                Khóa học của bạn
                            </h2>
                            <div className="flex gap-4">
                                <img
                                    src={course.thumbnail}
                                    alt={course.title}
                                    className="w-28 h-20 object-cover rounded-xl flex-shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                    <div>
                                        <CategoryBadge category={course.category} />
                                        <h3 className="font-bold text-gray-900 mt-1.5 leading-snug">
                                            {course.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Giảng viên: {course.instructor}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-3 mt-3">
                                        <div className="flex items-center gap-1">
                                            <StarIcon className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                            <span className="text-sm font-semibold text-gray-800">
                                                {course.rating}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                ({course.reviewCount?.toLocaleString()} đánh giá)
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm text-gray-500">
                                            <UsersIcon className="w-4 h-4" />
                                            <span>
                                                {course.studentCount?.toLocaleString()} học viên
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm text-gray-500">
                                            <ClockIcon className="w-4 h-4" />
                                            <span>{course.duration}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* What You Get */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-6">
                            <h2 className="font-bold text-gray-900 text-lg mb-4">
                                Bạn sẽ nhận được
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <InfinityIcon className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800 text-sm">
                                            Truy cập trọn đời
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Học mọi lúc, mọi nơi
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <SmartphoneIcon className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800 text-sm">
                                            Học trên mọi thiết bị
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            PC, tablet, điện thoại
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-9 h-9 bg-yellow-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <TrophyIcon className="w-5 h-5 text-yellow-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800 text-sm">
                                            Chứng chỉ hoàn thành
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Được công nhận rộng rãi
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-9 h-9 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <PlayCircleIcon className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800 text-sm">
                                            Video chất lượng cao
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            HD, có phụ đề tiếng Việt
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Coupon */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-6">
                            <h2 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                                <TagIcon className="w-5 h-5 text-blue-600" />
                                Mã giảm giá
                            </h2>
                            {appliedCoupon ? (
                                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <CheckIcon className="w-5 h-5 text-green-600" />
                                        <span className="font-semibold text-green-700">
                                            {appliedCoupon.code}
                                        </span>
                                        <span className="text-green-600 text-sm">
                                            — Giảm {appliedCoupon.discount}%
                                        </span>
                                    </div>
                                    <button
                                        onClick={handleRemoveCoupon}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <XIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <div className="flex gap-3">
                                        <input
                                            type="text"
                                            value={couponCode}
                                            onChange={(e) =>
                                                setCouponCode(e.target.value.toUpperCase())
                                            }
                                            onKeyDown={(e) =>
                                                e.key === 'Enter' && handleApplyCoupon()
                                            }
                                            placeholder="Nhập mã giảm giá..."
                                            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm uppercase tracking-wider"
                                        />
                                        <button
                                            onClick={handleApplyCoupon}
                                            disabled={!couponCode.trim() || couponLoading}
                                            className="px-5 py-3 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-w-[90px]"
                                        >
                                            {couponLoading ? (
                                                <span className="flex items-center justify-center gap-1.5">
                                                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                </span>
                                            ) : (
                                                'Áp dụng'
                                            )}
                                        </button>
                                    </div>
                                    {couponError && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1.5">
                                            <XIcon className="w-4 h-4" />
                                            {couponError}
                                        </p>
                                    )}
                                    <p className="mt-2 text-xs text-gray-400">
                                        Thử: HOCNHANH20, SALE50, NEWUSER30
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Guarantee */}
                        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex items-start gap-4">
                            <ShieldCheckIcon className="w-8 h-8 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <h3 className="font-bold text-blue-900 mb-1">
                                    Đảm bảo hoàn tiền 30 ngày
                                </h3>
                                <p className="text-sm text-blue-700 leading-relaxed">
                                    Nếu không hài lòng với khóa học, bạn có thể yêu cầu hoàn tiền
                                    đầy đủ trong vòng 30 ngày kể từ ngày mua. Không cần giải
                                    thích.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-24">
                            <h2 className="font-bold text-gray-900 text-lg mb-5">
                                Tóm tắt đơn hàng
                            </h2>
                            <div className="space-y-3 mb-5">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Giá gốc</span>
                                    <span className="text-gray-900">
                                        {course.originalPrice
                                            ? formatPrice(course.originalPrice)
                                            : formatPrice(course.price)}
                                    </span>
                                </div>
                                {course.originalPrice &&
                                    course.originalPrice > course.price && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Giảm giá</span>
                                            <span className="text-green-600 font-medium">
                                                -{formatPrice(course.originalPrice - course.price)}
                                            </span>
                                        </div>
                                    )}
                                {appliedCoupon && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">
                                            Mã giảm giá ({appliedCoupon.code})
                                        </span>
                                        <span className="text-green-600 font-medium">
                                            -{formatPrice(discount)}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="border-t border-gray-200 pt-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-gray-900 text-lg">
                                        Tổng cộng
                                    </span>
                                    <div className="text-right">
                                        <span className="font-bold text-blue-600 text-2xl">
                                            {formatPrice(finalPrice)}
                                        </span>
                                        {appliedCoupon && (
                                            <p className="text-xs text-green-600 mt-0.5">
                                                Tiết kiệm {formatPrice(discount)}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={handleProceedToPayment}
                                className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-base hover:bg-blue-700 active:scale-[0.98] transition-all shadow-md shadow-blue-200"
                            >
                                Tiến hành thanh toán
                            </button>
                            <p className="text-xs text-gray-400 text-center mt-3">
                                Bằng cách mua, bạn đồng ý với{' '}
                                <Link to="#" className="text-blue-600 hover:underline">
                                    Điều khoản dịch vụ
                                </Link>
                            </p>
                            <div className="mt-5 pt-5 border-t border-gray-100">
                                <p className="text-xs text-gray-500 text-center mb-3">
                                    Phương thức thanh toán được chấp nhận
                                </p>
                                <div className="flex items-center justify-center gap-3 flex-wrap">
                                    {['VISA', 'MC', 'MOMO', 'VNPAY', 'ZaloPay'].map((method) => (
                                        <span
                                            key={method}
                                            className="px-2.5 py-1 bg-gray-100 rounded text-xs font-bold text-gray-600"
                                        >
                                            {method}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
