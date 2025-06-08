import { Urls } from '@/domain/models/urls.entity';

export abstract class IShortenUrlRepository {
	abstract listByUser(userId: string): Promise<any[]>
	abstract updateUrl(
		id: string,
		originalUrl: string,
		userId: string,
	): Promise<any>
	abstract deleteUrl(id: string, userId: string): Promise<void>
	abstract getByShortCode(shortCode: string): Promise<Urls>
	abstract createShortenUrl(
		urlOriginal: string,
		shortCode: string,
		idUser?: number,
	): Promise<Urls>
}
