import { Module } from "@nestjs/common";
import { ContractsModule } from "../contracts/contracts.module";
import { TransfersController } from "./transfers.controller";
import { TransfersService } from "./transfers.service";

@Module({
  imports: [ContractsModule],
  controllers: [TransfersController],
  providers: [TransfersService]
})
export class TransfersModule {}
