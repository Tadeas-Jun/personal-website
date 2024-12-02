module.exports = function(eleventyConfig) {

	eleventyConfig.addPassthroughCopy("assets");
	eleventyConfig.addPassthroughCopy("bootstrap");

	return {

		passthroughFileCopy: true,
		markdownTemplateEngine: "njk",
		templateFormats: ["html", "njk", "md", "txt"],
		dir: {
			input: "src",
			output: "public_html",
			include: "_includes"
		}
	}

}