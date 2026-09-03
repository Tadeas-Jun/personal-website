---
layout: "post.njk"
title: "Coding cross-browser extensions"
description: "Setting up an environment and workflow to publish extensions on Chrome, Firefox, Edge, and Safari with a single codebase."
date: "2023-11-23"
tags: "article"
---

Recently, I've been working on a browser extension that helps students cite online sources. This extension is currently available on Google Chrome, Mozilla Firefox, and Edge (with plans of releasing on Safari soon) -- all of these instances are built from a single codebase, with no changes required between the builds. This article shortly details what I've learned as best practices and approaches to managing an extension on multiple browsers.

There's several considerations you need to think about when building cross-browser extensions. These include compatibility, API names, and browser-specific manifest items. Thankfully, the browsers actually do most of the work for you -- as Edge and Chrome are based on Chromium, and Mozilla does their best to make Firefox compatible with a lot of Chromium features, most of the extension functionality will be handled for you. Sarafi allegedly has a tool that automatically converts a Chrome extension into a Safari one. I haven't tested this out yet, so I cannot vouch for its effectivity.

## Compatibility
There are some JavaScript functionalities that are not supported by all browsers. When coding for multiple browsers at a time, you need to find the weakest link in the chain and accomodate it. In my experience, this link is usually Firefox. Because of its careful development cycle, Firefox is fairly often the last of the main browsers to implement a new feature. Personally, I ran into this problem while trying to use an `import` statement in JS while asserting the type of JSON. Import assertions [are avaiable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#browser_compatibility) in Edge, Chrome, Safari, but not in Firefox. While developing, be on the lookout for when you use new features, and always check they are available on all browsers.

## API namespace
The WebExtension APIs, used for Firefox extensions, was specifically built in a way to be as compatible as possible with the Chrome APIs. One key difference is the namespace -- Firefox extensions use the `browser` namespace to access JavaScript APIs, while Chrome (and therefore, naturally, Edge) uses the `chrome` namespace. While working on my extension, I solved this problem in a very simple way; I created a global variable that references the appropriate namespace:

```js
// Cross-browser
const xbrowser = chrome ?? browser;
```

This essentially solves this issue, as the `xbrowser` constant now contains a reference to whichever namespace is available to the specific instance of the extension.

## Manifest
The `manifest.json` file is mandatory, and includes basic metadata for the extension. When coding for multiple browsers, you need to keep in mind a few details -- nothing too complicated, though. In general, it's recommended to use version 3 of the manifest format (defined by the `"manifest_version": 3` value). However, older versions of Firefox don't support this. Practically, I didn't run into any issues about this except the Firefox webstore reminding me that this is the case.

There's also the `"browser_specific_settings"` key to keep in mind. Here you can adjust settings for a specific browser. It's only used for Firefox an Safari, with Firefox actually requiring it with the `id` key. You can read more about this key on [its documentation page](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_specific_settings).

## Rating link
The extension I coded includes a 'Rate this extension' link, which points the user to a webstore. Of course, this brings forth a problem: where should the link point? For each user, the link should bring them to the webstore of the browser they've installed the extension for. In other words, if the user is using the extension in Edge, it should point to the Edge Add-ons store; if in Firefox, to the Firefox Browser Add-ons store, etc. Furthermore, ideally the webstore page should be displayed in the language that the extension was in.

This doesn't have a great solution; as far as I've been able to find, the only way to detect a browser in pure JS (without additional libraries like [is.js](https://is.js.org/)) is by using `navigator.userAgent`. This isn't ideal, because that property is famously unreliable. However, I have managed to code a currently (October 2023) working solution:

```js
// Cross-browser rating link
let userAgent = navigator.userAgent;

if (userAgent.match(/edg/i)) {
    // Edge

} else if (userAgent.match(/firefox|fxios/i)) {
    // Firefox

} else if (userAgent.match(/chrome|chromium|crios/i)) {
    // Chrome

} else {
    // No correct detection -- remove the rating link
    rate_us.remove();
}
```

It's important to note that Edge gets checked for before Chrome, as the `userAgent` property on Edge may include the keyword `chrome`. Therefore, if we were to check for Chrome before Edge, Edge would get registered as Chrome.

To deal with the user's language preference, I concatenate URLs to include the browser extension's locale:

```js
"https://microsoftedge.microsoft.com/addons/detail/{extension_name}/{extension_id}?hl=" + xbrowser.i18n.getUILanguage()
"https://addons.mozilla.org/" + xbrowser.i18n.getUILanguage() + "/firefox/addon/{extenson_name}/"
"https://chrome.google.com/webstore/detail/{extension_name}/{extension_id}?hl=" + xbrowser.i18n.getUILanguage()
```

This way, the user's locale gets projected into the webstore URL. In the case that the webstore page doesn't have the defined locale, it (generally) defaults to English.

## Error handling
The last subject around the codebase I'd like to discuss is error handling. There are some pages where browsers, in general, prohibit extensions to be run. A great example of these pages are the webstores themselves -- because developers shouldn't be allowed to, for example, quietly remove the 'Report abuse' button on their extensions' pages in the background, extensions are not allowed to run on extension webstores.

If you don't handle this problem, users will try to turn on your extension, it will display its HTML but the injection scripts won't run. If your extension relies on these (as most of them do), you need to catch this error and display an error message to the user, to ensure they realize what the problem is. This issue is escalated by the fact that many users will try to start your extension for the first time on the webstore where they downloaded -- thus, their first-run experience will be broken.

My approach to solve this problem was to remove all of the extensions content (excluding for the branding, but including the 'Rate this extension' link) and write out an error message explaining the problem and directing the users to a different website.

![A screenshot of the aforementioned error message.](/assets/img/blog/xext-error.png)

This, of course, isn't fully ideal -- ideally the extension would actually work when the user first opens it -- but I'd argue that this is the next best thing.

After a lot of trial and error, I've come to this function to catch the error:

```js
function testScripting() {

	xbrowser.scripting.executeScript({
		target: { tabId: activeTab.id },
		func: () => {},
	}, (result) => {

		let errorMessage = xbrowser.runtime.lastError?.message;

		if (errorMessage === "The extensions gallery cannot be scripted." || errorMessage === "Missing host permission for the tab" || !result || !result[0]) {
			// Handle the error
		} else {
			// Continue without problems
		}

	});

}
```

The conditions in the if-statement were created by me testing the various forbidden-scripting websites on all three browsers. Therefore it's probably not particularly future-proof, nor extensive, but for now it works.

## Publication process
The extension publication process is fairly straight-forward in all three browsers. There are some quirks that each store has: Chrome asks for a one-time $5 fee to open a Developer Account; Firefox's developer store UI is the least intuitive in my opinion (but it's still not bad); and Edge's Account Shenanigans™ were absolutely painful to deal with. Edge's problems are apparently only a thing for corporate accounts -- when I talked to a friend who published [their extension](https://microsoftedge.microsoft.com/addons/detail/secure-password-generator/lhiclcggihhaagciehohhjbdnnofpdao) as an individual, they said they didn't face similar problems.

## Conclusion
By paying attention to little quirks and differences between the browsers, and putting in a bit more effort in some areas, you can create a browser extension that seamlessly works across most of the browsers your users will use. In the long run, this saves you a lot of work and chaos that would be involved in maintaining multiple codebases. I would love to see the extensions you've coded, and/or hear your feedback on this article, as well as on your experience coding crossbrowser extensions; if you have anything to share, please reach out at contact@tadeasjun.com!
