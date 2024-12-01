$(async function () {

	// Init i18next
	const enTexts = await $.getJSON("/assets/data/texts/en.json");
	const csTexts = await $.getJSON("/assets/data/texts/cs.json");

	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const urlLangParam = urlParams.get("lang");
	const urlLang = (['cs', 'en'].includes(urlLangParam) ? urlLangParam : null);
	const initLang = urlLang || localStorage.getItem("lang") || 'en';

	i18next.init({
	  ns: "portfolio",
	  lng: initLang,
	  debug: false,
	  resources: {
		en: enTexts,
		cs: csTexts,
	  },
	});

	$("#displayLocale").text(initLang);

	i18next.on('languageChanged', (lng) => {
		$("#displayLocale").text(lng);
		localStorage.setItem("lang", lng);
		localizeTexts();
	});

	// Init language selector
	$("#languageSelector ul li a").click(function () {
		i18next.changeLanguage($(this).attr("data-locale"));
	});

	localizeTexts();

});

function replaceFromArrays(find, replace, string) {

	if (!string) return;

	for (let i = 0; i < find.length; i++) {
		string = string.replace(find[i], replace[i]);
	}
	return string;
}

function replacePlaceholders() {

	const serviceWorldbuilding = $(`[data-i18n="home.services.worldbuilding"`);
	serviceWorldbuilding.html(replaceFromArrays(["{{primary}}", "{{/primary}}", "{{dash}}"], [`<span class="text-primary text-regular">`, `</span>`, `&#8209;`], serviceWorldbuilding.html()));

	const serviceWriting = $(`[data-i18n="home.services.writing"]`);
	serviceWriting.html(replaceFromArrays(["{{primary}}", "{{/primary}}"], [`<span class="text-primary text-regular">`, `</span>`], serviceWriting.html()));

	const serviceCoding = $(`[data-i18n="home.services.coding"]`);
	serviceCoding.html(replaceFromArrays(["{{primary}}", "{{/primary}}", "{{primary}}", "{{/primary}}"], [`<span class="text-primary text-regular">`, `</span>`, `<span class="text-primary text-regular">`, `</span>`], serviceCoding.html()));

	const serviceAI = $(`[data-i18n="home.services.ai"]`);
	serviceAI.html(replaceFromArrays(["{{link}}", "{{/link}}"], [`<a href="/blog/ai/">`, `</a>`], serviceAI.html()));

	const footerCopyright = $(`[data-i18n="footer.copyright"]`);
	footerCopyright.html(replaceFromArrays(["{{copyright}}", "{{currentYear}}"], ["&copy;", new Date().getFullYear()], footerCopyright.html()));

	const wumpiDesc = $(`[data-i18n="home.projects.project.wumpi.description"]`);
	wumpiDesc.html(replaceFromArrays(["{{italics}}", "{{/italics}}"], ["<i>", "</i>"], wumpiDesc.html()));

	const homepageBlogDesc = $(`[data-i18n="home.blog.description"]`);
	homepageBlogDesc.html(replaceFromArrays(["{{link}}", "{{/link}}"], ["<a href='/blog'>", "</a>"], homepageBlogDesc.html()));

	const testimonialContact = $(`[data-i18n="home.testimonials.contact"]`);
	testimonialContact.html(replaceFromArrays(["{{contact}}"], ["<a href=\"mailto:contact@tadeasjun.com\">contact@tadeasjun.com</a>"], testimonialContact.html()));

	const contact = $(`[data-i18n="home.contact.description"]`);
	contact.html(replaceFromArrays(["{{primary}}", "{{mailto}}", "{{/mailto}}", "{{/primary}}", "{{primary}}", "{{/primary}}", "{{resumeLink}}", "{{/resumeLink}}"], [`<span class="text-primary text-regular">`, `<a href="mailto:contact@tadeasjun.com">`, `</a>`, `</span>`, `<span class="text-primary text-regular">`, `</span>`, `<a href="/assets/pdf/tadeasjun_cv_${i18next.language}.pdf" target="_blank">`, `</a>`], contact.html()));

	const blogDesc = $(`[data-i18n="blog.description"]`);
	blogDesc.html(replaceFromArrays(["{{link}}", "{{/link}}"], [`<a href="https://eledris.com/" target="_blank">`, "</a>"], blogDesc.html()));

}

