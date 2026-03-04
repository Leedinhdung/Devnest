import { Course } from '@/data/mockData'
import React, { useEffect, useState, createContext, useContext } from 'react'

interface CartContextType {
    cartItems: Course[]
    addToCart: (course: Course) => void
    removeFromCart: (courseId: string) => void
    clearCart: () => void
    isInCart: (courseId: string) => boolean
    cartCount: number
    cartTotal: number
}
const CartContext = createContext<CartContextType | undefined>(undefined)
export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartItems, setCartItems] = useState<Course[]>(() => {
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
    const addToCart = (course: Course) => {
        setCartItems((prev) => {
            if (prev.find((item) => item.id === course.id)) return prev
            return [...prev, course]
        })
    }
    const removeFromCart = (courseId: string) => {
        setCartItems((prev) => prev.filter((item) => item.id !== courseId))
    }
    const clearCart = () => setCartItems([])
    const isInCart = (courseId: string) =>
        cartItems.some((item) => item.id === courseId)
    const cartCount = cartItems.length
    const cartTotal = cartItems.reduce((total, item) => total + item.price, 0)
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
