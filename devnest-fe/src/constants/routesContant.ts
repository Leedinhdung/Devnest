import { AdminLayout } from "@/layouts/admin/AdminLayout";
import AuthLayout from "@/layouts/admin/AuthLayout";
import { LoginPage } from "@/pages/admin/auth/LoginPage";
import { RegisterPage } from "@/pages/admin/auth/RegisterPage";
import { CoursesPage } from "@/pages/admin/courses/CoursesPage";
import { DashboardPage } from "@/pages/admin/Dashboard";
import { SettingsPage } from "@/pages/admin/settings/SettingsPage";
import { StudentsPage } from "@/pages/admin/students/StudentsPage";
import routes from "@/routes/routes";

export const authRoutes = [
	{ path: routes.login, layout: AuthLayout, element: LoginPage },
	{ path: routes.register, layout: AuthLayout, element: RegisterPage },
];

export const adminRoutes = [
	{ path: routes.dashboard, layout: AdminLayout, element: DashboardPage },
	{ path: routes.courses, layout: AdminLayout, element: CoursesPage },
	{ path: routes.students, layout: AdminLayout, element: StudentsPage },
	{ path: routes.settings, layout: AdminLayout, element: SettingsPage },
];
