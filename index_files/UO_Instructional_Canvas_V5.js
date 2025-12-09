/*
Custom JS
Canvas Instance: Instructional
version: 5
*/

// Google Analytics 4
$.ajax({
    url: 'https://www.googletagmanager.com/gtag/js?id=G-8V7GW0TJP2',
    dataType: 'script',
    cache: true,
})

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());

gtag('config', 'G-8V7GW0TJP2');

// Inserts a button in the right-hand panel of the canvas dashboard page 
function suggestionBox() {
    // Avoid inserting multiple times. Avoids duplicate insertion of the #lmsadmin div.
    if (document.querySelector('#lmsadmin')) return;
    const message = '<div id="lmsadmin">' + 
        '<button type="button" class="element_toggler element_toggler_inst_focus_ring btn button-sidebar-wide" onclick="window.open(\'https://service.uoregon.edu/TDClient/2030/Portal/KB/ArticleDet?ID=141084\', \'_blank\')">UO Canvas Suggestions &nbsp;&nbsp;' +
		'<svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" version="1.1" width="17.8" height="17.8" viewBox="0 0 17.8 17.8">' +
  '<defs><style> ' +
  '.st0 {stroke-width: .6px;}' +
  '.st0, .st1, .st2, .st3, .st4 {stroke: #555;}' +
  '.st0, .st1, .st3, .st4 {stroke-miterlimit: 10;}' +
  '.st0, .st5 {fill: #fff;}' +
  '.st1, .st2 {stroke-linecap: round;}' +
  '.st1, .st2, .st3, .st4 {fill: none;}' +
  '.st1, .st2, .st4 {stroke-width: .9px;}' +
  '.st2 {stroke-linejoin: round;}' +
  '.st3 {stroke-width: .2px;}' +
  '</style></defs>' +
  '<rect class="st4" x=".6" y="9.4" width="15.7" height="7.8" rx=".6" ry=".6"/>' +
  '<line class="st1" x1=".6" y1="9.9" x2="3.7" y2="4.3"/>' +
  '<line class="st1" x1="16.3" y1="9.9" x2="13.1" y2="4.3"/>' +
  '<line class="st1" x1="3.8" y1="4.3" x2="13" y2="4.3"/>' +
  '<path class="st0" d="M8.6,7.3h0l2.8-5-2.9-1.7-2.9,5.2,2.7,1.6h.2Z"/>' +
  '<path class="st0" d="M8.9,7.4h.2c0,0,0,0,0,0h-.2Z"/>' +
  '<line class="st3" x1="8.8" y1="1.8" x2="10.8" y2="2.9"/>' +
  '<line class="st3" x1="8.5" y1="2.3" x2="10.5" y2="3.4"/>' +
  '<rect class="st5" x="5" y="6.3" width="7.1" height="1.6"/>' +
  '<line class="st3" x1="8.4" y1="2.9" x2="10.3" y2="3.8"/>' +
  '<line class="st3" x1="8.1" y1="3.3" x2="9.3" y2="3.9"/>' +
  '<line class="st2" x1="4.1" y1="6.7" x2="12.6" y2="6.7"/>' +
  '</svg></button></div>';
    const target = document.querySelector('div#application div#wrapper div#main div#not_right_side div#right-side-wrapper aside#right-side');
    if (target) {
        // Delay to allow DOM to settle
        setTimeout(() => {
            target.insertAdjacentHTML('beforeend', message);
        }, 100);
    }
}

//Detects mutations in right-hand panel of the canvas dashboard page. 
function waitForElm2(selector) {
    return new Promise(resolve => {
        const page_url = window.location.pathname
        if (/\/courses\/\d+/.test(page_url) === false && /\/calendar/.test(page_url) === false) {
            const targetNode = document.querySelector(selector);
            if (targetNode !== null) {
                suggestionBox();
                resolve(new Date().getTime());
            }
            else {
                const observer2 = new MutationObserver((mutations) => {
                    const node = document.querySelector(selector);
                    if (node) {
                        observer2.disconnect();
                        // Delay to allow DOM to settle
                        setTimeout(() => {
                            suggestionBox();
                            resolve(new Date().getTime());
                        }, 100);
                    }
                });
                // Start observing the target node for configured mutations
                //MutationObserver to detect when the target container is ready.Checks for a valid observer target before observing
                // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
                if (targetNode) {
                    observer2.observe(document.querySelector(selector), { childList: true, subtree: true });
                }
            }
        }
    });
}

