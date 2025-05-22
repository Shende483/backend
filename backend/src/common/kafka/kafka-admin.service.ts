import { Injectable, OnModuleInit, Logger, Inject } from '@nestjs/common';
import { Kafka, Admin } from 'kafkajs';

@Injectable()
export class KafkaAdminService implements OnModuleInit {
  private readonly logger = new Logger(KafkaAdminService.name);
  private admin: Admin;

  constructor(@Inject('KAFKA_CLIENT') private readonly kafka: Kafka) {
    this.admin = this.kafka.admin();
  }

  async onModuleInit() {
    try {
      await this.admin.connect();
      this.logger.log('Kafka admin client connected');
      
      // Create trading-data topic if it doesn't exist
      await this.createTopic({
        topic: 'trading-data',
        numPartitions: 6,
        replicationFactor: 3,
      });
    } catch (error) {
      this.logger.error('Kafka admin initialization failed:', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.admin.disconnect();
    this.logger.log('Kafka admin client disconnected');
  }

  async createTopic(config: {
    topic: string;
    numPartitions: number;
    replicationFactor: number;
    configEntries?: { name: string; value: string }[];
  }): Promise<void> {
    try {
      // Check if topic already exists
      const topics = await this.admin.listTopics();
      if (topics.includes(config.topic)) {
        this.logger.warn(`Topic ${config.topic} already exists`);
        return;
      }

      await this.admin.createTopics({
        topics: [{
          topic: config.topic,
          numPartitions: config.numPartitions,
          replicationFactor: config.replicationFactor,
          configEntries: config.configEntries || [],
        }],
        waitForLeaders: true,
      });
      this.logger.log(`Topic ${config.topic} created with ${config.numPartitions} partitions and replication factor ${config.replicationFactor}`);
    } catch (error) {
      this.logger.error(`Failed to create topic ${config.topic}:`, error);
      throw error;
    }
  }

  async increasePartitions(topic: string, numPartitions: number): Promise<void> {
    try {
      await this.admin.createPartitions({
        topicPartitions: [{
          topic,
          count: numPartitions,
        }],
      });
      this.logger.log(`Increased partitions for topic ${topic} to ${numPartitions}`);
    } catch (error) {
      this.logger.error(`Failed to increase partitions for topic ${topic}:`, error);
      throw error;
    }
  }

  async listTopics(): Promise<string[]> {
    try {
      const topics = await this.admin.listTopics();
      this.logger.log(`Retrieved topic list: ${topics.join(', ')}`);
      return topics;
    } catch (error) {
      this.logger.error('Failed to list topics:', error);
      throw error;
    }
  }

  async describeTopic(topic: string): Promise<any> {
    try {
      const metadata = await this.admin.fetchTopicMetadata({ topics: [topic] });
      const topicData = metadata.topics.find(t => t.name === topic);
      if (!topicData) {
        throw new Error(`Topic ${topic} not found`);
      }
      this.logger.log(`Described topic ${topic}: ${JSON.stringify(topicData)}`);
      return topicData;
    } catch (error) {
      this.logger.error(`Failed to describe topic ${topic}:`, error);
      throw error;
    }
  }
}