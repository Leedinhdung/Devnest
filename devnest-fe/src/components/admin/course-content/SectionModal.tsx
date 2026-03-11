import { Modal } from "@/components/ui/modal"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

interface SectionModalProps {
    open: boolean
    onClose: () => void
    onSubmit: (data: { title: string }) => void
    defaultValue?: { title: string } | null
}

export function SectionModal({
    open,
    onClose,
    onSubmit,
    defaultValue
}: SectionModalProps) {

    const { register, handleSubmit, reset } = useForm<{ title: string }>({
        defaultValues: { title: "" }
    })
    useEffect(() => {
        if (defaultValue) {
            reset(defaultValue)
        } else {
            reset({ title: "" })
        }
    }, [defaultValue, reset])
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Modal
                isOpen={open}
                onClose={() => {
                    onClose()
                    reset()
                }}
                title={defaultValue ? 'Chỉnh sửa chương' : 'Thêm chương mới'}
                size="sm"
                footer={
                    <>
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                        >
                            Hủy
                        </button>
                        <button
                            type='submit'
                            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors"
                        >
                            {defaultValue ? 'Lưu thay đổi' : 'Thêm chương'}
                        </button>
                    </>
                }
            >

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Tên chương <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        {...register("title")}
                        className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="VD: Giới thiệu khóa học..."
                        autoFocus
                    />
                </div>

            </Modal>
        </form>
    )
}