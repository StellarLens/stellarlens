import { Global, Module } from "@nestjs/common";
import { createDb } from "@stellarlens/db";

export const DATABASE = "DATABASE";

@Global()
@Module({
  providers: [
    {
      provide: DATABASE,
      useValue: createDb()
    }
  ],
  exports: [DATABASE]
})
export class DatabaseModule {}
