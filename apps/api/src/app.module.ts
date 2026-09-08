import { Module } from "@nestjs/common";
import { ContractsModule } from "./contracts/contracts.module";
import { DatabaseModule } from "./database/database.module";
import { HealthController } from "./health.controller";

@Module({
  imports: [DatabaseModule, ContractsModule],
  controllers: [HealthController]
})
export class AppModule {}
