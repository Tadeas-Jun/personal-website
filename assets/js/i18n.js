$(async function () {

	const possibleLanguages = ['cs', 'en'];

	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const urlLangParam = urlParams.get("lang");
	const urlLang = (possibleLanguages.includes(urlLangParam) ? urlLangParam : null);
	const initLang = urlLang || localStorage.getItem("lang") || 'en';

	// Init i18next
	const resources = {};
	for await (const l of possibleLanguages) {
		const response = await fetch(`/i18n/${l}.json`);
		const data = await response.json();
		const languageData = data[l];
		resources[l] = languageData;
	}

	i18next.init({
	  ns: "portfolio",
	  lng: initLang,
	  debug: false,
	  resources: resources,
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

function localizeContent() {

	// Hide pronouns and queer flag in Czech version
	$(".queer").toggleClass("d-none", i18next.language === "cs");

	// Localize links to CV in HTML
	$(".cv-link").attr("href", "/assets/pdf/tadeasjun_cv_" + i18next.language + ".pdf");

	// Localize image alt texts
	$("img[data-i18n]").each(function () {
		$(this).prop(
			'alt', i18next.t($(this).attr("data-i18n"))
		);
	});

}

function localizeTexts() {

	localizeContent();

	// Localize all texts on the page
	$("*[data-i18n]").each(function () {
		$(this).html(
			i18next.t($(this).attr("data-i18n"))
		);
	});

}