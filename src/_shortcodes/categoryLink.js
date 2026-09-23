module.exports = function categoryLink(category, slug) {

 	return `
<p class="categoryLink">
	<img src="/assets/img/icons/tag.svg" />
	<a class="grey" href="/blog/category/${slug}">
		<em>${category}</em>
	</a>
</p>
  	`;
};
