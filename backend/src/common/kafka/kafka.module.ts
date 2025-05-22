import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KafkaConsumerService } from './kafka-consumer.service';
import { KafkaProducerService } from './kafka-producer.service';
import { KafkaService } from '../../config/kafka.config';
import { KafkaAdminService } from './kafka-admin.service';
import { KafkaAdminController } from './kafka.admin.controllers';

@Module({
  imports: [ConfigModule], // Required for ConfigService
  controllers: [KafkaAdminController], // Declare controllers here
  providers: [
    KafkaService, // Kafka client or configuration
    KafkaConsumerService,
    KafkaProducerService,
    KafkaAdminService,
  ],
  exports: [
    KafkaConsumerService,
    KafkaProducerService,
    KafkaAdminService,
  ], // Export services for use in other modules
})
export class KafkaModule {}