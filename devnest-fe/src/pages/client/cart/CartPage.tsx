import { CategoryBadge } from '@/components/client/category/CategoryBadge'
import { Input } from '@/components/ui/input'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/data/mockData'
import routes from '@/routes/routes'
import { getCoursePrice } from '@/utils/coursePrice'
import { motion } from 'framer-motion'
import {
    ArrowRightIcon,
    BarChart2Icon,
    BookOpenIcon,
    ClockIcon,
    ShoppingCartIcon,
    TrashIcon
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
export function CartPage() {
    const { cartItems, removeFromCart, cartTotal } = useCart()

    const navigate = useNavigate()
    const handleRemove = (id: string, title: string) => {
        removeFromCart(id)
        toast.success(`Đã xóa "${title}" khỏi giỏ hàng`)
    }
    const handleCheckout = () => {
        if (cartItems.length === 0) return
        // Navigate to payment with total price and first course ID as reference
        navigate(`/payment?courseId=${cartItems[0]._id}&price=${cartTotal}`)
    }
    const levelMap: Record<string, string> = {
        beginner: "Cơ bản",
        intermediate: "Trung cấp",
        advanced: "Nâng cao",
    }
    if (cartItems.length === 0) {
        return (
            <main className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingCartIcon className="w-12 h-12 text-gray-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Giỏ hàng trống
                    </h1>
                    <p className="text-gray-500 mb-8">
                        Bạn chưa thêm khóa học nào vào giỏ hàng.
                    </p>
                    <Link
                        to={routes.coursesList}
                        className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
                    >
                        <BookOpenIcon className="w-5 h-5" />
                        Khám phá khóa học
                    </Link>
                </div>
            </main>
        )
    }
    return (
        <main className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                    <ShoppingCartIcon className="w-8 h-8 text-primary-600" />
                    Giỏ hàng của bạn
                    <span className="text-lg font-normal text-gray-500">
                        ({cartItems.length} khóa học)
                    </span>
                </h1>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((course) => {
                            const { finalPrice, hasDiscount } = getCoursePrice(course)
                            return (
                                <motion.div
                                    key={course._id}
                                    layout
                                    initial={{
                                        opacity: 0,
                                        y: 20,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.95,
                                    }}
                                    className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center"
                                >
                                    <img
                                        src={course.thumbnail}
                                        alt={course.title}
                                        className="w-full sm:w-32 h-24 object-cover rounded-xl flex-shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <CategoryBadge category={course.categoryName} size="sm" />
                                        <h3 className="font-bold text-gray-900 mt-1 mb-1 line-clamp-2">
                                            <Link
                                                to={routes.courseDetail.replace(":slug", course.slug)}
                                                className="hover:text-primary-600 transition-colors"
                                            >
                                                {course.title}
                                            </Link>
                                        </h3>
                                        <div className="flex flex-wrap gap-5 text-sm text-gray-300 mb-5">
                                            <span className="flex items-center gap-1.5">
                                                <ClockIcon className="w-4 h-4 text-gray-400" />
                                                {course.totalLessons} bài học
                                            </span>
                                            {course?.level && (
                                                <span className="flex items-center gap-1.5">
                                                    <BarChart2Icon className="w-4 h-4 text-gray-400" />
                                                    {levelMap[course.level] ?? course.level}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto mt-4 sm:mt-0 gap-4">
                                        <div className="text-right">
                                            <div className="font-bold text-primary-600 text-lg">
                                                {formatPrice(finalPrice)}
                                            </div>
                                            {hasDiscount && (
                                                <div className="text-sm text-gray-400 line-through">
                                                    {formatPrice(course.price)}
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => handleRemove(course._id, course.title)}
                                            className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors flex items-center gap-1 text-sm font-medium"
                                        >
                                            <TrashIcon className="w-4 h-4" />
                                            <span className="sm:hidden">Xóa</span>
                                        </button>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-24">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">
                                Tóm tắt đơn hàng
                            </h2>
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Tạm tính</span>
                                    <span>{formatPrice(cartTotal)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Giảm giá</span>
                                    <span>0đ</span>
                                </div>
                                <div className='relative w-full border-t pt-3'>
                                    <input
                                        type="text"
                                        placeholder="Nhập mã giảm giá..."
                                        className="flex-1 w-full border px-4 py-2 rounded-lg font-medium  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm "
                                    />
                                    <button className='bg-white text-primary-500 absolute top-3.5 rounded-xl right-1 p-1.5 text-sm'>Áp mã</button>
                                </div>
                                <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                                    <span className="font-bold text-gray-900">Tổng cộng</span>
                                    <span className="font-bold text-2xl text-primary-600">
                                        {formatPrice(cartTotal)}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={handleCheckout}
                                className="w-full bg-primary-600 text-white font-bold py-4 rounded-xl hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                            >
                                Thanh toán tất cả
                                <ArrowRightIcon className="w-5 h-5" />
                            </button>
                            <p className="text-xs text-center text-gray-500 mt-4">
                                Bằng cách thanh toán, bạn đồng ý với Điều khoản dịch vụ của
                                chúng tôi.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
