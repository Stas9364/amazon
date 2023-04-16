export const generateSlug = (str: string): string =>
	str
		.replace(/[A-ZА-Я]+/gm, match => match.toLowerCase())
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)+/g, '');
