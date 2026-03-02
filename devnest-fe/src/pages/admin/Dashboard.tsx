import React from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import {
  UsersIcon,
  BookOpenIcon,
  TrendingUpIcon,
  DollarSignIcon,
  ClockIcon,
  StarIcon,
  ArrowRightIcon,
  CheckCircleIcon,
} from 'lucide-react'
import { StatCard } from '@/components/ui/statcard'
import { Badge } from '@/components/ui/badge'

const enrollmentData = [
  {
    month: 'T1',
    'Học viên mới': 120,
    'Hoàn thành': 45,
  },
  {
    month: 'T2',
    'Học viên mới': 185,
    'Hoàn thành': 72,
  },
  {
    month: 'T3',
    'Học viên mới': 145,
    'Hoàn thành': 88,
  },
  {
    month: 'T4',
    'Học viên mới': 210,
    'Hoàn thành': 95,
  },
  {
    month: 'T5',
    'Học viên mới': 178,
    'Hoàn thành': 110,
  },
  {
    month: 'T6',
    'Học viên mới': 265,
    'Hoàn thành': 130,
  },
  {
    month: 'T7',
    'Học viên mới': 310,
    'Hoàn thành': 155,
  },
  {
    month: 'T8',
    'Học viên mới': 290,
    'Hoàn thành': 168,
  },
  {
    month: 'T9',
    'Học viên mới': 340,
    'Hoàn thành': 190,
  },
  {
    month: 'T10',
    'Học viên mới': 380,
    'Hoàn thành': 210,
  },
  {
    month: 'T11',
    'Học viên mới': 420,
    'Hoàn thành': 235,
  },
  {
    month: 'T12',
    'Học viên mới': 465,
    'Hoàn thành': 260,
  },
]
const categoryData = [
  {
    name: 'Lập trình',
    value: 38,
    color: '#6366f1',
  },
  {
    name: 'Thiết kế',
    value: 22,
    color: '#8b5cf6',
  },
  {
    name: 'Marketing',
    value: 18,
    color: '#06b6d4',
  },
  {
    name: 'Kinh doanh',
    value: 14,
    color: '#10b981',
  },
  {
    name: 'Khác',
    value: 8,
    color: '#f59e0b',
  },
]
const recentActivities = [
  {
    id: 1,
    user: 'Nguyễn Văn An',
    action: 'đăng ký khóa học',
    course: 'React.js Nâng cao',
    time: '5 phút trước',
    avatar: 'NA',
  },
  {
    id: 2,
    user: 'Trần Thị Bình',
    action: 'hoàn thành khóa học',
    course: 'Python cơ bản',
    time: '12 phút trước',
    avatar: 'TB',
  },
  {
    id: 3,
    user: 'Lê Minh Cường',
    action: 'đăng ký khóa học',
    course: 'UI/UX Design',
    time: '28 phút trước',
    avatar: 'LC',
  },
  {
    id: 4,
    user: 'Phạm Thị Dung',
    action: 'nộp bài tập',
    course: 'JavaScript ES6+',
    time: '45 phút trước',
    avatar: 'PD',
  },
  {
    id: 5,
    user: 'Hoàng Văn Em',
    action: 'đánh giá 5 sao',
    course: 'Node.js Backend',
    time: '1 giờ trước',
    avatar: 'HE',
  },
]
const topCourses = [
  {
    id: 1,
    name: 'React.js Nâng cao',
    students: 342,
    rating: 4.9,
    revenue: '34.2M',
    status: 'active',
  },
  {
    id: 2,
    name: 'Python cho người mới',
    students: 289,
    rating: 4.8,
    revenue: '28.9M',
    status: 'active',
  },
  {
    id: 3,
    name: 'UI/UX Design Masterclass',
    students: 215,
    rating: 4.7,
    revenue: '21.5M',
    status: 'active',
  },
  {
    id: 4,
    name: 'Digital Marketing',
    students: 198,
    rating: 4.6,
    revenue: '19.8M',
    status: 'active',
  },
]
const avatarColors = [
  'from-indigo-400 to-indigo-600',
  'from-purple-400 to-purple-600',
  'from-cyan-400 to-cyan-600',
  'from-emerald-400 to-emerald-600',
  'from-amber-400 to-amber-600',
]
interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    name: string
    value: number
    color: string
  }>
  label?: string
}
function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white px-3 py-2 rounded-xl shadow-xl text-xs">
        <p className="font-semibold mb-1">{label}</p>
        {payload.map((entry) => (
          <p
            key={entry.name}
            style={{
              color: entry.color,
            }}
          >
            {entry.name}: <span className="font-bold">{entry.value}</span>
          </p>
        ))}
      </div>
    )
  }
  return null
}
export function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Tổng học viên"
          value="3,842"
          change={12.5}
          changeLabel="so với tháng trước"
          icon={UsersIcon}
          iconColor="text-indigo-600"
          iconBg="bg-indigo-50"
        />
        <StatCard
          title="Khóa học đang mở"
          value="48"
          change={4.2}
          changeLabel="so với tháng trước"
          icon={BookOpenIcon}
          iconColor="text-purple-600"
          iconBg="bg-purple-50"
        />
        <StatCard
          title="Doanh thu tháng"
          value="142.5M"
          change={18.3}
          changeLabel="so với tháng trước"
          icon={DollarSignIcon}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
        />
        <StatCard
          title="Tỉ lệ hoàn thành"
          value="68.4%"
          change={-2.1}
          changeLabel="so với tháng trước"
          icon={TrendingUpIcon}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Enrollment Trend */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Xu hướng đăng ký
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Học viên mới và hoàn thành khóa học theo tháng
              </p>
            </div>
            <select className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 text-slate-600 bg-white outline-none focus:ring-2 focus:ring-indigo-500">
              <option>2024</option>
              <option>2023</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart
              data={enrollmentData}
              margin={{
                top: 5,
                right: 10,
                left: -20,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorComplete" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="month"
                tick={{
                  fontSize: 11,
                  fill: '#94a3b8',
                }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{
                  fontSize: 11,
                  fill: '#94a3b8',
                }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="Học viên mới"
                stroke="#6366f1"
                strokeWidth={2.5}
                fill="url(#colorNew)"
                dot={false}
                activeDot={{
                  r: 5,
                  fill: '#6366f1',
                }}
              />
              <Area
                type="monotone"
                dataKey="Hoàn thành"
                stroke="#10b981"
                strokeWidth={2.5}
                fill="url(#colorComplete)"
                dot={false}
                activeDot={{
                  r: 5,
                  fill: '#10b981',
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-indigo-500" />
              <span className="text-xs text-slate-500">Học viên mới</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-xs text-slate-500">Hoàn thành</span>
            </div>
          </div>
        </div>

        {/* Category Pie */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-slate-900">
              Danh mục khóa học
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Phân bổ theo lĩnh vực
            </p>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`${value}%`, '']}
                contentStyle={{
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                  fontSize: '12px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {categoryData.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor: item.color,
                    }}
                  />
                  <span className="text-xs text-slate-600">{item.name}</span>
                </div>
                <span className="text-xs font-semibold text-slate-700">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Top Courses */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-slate-900">
              Khóa học nổi bật
            </h2>
            <button className="text-xs text-indigo-600 font-medium hover:text-indigo-700 flex items-center gap-1">
              Xem tất cả <ArrowRightIcon className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-3">
            {topCourses.map((course, idx) => (
              <div
                key={course.id}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-indigo-600 font-bold text-sm">
                    #{idx + 1}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">
                    {course.name}
                  </p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <UsersIcon className="w-3 h-3" /> {course.students}
                    </span>
                    <span className="text-xs text-amber-500 flex items-center gap-1">
                      <StarIcon className="w-3 h-3 fill-amber-400" />{' '}
                      {course.rating}
                    </span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-semibold text-slate-800">
                    {course.revenue}
                  </p>
                  <Badge variant="success">Đang mở</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-slate-900">
              Hoạt động gần đây
            </h2>
            <button className="text-xs text-indigo-600 font-medium hover:text-indigo-700 flex items-center gap-1">
              Xem tất cả <ArrowRightIcon className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, idx) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded-full bg-gradient-to-br ${avatarColors[idx % avatarColors.length]} flex items-center justify-center flex-shrink-0`}
                >
                  <span className="text-white text-xs font-bold">
                    {activity.avatar}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700">
                    <span className="font-semibold text-slate-900">
                      {activity.user}
                    </span>{' '}
                    {activity.action}{' '}
                    <span className="font-medium text-indigo-600">
                      {activity.course}
                    </span>
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                    <ClockIcon className="w-3 h-3" /> {activity.time}
                  </p>
                </div>
                <CheckCircleIcon className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
