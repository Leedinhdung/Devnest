const routes = {
	//Admin
	dashboard: "/quan-tri/tong-quan",
	courses: "/quan-tri/khoa-hoc",
	addCourse: "/quan-tri/khoa-hoc/them-khoa-hoc",
	editCourse: "/quan-tri/khoa-hoc/:slug",
	courseLesson: "/quan-tri/khoa-hoc/bai-hoc/:slug",
	students: "/quan-tri/hoc-vien",
	settings: "/quan-tri/cai-dat",
	//Client
	login: "/dang-nhap",
	home: "/",
	profile: "/trang-ca-nhan",
	coursesList: "/tat-ca-khoa-hoc",
	learn: "/hoc/:slug",
	blog: "/blog",
	contact: "/lien-he",
	myCourses: "/khoa-hoc-cua-toi",
	myFavorites: "/khoa-hoc-yeu-thich",
	searchResult: "/khoa-hoc",
	courseDetail: "/khoa-hoc/:slug",
	buyCourse: "/mua-khoa-hoc/:id",
	cart: "/gio-hang",
};
export default routes;
