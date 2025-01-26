module.exports = function(eleventyConfig) {

	eleventyConfig.addPassthroughCopy("assets");
	eleventyConfig.addPassthroughCopy("bootstrap");

	eleventyConfig.addCollection("technology", async (collectionsApi) => {
		// get unsorted items
		return collectionsApi.getFilteredByTags("technology").sort((a, b) => a.inputPath.localeCompare(b.inputPath) );
	});

	return {

		passthroughFileCopy: true,
		markdownTemplateEngine: "njk",
		templateFormats: ["html", "njk", "md", "txt"],
		dir: {
			input: "src",
			output: "public_html",
			include: "_includes",
		}
	}

}