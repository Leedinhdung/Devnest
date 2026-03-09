export const getYoutubeId = (url: string) => {
	const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/;
	const match = url.match(regExp);
	return match && match[2].length === 11 ? match[2] : null;
};
export const parseDuration = (duration: string) => {
	const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;

	const match = duration.match(regex);

	const hours = parseInt(match?.[1] || "0");
	const minutes = parseInt(match?.[2] || "0");
	const seconds = parseInt(match?.[3] || "0");

	return hours * 3600 + minutes * 60 + seconds;
};
