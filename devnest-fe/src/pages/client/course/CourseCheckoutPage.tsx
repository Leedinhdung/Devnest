import {
    ArrowLeftIcon,
    BuildingIcon,
    CheckIcon,
    ChevronRightIcon,
    CreditCardIcon,
    LockIcon,
    MailIcon,
    PhoneIcon,
    SmartphoneIcon,
    UserIcon,
} from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function formatPrice(price: number): string {
    return price.toLocaleString('vi-VN') + 'đ'
}
type PaymentMethod = 'credit_card' | 'momo' | 'bank_transfer' | 'zalopay'
export function CourseCheckoutPage() {
    const navigate = useNavigate()
    const [paymentMethod, setPaymentMethod] =
        useState<PaymentMethod>('credit_card')
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        cardNumber: '',
        expiry: '',
        cvv: '',
        cardName: '',
    })
    const [errors, setErrors] = useState<Record<string, string>>({})
    const handleChange = (field: string, value: string) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }))
        setErrors((prev) => ({
            ...prev,
            [field]: '',
        }))
    }
    const formatCardNumber = (value: string) => {
        const digits = value.replace(/\D/g, '').slice(0, 16)
        return digits.replace(/(.{4})/g, '$1 ').trim()
    }
    const formatExpiry = (value: string) => {
        const digits = value.replace(/\D/g, '').slice(0, 4)
        if (digits.length >= 2) return digits.slice(0, 2) + '/' + digits.slice(2)
        return digits
    }
    return (
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-10">
                <div className="flex items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold">
                            <CheckIcon className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium text-green-600">
                            Giỏ hàng
                        </span>
                    </div>
                    <ChevronRightIcon className="w-5 h-5 text-gray-300 mx-3" />
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                            2
                        </div>
                        <span className="text-sm font-semibold text-blue-600">
                            Thanh toán
                        </span>
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Forms */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Billing Info */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                            <UserIcon className="w-5 h-5 text-blue-500" />
                            Thông tin thanh toán
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Họ và tên <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={(e) => handleChange('name', e.target.value)}
                                        placeholder="Nguyễn Văn A"
                                        className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                                    />
                                </div>
                                {errors.name && (
                                    <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="email"
                                            value={form.email}
                                            onChange={(e) => handleChange('email', e.target.value)}
                                            placeholder="email@example.com"
                                            className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="text-xs text-red-500 mt-1">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Số điện thoại <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="tel"
                                            value={form.phone}
                                            onChange={(e) => handleChange('phone', e.target.value)}
                                            placeholder="0901234567"
                                            className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                                        />
                                    </div>
                                    {errors.phone && (
                                        <p className="text-xs text-red-500 mt-1">
                                            {errors.phone}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                            <CreditCardIcon className="w-5 h-5 text-blue-500" />
                            Phương thức thanh toán
                        </h2>

                        <div className="grid grid-cols-2 gap-3 mb-6">
                            {/* Credit Card */}
                            <button
                                onClick={() => setPaymentMethod('credit_card')}
                                className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${paymentMethod === 'credit_card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                            >
                                <div
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${paymentMethod === 'credit_card' ? 'bg-blue-600' : 'bg-gray-100'}`}
                                >
                                    <CreditCardIcon
                                        className={`w-5 h-5 ${paymentMethod === 'credit_card' ? 'text-white' : 'text-gray-500'}`}
                                    />
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-gray-800">
                                        Thẻ tín dụng
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Visa, Mastercard
                                    </div>
                                </div>
                            </button>

                            {/* MoMo */}
                            <button
                                onClick={() => setPaymentMethod('momo')}
                                className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${paymentMethod === 'momo' ? 'border-pink-500 bg-pink-50' : 'border-gray-200 hover:border-gray-300'}`}
                            >
                                <div
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${paymentMethod === 'momo' ? 'bg-pink-600' : 'bg-gray-100'}`}
                                >
                                    <SmartphoneIcon
                                        className={`w-5 h-5 ${paymentMethod === 'momo' ? 'text-white' : 'text-gray-500'}`}
                                    />
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-gray-800">
                                        Ví MoMo
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Thanh toán nhanh
                                    </div>
                                </div>
                            </button>

                            {/* Bank Transfer */}
                            <button
                                onClick={() => setPaymentMethod('bank_transfer')}
                                className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${paymentMethod === 'bank_transfer' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}
                            >
                                <div
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${paymentMethod === 'bank_transfer' ? 'bg-green-600' : 'bg-gray-100'}`}
                                >
                                    <BuildingIcon
                                        className={`w-5 h-5 ${paymentMethod === 'bank_transfer' ? 'text-white' : 'text-gray-500'}`}
                                    />
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-gray-800">
                                        Ngân hàng
                                    </div>
                                    <div className="text-xs text-gray-500">Chuyển khoản</div>
                                </div>
                            </button>

                            {/* ZaloPay */}
                            <button
                                onClick={() => setPaymentMethod('zalopay')}
                                className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${paymentMethod === 'zalopay' ? 'border-blue-400 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                            >
                                <div
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${paymentMethod === 'zalopay' ? 'bg-blue-500' : 'bg-gray-100'}`}
                                >
                                    <SmartphoneIcon
                                        className={`w-5 h-5 ${paymentMethod === 'zalopay' ? 'text-white' : 'text-gray-500'}`}
                                    />
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-gray-800">
                                        ZaloPay
                                    </div>
                                    <div className="text-xs text-gray-500">Ví điện tử</div>
                                </div>
                            </button>
                        </div>

                        {/* Credit Card Fields */}
                        {paymentMethod === 'credit_card' && (
                            <div className="space-y-4 border-t pt-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Số thẻ <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={form.cardNumber}
                                        onChange={(e) =>
                                            handleChange(
                                                'cardNumber',
                                                formatCardNumber(e.target.value),
                                            )
                                        }
                                        placeholder="1234 5678 9012 3456"
                                        maxLength={19}
                                        className={`w-full px-4 py-3 border rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.cardNumber ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                                    />
                                    {errors.cardNumber && (
                                        <p className="text-xs text-red-500 mt-1">
                                            {errors.cardNumber}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Tên chủ thẻ <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={form.cardName}
                                        onChange={(e) =>
                                            handleChange('cardName', e.target.value.toUpperCase())
                                        }
                                        placeholder="NGUYEN VAN A"
                                        className={`w-full px-4 py-3 border rounded-xl text-sm uppercase focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.cardName ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                                    />
                                    {errors.cardName && (
                                        <p className="text-xs text-red-500 mt-1">
                                            {errors.cardName}
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Ngày hết hạn <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={form.expiry}
                                            onChange={(e) =>
                                                handleChange('expiry', formatExpiry(e.target.value))
                                            }
                                            placeholder="MM/YY"
                                            maxLength={5}
                                            className={`w-full px-4 py-3 border rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.expiry ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                                        />
                                        {errors.expiry && (
                                            <p className="text-xs text-red-500 mt-1">
                                                {errors.expiry}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            CVV <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="password"
                                            value={form.cvv}
                                            onChange={(e) =>
                                                handleChange(
                                                    'cvv',
                                                    e.target.value.replace(/\D/g, '').slice(0, 4),
                                                )
                                            }
                                            placeholder="•••"
                                            maxLength={4}
                                            className={`w-full px-4 py-3 border rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.cvv ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                                        />
                                        {errors.cvv && (
                                            <p className="text-xs text-red-500 mt-1">
                                                {errors.cvv}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* MoMo Instructions */}
                        {paymentMethod === 'momo' && (
                            <div className="border-t pt-5">
                                <div className="bg-pink-50 rounded-xl p-4 text-sm text-pink-800">
                                    <p className="font-semibold mb-1">
                                        Hướng dẫn thanh toán MoMo:
                                    </p>
                                    <ol className="list-decimal list-inside space-y-1 text-pink-700">
                                        <li>Mở ứng dụng MoMo trên điện thoại</li>
                                        <li>Chọn "Quét mã QR" hoặc "Chuyển tiền"</li>
                                        <li>
                                            Nhập số điện thoại: <strong>0901 234 567</strong>
                                        </li>
                                        <li>Nhập số tiền và xác nhận</li>
                                    </ol>
                                </div>
                            </div>
                        )}

                        {/* Bank Transfer Instructions */}
                        {paymentMethod === 'bank_transfer' && (
                            <div className="border-t pt-5">
                                <div className="bg-green-50 rounded-xl p-4 text-sm text-green-800">
                                    <p className="font-semibold mb-2">
                                        Thông tin chuyển khoản:
                                    </p>
                                    <div className="space-y-1 text-green-700">
                                        <p>
                                            Ngân hàng: <strong>Vietcombank</strong>
                                        </p>
                                        <p>
                                            Số tài khoản: <strong>1234567890</strong>
                                        </p>
                                        <p>
                                            Chủ tài khoản:{' '}
                                            <strong>CONG TY TNHH MAGIC PATTERNS</strong>
                                        </p>
                                        <p>
                                            Nội dung: <strong>THANHTOAN [email của bạn]</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ZaloPay Instructions */}
                        {paymentMethod === 'zalopay' && (
                            <div className="border-t pt-5">
                                <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-800">
                                    <p className="font-semibold mb-1">
                                        Hướng dẫn thanh toán ZaloPay:
                                    </p>
                                    <ol className="list-decimal list-inside space-y-1 text-blue-700">
                                        <li>Mở ứng dụng ZaloPay</li>
                                        <li>Chọn "Quét mã" hoặc "Chuyển tiền"</li>
                                        <li>
                                            Nhập số điện thoại: <strong>0901 234 567</strong>
                                        </li>
                                        <li>Xác nhận thanh toán</li>
                                    </ol>
                                </div>
                            </div>
                        )}
                    </div>

                    <Link
                        to="/cart"
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm transition-colors"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Quay lại giỏ hàng
                    </Link>
                </div>

                {/* Right: Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                        <h2 className="text-lg font-bold text-gray-900 mb-5">
                            Đơn hàng của bạn
                        </h2>

                       
                            <p className="text-sm text-gray-500 text-center py-4">
                                Giỏ hàng trống
                            </p>
                        {/* ) : (
                            <div className="space-y-3 mb-5">
                                {items.map((item) => (
                                    <div key={item.course.id} className="flex gap-3">
                                        <img
                                            src={item.course.image}
                                            alt={item.course.title}
                                            className="w-14 h-10 object-cover rounded-lg flex-shrink-0"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-medium text-gray-800 line-clamp-2 leading-snug">
                                                {item.course.title}
                                            </p>
                                            <p className="text-xs text-blue-600 font-semibold mt-0.5">
                                                {formatPrice(item.course.price)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )} */}

                        <div className="border-t pt-4 space-y-2 mb-5">
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Tạm tính</span>
                                <span>900.000</span>
                            </div>
                            <div className="flex justify-between font-bold text-gray-900 text-base">
                                <span>Tổng cộng</span>
                                <span className="text-blue-600">
                                    900.000
                                </span>
                            </div>
                        </div>

                        {/* <button
                           
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                        >
                            {isProcessing ? (
                                <>
                                    <svg
                                        className="animate-spin w-4 h-4"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                        />
                                    </svg>
                                    Đang xử lý...
                                </>
                            ) : (
                                <>
                                    <LockIcon className="w-4 h-4" />
                                    Hoàn tất đặt hàng
                                </>
                            )}
                        </button> */}

                        <p className="text-xs text-gray-400 text-center mt-3 flex items-center justify-center gap-1">
                            <LockIcon className="w-3 h-3" />
                            Thanh toán được mã hóa SSL 256-bit
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}
