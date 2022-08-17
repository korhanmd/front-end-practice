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

	const rangeRect = selection.getRangeAt(0).getClientRects()[0];

	const dot = document.createElement("div");
	dot.style.width = "5px";
	dot.style.height = "5px";
	dot.style.background = "red";
	dot.style.position = "absolute";
	// Middle
	dot.style.left = `${rangeRect.x + (rangeRect.width/2)}px`;
	dot.style.top = `${rangeRect.y}px`;
	document.body.appendChild(dot);
}