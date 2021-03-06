'use strict';
/* global document, window, $, require,  */

$(window).on('action:composer.enhanced', function (evt, data) {
	require([
		'composer/formatting',
		'composer/controls',
	], function (formatting, controls) {
		if (formatting && controls) {
			formatting.addButtonDispatch('spoiler', function (textarea, selectionStart, selectionEnd) {
				if (selectionStart === selectionEnd) {
					const block = controls.getBlockData(textarea, '[/s]', selectionStart);
					if (block.in && block.atEnd) {
						controls.updateTextareaSelection(textarea, selectionStart + 6, selectionStart + 6);
					} else {
						controls.insertIntoTextarea(textarea, '[s=]\n \n[/s]');
						controls.updateTextareaSelection(textarea, selectionStart + 6, selectionStart + 6);
					}
				} else {
					const wrapDelta = controls.wrapSelectionInTextareaWith(textarea, '[s=]\n', '\n[/s]');
					controls.updateTextareaSelection(textarea, selectionStart + 6 + wrapDelta[0], selectionEnd + 6 - wrapDelta[1]);
				}
			});
		}
	});
	$('[component="composer"]').on("click", '.spoiler-control', function () {
		const content = $(this).parent('.spoiler-wrapper').children('.spoiler-content');
		content.slideToggle(90);
	});
});
$(window).on('action:topic.loading', function (e) {
	$('[component="topic"]').on("click", '.spoiler-control', function () {
		const content = $(this).parent('.spoiler-wrapper').children('.spoiler-content');
		content.slideToggle(90);
	});
});
