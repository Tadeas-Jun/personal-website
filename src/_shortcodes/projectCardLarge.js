module.exports = function projectCardLargeShortcode(project) {

	const content = project.content.replace(/(<(\/)?p>)/gi, "");

 	return `
<div class="project-column mx-md-3 my-md-3">
	<div class="project-card card my-lg-0 my-3 h-100">
	<img src="${project.data.image}" class="card-img-top pb-3" alt="${project.data.imageAlt}" data-i18n="${project.data.i18nImageAlt}" />
	<div class="card-body text-center d-flex flex-column">
		<h3 class="card-title h4"><span data-i18n="${project.data.i18nTitle}">${project.data.title}</span></h3>
		<p class="card-text text-start p-3" data-i18n="${project.data.i18nContent}">${content}</p>
		${(project.data.primaryButtonText || project.data.secondaryButtonText) ? `
			<div class="d-flex align-items-center justify-content-center mt-auto mb-2">
				${project.data.primaryButtonText ?
					`<a href="${project.data.primaryButtonLink}" class="btn btn-dark btn-md mx-2" target="_blank" rel="noreferrer" data-i18n="${project.data.i18nPrimaryButtonText}">${project.data.primaryButtonText}</a>`
				: ''}
				${project.data.secondaryButtonText ?
					`<a href="${project.data.secondaryButtonLink }" target="_blank" rel="noreferrer" class="btn btn-outline-dark btn-md mx-2"  data-i18n="${project.data.i18nSecondaryButtonText}">${ project.data.secondaryButtonText}</a>`
				: ''}
			</div>
		` : ''}
	</div>
	</div>
</div>
  	`;
};