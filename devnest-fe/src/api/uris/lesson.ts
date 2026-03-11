const LESSON_URL = "lessons";
export const lessonUri = {
	GET_LESSON: `${LESSON_URL}`,
	GET_LESSON_BY_SLUG: (slug: string) => `${LESSON_URL}/${slug}`,
	CREATE: `${LESSON_URL}`,
	UPDATE: (slug: string) => `${LESSON_URL}/${slug}`,
	DELETE: (slug: string) => `${LESSON_URL}/${slug}`,
	RESTORE: (slug: string) => `${LESSON_URL}/restore/${slug}`,
	REORDER: `${LESSON_URL}/reorder`,
};