function disable_page(url) {
    if (!ENV.current_user_roles.some(e => ['root_admin'].includes(e))) {
        if (/\/courses\/\d+\/pages\/course-information-star/.test(url)) {
            const el0 = $("div#wiki_page_show div.header-bar-outer-container");
            if (el0) {
                el0.hide();
            }
        }
    }
}

const observer = new MutationObserver(() => {  // create a new instance of `MutationObserver` named `observer`, passing it a callback function
    const redirect_url = document.location.href;
    disable_page(redirect_url);
});

// call `observe()`, passing it the element to observe, and the options object
observer.observe(document.querySelector("body"), {
    subtree: true,
    childList: true,
});


$(document).ajaxStop(function () {
	// this code affects non-canvas administrators only
    if (!ENV.current_user_roles.some(e => ['root_admin'].includes(e))) {
		//hide 'library research help' link in course menu if the course belongs to a "LAW" term
		if (/^\/courses\/\d+\/?.*$/.test(window.location.pathname)) {
			const el8 = $("body div div div div div nav ul li a#library-research-help-link");
			if (el8) {
				const term = document.getElementById("section-tabs-header-subtitle").textContent;
				if(/law/i.test(term)){
					el8.parent().hide();					
				}
			}
		}
		//hide the "course information" row on the "pages" site page
        if (/^\/courses\/\d+\/pages\/?$/.test(window.location.pathname)) {
            const el0 = $("div#not_right_side div#content-wrapper div#content div.collectionView div.index-content-container div.index-content table tbody tr td div div a[href*='course-information-star']");
            if (el0) {
                const el1 = el0.parent();
                const el2 = el1.parent();
                const el3 = el2.parent();
                const el4 = el3.parent();
                el4.hide();
            }
        }
		//hide 'course information' and 'university course policies' rows on the "settings" site page
        if (/^\/courses\/\d+\/settings?$/.test(window.location.pathname)) {
            const el5 = $("ul#nav_enabled_list li[aria-label='Course Information']");
            if (el5) {
                el5.hide();
            }
			const el6 = $("ul#nav_enabled_list li[aria-label='University Course Policies']");
            if (el6) {
                el6.hide();
            }
	    }
	}
})


