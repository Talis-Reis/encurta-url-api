import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger'
import * as packageJson from '../package.json'
import { AppModule } from './app.module'
import { loadEnvironment } from './shared/infrastructure/config/env/env.loader'
import { IEnvConfig } from './shared/infrastructure/interface/env.interface'

loadEnvironment()
async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.enableCors()

	app.useGlobalPipes(
		new ValidationPipe({
			forbidUnknownValues: true,
			transform: true,
			whitelist: true,
			forbidNonWhitelisted: true,
		}),
	)

	const config = new DocumentBuilder()
		.setTitle('Encurtador de URLs')
		.setDescription(packageJson.description)
		.setContact(
			packageJson.author,
			'https://www.talis.dev',
			'talisapreis@gmail.com',
		)
		.setVersion(packageJson.version)
		.addBearerAuth()
		.build()

	const document: OpenAPIObject = SwaggerModule.createDocument(app, config)

	SwaggerModule.setup('api', app, document, {
		customSiteTitle: 'Encurtador de URLs',
	})

	const port: number = app.get(IEnvConfig).getAppPort()

	await app.listen(port ?? 3000)
}
bootstrap()
