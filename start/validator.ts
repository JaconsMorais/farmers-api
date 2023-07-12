import { validator } from '@ioc:Adonis/Core/Validator'

/** Validate CPF and CNPJ */
validator.rule('validDocument', (value, _, options) => {
	const documentRegex = /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/ //Check for CPF and CNPJ at the same time
	const extractNumbers = `${value || ''}`.replace(/\D/g, '')

	if (!documentRegex.test(value)) {
		options.errorReporter.report(
			options.pointer,
			'validDocument',
			'The documentId is not a valid CPF or CNPJ',
			options.arrayExpressionPointer
		)

		return
	}

	if (extractNumbers.length === 11 && !validateCPF(extractNumbers)) {
		console.log('not valid cpf')
		options.errorReporter.report(
			options.pointer,
			'validDocument',
			'The documentId is not a valid CPF or CNPJ',
			options.arrayExpressionPointer
		)

		return
	}

	if ((extractNumbers.length === 14) && !validateCNPJ(extractNumbers)) {
		console.log('not valid cnpj')
		options.errorReporter.report(
			options.pointer,
			'validDocument',
			'The documentId is not a valid CPF or CNPJ',
			options.arrayExpressionPointer
		)
	}
})

/** Validate brazillian states */
validator.rule('validState', (value, _, options) => {
	const brazilStates = [
		'AC',
		'AL',
		'AP',
		'AM',
		'BA',
		'CE',
		'DF',
		'ES',
		'GO',
		'MA',
		'MT',
		'MS',
		'MG',
		'PA',
		'PB',
		'PR',
		'PE',
		'PI',
		'RJ',
		'RN',
		'RS',
		'RO',
		'RR',
		'SC',
		'SP',
		'SE',
		'TO'
	]

	if (typeof value !== 'string') {
		return
	}

	if (!brazilStates.includes(value)) {
		options.errorReporter.report(
			options.pointer,
			'validStates',
			'The state is not a valid Brazillian state',
			options.arrayExpressionPointer
		)
	}
})

const validateCPF = (cpf: string) => {

	let sum = 0
	let rest: number

	for (let i = 1; i <= 9; i++)
		sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i)
	rest = (sum * 10) % 11

	if (rest >= 10) rest = 0

	if (rest !== parseInt(cpf.substring(9, 10))) return false

	sum = 0
	for (let i = 1; i <= 10; i++)
		sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i)
	rest = (sum * 10) % 11

	if (rest >= 10) rest = 0

	if (rest !== parseInt(cpf.substring(10, 11))) return false

	return true
}

const validateCNPJ = (cnpj: string) => {

	if (cnpj.length !== 14) return false

	let size = cnpj.length - 2
	let numbers = cnpj.substring(0, size)
	const digits = cnpj.substring(size)
	let sum = 0
	let pos = size - 7

	for (let i = size; i >= 1; i--) {
		sum += parseInt(numbers.charAt(size - i)) * pos--
		if (pos < 2) pos = 9
	}

	let result = sum % 11 < 2 ? 0 : 11 - (sum % 11)

	if (result !== parseInt(digits.charAt(0))) return false

	size = size + 1
	numbers = cnpj.substring(0, size)
	sum = 0
	pos = size - 7

	for (let i = size; i >= 1; i--) {
		sum += parseInt(numbers.charAt(size - i)) * pos--
		if (pos < 2) pos = 9
	}

	result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
	if (result !== parseInt(digits.charAt(1))) return false

	return true
}

