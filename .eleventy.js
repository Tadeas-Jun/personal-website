module.exports = function(eleventyConfig) {

	eleventyConfig.addPassthroughCopy("assets");

	// Plugins
	const pluginRss = require("@11ty/eleventy-plugin-rss");
	eleventyConfig.addPlugin(pluginRss);

	// Collections
	eleventyConfig.addCollection("technology", async (collectionsApi) => {
		return collectionsApi.getFilteredByTags("technology").filter((t) => t.data.shown).sort((a, b) => a.inputPath.localeCompare(b.inputPath) );
	});

	eleventyConfig.addCollection("projects", async (collectionsApi) => {
		return collectionsApi.getFilteredByTags("project").filter((p) => p.data.shown).sort((a, b) => a.data.order - b.data.order);
	});

	eleventyConfig.addCollection("testimonials", async (collectionsApi) => {
		return collectionsApi.getFilteredByTags("testimonial").sort((a, b) => a.data.order - b.data.order);
	});

	// Filters
	const trimFilter = require('./src/_filters/trim.js');
	eleventyConfig.addFilter("trim", trimFilter);

	const toPlainTextFilter = require('./src/_filters/toPlainText.js');
	eleventyConfig.addFilter("toPlainText", toPlainTextFilter);

	// Shortcodes
	const projectCardLargeShortcode = require('./src/_shortcodes/projectCardLarge.js');
	eleventyConfig.addShortcode("projectCardLarge", projectCardLargeShortcode);

	const projectCardListShortcode = require('./src/_shortcodes/projectCardLink.js');
	eleventyConfig.addShortcode("projectCardLink", projectCardListShortcode);

	const blogCardShortcode = require('./src/_shortcodes/blogCard.js');
	eleventyConfig.addShortcode("blogCard", blogCardShortcode);

	const authorBlockShortcode = require('./src/_shortcodes/authorBlock.js');
	eleventyConfig.addShortcode("authorBlock", authorBlockShortcode);

	return {

		passthroughFileCopy: true,
		markdownTemplateEngine: "njk",
		templateFormats: ["html", "njk", "md", "txt", "11ty.js"],
		dir: {
			input: "src",
			output: "public_html",
			include: "_includes",
		}
	}

}