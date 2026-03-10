const SECTION_URL = "sections";
export const sectionUri = {
	GET_SECTION: `${SECTION_URL}`,
	GET_SECTION_BY_ID: (id: string) => `${SECTION_URL}/${id}`,
	CREATE: `${SECTION_URL}`,
	UPDATE: (id: string) => `${SECTION_URL}/${id}`,
	DELETE: (id: string) => `${SECTION_URL}/${id}`,
	RESTORE: (id: string) => `${SECTION_URL}/restore/${id}`,
};