$(document).ready(function () {
    //This will add a new icon in the global menu
    // Extra Menu Icon
    var styleAdded = false;
    function addMenuItem(linkText, linkhref, icon) {
        var iconHtml = '',
            itemHtml,
            linkId = linkText.split(' ').join('_'),
            iconCSS = '<style type="text/css">' +
                '   i.custom_menu_list_icon:before {' +
                '       font-size: 27px;' +
                '       width: 27px;' +
                '       line-height: 27px;' +
                '   }' +
                '   i.custom_menu_list_icon {' +
                '       width: 27px;' +
                '       height: 27px;' +
                '   }' +
                '   body.primary-nav-expanded .menu-item__text.custom-menu-item__text {' +
                '       white-space: normal;' +
                '       padding: 0 2px;' +
                '   }' +
                '</style>';
        if (icon !== '') {
            // If it is a Canvas icon 
            if (icon.indexOf('icon') === 0) {
                iconHtml = '<div class="menu-item-icon-container" role="presentation"><i class="' + icon + ' custom_menu_list_icon"></i></div>';
                // for an svg or other image 
            } else if (icon !== '') {
                iconHtml = '<div class="menu-item-icon-container" role="presentation">' + icon + '</div>';
            }
        }
        // Build item html 
        itemHtml = '<li class="ic-app-header__menu-list-item ">' +
            '   <a id="global_nav_' + linkId + '" href="' + linkhref + '" class="ic-app-header__menu-list-link" target=_blank>' + iconHtml +
            '       <div class="menu-item__text custom-menu-item__text">' + linkText + '</div>' +
            '   </a>' +
            '</li>';
        $("#menu li:last").before(itemHtml);
        // Add some custom css to the head the first time 
        if (!styleAdded) {
            $('head').append(iconCSS);
            styleAdded = true;
        }
    }

    function addMenuItem_after_first_child(linkText, linkhref, icon) {
        var iconHtml = '',
            itemHtml,
            linkId = linkText.split(' ').join('_'),
            iconCSS = '<style type="text/css">' +
                '   i.custom_menu_list_icon:before {' +
                '       font-size: 27px;' +
                '       width: 27px;' +
                '       line-height: 27px;' +
                '   }' +
                '   i.custom_menu_list_icon {' +
                '       width: 27px;' +
                '       height: 27px;' +
                '   }' +
                '   body.primary-nav-expanded .menu-item__text.custom-menu-item__text {' +
                '       white-space: normal;' +
                '       padding: 0 2px;' +
                '   }' +
                '</style>';
        if (icon !== '') {
            // If it is a Canvas icon 
            if (icon.indexOf('icon') === 0) {
                iconHtml = '<div class="menu-item-icon-container"  role="presentation"><i class="' + icon + ' custom_menu_list_icon"></i></div>';
                // for an svg or other image 
            } else if (icon !== '') {
                iconHtml = '<div class="menu-item-icon-container"  role="presentation">' + icon + '</div>';
            }
        }
        // Build item html 
        itemHtml = '<li class="ic-app-header__menu-list-item ">' +
            '   <a id="global_nav_' + linkId + '" href="' + linkhref + '" class="ic-app-header__menu-list-link" target=_blank>' + iconHtml +
            '       <div class="menu-item__text custom-menu-item__text">' + linkText +
            '</div>' +
            '   </a>' +
            '</li>';
        $("#menu li:first").after(itemHtml);
        // Add some custom css to the head the first time 
        if (!styleAdded) {
            $('head').append(iconCSS);
            styleAdded = true;
        }
    }

    function addMenuItem_before_first_child(icon) {
        var iconHtml = '',
            itemHtml,
            iconCSS = '<style type="text/css">' +
                '   i.custom_menu_list_icon:before {' +
                '       font-size: 27px;' +
                '       width: 27px;' +
                '       line-height: 27px;' +
                '   }' +
                '   i.custom_menu_list_icon {' +
                '       width: 27px;' +
                '       height: 27px;' +
                '   }' +
                '   body.primary-nav-expanded .menu-item__text.custom-menu-item__text {' +
                '       white-space: normal;' +
                '       padding: 0 2px;' +
                '   }' +
                '</style>';
        if (icon !== '') {
            // If it is a Canvas icon 
            if (icon.indexOf('icon') === 0) {
                iconHtml = '<div class="ic-app-header__logomark-container"  role="presentation">' + icon + '</div>';
                // for an svg or other image 
            } else if (icon !== '') {
                iconHtml = '<div class="ic-app-header__logomark-container"  role="presentation">' + icon + '</div>';
            }
        }

        // Build item html 
        itemHtml = '<div> ' + iconHtml +
            '<span class="screenreader-only">Instruction</span>' +
            '</div>';
        $("#menu li:first").before(itemHtml);
        // Add some custom css to the head the first time 
        if (!styleAdded) {
            $('head').append(iconCSS);
            styleAdded = true;
        }
    }
    //run addMenuItem_after_first_child
    addMenuItem_after_first_child("Switch to Community Canvas", 'https://community.uoregon.edu/', '<svg xmlns="http://www.w3.org/2000/svg" class="ic-icon-svg menu-item__icon svg-icon-help" version="1.1" x="0" y="0" viewBox="0 0 200 200" enable-background="new 0 0 200 200"  xml:space="preserve" fill="currentColor"> <polygon points=".18 69.35 53.31 113.8 53.31 24.9 .18 69.35" style="fill: #fff; stroke-width: 0px;"/>    <rect x="43.66" y="52.17" width="89.17" height="34.36" rx="6.4" ry="6.4" style="fill: #fff; stroke-width: 0px;"/>    <polygon points="199.82 130.65 146.69 86.2 146.69 175.1 199.82 130.65" style="fill: #fff; stroke-width: 0px;"/>    <rect x="67.17" y="113.47" width="89.17" height="34.36" rx="6.4" ry="6.4" style="fill: #fff; stroke-width: 0px;"/>  </svg>');

    //run addMenuItem_before_first_child (class attribute removed // image text font type is "Source Sans Pro", and bolded)
    addMenuItem_before_first_child('<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 232.06 118.84" role="img" aria-label="This is Instructional Canvas"><text transform="translate(.12 61.07)" style="fill: #fff; font-family: SourceSansPro-SemiBold, \'Source Sans Pro\'; font-size: 41.86px; font-weight: 600;"><tspan x="0" y="0">Instructional</tspan></text><text transform="translate(50.92 111.23)" style="fill: #fff; font-family: SourceSansPro-SemiBold, \'Source Sans Pro\'; font-size: 41.86px; font-weight: 600;"><tspan x="0" y="0">Canvas</tspan></text></svg>');

    //run addMenuItem to add mental health resources  (with line spacer ai file)
    addMenuItem('Mental Health Resources', 'https://studentlife.uoregon.edu/mental-health', '<svg xmlns="http://www.w3.org/2000/svg" class="ic-icon-svg menu-item__icon svg-icon-help" version="1.1" x="0" y="0" viewBox="0 0 200 200" enable-background="new 0 0 200 200" xml:space="preserve" fill="currentColor"> <path d="M40.84,189.79v-49.02S-20.35,94.49,23.97,37.61c0,0,20.06-25.54,58.09-29.98,6.04-.84,12.18-1.03,18.27-.56,21.77,2.19,68.64,13.65,71.33,71.73l21.81,31.82s1.85,9.25-8.29,11.4h-13.81l-.47,22.26s-4.15,16.95-24.88,18.92h-18.9v26.59H40.84Z" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="10"/><g id="uuid-04fe9d0a-613f-465b-9946-2bb7198211c5"><path d="M139.8,58.2c-4.24-8.94-13.1-14.61-22.8-14.58-16.65,0-23.69,16.55-23.69,16.55,0,0-6.92-16.55-23.56-16.55-9.7-.03-18.55,5.64-22.8,14.58-10.76,25.09,32.14,58.58,32.14,58.58l14.34,10.77,14.34-10.77c-.13,0,42.65-33.36,32.02-58.58Z" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="11"/></g></svg>');

    //run addMenuItem to add accessibility resources (Accessibility copy 3 ai file)
    addMenuItem('Accessibility Resources', 'https://aec.uoregon.edu/', '<svg xmlns="http://www.w3.org/2000/svg" class="ic-icon-svg menu-item__icon svg-icon-help" version="1.1" x="0" y="0" viewBox="0 0 200 200" enable-background="new 0 0 200 200" xml:space="preserve" fill="currentColor"> <path d="M98.1,5.5C46.91,5.5,5.5,46.91,5.5,98s41.41,92.6,92.5,92.6,92.6-41.41,92.6-92.5h0c0-51.19-41.41-92.6-92.5-92.6Zm-1.4,18.46c6.59,0,11.97,5.29,11.97,11.97s-5.29,11.97-11.97,11.97-11.97-5.29-11.97-11.97v-.1c0-6.59,5.29-11.87,11.77-11.97q.1,0,.2,.1h0Zm51.89,38.62l-35.62,4.49v35.62l17.26,57.58c.9,3.59-1.3,7.18-4.79,8.08h0c-3.49,1-7.18-1.1-8.08-4.59v-.2l-17.66-52.39h-5.49l-16.36,53.58c-1.4,3.39-5.29,5.09-8.68,3.69h0c-3.49-1.3-5.59-5.29-4.19-8.78l14.97-56.58v-36.22l-32.83-4.49c-3.29-.3-5.69-3.19-5.39-6.49v-.1c.3-3.39,3.29-5.89,6.69-5.69l39.81,3.39h17.46l42.41-3.49c3.39-.1,6.19,2.49,6.39,5.89h0c.2,3.49-2.49,6.39-5.89,6.69h0Z" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="11"/></g></svg>');
});

