import { Module } from "@nestjs/common";
import { ContractsModule } from "./contracts/contracts.module";
import { DatabaseModule } from "./database/database.module";
import { EventsModule } from "./events/events.module";
import { HealthController } from "./health.controller";

@Module({
  imports: [DatabaseModule, ContractsModule, EventsModule],
  controllers: [HealthController]
})
export class AppModule {}
