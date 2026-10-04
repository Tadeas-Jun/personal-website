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

	eleventyConfig.addCollection("pageSummaries", async (collectionsApi) => {
		return collectionsApi.getFilteredByTags("pageSummary").sort((a, b) => a.data.order - b.data.order);
	});

	eleventyConfig.addCollection("now", async (collectionsApi) => {
		return collectionsApi.getFilteredByTags("now").sort((a, b) => a.data.number - b.data.number);
	});

	// Blog
	eleventyConfig.addCollection("categories", async (collectionsApi) => {

		// Get all unique categories from all posts, count the articles, and save the date of the most recent post.
		const categories = {};
		const posts = collectionsApi.getFilteredByTags("article");

		posts.forEach((p) => {
			const postCategories = p.data.categories;
			postCategories?.forEach((c) => {

				if (!categories[c]) {

					categories[c] = {
						name: c,
						count: 1,
						lastUpdate: p.data.date,
					};

				} else {

					categories[c].count++;

					if (categories[c].lastUpdate < p.data.date) {
						categories[c].lastUpdate = p.data.date;
					}
				}

			});
		});

		// Sort categories by last updated date, and then alphabetically
		const sortedCategories = Object.values(categories).sort(
			(a, b) => (
				b.lastUpdate.localeCompare(a.lastUpdate) ||
				a.name.localeCompare(b.name)
			)
		);

		return sortedCategories;

	});

	// Filters
	const trimFilter = require('./src/_filters/trim.js');
	eleventyConfig.addFilter("trim", trimFilter);

	const toPlainTextFilter = require('./src/_filters/toPlainText.js');
	eleventyConfig.addFilter("toPlainText", toPlainTextFilter);

	const postsWithCategoryFilter = require('./src/_filters/postsWithCategory.js');
	eleventyConfig.addFilter("postsWithCategory", postsWithCategoryFilter);

	return {
		passthroughFileCopy: true,
		htmlTemplateEngine: "njk",
		markdownTemplateEngine: "njk",
		templateFormats: ["html", "njk", "md", "txt", "11ty.js"],
		dir: {
			input: "src",
			output: "public_html",
			include: "_includes",
		}
	}

}