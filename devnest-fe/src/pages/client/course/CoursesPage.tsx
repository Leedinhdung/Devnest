import { CourseCard } from '@/components/client/course/CourseCard'
import { useGetCategories } from '@/hooks/category'
import { useGetCourses } from '@/hooks/course'
import { AnimatePresence, motion } from 'framer-motion'
import {
    GridIcon,
    ListIcon,
    SearchIcon,
    SlidersHorizontalIcon,
    XIcon,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const levels = [
    { label: "Tất cả", value: "all" },
    { label: "Cơ bản", value: "beginner" },
    { label: "Trung cấp", value: "intermediate" },
    { label: "Nâng cao", value: "advanced" },
]
const sortOptions = [
    {
        value: 'popular',
        label: 'Phổ biến nhất',
    },
    {
        value: 'newest',
        label: 'Mới nhất',
    },
    {
        value: 'rating',
        label: 'Đánh giá cao nhất',
    },
    {
        value: 'price-asc',
        label: 'Giá tăng dần',
    },
    {
        value: 'price-desc',
        label: 'Giá giảm dần',
    },
]
export function CoursesPage() {
    const { data: courses, isLoading } = useGetCourses()
    const { data: categories = [] } = useGetCategories()

    const [searchParams, setSearchParams] = useSearchParams()
    const [search, setSearch] = useState(searchParams.get('search') || '')
    const [selectedCategory, setSelectedCategory] = useState(
        searchParams.get('category') || 'Tất cả',
    )
    const [selectedLevel, setSelectedLevel] = useState('all')
    const [sortBy, setSortBy] = useState('popular')
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [showFilters, setShowFilters] = useState(false)
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000000])
    const filteredCourses = useMemo(() => {
        if (!courses) return []

        let result = [...courses]

        if (search) {
            result = result.filter((c) =>
                c.title.toLowerCase().includes(search.toLowerCase()),
            )
        }

        if (selectedCategory !== 'Tất cả') {
            result = result.filter(
                (c) => c.category_id?.name === selectedCategory,
            )
        }

        if (selectedLevel !== 'all') {
            result = result.filter((c) => c.level === selectedLevel)
        }

        result = result.filter((c) => {
            const finalPrice = c.discount_price ?? c.price
            return finalPrice >= priceRange[0] && finalPrice <= priceRange[1]
        })

        switch (sortBy) {
            case 'price-asc':
                result.sort(
                    (a, b) =>
                        (a.discount_price ?? a.price) -
                        (b.discount_price ?? b.price),
                )
                break

            case 'price-desc':
                result.sort(
                    (a, b) =>
                        (b.discount_price ?? b.price) -
                        (a.discount_price ?? a.price),
                )
                break
        }

        return result
    }, [courses, search, selectedCategory, selectedLevel, sortBy, priceRange])
    const clearFilters = () => {
        setSearch('')
        setSelectedCategory('Tất cả')
        setSelectedLevel('all')
        setSortBy('popular')
        setPriceRange([0, 3000000])
    }
    const hasActiveFilters =
        search ||
        selectedCategory !== 'Tất cả' ||
        selectedLevel !== 'all' ||
        sortBy !== 'popular'
    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                Loading...
            </div>
        )
    }
    return (
        <main className="w-full min-h-screen bg-gray-50 pt-16">
            {/* Header */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Tất cả khóa học
                    </h1>
                    <p className="text-gray-500">
                        Khám phá {courses?.length}+ khóa học từ các chuyên gia hàng đầu
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Search & Controls */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <div className="relative flex-1">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm khóa học, giảng viên..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                        />
                        {search && (
                            <button
                                onClick={() => setSearch('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                                <XIcon className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                            </button>
                        )}
                    </div>

                    <div className="flex gap-2">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-700"
                        >
                            {sortOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${showFilters ? 'bg-primary-600 text-white border-primary-600' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                        >
                            <SlidersHorizontalIcon className="w-4 h-4" />
                            Bộ lọc
                        </button>

                        <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2.5 transition-colors ${viewMode === 'grid' ? 'bg-primary-50 text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
                                aria-label="Grid view"
                            >
                                <GridIcon className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2.5 transition-colors ${viewMode === 'list' ? 'bg-primary-50 text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
                                aria-label="List view"
                            >
                                <ListIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Filters Panel */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{
                                opacity: 0,
                                height: 0,
                            }}
                            animate={{
                                opacity: 1,
                                height: 'auto',
                            }}
                            exit={{
                                opacity: 0,
                                height: 0,
                            }}
                            transition={{
                                duration: 0.2,
                            }}
                            className="overflow-hidden mb-6"
                        >
                            <div className="bg-white rounded-2xl border border-gray-100 p-5">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-3 text-sm">
                                            Danh mục
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {categories.map((cat, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setSelectedCategory(cat.name)}
                                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${selectedCategory === cat.name ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                                >
                                                    {cat.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-3 text-sm">
                                            Trình độ
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {levels.map((level) => (
                                                <button
                                                    key={level.value}
                                                    onClick={() => setSelectedLevel(level.value)}
                                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${selectedLevel === level.value ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                                >
                                                    {level.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-3 text-sm">
                                            Khoảng giá
                                        </h3>
                                        <div className="space-y-2">
                                            {[
                                                {
                                                    label: 'Tất cả',
                                                    range: [0, 3000000] as [number, number],
                                                },
                                                {
                                                    label: 'Dưới 500K',
                                                    range: [0, 500000] as [number, number],
                                                },
                                                {
                                                    label: '500K - 1 triệu',
                                                    range: [500000, 1000000] as [number, number],
                                                },
                                                {
                                                    label: 'Trên 1 triệu',
                                                    range: [1000000, 3000000] as [number, number],
                                                },
                                            ].map((opt) => (
                                                <label
                                                    key={opt.label}
                                                    className="flex items-center gap-2 cursor-pointer"
                                                >
                                                    <input
                                                        type="radio"
                                                        name="price"
                                                        checked={
                                                            priceRange[0] === opt.range[0] &&
                                                            priceRange[1] === opt.range[1]
                                                        }
                                                        onChange={() => setPriceRange(opt.range)}
                                                        className="text-primary-600"
                                                    />
                                                    <span className="text-sm text-gray-700">
                                                        {opt.label}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {hasActiveFilters && (
                                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                                        <button
                                            onClick={clearFilters}
                                            className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
                                        >
                                            <XIcon className="w-4 h-4" />
                                            Xóa bộ lọc
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Category tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
                    <button
                        onClick={() => setSelectedCategory("Tất cả")}
                        className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === "Tất cả" ? 'bg-primary-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                    >
                        Tất cả
                    </button>
                    {categories.map((cat, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedCategory(cat.name)}
                            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === cat.name ? 'bg-primary-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Results count */}
                <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-gray-500">
                        Hiển thị{' '}
                        <span className="font-semibold text-gray-900">
                            {filteredCourses.length}
                        </span>{' '}
                        khóa học
                    </p>
                    {hasActiveFilters && (
                        <button
                            onClick={clearFilters}
                            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                        >
                            Xóa bộ lọc
                        </button>
                    )}
                </div>

                {/* Course Grid/List */}
                {filteredCourses.length === 0 ? (
                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        className="text-center py-20"
                    >
                        <span className="text-5xl mb-4 block">🔍</span>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Không tìm thấy khóa học
                        </h3>
                        <p className="text-gray-500 mb-4">
                            Thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc
                        </p>
                        <button
                            onClick={clearFilters}
                            className="text-primary-600 font-semibold hover:text-primary-700"
                        >
                            Xóa tất cả bộ lọc
                        </button>
                    </motion.div>
                ) : viewMode === 'grid' ? (
                    <motion.div
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                        <AnimatePresence>
                            {filteredCourses.map((course, i) => (
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
                                        scale: 0.9,
                                    }}
                                    transition={{
                                        duration: 0.3,
                                        delay: i * 0.05,
                                    }}
                                >
                                    <CourseCard course={course} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <div className="space-y-4">
                        {filteredCourses.map((course, i) => (
                            <motion.div
                                key={course._id}
                                initial={{
                                    opacity: 0,
                                    x: -20,
                                }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                }}
                                transition={{
                                    duration: 0.3,
                                    delay: i * 0.05,
                                }}
                            >
                                <CourseCard course={course} variant="horizontal" />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}
