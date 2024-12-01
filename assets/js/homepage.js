$(async function() {

	const searchParams = new URLSearchParams(window.location.search);

	let projectFilter = {
		wb: searchParams.has('projects-wb'),
		wr: searchParams.has('projects-wr'),
		cd: searchParams.has('projects-cd'),
	};

	for (type of Object.keys(projectFilter)) {
		$("#btncheck_" + type).prop('checked', projectFilter[type]);
	}
	filterProjects(projectFilter);

	$("#filter-btns").on('click', function() {
		filterProjects(projectFilter);
	});

	$("#showProjects").click(function() {
		toggleProjects();
	});

	toggleProjects();

});

function filterProjects(filter) {

	let allOff = true;
	for (type of Object.keys(filter)) {
		filter[type] = $("#btncheck_" + type).is(":checked");
		if (filter[type]) {
			allOff = false;
		}
	}

	for (type of Object.keys(filter)) {
		$(`*[data-project="${type}"]`).toggle(filter[type] || allOff);
	}

	// Show all projects if any filter is applied
	let allOn = Object.values(filter).every(Boolean);
	if (!allOff && !allOn) {
		$(`#showProjects`).toggle(false);
		$(`.project-column[data-showmore]`).toggleClass('d-none', false);
	} else {
		$(`#showProjects`).toggle(true);
		$(`.project-column[data-showmore]`).toggleClass('d-none', projectsHidden);
	}

}

projectsHidden = false;
function toggleProjects() {

	projectsHidden = !projectsHidden;
	$(`.project-column[data-showmore]`).toggleClass('d-none', projectsHidden);

	showProjectsText();

}

function showProjectsText() {
	$(`#showProjects`).text(projectsHidden ? i18next.t("home.projects.extra.more") : i18next.t("home.projects.extra.less"));
}
