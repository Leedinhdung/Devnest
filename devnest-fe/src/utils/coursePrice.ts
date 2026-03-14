type PriceCourse = {
	price: number;
	discount_price?: number;
};
export const getCoursePrice = (course: PriceCourse) => {
	const discountPrice = course.discount_price ?? 0;
	const hasDiscount = discountPrice > 0 && discountPrice < course.price;

	const finalPrice = hasDiscount ? discountPrice : course.price;
	const discount = hasDiscount
		? Math.round(((course.price - discountPrice) / course.price) * 100)
		: 0;

	return { finalPrice, discount, hasDiscount };
};
