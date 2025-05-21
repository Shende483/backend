import { ConfigModule } from '@nestjs/config';
import { DatabaseConfig } from './config/database.config';
import { KafkaModule } from './common/kafka/kafka.module';
import { LoginModule } from './modules/auth/loginAuth/login.module';
import { RegisterModule } from './modules/auth/registerAuth/register.module';
import { ForgetPasswordModule } from './modules/auth/forgetPasswordAuth/forgetPassword.Module';
import { SubscriptionDetailsModule } from './modules/SubcriptionDetails/subcription.module';
import { recordPaymnetModule } from './modules/recordPayment/payment.module';
import { UpdateUserInfoModule } from './modules/auth/updateUserInfoAuth/UserUpdateInfo.module';
import { AdminPlanModule } from './modules/adminModules/planManage/plan.module';
import { AdminMarketTypeModule } from './modules/adminModules/MarketType/marketType.module';
import { AdminBrokersModule } from './modules/adminModules/BrokerManagment/broker.module';
import { UserExitAccountModule } from './modules/UserTradingExist/userTrading.module';
import { TradingRulesModule } from './modules/adminModules/TradingRulesManagment/tradingRules.modules';
import { BrokerAccountModule } from './modules/BrokerAccountManagement/brokerAccount.module';
import { Module } from '@nestjs/common';
import { AdminOrderPlacementModule } from './modules/orderPlacement/orderPlacement.module';
import { UserAccountDetailModule } from './modules/adminModules/UserAccountDetail/userAccountDetail.module';
import { OrderSubmitModule } from './modules/orderPlacing/orderSubmit/orderSubmit.module';
import { BrokersModule } from './modules/orderPlacing/BrokerIntegration/brokers.module';
import { RedisModule } from './common/redis.module';


@Module({
  imports: [

    ConfigModule.forRoot({
      envFilePath: '.env', // Explicitly specify .env
      isGlobal: true, // Make ConfigModule global
    }),

    DatabaseConfig,
    RedisModule, //
    KafkaModule,
    LoginModule,
    RegisterModule,
    ForgetPasswordModule,
    SubscriptionDetailsModule,
    recordPaymnetModule,
    UpdateUserInfoModule,
    AdminPlanModule,
    AdminMarketTypeModule,
    AdminBrokersModule,
    TradingRulesModule,
    BrokerAccountModule,
    AdminOrderPlacementModule,
    UserAccountDetailModule,
    UserExitAccountModule,
    OrderSubmitModule,
    BrokersModule,
  
  ]
})
export class AppModule {}

