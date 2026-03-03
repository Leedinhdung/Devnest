import { Footer } from '@/components/client/footer/Footer'
import { Navbar } from '@/components/client/navbar/Navbar'
import { LearnPage } from '@/pages/client/learn/LearnPage'

import { AnimatePresence, motion } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'

const pageVariants = {
    initial: {
        opacity: 0,
        y: 10,
    },
    animate: {
        opacity: 1,
        y: 0,
    },
    exit: {
        opacity: 0,
        y: -10,
    },
}
const pageTransition = {
    duration: 0.22,
    ease: 'easeInOut',
}
function ClientLayout({ children }: { children: React.ReactNode }) {
    const location = useLocation()
    const isLearnPage = location.pathname.startsWith('/learn/')
    if (isLearnPage) {
        return (
            <Routes location={location} key={location.pathname}>
                <Route path="/learn/:id" element={<LearnPage />} />
            </Routes>
        )
    }
    //   if (isLoginPage) {
    //     return (
    //       <Routes location={location} key={location.pathname}>
    //         <Route path="/login" element={<LoginPage />} />
    //       </Routes>
    //     )
    //   }
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-1">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={pageTransition}
                    >
                        <main className="container mx-auto px-4 py-8">
                            {children}
                        </main>
                    </motion.div>
                </AnimatePresence>
            </div>
            <Footer />
        </div>
    )
}
export default ClientLayout