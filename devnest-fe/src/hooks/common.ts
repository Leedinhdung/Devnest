import { useParams, useLocation } from "react-router-dom";

export const useGetSlugParams = (paramName: string): string | undefined => {
	const params = useParams();
	const location = useLocation();
	const query = new URLSearchParams(location.search);

	return params[paramName] ?? query.get(paramName) ?? undefined;
};
