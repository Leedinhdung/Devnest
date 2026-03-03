export interface Course {
    id: string
    title: string
    description: string
    instructor: string
    instructorAvatar: string
    instructorBio: string
    category: string
    price: number
    originalPrice: number
    rating: number
    reviewCount: number
    studentCount: number
    duration: string
    level: 'Cơ bản' | 'Trung cấp' | 'Nâng cao'
    thumbnail: string
    tags: string[]
    curriculum: Chapter[]
    isBestseller: boolean
    isNew: boolean
    progress?: number
    isPurchased?: boolean
    language: string
    lastUpdated: string
    requirements: string[]
    objectives: string[]
}

export interface Chapter {
    id: string
    title: string
    lessons: Lesson[]
}

export interface Lesson {
    id: string
    title: string
    duration: string
    type: 'video' | 'quiz' | 'document'
    isPreview: boolean
    isCompleted?: boolean
}

export interface BlogPost {
    id: string
    title: string
    excerpt: string
    content: string
    author: string
    authorAvatar: string
    date: string
    category: string
    thumbnail: string
    readTime: number
    tags: string[]
}

export interface UserProfile {
    id: string
    name: string
    email: string
    avatar: string
    bio: string
    joinDate: string
    totalCourses: number
    completedCourses: number
    certificates: number
    totalHours: number
    streak: number
    level: string
    skills: string[]
}

export interface Testimonial {
    id: string
    name: string
    avatar: string
    role: string
    content: string
    rating: number
    course: string
}

export const categories = [
    {
        id: '1',
        name: 'Lập trình',
        icon: '💻',
        count: 245,
        color: 'bg-blue-100 text-blue-700',
    },
    {
        id: '2',
        name: 'Thiết kế',
        icon: '🎨',
        count: 128,
        color: 'bg-purple-100 text-purple-700',
    },
    {
        id: '3',
        name: 'Marketing',
        icon: '📈',
        count: 96,
        color: 'bg-green-100 text-green-700',
    },
    {
        id: '4',
        name: 'Kinh doanh',
        icon: '💼',
        count: 87,
        color: 'bg-yellow-100 text-yellow-700',
    },
    {
        id: '5',
        name: 'Ngoại ngữ',
        icon: '🌍',
        count: 74,
        color: 'bg-red-100 text-red-700',
    },
    {
        id: '6',
        name: 'Nhiếp ảnh',
        icon: '📷',
        count: 52,
        color: 'bg-pink-100 text-pink-700',
    },
]

