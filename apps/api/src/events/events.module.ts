import { Module } from "@nestjs/common";
import { ContractsModule } from "../contracts/contracts.module";
import { EventsController } from "./events.controller";
import { EventsService } from "./events.service";

@Module({
  imports: [ContractsModule],
  controllers: [EventsController],
  providers: [EventsService]
})
export class EventsModule {}
