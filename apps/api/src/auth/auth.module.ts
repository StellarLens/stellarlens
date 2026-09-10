import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerModule } from "@nestjs/throttler";
import { ApiKeyThrottlerGuard } from "./guards/api-key-throttler.guard";
import { ApiKeyGuard } from "./guards/api-key.guard";

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100
      }
    ])
  ],
  providers: [
    { provide: APP_GUARD, useClass: ApiKeyGuard },
    { provide: APP_GUARD, useClass: ApiKeyThrottlerGuard }
  ]
})
export class AuthModule {}
