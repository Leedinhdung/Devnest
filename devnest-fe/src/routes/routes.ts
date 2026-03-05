const routes = {
	//Admin
	dashboard: "/quan-tri/tong-quan",
	courses: "/quan-tri/khoa-hoc",
	students: "/quan-tri/hoc-vien",
	settings: "/quan-tri/cai-dat",
	//Client
	login: "/dang-nhap",
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
