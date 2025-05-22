import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, logLevel } from 'kafkajs';

@Injectable()
export class KafkaService {
  static provide = 'KAFKA_CLIENT';

  static async useFactory(configService: ConfigService) {
    const brokers = configService.get<string>('KAFKA_BROKERS');
    const username = configService.get<string>('KAFKA_API_KEY');
    const password = configService.get<string>('KAFKA_API_SECRET');

    // Validate environment variables
    if (!brokers || !username || !password) {
      throw new Error(
        'Missing Kafka configuration: KAFKA_BROKERS, KAFKA_API_KEY, or KAFKA_API_SECRET',
      );
    }

    const kafka = new Kafka({
      clientId: 'trading-terminal',
      brokers: [brokers],
      ssl: true,
      sasl: {
        mechanism: 'plain',
        username,
        password,
      },
      logLevel: logLevel.ERROR, // Only log errors to minimize console output
      retry: {
        retries: 0, // Disable retries to prevent multiple attempts
      },
    });

    // Test connection by creating a producer and connecting
    const producer = kafka.producer();
    try {
      await producer.connect();
      console.log('✅ Successfully connected to Kafka');
    } catch (error) {
      console.error('❌ Failed to connect to Kafka:', error.message);
      throw error;
    }

    return kafka; // Return the Kafka client for use in services
  }

  static inject = [ConfigService];
}