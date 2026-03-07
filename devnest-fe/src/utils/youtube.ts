export function getYoutubeId(url: string): string | null {
	const match = url.match(
		/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/,
	);
	return match && match[2].length === 11 ? match[2] : null;
}
