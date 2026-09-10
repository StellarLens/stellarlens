import { Injectable } from "@nestjs/common";
import { ThrottlerGuard } from "@nestjs/throttler";

@Injectable()
export class ApiKeyThrottlerGuard extends ThrottlerGuard {
  protected async getTracker(req: Record<string, unknown>): Promise<string> {
    const apiKey = req.apiKey as { id: number } | undefined;
    return apiKey ? `api-key:${apiKey.id}` : (req.ip as string);
  }
}