function localizeContent() {

	// Hide pronouns and queer flag in Czech version
	$(".queer").toggleClass("d-none", i18next.language === "cs");

	// Localize project filter titles
	$("#filter-btns").attr("aria-label", i18next.t("home.projects.filter.ariaLabel"));
	$(`#filter-btns > [for="btncheck_wb"] > a`).prop("title", i18next.t("home.projects.filter.worldbuilding"));
	$(`#filter-btns > [for="btncheck_wr"] > a`).prop("title", i18next.t("home.projects.filter.writing"));
	$(`#filter-btns > [for="btncheck_cd"] > a`).prop("title", i18next.t("home.projects.filter.coding"));

	// Localize project type titles
	$(`[data-project="wb"] > .project-card > .card-body > .card-title > a`).prop("title", i18next.t("home.projects.tag.worldbuilding"));
	$(`[data-project="wr"] > .project-card > .card-body > .card-title > a`).prop("title", i18next.t("home.projects.tag.writing"));
	$(`[data-project="cd"] > .project-card > .card-body > .card-title > a`).prop("title", i18next.t("home.projects.tag.coding"));

	// Localize links to CV in HTML
	$(".cv-link").attr("href", "/assets/pdf/tadeasjun_cv_" + i18next.language + ".pdf");

	// Localize image alt texts
	$(".logo").prop("alt", i18next.t("header.alt.logo"));
	$(`[src="/assets/img/placeholder.svg"]`).prop("alt", i18next.t("home.alt.heroIllustration"));

	$(`[src="/assets/img/project_thumbnails/eledris.png"]`).prop("alt", i18next.t("home.projects.project.eledris.imgAlt"));
	$(`[src="/assets/img/project_thumbnails/art_prompts.png"]`).prop("alt", i18next.t("home.projects.project.artprompts.imgAlt"));
	$(`[src="/assets/img/project_thumbnails/plagues.png"]`).prop("alt", i18next.t("home.projects.project.plagues.imgAlt"));
	$(`[src="/assets/img/project_thumbnails/palettey.png"]`).prop("alt", i18next.t("home.projects.project.palettey.imgAlt"));
	$(`[src="/assets/img/project_thumbnails/eledris_blog.png"]`).prop("alt", i18next.t("home.projects.project.eledrisblog.imgAlt"));
	$(`[src="/assets/img/project_thumbnails/forsakenland.png"]`).prop("alt", i18next.t("home.projects.project.forsakenland.imgAlt"));
	$(`[src="/assets/img/project_thumbnails/worldbuilding.png"]`).prop("alt", i18next.t("home.projects.project.freelanceworldbuilding.imgAlt"));
	$(`[src="/assets/img/project_thumbnails/jots.png"]`).prop("alt", i18next.t("home.projects.project.jots.imgAlt"));
	$(`[src="/assets/img/project_thumbnails/wumpi.png"]`).prop("alt", i18next.t("home.projects.project.wumpi.imgAlt"));
	$(`[src="/assets/img/project_thumbnails/starfall.png"]`).prop("alt", i18next.t("home.projects.project.starfall.imgAlt"));
	$(`[src="/assets/img/project_thumbnails/keywords.png"]`).prop("alt", i18next.t("home.projects.project.keywords.imgAlt"));
	$(`[src="/assets/img/project_thumbnails/figma_pride.png"]`).prop("alt", i18next.t("home.projects.project.prideflags.imgAlt"));
	$(`[src="/assets/img/project_thumbnails/coming_soon.png"]`).prop("alt", i18next.t("home.projects.project.comingsoon.imgAlt"));

	// Show more projects text
	if ($(`#showProjects`).length) {
		showProjectsText();
	}

}

function localizeTexts() {

	localizeContent();

	// Localize all texts on the page
	$("*[data-i18n]").each(function () {
		$(this).text(i18next.t($(this).attr("data-i18n")));
	});

	replacePlaceholders();

}