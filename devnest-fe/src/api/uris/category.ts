const CATEGORY_URL = "categories";
export const categoryUri = {
	GET_CATEGORIES: `${CATEGORY_URL}`,
	GET_CATEGORY_BY_SLUG: (slug: string) => `${CATEGORY_URL}/${slug}`,
	CREATE: `${CATEGORY_URL}`,
	UPDATE: (slug: string) => `${CATEGORY_URL}/${slug}`,
	DELETE: (slug: string) => `${CATEGORY_URL}/${slug}`,
};
