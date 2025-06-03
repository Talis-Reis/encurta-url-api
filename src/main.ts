import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as packageJson from '../package.json'
import { AppModule } from './app.module'

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

	const document = SwaggerModule.createDocument(app, config)

	SwaggerModule.setup('api', app, document, {
		customSiteTitle: 'Encurtador de URLs',
	})

	await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