export const courses: Course[] = [
    {
        id: '1',
        title: 'React & TypeScript - Xây dựng ứng dụng hiện đại',
        description:
            'Học React từ cơ bản đến nâng cao với TypeScript. Xây dựng các ứng dụng web thực tế, hiệu suất cao với các best practices mới nhất.',
        instructor: 'Nguyễn Văn Minh',
        instructorAvatar: 'https://picsum.photos/seed/inst1/100/100',
        instructorBio:
            'Senior Frontend Developer với 8 năm kinh nghiệm. Đã làm việc tại các công ty lớn như VNG, Tiki, và Shopee.',
        category: 'Lập trình',
        price: 799000,
        originalPrice: 1999000,
        rating: 4.8,
        reviewCount: 2847,
        studentCount: 15420,
        duration: '42 giờ',
        level: 'Trung cấp',
        thumbnail: 'https://picsum.photos/seed/course1/400/250',
        tags: ['React', 'TypeScript', 'Frontend', 'JavaScript'],
        isBestseller: true,
        isNew: false,
        isPurchased: true,
        progress: 65,
        language: 'Tiếng Việt',
        lastUpdated: '11/2024',
        requirements: [
            'Biết cơ bản HTML, CSS',
            'Hiểu JavaScript cơ bản',
            'Có máy tính với kết nối internet',
        ],
        objectives: [
            'Nắm vững React Hooks và Context API',
            'Sử dụng TypeScript trong dự án thực tế',
            'Xây dựng ứng dụng full-stack với Next.js',
            'Deploy ứng dụng lên Vercel/Netlify',
        ],
        curriculum: [
            {
                id: 'c1',
                title: 'Giới thiệu và cài đặt môi trường',
                lessons: [
                    {
                        id: 'l1',
                        title: 'Giới thiệu khóa học',
                        duration: '5:30',
                        type: 'video',
                        isPreview: true,
                        isCompleted: true,
                    },
                    {
                        id: 'l2',
                        title: 'Cài đặt Node.js và VS Code',
                        duration: '12:45',
                        type: 'video',
                        isPreview: true,
                        isCompleted: true,
                    },
                    {
                        id: 'l3',
                        title: 'Tạo dự án React đầu tiên',
                        duration: '18:20',
                        type: 'video',
                        isPreview: false,
                        isCompleted: true,
                    },
                ],
            },
            {
                id: 'c2',
                title: 'React Fundamentals',
                lessons: [
                    {
                        id: 'l4',
                        title: 'JSX và Components',
                        duration: '22:10',
                        type: 'video',
                        isPreview: false,
                        isCompleted: true,
                    },
                    {
                        id: 'l5',
                        title: 'Props và State',
                        duration: '28:35',
                        type: 'video',
                        isPreview: false,
                        isCompleted: false,
                    },
                    {
                        id: 'l6',
                        title: 'Event Handling',
                        duration: '15:50',
                        type: 'video',
                        isPreview: false,
                        isCompleted: false,
                    },
                    {
                        id: 'l7',
                        title: 'Quiz: React Basics',
                        duration: '10:00',
                        type: 'quiz',
                        isPreview: false,
                        isCompleted: false,
                    },
                ],
            },
            {
                id: 'c3',
                title: 'React Hooks',
                lessons: [
                    {
                        id: 'l8',
                        title: 'useState và useEffect',
                        duration: '35:20',
                        type: 'video',
                        isPreview: false,
                        isCompleted: false,
                    },
                    {
                        id: 'l9',
                        title: 'useContext và useReducer',
                        duration: '30:15',
                        type: 'video',
                        isPreview: false,
                        isCompleted: false,
                    },
                    {
                        id: 'l10',
                        title: 'Custom Hooks',
                        duration: '25:40',
                        type: 'video',
                        isPreview: false,
                        isCompleted: false,
                    },
                ],
            },
            {
                id: 'c4',
                title: 'TypeScript với React',
                lessons: [
                    {
                        id: 'l11',
                        title: 'TypeScript cơ bản',
                        duration: '40:00',
                        type: 'video',
                        isPreview: false,
                        isCompleted: false,
                    },
                    {
                        id: 'l12',
                        title: 'Typing Components và Props',
                        duration: '28:30',
                        type: 'video',
                        isPreview: false,
                        isCompleted: false,
                    },
                    {
                        id: 'l13',
                        title: 'Generic Types',
                        duration: '22:15',
                        type: 'video',
                        isPreview: false,
                        isCompleted: false,
                    },
                ],
            },
        ],
    },
    {
        id: '2',
        title: 'UI/UX Design với Figma - Từ Zero đến Pro',
        description:
            'Khóa học thiết kế UI/UX toàn diện với Figma. Học cách tạo wireframe, prototype, và design system chuyên nghiệp.',
        instructor: 'Trần Thị Lan',
        instructorAvatar: 'https://picsum.photos/seed/inst2/100/100',
        instructorBio:
            'UX Designer với 6 năm kinh nghiệm tại các startup và agency thiết kế hàng đầu Việt Nam.',
        category: 'Thiết kế',
        price: 699000,
        originalPrice: 1799000,
        rating: 4.9,
        reviewCount: 1923,
        studentCount: 8750,
        duration: '38 giờ',
        level: 'Cơ bản',
        thumbnail: 'https://picsum.photos/seed/course2/400/250',
        tags: ['Figma', 'UI/UX', 'Design', 'Prototype'],
        isBestseller: true,
        isNew: false,
        isPurchased: true,
        progress: 30,
        language: 'Tiếng Việt',
        lastUpdated: '10/2024',
        requirements: [
            'Không cần kinh nghiệm thiết kế trước',
            'Máy tính Mac hoặc Windows',
            'Tài khoản Figma miễn phí',
        ],
        objectives: [
            'Thành thạo công cụ Figma',
            'Hiểu nguyên tắc thiết kế UI/UX',
            'Tạo design system hoàn chỉnh',
            'Xây dựng portfolio thiết kế',
        ],
        curriculum: [
            {
                id: 'c1',
                title: 'Giới thiệu UI/UX Design',
                lessons: [
                    {
                        id: 'l1',
                        title: 'UI vs UX là gì?',
                        duration: '8:20',
                        type: 'video',
                        isPreview: true,
                        isCompleted: true,
                    },
                    {
                        id: 'l2',
                        title: 'Quy trình thiết kế',
                        duration: '15:30',
                        type: 'video',
                        isPreview: true,
                        isCompleted: false,
                    },
                ],
            },
            {
                id: 'c2',
                title: 'Figma Cơ bản',
                lessons: [
                    {
                        id: 'l3',
                        title: 'Giao diện Figma',
                        duration: '20:15',
                        type: 'video',
                        isPreview: false,
                        isCompleted: false,
                    },
                    {
                        id: 'l4',
                        title: 'Shapes và Typography',
                        duration: '25:40',
                        type: 'video',
                        isPreview: false,
                        isCompleted: false,
                    },
                    {
                        id: 'l5',
                        title: 'Components và Variants',
                        duration: '32:10',
                        type: 'video',
                        isPreview: false,
                        isCompleted: false,
                    },
                ],
            },
        ],
    },
    {
        id: '3',
        title: 'Digital Marketing Toàn Diện 2024',
        description:
            'Học tất cả về Digital Marketing: SEO, Google Ads, Facebook Ads, Content Marketing, Email Marketing và Analytics.',
        instructor: 'Phạm Đức Hùng',
        instructorAvatar: 'https://picsum.photos/seed/inst3/100/100',
        instructorBio:
            'Digital Marketing Manager với 10 năm kinh nghiệm, đã giúp hơn 200 doanh nghiệp tăng trưởng online.',
        category: 'Marketing',
        price: 899000,
        originalPrice: 2299000,
        rating: 4.7,
        reviewCount: 3156,
        studentCount: 22100,
        duration: '55 giờ',
        level: 'Cơ bản',
        thumbnail: 'https://picsum.photos/seed/course3/400/250',
        tags: ['SEO', 'Google Ads', 'Facebook Ads', 'Content'],
        isBestseller: true,
        isNew: false,
        isPurchased: false,
        language: 'Tiếng Việt',
        lastUpdated: '11/2024',
        requirements: [
            'Không cần kinh nghiệm marketing',
            'Có tài khoản Google và Facebook',
        ],
        objectives: [
            'Chạy quảng cáo Google Ads hiệu quả',
            'Tối ưu SEO website',
            'Xây dựng chiến lược content',
        ],
        curriculum: [
            {
                id: 'c1',
                title: 'Tổng quan Digital Marketing',
                lessons: [
                    {
                        id: 'l1',
                        title: 'Digital Marketing là gì?',
                        duration: '10:00',
                        type: 'video',
                        isPreview: true,
                        isCompleted: false,
                    },
                    {
                        id: 'l2',
                        title: 'Các kênh marketing online',
                        duration: '18:30',
                        type: 'video',
                        isPreview: false,
                        isCompleted: false,
                    },
                ],
            },
        ],
    },
    {
        id: '4',
        title: 'Python cho Data Science & Machine Learning',
        description:
            'Học Python từ cơ bản, sau đó đi sâu vào Data Science với Pandas, NumPy, Matplotlib và Machine Learning với Scikit-learn.',
        instructor: 'Lê Thị Hoa',
        instructorAvatar: 'https://picsum.photos/seed/inst4/100/100',
        instructorBio:
            'Data Scientist tại một công ty AI hàng đầu, có bằng Tiến sĩ Khoa học Máy tính.',
        category: 'Lập trình',
        price: 999000,
        originalPrice: 2499000,
        rating: 4.9,
        reviewCount: 4521,
        studentCount: 31200,
        duration: '68 giờ',
        level: 'Trung cấp',
        thumbnail: 'https://picsum.photos/seed/course4/400/250',
        tags: ['Python', 'Data Science', 'Machine Learning', 'AI'],
        isBestseller: true,
        isNew: false,
        isPurchased: true,
        progress: 15,
        language: 'Tiếng Việt',
        lastUpdated: '11/2024',
        requirements: ['Biết lập trình cơ bản', 'Toán học cơ bản'],
        objectives: [
            'Thành thạo Python',
            'Phân tích dữ liệu với Pandas',
            'Xây dựng mô hình ML',
        ],
        curriculum: [
            {
                id: 'c1',
                title: 'Python Fundamentals',
                lessons: [
                    {
                        id: 'l1',
                        title: 'Cài đặt Python và Jupyter',
                        duration: '12:00',
                        type: 'video',
                        isPreview: true,
                        isCompleted: true,
                    },
                    {
                        id: 'l2',
                        title: 'Biến và kiểu dữ liệu',
                        duration: '20:30',
                        type: 'video',
                        isPreview: false,
                        isCompleted: false,
                    },
                ],
            },
        ],
    },
    {
        id: '5',
        title: 'Tiếng Anh Giao Tiếp Cho Người Đi Làm',
        description:
            'Nâng cao kỹ năng tiếng Anh giao tiếp trong môi trường công sở. Học cách viết email, thuyết trình và đàm phán bằng tiếng Anh.',
        instructor: 'Sarah Johnson',
        instructorAvatar: 'https://picsum.photos/seed/inst5/100/100',
        instructorBio:
            'Giáo viên tiếng Anh bản ngữ với 12 năm kinh nghiệm giảng dạy tại Việt Nam.',
        category: 'Ngoại ngữ',
        price: 599000,
        originalPrice: 1499000,
        rating: 4.6,
        reviewCount: 2103,
        studentCount: 18900,
        duration: '30 giờ',
        level: 'Trung cấp',
        thumbnail: 'https://picsum.photos/seed/course5/400/250',
        tags: ['Tiếng Anh', 'Giao tiếp', 'Business English'],
        isBestseller: false,
        isNew: true,
        isPurchased: false,
        language: 'Tiếng Anh - Phụ đề Việt',
        lastUpdated: '11/2024',
        requirements: ['Tiếng Anh trình độ A2 trở lên'],
        objectives: [
            'Tự tin giao tiếp tiếng Anh',
            'Viết email chuyên nghiệp',
            'Thuyết trình hiệu quả',
        ],
        curriculum: [
            {
                id: 'c1',
                title: 'Business Communication Basics',
                lessons: [
                    {
                        id: 'l1',
                        title: 'Introduction to Business English',
                        duration: '8:00',
                        type: 'video',
                        isPreview: true,
                        isCompleted: false,
                    },
                ],
            },
        ],
    },
    {
        id: '6',
        title: 'Node.js & Express - Backend Development',
        description:
            'Xây dựng REST API và backend applications với Node.js, Express, MongoDB. Học authentication, authorization và deployment.',
        instructor: 'Hoàng Văn Nam',
        instructorAvatar: 'https://picsum.photos/seed/inst6/100/100',
        instructorBio:
            'Backend Developer với 7 năm kinh nghiệm, chuyên gia Node.js và microservices.',
        category: 'Lập trình',
        price: 849000,
        originalPrice: 2099000,
        rating: 4.8,
        reviewCount: 1876,
        studentCount: 12300,
        duration: '48 giờ',
        level: 'Trung cấp',
        thumbnail: 'https://picsum.photos/seed/course6/400/250',
        tags: ['Node.js', 'Express', 'MongoDB', 'REST API'],
        isBestseller: false,
        isNew: true,
        isPurchased: false,
        language: 'Tiếng Việt',
        lastUpdated: '11/2024',
        requirements: ['Biết JavaScript cơ bản', 'Hiểu HTTP và web basics'],
        objectives: [
            'Xây dựng REST API hoàn chỉnh',
            'Làm việc với MongoDB',
            'Deploy lên cloud',
        ],
        curriculum: [
            {
                id: 'c1',
                title: 'Node.js Fundamentals',
                lessons: [
                    {
                        id: 'l1',
                        title: 'Node.js là gì?',
                        duration: '10:00',
                        type: 'video',
                        isPreview: true,
                        isCompleted: false,
                    },
                    {
                        id: 'l2',
                        title: 'Modules và NPM',
                        duration: '18:20',
                        type: 'video',
                        isPreview: false,
                        isCompleted: false,
                    },
                ],
            },
        ],
    },
    {
        id: '7',
        title: 'Nhiếp Ảnh Cơ Bản - Chụp Ảnh Đẹp Với Máy DSLR',
        description:
            'Học cách sử dụng máy ảnh DSLR, hiểu về ánh sáng, bố cục và hậu kỳ ảnh với Lightroom.',
        instructor: 'Nguyễn Thị Thu',
        instructorAvatar: 'https://picsum.photos/seed/inst7/100/100',
        instructorBio:
            'Nhiếp ảnh gia chuyên nghiệp với hơn 15 năm kinh nghiệm, đã xuất bản 3 cuốn sách ảnh.',
        category: 'Nhiếp ảnh',
        price: 499000,
        originalPrice: 1299000,
        rating: 4.7,
        reviewCount: 987,
        studentCount: 6540,
        duration: '25 giờ',
        level: 'Cơ bản',
        thumbnail: 'https://picsum.photos/seed/course7/400/250',
        tags: ['Nhiếp ảnh', 'DSLR', 'Lightroom', 'Photography'],
        isBestseller: false,
        isNew: false,
        isPurchased: false,
        language: 'Tiếng Việt',
        lastUpdated: '09/2024',
        requirements: [
            'Có máy ảnh DSLR hoặc mirrorless',
            'Không cần kinh nghiệm trước',
        ],
        objectives: [
            'Chụp ảnh đẹp trong mọi điều kiện',
            'Hậu kỳ ảnh chuyên nghiệp',
            'Xây dựng phong cách riêng',
        ],
        curriculum: [
            {
                id: 'c1',
                title: 'Hiểu về máy ảnh',
                lessons: [
                    {
                        id: 'l1',
                        title: 'Các bộ phận của máy ảnh',
                        duration: '15:00',
                        type: 'video',
                        isPreview: true,
                        isCompleted: false,
                    },
                ],
            },
        ],
    },
    {
        id: '8',
        title: 'Khởi Nghiệp Từ Zero - Xây Dựng Startup Thành Công',
        description:
            'Học cách xây dựng startup từ ý tưởng đến sản phẩm, gọi vốn và scale business. Kinh nghiệm thực tế từ founder thành công.',
        instructor: 'Trần Minh Quân',
        instructorAvatar: 'https://picsum.photos/seed/inst8/100/100',
        instructorBio:
            'Serial Entrepreneur, đã xây dựng và bán 2 startup, hiện là mentor tại các vườn ươm khởi nghiệp.',
        category: 'Kinh doanh',
        price: 1299000,
        originalPrice: 2999000,
        rating: 4.8,
        reviewCount: 1543,
        studentCount: 9870,
        duration: '35 giờ',
        level: 'Cơ bản',
        thumbnail: 'https://picsum.photos/seed/course8/400/250',
        tags: ['Startup', 'Kinh doanh', 'Khởi nghiệp', 'Gọi vốn'],
        isBestseller: false,
        isNew: false,
        isPurchased: false,
        language: 'Tiếng Việt',
        lastUpdated: '10/2024',
        requirements: ['Có ý tưởng kinh doanh hoặc muốn khởi nghiệp'],
        objectives: [
            'Validate ý tưởng kinh doanh',
            'Xây dựng MVP',
            'Pitch cho nhà đầu tư',
        ],
        curriculum: [
            {
                id: 'c1',
                title: 'Mindset Khởi Nghiệp',
                lessons: [
                    {
                        id: 'l1',
                        title: 'Startup là gì?',
                        duration: '12:00',
                        type: 'video',
                        isPreview: true,
                        isCompleted: false,
                    },
                ],
            },
        ],
    },
    {
        id: '9',
        title: 'Vue.js 3 - Xây Dựng SPA Hiện Đại',
        description:
            'Học Vue.js 3 với Composition API, Pinia, Vue Router. Xây dựng Single Page Applications chuyên nghiệp.',
        instructor: 'Đinh Văn Khoa',
        instructorAvatar: 'https://picsum.photos/seed/inst9/100/100',
        instructorBio:
            'Vue.js Core Contributor, Frontend Lead tại một công ty fintech.',
        category: 'Lập trình',
        price: 749000,
        originalPrice: 1899000,
        rating: 4.6,
        reviewCount: 876,
        studentCount: 5430,
        duration: '36 giờ',
        level: 'Trung cấp',
        thumbnail: 'https://picsum.photos/seed/course9/400/250',
        tags: ['Vue.js', 'JavaScript', 'SPA', 'Frontend'],
        isBestseller: false,
        isNew: true,
        isPurchased: false,
        language: 'Tiếng Việt',
        lastUpdated: '11/2024',
        requirements: ['Biết HTML, CSS, JavaScript'],
        objectives: [
            'Thành thạo Vue.js 3',
            'Xây dựng SPA hoàn chỉnh',
            'State management với Pinia',
        ],
        curriculum: [
            {
                id: 'c1',
                title: 'Vue.js Basics',
                lessons: [
                    {
                        id: 'l1',
                        title: 'Vue.js là gì?',
                        duration: '8:00',
                        type: 'video',
                        isPreview: true,
                        isCompleted: false,
                    },
                ],
            },
        ],
    },
    {
        id: '10',
        title: 'Adobe Photoshop - Chỉnh Sửa Ảnh Chuyên Nghiệp',
        description:
            'Học Photoshop từ cơ bản đến nâng cao. Chỉnh sửa ảnh, thiết kế banner, retouching và compositing.',
        instructor: 'Vũ Thị Mai',
        instructorAvatar: 'https://picsum.photos/seed/inst10/100/100',
        instructorBio:
            'Graphic Designer với 9 năm kinh nghiệm, chuyên gia Adobe Creative Suite.',
        category: 'Thiết kế',
        price: 649000,
        originalPrice: 1599000,
        rating: 4.7,
        reviewCount: 2341,
        studentCount: 14200,
        duration: '40 giờ',
        level: 'Cơ bản',
        thumbnail: 'https://picsum.photos/seed/course10/400/250',
        tags: ['Photoshop', 'Adobe', 'Thiết kế', 'Chỉnh ảnh'],
        isBestseller: true,
        isNew: false,
        isPurchased: false,
        language: 'Tiếng Việt',
        lastUpdated: '10/2024',
        requirements: ['Có Adobe Photoshop (bất kỳ phiên bản nào)'],
        objectives: [
            'Thành thạo Photoshop',
            'Chỉnh sửa ảnh chuyên nghiệp',
            'Thiết kế ấn phẩm',
        ],
        curriculum: [
            {
                id: 'c1',
                title: 'Giao diện Photoshop',
                lessons: [
                    {
                        id: 'l1',
                        title: 'Làm quen với Photoshop',
                        duration: '10:00',
                        type: 'video',
                        isPreview: true,
                        isCompleted: false,
                    },
                ],
            },
        ],
    },
    {
        id: '11',
        title: 'AWS Cloud Practitioner - Chứng Chỉ Quốc Tế',
        description:
            'Chuẩn bị cho kỳ thi AWS Cloud Practitioner. Học về cloud computing, AWS services và kiến trúc cloud.',
        instructor: 'Bùi Thanh Tùng',
        instructorAvatar: 'https://picsum.photos/seed/inst11/100/100',
        instructorBio:
            'AWS Certified Solutions Architect Professional, DevOps Engineer tại công ty cloud hàng đầu.',
        category: 'Lập trình',
        price: 1099000,
        originalPrice: 2699000,
        rating: 4.9,
        reviewCount: 1234,
        studentCount: 7890,
        duration: '28 giờ',
        level: 'Cơ bản',
        thumbnail: 'https://picsum.photos/seed/course11/400/250',
        tags: ['AWS', 'Cloud', 'DevOps', 'Chứng chỉ'],
        isBestseller: false,
        isNew: true,
        isPurchased: false,
        language: 'Tiếng Việt',
        lastUpdated: '11/2024',
        requirements: ['Hiểu cơ bản về IT', 'Không cần kinh nghiệm cloud'],
        objectives: [
            'Đậu kỳ thi AWS Cloud Practitioner',
            'Hiểu về cloud computing',
            'Sử dụng AWS services',
        ],
        curriculum: [
            {
                id: 'c1',
                title: 'Cloud Computing Basics',
                lessons: [
                    {
                        id: 'l1',
                        title: 'Cloud là gì?',
                        duration: '12:00',
                        type: 'video',
                        isPreview: true,
                        isCompleted: false,
                    },
                ],
            },
        ],
    },
    {
        id: '12',
        title: 'Tiếng Nhật N5-N4 - Học Nhanh Hiệu Quả',
        description:
            'Học tiếng Nhật từ đầu đến trình độ N4. Ngữ pháp, từ vựng, Hiragana, Katakana và Kanji cơ bản.',
        instructor: 'Yamamoto Keiko',
        instructorAvatar: 'https://picsum.photos/seed/inst12/100/100',
        instructorBio:
            'Giáo viên tiếng Nhật bản ngữ, có 8 năm kinh nghiệm dạy tiếng Nhật tại Việt Nam.',
        category: 'Ngoại ngữ',
        price: 699000,
        originalPrice: 1799000,
        rating: 4.8,
        reviewCount: 1567,
        studentCount: 11200,
        duration: '45 giờ',
        level: 'Cơ bản',
        thumbnail: 'https://picsum.photos/seed/course12/400/250',
        tags: ['Tiếng Nhật', 'JLPT', 'N5', 'N4'],
        isBestseller: false,
        isNew: false,
        isPurchased: false,
        language: 'Tiếng Nhật - Phụ đề Việt',
        lastUpdated: '09/2024',
        requirements: ['Không cần biết tiếng Nhật trước'],
        objectives: [
            'Đọc viết Hiragana Katakana',
            'Giao tiếp tiếng Nhật cơ bản',
            'Đậu kỳ thi JLPT N5-N4',
        ],
        curriculum: [
            {
                id: 'c1',
                title: 'Hiragana & Katakana',
                lessons: [
                    {
                        id: 'l1',
                        title: 'Học Hiragana',
                        duration: '20:00',
                        type: 'video',
                        isPreview: true,
                        isCompleted: false,
                    },
                ],
            },
        ],
    },
]

