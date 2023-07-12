declare module '@ioc:Adonis/Core/Validator' {
	interface Rules {
		validDocument(): Rule,
		validState(): Rule
	}
}