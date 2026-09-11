import { notFound } from "next/navigation";
import { EventsTable } from "@/components/EventsTable";
import { StatsCards } from "@/components/StatsCards";
import { ApiNotFoundError, getContract, getContractStats } from "@/lib/api";

export default async function ContractDetailPage({ params }: { params: { id: string } }) {
  const contractId = Number(params.id);
  if (!Number.isInteger(contractId)) {
    notFound();
  }

  let contract;
  let stats;
  try {
    [contract, stats] = await Promise.all([getContract(contractId), getContractStats(contractId)]);
  } catch (err) {
    if (err instanceof ApiNotFoundError) {
      notFound();
    }
    throw err;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">{contract.name ?? contract.address}</h1>
        <p className="mt-1 font-mono text-xs text-gray-500">{contract.address}</p>
        <p className="text-sm text-gray-500">{contract.network}</p>
      </div>

      <StatsCards stats={stats} />

      <div>
        <h2 className="mb-3 text-lg font-semibold">Events</h2>
        <EventsTable contractId={contractId} />
      </div>
    </div>
  );
}
