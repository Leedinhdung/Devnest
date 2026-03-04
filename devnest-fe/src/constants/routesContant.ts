import { AdminLayout } from "@/layouts/admin/AdminLayout";
import AuthLayout from "@/layouts/admin/AuthLayout";
import ClientLayout from "@/layouts/client/ClientLayout";
import { LoginPage } from "@/pages/admin/auth/LoginPage";
import { LoginPage as LoginClientPage } from "@/pages/client/auth/LoginPage";
import { RegisterPage } from "@/pages/admin/auth/RegisterPage";
import { CoursesPage } from "@/pages/admin/courses/CoursesPage";
import { CoursesPage as ClientCoursesPage } from "@/pages/client/course/CoursesPage";
import { DashboardPage } from "@/pages/admin/Dashboard";
import { SettingsPage } from "@/pages/admin/settings/SettingsPage";
import { StudentsPage } from "@/pages/admin/students/StudentsPage";
import HomePage from "@/pages/client/home/HomePage";

import { ProfilePage } from "@/pages/client/profile/ProfilePage";
import routes from "@/routes/routes";
import { BlogPage } from "@/pages/client/blog/BlogPage";
import { ContactPage } from "@/pages/client/contact/ContactPage";
import { MyCoursesPage } from "@/pages/client/course/MyCoursesPage";
import { SearchResultsPage } from "@/pages/client/search/SearchResults";
import { CourseDetailPage } from "@/pages/client/course/CourseDetailPage";
import { CourseCheckoutPage } from "@/pages/client/course/CourseCheckoutPage";
import { CartPage } from "@/pages/client/cart/CartPage";
import { FavoritesPage } from "@/pages/client/favorite/FavoritesPage";

export const authRoutes = [
	{ path: routes.login, layout: AuthLayout, element: LoginPage },
	{ path: routes.register, layout: AuthLayout, element: RegisterPage },
	{ path: routes.loginClient, layout: ClientLayout, element: LoginClientPage },
];

export const adminRoutes = [
	{ path: routes.dashboard, layout: AdminLayout, element: DashboardPage },
	{ path: routes.courses, layout: AdminLayout, element: CoursesPage },
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
	{ path: routes.buyCourse, layout: ClientLayout, element: CourseCheckoutPage },
	{ path: routes.cart, layout: ClientLayout, element: CartPage },
];
