// Unit Tests

function runTests() {
	firstNameTest();
	emailTest();
}

runTests();

function runner({inputs, expectedOutputs, func}) {
	let results = "";
	for (let i = 0; i < inputs.length; i++) {
		const passFailString = func(inputs[i]) === expectedOutputs[i] ?
			'Pass' :
			'<span style="color: red">Fail</span>';

		const result =  `${func.name}(${inputs[i]}) === ${expectedOutputs[i]}: ${passFailString}`;
		results += (result + "<br>");
	}

	const resultsElement = document.getElementsByClassName('results')[0];
	resultsElement.innerHTML += (results + "<br>");
}

function firstNameTest() {
	const invalidInputs = ["@", "", "blah$", "123"];
	const validInputs = ["asdf", "Alfred", "ALFRED"];

	runner({
		inputs: validInputs,
		expectedOutputs: validInputs.map(_ => true),
		func: validateName
	});

	runner({
		inputs: invalidInputs,
		expectedOutputs: invalidInputs.map(_ => false),
		func: validateName
	});
}

function emailTest() {
	const invalidEmails = ["@asdf.com", "what@what", "", ".."];
	const validEmails = ["asdf@asdf.com", "what@what.au", "a@a.c"];

	runner({
		inputs: validEmails,
		expectedOutputs: validEmails.map(_ => true),
		func: validateEmail
	});

	runner({
		inputs: invalidEmails,
		expectedOutputs: invalidEmails.map(_ => false),
		func: validateEmail
	});
}