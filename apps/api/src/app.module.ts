import { Module } from "@nestjs/common";
import { ApiKeysModule } from "./api-keys/api-keys.module";
import { AuthModule } from "./auth/auth.module";
import { ContractsModule } from "./contracts/contracts.module";
import { DatabaseModule } from "./database/database.module";
import { EventsModule } from "./events/events.module";
import { HealthController } from "./health.controller";
import { TransfersModule } from "./transfers/transfers.module";
import { WebhooksModule } from "./webhooks/webhooks.module";

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    ApiKeysModule,
    ContractsModule,
    EventsModule,
    TransfersModule,
    WebhooksModule
  ],
  controllers: [HealthController]
})
export class AppModule {}
