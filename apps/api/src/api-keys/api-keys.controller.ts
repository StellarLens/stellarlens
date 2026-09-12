import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post } from "@nestjs/common";
import { ApiKeysService } from "./api-keys.service";
import { CreateApiKeyDto } from "./dto/create-api-key.dto";

@Controller("api-keys")
export class ApiKeysController {
  constructor(private readonly apiKeysService: ApiKeysService) {}

  @Post()
  generate(@Body() dto: CreateApiKeyDto) {
    return this.apiKeysService.generate(dto);
  }

  @Get()
  findAll() {
    return this.apiKeysService.findAll();
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  revoke(@Param("id", ParseIntPipe) id: number) {
    return this.apiKeysService.revoke(id);
  }
}
