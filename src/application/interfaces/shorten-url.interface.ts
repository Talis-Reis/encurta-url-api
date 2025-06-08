import { Urls } from '@/domain/models/urls.entity';

export abstract class IShortenUrlRepository {
	abstract listByUser(idUser: number): Promise<any[]>
	abstract updateUrl(
		id: string,
		originalUrl: string,
		userId: string,
	): Promise<any>
	abstract deleteUrl(idUrl: number, idUser: number): Promise<void>
	abstract getByShortCode(shortCode: string): Promise<Urls>
	abstract createShortenUrl(
		urlOriginal: string,
		shortCode: string,
		idUser?: number,
	): Promise<Urls>
	abstract getById(idUrl: number): Promise<Urls>
}
