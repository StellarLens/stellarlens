import { IsUrl } from "class-validator";

export class CreateWebhookDto {
  @IsUrl({ require_tld: false })
  url!: string;
}
