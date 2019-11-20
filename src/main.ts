import { NestFactory } from '@nestjs/core';
import { CategoryModule } from './category/category.module';



async function bootstrap() {
  const app = await NestFactory.create(CategoryModule);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
