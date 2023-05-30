import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  try {
    const PORT = process.env.PORT || 3030;
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(3000, () => {
      console.log(`Server has been started ~~ ${PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
}
bootstrap();
