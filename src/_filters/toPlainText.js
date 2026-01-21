module.exports = function toPlainTextFilter(post) {
	const content = post.replace(/(<([^>]+)>)/gi, "");
	return content;
};
