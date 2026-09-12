import { IsOptional, IsString } from "class-validator";

export class CreateApiKeyDto {
  @IsOptional()
  @IsString()
  name?: string;
}
