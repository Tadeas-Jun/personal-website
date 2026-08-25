module.exports = function blogCard(post) {

	// TODO (feature): Word count.

 	return `
<a href="${ post.url }" class="invisible-link">
	<div href="${ post.url }" class="my-5 article-item">
		<h2 class="display-4 article-title">${ post.data.title }</h2>
		<p>${ post.data.description }</p>
		<p class="article-meta">${ post.data.author }, ${ post.data.releaseDate }</p>
	</div>
</a>
  	`;
};