import React, { useEffect, createContext, useContext, useReducer, ReactNode } from 'react'
export interface Course {
    id: string
    title: string
    instructor: string
    price: number
    originalPrice: number
    image: string
    rating: number
    students: number
    duration: string
    level: string
    category: string
    description?: string
    lessons?: number
    isBestseller?: boolean
    isFeatured?: boolean
}
export interface CartItem {
    course: Course
    quantity: number
}
interface CartState {
    items: CartItem[]
}
type CartAction =
    | {
        type: 'ADD_TO_CART'
        course: Course
    }
    | {
        type: 'REMOVE_FROM_CART'
        courseId: string
    }
    | {
        type: 'CLEAR_CART'
    }
    | {
        type: 'LOAD_CART'
        items: CartItem[]
    }
interface CartContextType {
    items: CartItem[]
    addToCart: (course: Course) => void
    removeFromCart: (courseId: string) => void
    clearCart: () => void
    totalItems: number
    totalPrice: number
    isInCart: (courseId: string) => boolean
}
const CartContext = createContext<CartContextType | undefined>(undefined)
function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const exists = state.items.find(
                (item) => item.course.id === action.course.id,
            )
            if (exists) return state
            return {
                items: [
                    ...state.items,
                    {
                        course: action.course,
                        quantity: 1,
                    },
                ],
            }
        }
        case 'REMOVE_FROM_CART':
            return {
                items: state.items.filter((item) => item.course.id !== action.courseId),
            }
        case 'CLEAR_CART':
            return {
                items: [],
            }
        case 'LOAD_CART':
            return {
                items: action.items,
            }
        default:
            return state
    }
}
export function CartProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, {
        items: [],
    })
    useEffect(() => {
        const saved = localStorage.getItem('mp_cart')
        if (saved) {
            try {
                const items = JSON.parse(saved) as CartItem[]
                dispatch({
                    type: 'LOAD_CART',
                    items,
                })
            } catch { }
        }
    }, [])
    useEffect(() => {
        localStorage.setItem('mp_cart', JSON.stringify(state.items))
    }, [state.items])
    const addToCart = (course: Course) =>
        dispatch({
            type: 'ADD_TO_CART',
            course,
        })
    const removeFromCart = (courseId: string) =>
        dispatch({
            type: 'REMOVE_FROM_CART',
            courseId,
        })
    const clearCart = () =>
        dispatch({
            type: 'CLEAR_CART',
        })
    const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = state.items.reduce(
        (sum, item) => sum + item.course.price * item.quantity,
        0,
    )
    const isInCart = (courseId: string) =>
        state.items.some((item) => item.course.id === courseId)
    return (
        <CartContext.Provider
            value={{
                items: state.items,
                addToCart,
                removeFromCart,
                clearCart,
                totalItems,
                totalPrice,
                isInCart,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}
export function useCart(): CartContextType {
    const ctx = useContext(CartContext)
    if (!ctx) throw new Error('useCart must be used within CartProvider')
    return ctx
}
