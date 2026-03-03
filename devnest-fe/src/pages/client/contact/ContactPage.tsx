import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    MapPinIcon,
    PhoneIcon,
    MailIcon,
    ClockIcon,
    SendIcon,
    CheckCircleIcon,
    MessageSquareIcon,
    HeadphonesIcon,
    BookOpenIcon,
    ChevronDownIcon,
    ChevronUpIcon,
} from 'lucide-react'
interface FormData {
    name: string
    email: string
    phone: string
    subject: string
    message: string
}
interface FormErrors {
    name?: string
    email?: string
    message?: string
}
const faqs = [
    {
        q: 'Làm thế nào để hoàn tiền nếu không hài lòng?',
        a: 'Chúng tôi đảm bảo hoàn tiền 100% trong vòng 30 ngày kể từ ngày mua nếu bạn không hài lòng với khóa học. Chỉ cần liên hệ với đội hỗ trợ qua email hoặc chat.',
    },
    {
        q: 'Tôi có thể học trên điện thoại di động không?',
        a: 'Có! DevNest hỗ trợ học trên tất cả các thiết bị bao gồm điện thoại iOS, Android, máy tính bảng và máy tính. Bạn có thể học mọi lúc, mọi nơi.',
    },
    {
        q: 'Chứng chỉ hoàn thành có giá trị không?',
        a: 'Chứng chỉ của DevNest được nhiều doanh nghiệp hàng đầu Việt Nam công nhận. Bạn có thể thêm chứng chỉ vào hồ sơ LinkedIn và CV của mình.',
    },
]
export function ContactPage() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        subject: 'Hỏi về khóa học',
        message: '',
    })
    const [errors, setErrors] = useState<FormErrors>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
    const validate = (): boolean => {
        const newErrors: FormErrors = {}
        if (!formData.name.trim()) newErrors.name = 'Vui lòng nhập họ tên'
        if (!formData.email.trim()) {
            newErrors.email = 'Vui lòng nhập email'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ'
        }
        if (!formData.message.trim()) {
            newErrors.message = 'Vui lòng nhập nội dung'
        } else if (formData.message.trim().length < 20) {
            newErrors.message = 'Nội dung tối thiểu 20 ký tự'
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validate()) return
        setIsSubmitting(true)
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setIsSubmitting(false)
        setIsSubmitted(true)
    }
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }))
        }
    }
    return (
        <main className="w-full min-h-screen bg-gray-50 pt-16">
            {/* Header */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.5,
                        }}
                    >
                        <span className="inline-block bg-primary-50 text-primary-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                            💬 Hỗ trợ 24/7
                        </span>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                            Liên hệ với chúng tôi
                        </h1>
                        <p className="text-gray-500 max-w-xl mx-auto text-lg">
                            Chúng tôi luôn sẵn sàng hỗ trợ bạn. Gửi tin nhắn và nhận phản hồi
                            trong vòng 24 giờ.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Quick contact options */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        delay: 0.1,
                    }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
                >
                    {[
                        {
                            icon: HeadphonesIcon,
                            title: 'Hỗ trợ kỹ thuật',
                            desc: 'Gặp vấn đề kỹ thuật? Đội IT của chúng tôi sẵn sàng hỗ trợ ngay.',
                            action: 'Chat ngay',
                            color: 'bg-blue-50 text-blue-600',
                            border: 'border-blue-100',
                        },
                        {
                            icon: BookOpenIcon,
                            title: 'Tư vấn khóa học',
                            desc: 'Không biết chọn khóa học nào? Để chúng tôi tư vấn cho bạn.',
                            action: 'Đặt lịch tư vấn',
                            color: 'bg-purple-50 text-purple-600',
                            border: 'border-purple-100',
                        },
                        {
                            icon: MessageSquareIcon,
                            title: 'Phản hồi & Góp ý',
                            desc: 'Ý kiến của bạn giúp chúng tôi cải thiện dịch vụ tốt hơn.',
                            action: 'Gửi phản hồi',
                            color: 'bg-emerald-50 text-emerald-600',
                            border: 'border-emerald-100',
                        },
                    ].map((item) => (
                        <div
                            key={item.title}
                            className={`bg-white rounded-2xl border ${item.border} p-5 hover:shadow-sm transition-shadow`}
                        >
                            <div
                                className={`w-11 h-11 ${item.color} rounded-xl flex items-center justify-center mb-3`}
                            >
                                <item.icon className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-1.5">{item.title}</h3>
                            <p className="text-sm text-gray-500 mb-3 leading-relaxed">
                                {item.desc}
                            </p>
                            <button className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">
                                {item.action} →
                            </button>
                        </div>
                    ))}
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-8">
                    {/* Contact form */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            x: -20,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        transition={{
                            delay: 0.2,
                        }}
                        className="lg:col-span-3"
                    >
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">
                                Gửi tin nhắn
                            </h2>

                            {isSubmitted ? (
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        scale: 0.9,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                    }}
                                    className="text-center py-10"
                                >
                                    <motion.div
                                        initial={{
                                            scale: 0,
                                        }}
                                        animate={{
                                            scale: 1,
                                        }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 200,
                                            delay: 0.1,
                                        }}
                                        className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4"
                                    >
                                        <CheckCircleIcon className="w-8 h-8 text-emerald-500" />
                                    </motion.div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        Gửi thành công!
                                    </h3>
                                    <p className="text-gray-500 mb-5">
                                        Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong vòng 24
                                        giờ.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setIsSubmitted(false)
                                            setFormData({
                                                name: '',
                                                email: '',
                                                phone: '',
                                                subject: 'Hỏi về khóa học',
                                                message: '',
                                            })
                                        }}
                                        className="text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                                    >
                                        Gửi tin nhắn khác
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Họ và tên <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Nguyễn Văn A"
                                                className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-transparent'}`}
                                            />
                                            {errors.name && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors.name}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Email <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="email@example.com"
                                                className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-transparent'}`}
                                            />
                                            {errors.email && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Số điện thoại
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="0912 345 678"
                                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Chủ đề
                                            </label>
                                            <select
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white"
                                            >
                                                <option>Hỏi về khóa học</option>
                                                <option>Hỗ trợ kỹ thuật</option>
                                                <option>Thanh toán & Hoàn tiền</option>
                                                <option>Hợp tác giảng dạy</option>
                                                <option>Báo lỗi</option>
                                                <option>Khác</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Nội dung <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Mô tả chi tiết vấn đề hoặc câu hỏi của bạn..."
                                            rows={5}
                                            className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-none ${errors.message ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-transparent'}`}
                                        />
                                        {errors.message && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.message}
                                            </p>
                                        )}
                                        <p className="text-xs text-gray-400 mt-1 text-right">
                                            {formData.message.length}/500 ký tự
                                        </p>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold py-3.5 rounded-xl transition-colors"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Đang gửi...
                                            </>
                                        ) : (
                                            <>
                                                <SendIcon className="w-4 h-4" />
                                                Gửi tin nhắn
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>

                    {/* Contact info + FAQ */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            x: 20,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        transition={{
                            delay: 0.3,
                        }}
                        className="lg:col-span-2 space-y-5"
                    >
                        {/* Contact info */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6">
                            <h3 className="font-bold text-gray-900 mb-5">
                                Thông tin liên hệ
                            </h3>
                            <div className="space-y-4">
                                {[
                                    {
                                        icon: MapPinIcon,
                                        label: 'Địa chỉ',
                                        value: '123 Nguyễn Huệ, Quận 1\nTP. Hồ Chí Minh',
                                        color: 'text-red-500 bg-red-50',
                                    },
                                    {
                                        icon: PhoneIcon,
                                        label: 'Điện thoại',
                                        value: '1800 1234 (Miễn phí)',
                                        color: 'text-green-500 bg-green-50',
                                    },
                                    {
                                        icon: MailIcon,
                                        label: 'Email',
                                        value: 'support@DevNest.vn',
                                        color: 'text-blue-500 bg-blue-50',
                                    },
                                    {
                                        icon: ClockIcon,
                                        label: 'Giờ làm việc',
                                        value: 'T2-T6: 8:00 - 18:00\nT7: 8:00 - 12:00',
                                        color: 'text-purple-500 bg-purple-50',
                                    },
                                ].map((item) => (
                                    <div key={item.label} className="flex items-start gap-3">
                                        <div
                                            className={`w-9 h-9 ${item.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                                        >
                                            <item.icon className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-0.5">
                                                {item.label}
                                            </p>
                                            <p className="text-sm font-medium text-gray-900 whitespace-pre-line">
                                                {item.value}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Map placeholder */}
                        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                            <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-44 flex items-center justify-center relative">
                                <div className="text-center">
                                    <MapPinIcon className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                                    <p className="text-sm font-medium text-gray-700">
                                        123 Nguyễn Huệ, Q.1
                                    </p>
                                    <p className="text-xs text-gray-500">TP. Hồ Chí Minh</p>
                                </div>
                                <a
                                    href="https://maps.google.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute bottom-3 right-3 text-xs text-primary-600 font-medium bg-white px-3 py-1.5 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                                >
                                    Mở Google Maps →
                                </a>
                            </div>
                        </div>

                        {/* FAQ */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-5">
                            <h3 className="font-bold text-gray-900 mb-4">
                                Câu hỏi thường gặp
                            </h3>
                            <div className="space-y-2">
                                {faqs.map((faq, i) => (
                                    <div
                                        key={i}
                                        className="border border-gray-100 rounded-xl overflow-hidden"
                                    >
                                        <button
                                            onClick={() =>
                                                setExpandedFaq(expandedFaq === i ? null : i)
                                            }
                                            className="w-full flex items-center justify-between p-3.5 text-left hover:bg-gray-50 transition-colors"
                                        >
                                            <span className="text-sm font-medium text-gray-900 pr-2">
                                                {faq.q}
                                            </span>
                                            {expandedFaq === i ? (
                                                <ChevronUpIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                            ) : (
                                                <ChevronDownIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                            )}
                                        </button>
                                        <AnimatePresence>
                                            {expandedFaq === i && (
                                                <motion.div
                                                    initial={{
                                                        height: 0,
                                                        opacity: 0,
                                                    }}
                                                    animate={{
                                                        height: 'auto',
                                                        opacity: 1,
                                                    }}
                                                    exit={{
                                                        height: 0,
                                                        opacity: 0,
                                                    }}
                                                    transition={{
                                                        duration: 0.2,
                                                    }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="px-3.5 pb-3.5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                                                        {faq.a}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    )
}
