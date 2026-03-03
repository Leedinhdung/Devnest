import { CourseCard } from '@/components/client/course/CourseCard'
import { Footer } from '@/components/client/footer/Footer'
import { Navbar } from '@/components/client/navbar/Navbar'
import { courses } from '@/data/mockData'
import {
    ChevronDownIcon,
    GridIcon,
    ListIcon,
    SearchIcon,
    SlidersHorizontalIcon,
    XIcon,
} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

type SortOption =
    | 'relevance'
    | 'rating'
    | 'newest'
    | 'price-asc'
    | 'price-desc'
    | 'popular'
type ViewMode = 'grid' | 'list'
const LEVELS = ['Tất cả', 'Người mới bắt đầu', 'Trung cấp', 'Nâng cao']
const PRICE_RANGES = [
    {
        label: 'Tất cả',
        min: 0,
        max: Infinity,
    },
    {
        label: 'Miễn phí',
        min: 0,
        max: 0,
    },
    {
        label: 'Dưới 200.000đ',
        min: 1,
        max: 200000,
    },
    {
        label: '200.000đ - 500.000đ',
        min: 200000,
        max: 500000,
    },
    {
        label: 'Trên 500.000đ',
        min: 500000,
        max: Infinity,
    },
]
const RATINGS = [4.5, 4.0, 3.5, 3.0]
const SORT_OPTIONS: {
    value: SortOption
    label: string
}[] = [
        {
            value: 'relevance',
            label: 'Liên quan nhất',
        },
        {
            value: 'rating',
            label: 'Đánh giá cao nhất',
        },
        {
            value: 'newest',
            label: 'Mới nhất',
        },
        {
            value: 'popular',
            label: 'Phổ biến nhất',
        },
        {
            value: 'price-asc',
            label: 'Giá: Thấp đến Cao',
        },
        {
            value: 'price-desc',
            label: 'Giá: Cao đến Thấp',
        },
    ]