document.addEventListener("DOMContentLoaded", function () {
  let pageTitle = document.title;
  document.title = pageTitle + " [Instructional]"
});

window.addEventListener('load', (event) => {
    waitForElm2('aside#right-side').then((elm) => {
        console.log(`%c${elm}`, 'color: red;');
    });
});


//Show App Config for Admins
if (ENV.current_user_roles.indexOf('admin') > 0) {
    $('aside#right-side a.reset_course_content_button').show();
}

// Start Pope Tech Accessibility Guide
var popeTechKey = '2mfaQtxZjkfqG8i4xXtHGPwrRHzoCUnV'; (function (a) { function b(a, b) { var c = document.createElement("script"); c.type = "text/javascript", c.readyState ? c.onreadystatechange = function () { ("loaded" === c.readyState || "complete" === c.readyState) && (c.onreadystatechange = null, b()) } : c.onload = function () { b() }, c.src = a, document.getElementsByTagName("head")[0].appendChild(c) } function c(a) { return a && ("TeacherEnrollment" === a || "TaEnrollment" === a || "DesignerEnrollment" === a) } function d() { var a = window.location.pathname; return !!(-1 !== a.indexOf("/edit") || -1 !== a.indexOf("/new") || -1 !== a.indexOf("/syllabus") || a.match(/\/courses\/[0-9]+\/pages\/?$/) || a.match(/\/courses\/[0-9]+\/?$/)) } function e() { return f() || g() } function f() { var a = /\/courses\/[0-9]+\/pages\/?$/, b = window.location.pathname; return console.log("Check for pages url", window.location.pathname), console.log(a.test(b)), a.test(b) } function g() { var a = window.location.pathname; return console.log("Check for courses url", window.location.pathname), console.log("/courses" === a), "/courses" === a } function h() { var a = /\/accounts\/[0-9]+\/external_tools\/[0-9]+\/?$/, b = /\/courses\/[0-9]+\/external_tools\/[0-9]+\/?$/, c = window.location.pathname; return console.log("Check for external tool url", window.location.pathname), console.log(a.test(c) || b.test(c)), a.test(c) || b.test(c) } function i(f) { for (var g = 0; g < f.length; ++g)if (localStorage.setItem(`${j}.${l}`, JSON.stringify(f)), c(f[g].type)) { if (d() && b("https://canvas-cdn.pope.tech/loader.min.js", function () { }), null === a) break; (e() || h()) && (console.log("Load column"), b(`https://canvas-cdn.pope.tech/accessibility-column.min.js?key=${a}`, function () { })); break } } var j = "pt-instructor-guide", k = "username", l = "enrollments"; return -1 === window.location.href.indexOf("/login/canvas") ? -1 === window.location.href.indexOf("?login_success=1") ? void function (a, b) { var c = localStorage.getItem(`${a}.${b}`); null === c ? $.get("/api/v1/users/self/enrollments?type[]=DesignerEnrollment&type[]=TaEnrollment&type[]=TeacherEnrollment", function (a) { i(a) }) : (c = JSON.parse(c), i(c)) }("pt-instructor-guide", l) : (localStorage.removeItem(`${"pt-instructor-guide"}.${k}`), void $.get("/api/v1/users/self", function (a) { localStorage.setItem(`${"pt-instructor-guide"}.${k}`, a.name) })) : (localStorage.removeItem(`${"pt-instructor-guide"}.${k}`), localStorage.removeItem(`${"pt-instructor-guide"}.${"uuid"}`), localStorage.removeItem(`${"pt-instructor-guide"}.${"settings"}`), void localStorage.removeItem(`${"pt-instructor-guide"}.${l}`)) })(popeTechKey);
// End Pope Tech Accessibility Guide

// Pope Tech Alternative Formats
(function (a) { (function () { var a = window.location.pathname; return !!(a.match(/\/courses\/[0-9]+\/(files|pages|assignments|quizzes|modules|discussion_topics)$/) || a.match(/\/courses\/[0-9]+\/(files|pages|assignments|quizzes|modules)\/[a-zA-Z0-9_?=\-&]+$/)) })() && function (a, b) { var c = document.createElement("script"); c.type = "text/javascript", c.readyState ? c.onreadystatechange = function () { ("loaded" === c.readyState || "complete" === c.readyState) && (c.onreadystatechange = null, b()) } : c.onload = function () { b() }, c.src = a, document.getElementsByTagName("head")[0].appendChild(c) }(`https://canvas-cdn.pope.tech/alternative-formats-loader.min.js?key=${a}`, function () { }) })(popeTechKey);
// End Pope Tech Alternative Formats