module.exports = function postsWithCategory(posts, category) {
	category = category.toLowerCase();
	const result = posts.filter((p) => {
		const postCategories = p.data.categories?.map((c) => c.toLowerCase());
		return postCategories?.includes(category);
	});
	return result;
};
