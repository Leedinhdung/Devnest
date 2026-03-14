const COURSE_URL = "courses";
export const courseUri = {
	GET_COURSE: `${COURSE_URL}`,
	GET_COURSE_BY_SLUG: (slug: string) => `${COURSE_URL}/${slug}`,
	GET_RELATED_COURSES: (slug: string) => `${COURSE_URL}/relatedCourses/${slug}`,
	CREATE: `${COURSE_URL}`,
	UPDATE: (slug: string) => `${COURSE_URL}/${slug}`,
	DELETE: (slug: string) => `${COURSE_URL}/${slug}`,
};
