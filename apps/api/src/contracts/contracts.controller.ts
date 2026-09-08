import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { ContractsService } from "./contracts.service";
import { CreateContractDto } from "./dto/create-contract.dto";

@Controller("contracts")
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post()
  register(@Body() dto: CreateContractDto) {
    return this.contractsService.register(dto);
  }

  @Get()
  findAll() {
    return this.contractsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.contractsService.findOne(id);
  }
}
