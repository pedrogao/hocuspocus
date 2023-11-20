import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { protobufPackage } from '@coblocks/proto';
import { polyfill } from '@coblocks/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const protoPath = [join(__dirname, 'pb/project.proto')];
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: [protobufPackage],
      protoPath: protoPath,
    },
  });

  await app.listen();
}

polyfill();
bootstrap();
