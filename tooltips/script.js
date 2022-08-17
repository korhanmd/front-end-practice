document.onmouseup = () => {
	const selection = document.getSelection();
	console.log(selection);
	const anchorNode = selection.anchorNode;
	const focusNode = selection.focusNode;

	if (anchorNode != focusNode) {
		// Cross-paragraph selection
		return;
	}

	const selectedText = anchorNode.data.substring(selection.anchorOffset, selection.focusOffset);

	let withSelectionSpanned = anchorNode.data.substring(0, selection.anchorOffset);
	withSelectionSpanned += ("<span class='highlighted'>" + selectedText + "</span>");
	withSelectionSpanned += anchorNode.data.substring(selection.focusOffset, anchorNode.data.length);

	anchorNode.parentElement.innerHTML = withSelectionSpanned;
}