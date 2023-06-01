import {DocumentBuilder} from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
        .setTitle("Nest.js google drive")
        .setVersion("1.0")
        .addTag("API")
        .build()