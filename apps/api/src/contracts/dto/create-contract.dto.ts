import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateContractDto {
  @IsString()
  @IsNotEmpty()
  address!: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsString()
  @IsNotEmpty()
  network!: string;
}
