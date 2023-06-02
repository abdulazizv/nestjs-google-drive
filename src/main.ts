import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './shared/utils/options/swagger.options';
import loggerMiddleware from './shared/utils/options/logger';
async function bootstrap() {
  try {
    const PORT = process.env.PORT || 3030;
    const app = await NestFactory.create(AppModule,{
      logger:['error','warn']
    });
    
    app.enableCors();

    const swaggerDocument = SwaggerModule.createDocument(app,swaggerConfig);
    SwaggerModule.setup('api/docs',app,swaggerDocument)
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true
    }));
    
    app.use(loggerMiddleware)

    await app.listen(PORT, () => {
      console.log(`Server has been started ~~ ${PORT}`);
    });

  } catch (e) {
    console.error(e);
  }
}
bootstrap();