export const blogPosts: BlogPost[] = [
    {
        id: '1',
        title: '10 Xu Hướng Lập Trình Web Năm 2024 Bạn Cần Biết',
        excerpt:
            'Khám phá những công nghệ và xu hướng lập trình web đang định hình tương lai của ngành IT, từ AI-powered development đến Edge Computing.',
        content: `
## Giới thiệu

Năm 2024 đánh dấu một bước ngoặt quan trọng trong lập trình web với sự bùng nổ của AI và các công nghệ mới. Hãy cùng khám phá 10 xu hướng quan trọng nhất mà mọi developer cần nắm bắt.

## 1. AI-Powered Development

Trí tuệ nhân tạo đang thay đổi cách chúng ta viết code. Các công cụ như GitHub Copilot, ChatGPT và Claude đang trở thành "đồng nghiệp" không thể thiếu của developer.

**Lợi ích chính:**
- Tăng tốc độ code 40-60%
- Giảm lỗi cú pháp
- Gợi ý giải pháp thông minh

## 2. Edge Computing và Serverless

Kiến trúc serverless và edge computing đang ngày càng phổ biến, cho phép ứng dụng chạy gần người dùng hơn, giảm latency và tăng hiệu suất.

## 3. Web Components và Micro-frontends

Xu hướng chia nhỏ frontend thành các components độc lập, dễ maintain và scale.

## 4. TypeScript Everywhere

TypeScript không còn là optional - nó đã trở thành standard trong hầu hết các dự án web hiện đại.

## 5. Performance-First Development

Core Web Vitals của Google đang ảnh hưởng trực tiếp đến SEO, buộc developer phải chú trọng hơn vào performance.

## Kết luận

Năm 2024 hứa hẹn nhiều thay đổi thú vị trong lập trình web. Hãy liên tục học hỏi và cập nhật kiến thức để không bị tụt hậu!
    `,
        author: 'Nguyễn Văn Minh',
        authorAvatar: 'https://picsum.photos/seed/author1/100/100',
        date: '15/11/2024',
        category: 'Lập trình',
        thumbnail: 'https://picsum.photos/seed/blog1/800/400',
        readTime: 8,
        tags: ['Web Development', 'Trends', 'AI', 'TypeScript'],
    },
    {
        id: '2',
        title: 'Hướng Dẫn Học UI/UX Design Từ Con Số 0',
        excerpt:
            'Bạn muốn trở thành UI/UX Designer nhưng không biết bắt đầu từ đâu? Bài viết này sẽ cho bạn lộ trình học tập rõ ràng và hiệu quả.',
        content: `
## Tại sao nên học UI/UX Design?

UI/UX Design là một trong những ngành có nhu cầu tuyển dụng cao nhất hiện nay. Mức lương hấp dẫn và cơ hội làm việc remote rộng mở.

## Lộ trình học UI/UX Design

### Giai đoạn 1: Nền tảng (1-2 tháng)
- Học các nguyên tắc thiết kế cơ bản
- Hiểu về màu sắc, typography, layout
- Làm quen với Figma

### Giai đoạn 2: Kỹ năng thực hành (2-3 tháng)
- Thực hành với các dự án thực tế
- Học UX Research và User Testing
- Xây dựng Design System

### Giai đoạn 3: Portfolio (1-2 tháng)
- Tạo 3-5 case studies chất lượng
- Đăng lên Behance và Dribbble
- Chuẩn bị cho phỏng vấn

## Công cụ cần học

**Design:** Figma, Adobe XD, Sketch
**Prototype:** InVision, Principle
**Research:** Maze, Hotjar

## Kết luận

Hành trình học UI/UX không hề dễ dàng nhưng hoàn toàn có thể nếu bạn kiên trì và học đúng phương pháp.
    `,
        author: 'Trần Thị Lan',
        authorAvatar: 'https://picsum.photos/seed/author2/100/100',
        date: '10/11/2024',
        category: 'Thiết kế',
        thumbnail: 'https://picsum.photos/seed/blog2/800/400',
        readTime: 6,
        tags: ['UI/UX', 'Design', 'Career', 'Figma'],
    },
    {
        id: '3',
        title: 'ChatGPT và Tương Lai Của Giáo Dục Trực Tuyến',
        excerpt:
            'AI đang thay đổi cách chúng ta học và dạy. Khám phá cách ChatGPT và các công cụ AI đang cách mạng hóa giáo dục trực tuyến.',
        content: `
## AI trong Giáo dục: Cuộc Cách Mạng Mới

Sự xuất hiện của ChatGPT và các mô hình ngôn ngữ lớn (LLM) đang tạo ra một cuộc cách mạng trong giáo dục trực tuyến.

## Cách AI Đang Thay Đổi Việc Học

### Cá nhân hóa việc học
AI có thể phân tích cách học của từng người và đề xuất lộ trình học phù hợp nhất.

### Hỗ trợ 24/7
Không còn phải chờ giáo viên trả lời - AI có thể giải đáp thắc mắc bất cứ lúc nào.

### Tạo nội dung học tập
AI giúp tạo bài tập, quiz và tài liệu học tập một cách nhanh chóng và hiệu quả.

## Thách Thức và Lo Ngại

Tuy nhiên, việc sử dụng AI trong giáo dục cũng đặt ra nhiều câu hỏi về tính trung thực học thuật và sự phụ thuộc vào công nghệ.

## Tương Lai

Giáo dục trực tuyến sẽ ngày càng được cá nhân hóa và hiệu quả hơn nhờ AI, nhưng vai trò của giáo viên vẫn không thể thay thế.
    `,
        author: 'Phạm Đức Hùng',
        authorAvatar: 'https://picsum.photos/seed/author3/100/100',
        date: '05/11/2024',
        category: 'Giáo dục',
        thumbnail: 'https://picsum.photos/seed/blog3/800/400',
        readTime: 5,
        tags: ['AI', 'ChatGPT', 'E-learning', 'Giáo dục'],
    },
    {
        id: '4',
        title: 'Bí Quyết Học Lập Trình Hiệu Quả Cho Người Mới Bắt Đầu',
        excerpt:
            'Nhiều người muốn học lập trình nhưng không biết bắt đầu từ đâu. Đây là những bí quyết giúp bạn học code nhanh hơn và hiệu quả hơn.',
        content: `
## Tại Sao Nhiều Người Bỏ Cuộc Khi Học Lập Trình?

Học lập trình không khó, nhưng cần có phương pháp đúng đắn. Nhiều người bỏ cuộc vì học sai cách.

## 7 Bí Quyết Học Lập Trình Hiệu Quả

### 1. Chọn ngôn ngữ phù hợp
Đừng học quá nhiều ngôn ngữ cùng lúc. Hãy chọn một ngôn ngữ và học thật sâu.

### 2. Học bằng cách làm
Đọc lý thuyết ít thôi, thực hành nhiều hơn. Mỗi ngày code ít nhất 1 giờ.

### 3. Xây dựng dự án thực tế
Đừng chỉ làm theo tutorial. Hãy tự nghĩ ra dự án và thực hiện.

### 4. Tham gia cộng đồng
Stack Overflow, GitHub, các group Facebook về lập trình là nguồn tài nguyên vô giá.

### 5. Đừng sợ lỗi
Lỗi là bạn của developer. Mỗi lỗi là một bài học quý giá.

## Kết luận

Học lập trình là một hành trình dài, nhưng với phương pháp đúng, bạn hoàn toàn có thể thành công!
    `,
        author: 'Lê Thị Hoa',
        authorAvatar: 'https://picsum.photos/seed/author4/100/100',
        date: '01/11/2024',
        category: 'Lập trình',
        thumbnail: 'https://picsum.photos/seed/blog4/800/400',
        readTime: 7,
        tags: ['Lập trình', 'Học tập', 'Tips', 'Beginner'],
    },
    {
        id: '5',
        title: 'Remote Work: Làm Việc Từ Xa Hiệu Quả Trong Ngành IT',
        excerpt:
            'Remote work đang trở thành xu hướng không thể đảo ngược. Học cách làm việc từ xa hiệu quả và duy trì work-life balance.',
        content: `
## Remote Work Trong Ngành IT

Đại dịch COVID-19 đã thay đổi vĩnh viễn cách chúng ta làm việc. Remote work không còn là đặc quyền mà đã trở thành tiêu chuẩn mới.

## Lợi Ích Của Remote Work

- Tiết kiệm thời gian đi lại
- Linh hoạt về thời gian và địa điểm
- Cơ hội làm việc cho công ty nước ngoài
- Tăng năng suất (nếu có kỷ luật)

## Thách Thức Cần Vượt Qua

### Cô đơn và thiếu kết nối
Làm việc từ xa có thể gây cảm giác cô lập. Hãy chủ động tham gia các cuộc họp video và giao lưu với đồng nghiệp.

### Khó tách biệt công việc và cuộc sống
Thiết lập không gian làm việc riêng và giờ làm việc cố định.

## Tips Làm Việc Remote Hiệu Quả

1. Có không gian làm việc riêng
2. Duy trì lịch làm việc cố định
3. Sử dụng công cụ quản lý task (Notion, Trello)
4. Check-in thường xuyên với team
5. Nghỉ ngơi đúng giờ
    `,
        author: 'Hoàng Văn Nam',
        authorAvatar: 'https://picsum.photos/seed/author5/100/100',
        date: '28/10/2024',
        category: 'Kinh nghiệm',
        thumbnail: 'https://picsum.photos/seed/blog5/800/400',
        readTime: 6,
        tags: ['Remote Work', 'IT', 'Productivity', 'Work-life balance'],
    },
    {
        id: '6',
        title: 'Freelancer IT: Cách Kiếm Thu Nhập $2000/Tháng Từ Upwork',
        excerpt:
            'Hướng dẫn chi tiết cách xây dựng profile Upwork, tìm kiếm khách hàng và kiếm thu nhập ổn định từ freelancing trong ngành IT.',
        content: `
## Tại Sao Nên Freelance?

Freelancing mang lại tự do về thời gian, địa điểm và thu nhập không giới hạn. Nhiều developer Việt Nam đang kiếm $2000-5000/tháng từ Upwork.

## Bước 1: Xây Dựng Profile Chuyên Nghiệp

Profile là ấn tượng đầu tiên với khách hàng. Hãy đầu tư thời gian để tạo profile thật chuyên nghiệp.

**Checklist profile:**
- Ảnh đại diện chuyên nghiệp
- Title rõ ràng và hấp dẫn
- Overview mô tả giá trị bạn mang lại
- Portfolio với 3-5 dự án tốt nhất
- Skills được verify

## Bước 2: Tìm Kiếm Công Việc Đầu Tiên

Đừng apply bừa bãi. Hãy chọn lọc và viết proposal cá nhân hóa cho từng job.

## Bước 3: Xây Dựng Reputation

Top Rated badge trên Upwork sẽ mở ra nhiều cơ hội hơn. Hãy tập trung vào chất lượng công việc và feedback từ khách hàng.

## Kết luận

Freelancing không phải con đường dễ dàng, nhưng với kiên trì và chiến lược đúng, bạn hoàn toàn có thể đạt được mục tiêu thu nhập.
    `,
        author: 'Trần Minh Quân',
        authorAvatar: 'https://picsum.photos/seed/author6/100/100',
        date: '20/10/2024',
        category: 'Kinh nghiệm',
        thumbnail: 'https://picsum.photos/seed/blog6/800/400',
        readTime: 9,
        tags: ['Freelance', 'Upwork', 'Thu nhập', 'IT Career'],
    },
]

