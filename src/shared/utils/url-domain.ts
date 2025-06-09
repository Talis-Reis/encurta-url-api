export default function getUrlDomain(
	domain: string,
	port: number,
	shortCode: string,
): string {
	return `${domain}:${port}/api/v1/${shortCode}`
}
