import { CourseResponse } from '@/types/course.type'
import React, { useEffect, useState, createContext, useContext } from 'react'
interface CartItem {
    _id: string
    title: string
    slug: string
    price: number
    discount_price: number
    thumbnail: string
    categoryName?: string
    totalLessons: number
    updatedAt: string
    level: string
}
interface CartContextType {
    cartItems: CartItem[]
    addToCart: (course: CourseResponse) => void
    removeFromCart: (courseId: string) => void
    clearCart: () => void
    isInCart: (courseId: string) => boolean
    cartCount: number
    cartTotal: number
}
const CartContext = createContext<CartContextType | undefined>(undefined)
export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        try {
            const saved = localStorage.getItem('cart')
            return saved ? JSON.parse(saved) : []
        } catch (error) {
            console.error('Failed to parse cart from localStorage', error)
            return []
        }
    })
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems))
    }, [cartItems])
    const addToCart = (course: CourseResponse) => {
        setCartItems((prev) => {
            if (prev.find((item) => item._id === course._id)) return prev

            return [
                ...prev,
                {
                    _id: course._id,
                    title: course.title,
                    slug: course.slug,
                    price: course.price,
                    discount_price: course.discount_price ?? 0,
                    thumbnail: course.thumbnail || "",
                    categoryName: course?.category_id?.name,
                    totalLessons: course.totalLessons ?? 0,
                    level: course.level,
                    updatedAt: course.updatedAt
                }
            ]
        })
    }
    const removeFromCart = (courseId: string) => {
        setCartItems((prev) => prev.filter((item) => item._id !== courseId))
    }
    const clearCart = () => setCartItems([])
    const isInCart = (courseId: string) =>
        cartItems.some((item) => item._id === courseId)
    const cartCount = cartItems.length
    const cartTotal = cartItems.reduce(
        (total, item) => total + (item.discount_price && item.discount_price > 0 ? item.discount_price : item.price),
        0
    )
    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
                isInCart,
                cartCount,
                cartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}
export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}
