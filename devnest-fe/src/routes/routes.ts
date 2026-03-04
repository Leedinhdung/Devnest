const routes = {
	//Auth
	login: "/quan-tri/dang-nhap",
	register: "/quan-tri/dang-ky",
	//Admin
	dashboard: "/quan-tri/tong-quan",
	courses: "/quan-tri/khoa-hoc",
	students: "/quan-tri/hoc-vien",
	settings: "/quan-tri/cai-dat",
	//Client
	loginClient: "/dang-nhap",
	home: "/",
	profile: "/trang-ca-nhan",
	coursesList: "/tat-ca-khoa-hoc",
	blog: "/blog",
	contact: "/lien-he",
	myCourses: "/khoa-hoc-cua-toi",
	myFavorites: "/khoa-hoc-yeu-thich",
	searchResult: "/khoa-hoc",
	courseDetail: "/khoa-hoc/:id",
	buyCourse: "/mua-khoa-hoc/:id",
	cart: "/gio-hang",
};
export default routes;
