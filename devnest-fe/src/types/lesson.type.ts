export interface LessonResponse {
	title: string;
	slug: string;
	lesson_type: string;
	video_url: string;
	duration: number;
	is_preview: boolean;
	order_index: number;
}