export function SearchResultsPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const query = searchParams.get('q') || ''
    const [searchInput, setSearchInput] = useState(query)
    const [sortBy, setSortBy] = useState<SortOption>('relevance')
    const [selectedLevel, setSelectedLevel] = useState('Tất cả')
    const [selectedPriceRange, setSelectedPriceRange] = useState(0)
    const [selectedRating, setSelectedRating] = useState<number | null>(null)
    const [viewMode, setViewMode] = useState<ViewMode>('grid')
    const [showFilters, setShowFilters] = useState(false)
    const [showSortDropdown, setShowSortDropdown] = useState(false)
    const categories = [
        'Tất cả',
        ...Array.from(new Set(courses.map((c) => c.category))),
    ]
    const [selectedCategory, setSelectedCategory] = useState('Tất cả')
    const filteredCourses = courses
        .filter((course) => {
            const matchesQuery =
                query === '' ||
                course.title.toLowerCase().includes(query.toLowerCase()) ||
                course.instructor.toLowerCase().includes(query.toLowerCase()) ||
                course.category.toLowerCase().includes(query.toLowerCase())
            const matchesLevel =
                selectedLevel === 'Tất cả' || course.level === selectedLevel
            const matchesCategory =
                selectedCategory === 'Tất cả' || course.category === selectedCategory
            const priceRange = PRICE_RANGES[selectedPriceRange]
            const matchesPrice =
                course.price >= priceRange.min && course.price <= priceRange.max
            const matchesRating =
                selectedRating === null || course.rating >= selectedRating
            return (
                matchesQuery &&
                matchesLevel &&
                matchesCategory &&
                matchesPrice &&
                matchesRating
            )
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'rating':
                    return b.rating - a.rating
                case 'popular':
                    return b.studentsCount - a.studentsCount
                case 'price-asc':
                    return a.price - b.price
                case 'price-desc':
                    return b.price - a.price
                default:
                    return 0
            }
        })
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        setSearchParams({
            q: searchInput,
        })
    }
    const clearFilters = () => {
        setSelectedLevel('Tất cả')
        setSelectedCategory('Tất cả')
        setSelectedPriceRange(0)
        setSelectedRating(null)
    }
    const hasActiveFilters =
        selectedLevel !== 'Tất cả' ||
        selectedCategory !== 'Tất cả' ||
        selectedPriceRange !== 0 ||
        selectedRating !== null
    useEffect(() => {
        setSearchInput(query)
    }, [query])
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            {/* Search Header */}
            <div className="bg-white border-b border-gray-200 py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <form onSubmit={handleSearch} className="flex gap-3 max-w-2xl">
                        <div className="flex-1 relative">
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder="Tìm kiếm khóa học..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-gray-50"
                            />
                            {searchInput && (
                                <button
                                    type="button"
                                    onClick={() => setSearchInput('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    <XIcon className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                        >
                            Tìm kiếm
                        </button>
                    </form>

                    {query && (
                        <p className="mt-3 text-gray-600">
                            {filteredCourses.length > 0 ? (
                                <>
                                    Tìm thấy{' '}
                                    <span className="font-semibold text-gray-900">
                                        {filteredCourses.length}
                                    </span>{' '}
                                    kết quả cho{' '}
                                    <span className="font-semibold text-blue-600">"{query}"</span>
                                </>
                            ) : (
                                <>
                                    Không tìm thấy kết quả nào cho{' '}
                                    <span className="font-semibold text-blue-600">"{query}"</span>
                                </>
                            )}
                        </p>
                    )}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
                <div className="flex gap-8">
                    {/* Sidebar Filters - Desktop */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-24">
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="font-bold text-gray-900 text-lg">Bộ lọc</h3>
                                {hasActiveFilters && (
                                    <button
                                        onClick={clearFilters}
                                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        Xóa tất cả
                                    </button>
                                )}
                            </div>

                            {/* Category */}
                            <div className="mb-6">
                                <h4 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">
                                    Danh mục
                                </h4>
                                <div className="space-y-2">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === cat ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Level */}
                            <div className="mb-6">
                                <h4 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">
                                    Cấp độ
                                </h4>
                                <div className="space-y-2">
                                    {LEVELS.map((level) => (
                                        <button
                                            key={level}
                                            onClick={() => setSelectedLevel(level)}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedLevel === level ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                                        >
                                            {level}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price */}
                            <div className="mb-6">
                                <h4 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">
                                    Giá
                                </h4>
                                <div className="space-y-2">
                                    {PRICE_RANGES.map((range, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedPriceRange(idx)}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedPriceRange === idx ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                                        >
                                            {range.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Rating */}
                            <div>
                                <h4 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">
                                    Đánh giá
                                </h4>
                                <div className="space-y-2">
                                    {RATINGS.map((rating) => (
                                        <button
                                            key={rating}
                                            onClick={() =>
                                                setSelectedRating(
                                                    selectedRating === rating ? null : rating,
                                                )
                                            }
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${selectedRating === rating ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                                        >
                                            <span className="text-yellow-400">
                                                {'★'.repeat(Math.floor(rating))}
                                            </span>
                                            <span>{rating}+ trở lên</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                        {/* Toolbar */}
                        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
                            <div className="flex items-center gap-3">
                                {/* Mobile Filter Toggle */}
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    <SlidersHorizontalIcon className="w-4 h-4" />
                                    Bộ lọc
                                    {hasActiveFilters && (
                                        <span className="w-2 h-2 bg-blue-600 rounded-full" />
                                    )}
                                </button>

                                <span className="text-sm text-gray-500 hidden sm:block">
                                    {filteredCourses.length} khóa học
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                {/* Sort */}
                                <div className="relative">
                                    <button
                                        onClick={() => setShowSortDropdown(!showSortDropdown)}
                                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 bg-white"
                                    >
                                        {SORT_OPTIONS.find((o) => o.value === sortBy)?.label}
                                        <ChevronDownIcon className="w-4 h-4" />
                                    </button>
                                    {showSortDropdown && (
                                        <div className="absolute right-0 top-full mt-1 w-52 bg-white border border-gray-200 rounded-xl shadow-lg z-10 py-1">
                                            {SORT_OPTIONS.map((opt) => (
                                                <button
                                                    key={opt.value}
                                                    onClick={() => {
                                                        setSortBy(opt.value)
                                                        setShowSortDropdown(false)
                                                    }}
                                                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${sortBy === opt.value ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
                                                >
                                                    {opt.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* View Mode */}
                                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                                        aria-label="Dạng lưới"
                                    >
                                        <GridIcon className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                                        aria-label="Dạng danh sách"
                                    >
                                        <ListIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Active Filters Tags */}
                        {hasActiveFilters && (
                            <div className="flex flex-wrap gap-2 mb-5">
                                {selectedCategory !== 'Tất cả' && (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                        {selectedCategory}
                                        <button onClick={() => setSelectedCategory('Tất cả')}>
                                            <XIcon className="w-3.5 h-3.5" />
                                        </button>
                                    </span>
                                )}
                                {selectedLevel !== 'Tất cả' && (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                        {selectedLevel}
                                        <button onClick={() => setSelectedLevel('Tất cả')}>
                                            <XIcon className="w-3.5 h-3.5" />
                                        </button>
                                    </span>
                                )}
                                {selectedPriceRange !== 0 && (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                        {PRICE_RANGES[selectedPriceRange].label}
                                        <button onClick={() => setSelectedPriceRange(0)}>
                                            <XIcon className="w-3.5 h-3.5" />
                                        </button>
                                    </span>
                                )}
                                {selectedRating !== null && (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                        {selectedRating}+ sao
                                        <button onClick={() => setSelectedRating(null)}>
                                            <XIcon className="w-3.5 h-3.5" />
                                        </button>
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Results */}
                        {filteredCourses.length === 0 ? (
                            <div className="text-center py-20">
                                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <SearchIcon className="w-10 h-10 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    Không tìm thấy kết quả
                                </h3>
                                <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                                    Thử tìm kiếm với từ khóa khác hoặc điều chỉnh bộ lọc của bạn
                                </p>
                                <button
                                    onClick={clearFilters}
                                    className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                                >
                                    Xóa bộ lọc
                                </button>
                            </div>
                        ) : (
                            <div
                                className={
                                    viewMode === 'grid'
                                        ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                                        : 'flex flex-col gap-4'
                                }
                            >
                                {filteredCourses.map((course) => (
                                    <CourseCard key={course.id} course={course} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
