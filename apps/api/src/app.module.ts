import { Module } from "@nestjs/common";
import { ContractsModule } from "./contracts/contracts.module";
import { DatabaseModule } from "./database/database.module";
import { EventsModule } from "./events/events.module";
import { HealthController } from "./health.controller";
import { TransfersModule } from "./transfers/transfers.module";

@Module({
  imports: [DatabaseModule, ContractsModule, EventsModule, TransfersModule],
  controllers: [HealthController]
})
export class AppModule {}