export const userProfile: UserProfile = {
    id: '1',
    name: 'Nguyễn Thành Long',
    email: 'thanh.long@email.com',
    avatar: 'https://picsum.photos/seed/user1/200/200',
    bio: 'Frontend Developer đang học thêm về Data Science và Machine Learning. Đam mê công nghệ và luôn tìm kiếm cơ hội phát triển bản thân.',
    joinDate: 'Tháng 3, 2023',
    totalCourses: 8,
    completedCourses: 3,
    certificates: 3,
    totalHours: 127,
    streak: 15,
    level: 'Intermediate Learner',
    skills: ['React', 'TypeScript', 'Python', 'Figma', 'Node.js'],
}

export const testimonials: Testimonial[] = [
    {
        id: '1',
        name: 'Nguyễn Thị Bích',
        avatar: 'https://picsum.photos/seed/test1/100/100',
        role: 'Frontend Developer tại FPT Software',
        content:
            'Khóa học React & TypeScript đã giúp tôi chuyển ngành thành công. Chỉ sau 3 tháng học, tôi đã có việc làm với mức lương gấp đôi trước đây!',
        rating: 5,
        course: 'React & TypeScript',
    },
    {
        id: '2',
        name: 'Trần Văn Đức',
        avatar: 'https://picsum.photos/seed/test2/100/100',
        role: 'UI/UX Designer tại Tiki',
        content:
            'Khóa học Figma rất thực tế và dễ hiểu. Giảng viên nhiệt tình, nội dung cập nhật. Tôi đã xây dựng được portfolio ấn tượng sau khóa học này.',
        rating: 5,
        course: 'UI/UX Design với Figma',
    },
    {
        id: '3',
        name: 'Lê Thị Phương',
        avatar: 'https://picsum.photos/seed/test3/100/100',
        role: 'Digital Marketing Manager',
        content:
            'Khóa Digital Marketing rất toàn diện. Tôi đã áp dụng được ngay vào công việc và tăng ROI cho công ty lên 150% chỉ trong 2 tháng.',
        rating: 5,
        course: 'Digital Marketing Toàn Diện',
    },
    {
        id: '4',
        name: 'Hoàng Minh Tuấn',
        avatar: 'https://picsum.photos/seed/test4/100/100',
        role: 'Data Analyst tại Vingroup',
        content:
            'Python cho Data Science là khóa học tốt nhất tôi từng tham gia. Nội dung sâu, bài tập thực tế. Đã giúp tôi chuyển sang vị trí Data Analyst.',
        rating: 5,
        course: 'Python cho Data Science',
    },
]

export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(price)
}
