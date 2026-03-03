import { Footer } from '@/components/client/footer/Footer'
import { Navbar } from '@/components/client/navbar/Navbar'
import {
    BookOpenIcon,
    CheckCircleIcon,
    DownloadIcon,
    HomeIcon
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function formatPrice(price: number): string {
    return price.toLocaleString('vi-VN') + 'đ'
}
function generateOrderId(): string {
    return 'MP-' + Math.random().toString(36).substring(2, 8).toUpperCase()
}
interface ConfettiPiece {
    id: number
    x: number
    color: string
    delay: number
    duration: number
    size: number
}
function ConfettiEffect() {
    const pieces: ConfettiPiece[] = Array.from(
        {
            length: 40,
        },
        (_, i) => ({
            id: i,
            x: Math.random() * 100,
            color: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'][
                Math.floor(Math.random() * 6)
            ],
            delay: Math.random() * 1.5,
            duration: 2 + Math.random() * 2,
            size: 6 + Math.random() * 8,
        }),
    )
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
            {pieces.map((piece) => (
                <div
                    key={piece.id}
                    className="absolute top-0 rounded-sm"
                    style={{
                        left: `${piece.x}%`,
                        width: piece.size,
                        height: piece.size,
                        backgroundColor: piece.color,
                        animation: `confettiFall ${piece.duration}s ${piece.delay}s ease-in forwards`,
                        transform: `rotate(${Math.random() * 360}deg)`,
                    }}
                />
            ))}
            <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
        </div>
    )
}
export function PaymentPage() {
    const location = useLocation()
    const navigate = useNavigate()
    const [phase, setPhase] = useState<'processing' | 'success'>('processing')
    const [showConfetti, setShowConfetti] = useState(false)
    const orderId = useRef(generateOrderId())
    const stateData = location.state as {
        success?: boolean
        items?: Array<{
            course: {
                id: string
                title: string
                image: string
                price: number
            }
        }>
        total?: number
    } | null
    const items = stateData?.items ?? []
    const total = stateData?.total ?? 0
    useEffect(() => {
        const timer = setTimeout(() => {
            setPhase('success')
            setShowConfetti(true)
            setTimeout(() => setShowConfetti(false), 4000)
        }, 2200)
        return () => clearTimeout(timer)
    }, [])
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            {showConfetti && <ConfettiEffect />}

            <main className="flex-1 flex items-center justify-center px-4 py-16">
                {phase === 'processing' /* Processing State */ ? (
                    <div className="text-center">
                        <div className="relative w-24 h-24 mx-auto mb-6">
                            <div className="absolute inset-0 rounded-full border-4 border-blue-100" />
                            <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                                    <div className="w-5 h-5 bg-blue-600 rounded-full animate-pulse" />
                                </div>
                            </div>
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">
                            Đang xử lý thanh toán...
                        </h2>
                        <p className="text-gray-500 text-sm">
                            Vui lòng không đóng trang này
                        </p>
                        <div className="flex justify-center gap-1 mt-4">
                            {[0, 1, 2].map((i) => (
                                <div
                                    key={i}
                                    className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                                    style={{
                                        animationDelay: `${i * 0.15}s`,
                                    }}
                                />
                            ))}
                        </div>
                    </div> /* Success State */
                ) : (
                    <div className="max-w-lg w-full">
                        {/* Success Card */}
                        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                            {/* Green Header */}
                            <div className="bg-gradient-to-br from-green-400 to-emerald-500 px-8 pt-10 pb-16 text-center relative">
                                <div className="absolute inset-0 opacity-10">
                                    {[...Array(6)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="absolute rounded-full bg-white"
                                            style={{
                                                width: 40 + i * 20,
                                                height: 40 + i * 20,
                                                top: `${Math.random() * 80}%`,
                                                left: `${Math.random() * 80}%`,
                                            }}
                                        />
                                    ))}
                                </div>
                                <div className="relative">
                                    <div
                                        className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                                        style={{
                                            animation: 'successPop 0.5s ease-out',
                                        }}
                                    >
                                        <CheckCircleIcon className="w-12 h-12 text-green-500" />
                                    </div>
                                    <h1 className="text-2xl font-bold text-white mb-1">
                                        Thanh toán thành công!
                                    </h1>
                                    <p className="text-green-100 text-sm">
                                        Cảm ơn bạn đã tin tưởng MagicLearn
                                    </p>
                                </div>
                            </div>

                            {/* Order Info */}
                            <div className="px-8 -mt-6 relative z-10">
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-5">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-xs text-gray-500 mb-0.5">
                                                Mã đơn hàng
                                            </p>
                                            <p className="font-bold text-gray-900 font-mono">
                                                {orderId.current}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-500 mb-0.5">
                                                Tổng thanh toán
                                            </p>
                                            <p className="font-bold text-blue-600 text-lg">
                                                {formatPrice(total)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Purchased Courses */}
                                {items.length > 0 && (
                                    <div className="mb-5">
                                        <p className="text-sm font-semibold text-gray-700 mb-3">
                                            Khóa học đã mua ({items.length})
                                        </p>
                                        <div className="space-y-3">
                                            {items.map((item) => (
                                                <div
                                                    key={item.course.id}
                                                    className="flex items-center gap-3 bg-gray-50 rounded-xl p-3"
                                                >
                                                    <img
                                                        src={item.course.image}
                                                        alt={item.course.title}
                                                        className="w-12 h-9 object-cover rounded-lg flex-shrink-0"
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-800 line-clamp-1">
                                                            {item.course.title}
                                                        </p>
                                                        <p className="text-xs text-green-600 font-medium">
                                                            ✓ Đã kích hoạt
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* CTA Buttons */}
                                <div className="space-y-3 pb-8">
                                    <Link
                                        to="/my-courses"
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                                    >
                                        <BookOpenIcon className="w-5 h-5" />
                                        Bắt đầu học ngay
                                    </Link>
                                    <div className="grid grid-cols-2 gap-3">
                                        <Link
                                            to="/"
                                            className="flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-xl transition-colors text-sm"
                                        >
                                            <HomeIcon className="w-4 h-4" />
                                            Về trang chủ
                                        </Link>
                                        <button
                                            onClick={() => window.print()}
                                            className="flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-xl transition-colors text-sm"
                                        >
                                            <DownloadIcon className="w-4 h-4" />
                                            Lưu hóa đơn
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Extra info */}
                        <p className="text-center text-xs text-gray-400 mt-4">
                            Hóa đơn đã được gửi đến email của bạn · Hỗ trợ:
                            support@magiclearn.vn
                        </p>
                    </div>
                )}
            </main>

            <Footer />

            <style>{`
        @keyframes successPop {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
        </div>
    )
}
