import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { FindTransfersQueryDto } from "./dto/find-transfers-query.dto";
import { StatsQueryDto } from "./dto/stats-query.dto";
import { TransfersService } from "./transfers.service";

@Controller("contracts/:contractId")
export class TransfersController {
  constructor(private readonly transfersService: TransfersService) {}

  @Get("transfers")
  findByContract(@Param("contractId", ParseIntPipe) contractId: number, @Query() query: FindTransfersQueryDto) {
    return this.transfersService.findByContract(contractId, query);
  }

  @Get("stats")
  getStats(@Param("contractId", ParseIntPipe) contractId: number, @Query() query: StatsQueryDto) {
    return this.transfersService.getStats(contractId, query);
  }
}
