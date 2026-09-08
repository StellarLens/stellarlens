import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { contracts, type Database } from "@stellarlens/db";
import { DATABASE } from "../database/database.module";
import { CreateContractDto } from "./dto/create-contract.dto";

@Injectable()
export class ContractsService {
  constructor(@Inject(DATABASE) private readonly db: Database) {}

  async register(dto: CreateContractDto) {
    const [contract] = await this.db
      .insert(contracts)
      .values({ address: dto.address, name: dto.name ?? null, network: dto.network })
      .onConflictDoUpdate({
        target: contracts.address,
        set: { name: dto.name ?? null, network: dto.network }
      })
      .returning();
    return contract;
  }

  findAll() {
    return this.db.select().from(contracts);
  }

  async findOne(id: number) {
    const [contract] = await this.db.select().from(contracts).where(eq(contracts.id, id));
    if (!contract) {
      throw new NotFoundException(`contract ${id} not found`);
    }
    return contract;
  }
}
