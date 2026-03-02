import { Header } from "@/components/admin/header/Header"
import { Sidebar } from "@/components/admin/sidebar/Sidebar"

export function AdminLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            <Sidebar isOpen={false} onClose={() => { }}
            />
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <Header
                    onMenuToggle={() => { }}
                />
                <main className="flex-1 overflow-y-auto p-4 sm:p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}
