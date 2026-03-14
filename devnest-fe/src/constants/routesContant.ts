import { AdminLayout } from "@/layouts/admin/AdminLayout";
import ClientLayout from "@/layouts/client/ClientLayout";
import { CoursesPage } from "@/pages/admin/courses/CoursesPage";
import { DashboardPage } from "@/pages/admin/Dashboard";
import { SettingsPage } from "@/pages/admin/settings/SettingsPage";
import { StudentsPage } from "@/pages/admin/students/StudentsPage";
import { CoursesPage as ClientCoursesPage } from "@/pages/client/course/CoursesPage";
import HomePage from "@/pages/client/home/HomePage";
import { LoginPage } from "@/pages/client/auth/LoginPage";
import { BlogPage } from "@/pages/client/blog/BlogPage";
import { CartPage } from "@/pages/client/cart/CartPage";
import { ContactPage } from "@/pages/client/contact/ContactPage";
import { CourseCheckoutPage } from "@/pages/client/course/CourseCheckoutPage";
import { CourseDetailPage } from "@/pages/client/course/CourseDetailPage";
import { MyCoursesPage } from "@/pages/client/course/MyCoursesPage";
import { FavoritesPage } from "@/pages/client/favorite/FavoritesPage";
import { ProfilePage } from "@/pages/client/profile/ProfilePage";
import { SearchResultsPage } from "@/pages/client/search/SearchResults";
import routes from "@/routes/routes";
import { CourseFormPage } from "@/pages/admin/courses/CourseFormPage";
import { CourseContentPage } from "@/pages/admin/courses/CoursesContentPage";
import { LearnPage } from "@/pages/client/learn/LearnPage";

export const authRoutes = [
	{ path: routes.login, layout: ClientLayout, element: LoginPage },
];

export const adminRoutes = [
	{ path: routes.dashboard, layout: AdminLayout, element: DashboardPage },
	{ path: routes.courses, layout: AdminLayout, element: CoursesPage },
	{ path: routes.addCourse, layout: AdminLayout, element: CourseFormPage },
	{ path: routes.editCourse, layout: AdminLayout, element: CourseFormPage },
	{
		path: routes.courseLesson,
		layout: AdminLayout,
		element: CourseContentPage,
	},
	{ path: routes.students, layout: AdminLayout, element: StudentsPage },
	{ path: routes.settings, layout: AdminLayout, element: SettingsPage },
];
export const clientRoutes = [
	{ path: routes.home, layout: ClientLayout, element: HomePage },
	{ path: routes.profile, layout: ClientLayout, element: ProfilePage },
	{
		path: routes.coursesList,
		layout: ClientLayout,
		element: ClientCoursesPage,
	},
	{ path: routes.blog, layout: ClientLayout, element: BlogPage },
	{ path: routes.contact, layout: ClientLayout, element: ContactPage },
	{ path: routes.myCourses, layout: ClientLayout, element: MyCoursesPage },
	{ path: routes.myFavorites, layout: ClientLayout, element: FavoritesPage },
	{
		path: routes.searchResult,
		layout: ClientLayout,
		element: SearchResultsPage,
	},
	{
		path: routes.courseDetail,
		layout: ClientLayout,
		element: CourseDetailPage,
	},
	{ path: routes.checkout, layout: ClientLayout, element: CourseCheckoutPage },
	{ path: routes.cart, layout: ClientLayout, element: CartPage },
];
export const learnRoutes = [
	{ path: routes.learn, layout: null, element: LearnPage },
];
