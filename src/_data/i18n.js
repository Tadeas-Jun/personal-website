const markdownIt = require("markdown-it");
const md = markdownIt({ html: true });

const languages = ['en', 'cs'];
const texts = {};

function renderDeep(value) {

	// Strings -> Markdown -> HTML
	if (typeof value === "string") {
		return md.renderInline(value).includes("<")
			? md.render(value)
			: md.renderInline(value);
	}

	// Arrays -> recurse
	if (Array.isArray(value)) {
		return value.map(renderDeep);
	}

	// Objects -> recurse per key
	if (value && typeof value === "object") {
		const result = {};
		for (const key in value) {
			result[key] = renderDeep(value[key]);
		}
		return result;
	}

	// Everything else -> passthrough
	return value;

}

languages.forEach((l) => {
	const languageTexts = require(`./texts/${l}.json`);
	texts[l] = languageTexts;
});

const rendered = {};

for (const lang in texts) {
	rendered[lang] = renderDeep(texts[lang]);
}

module.exports = rendered;
