import type { ContractStats } from "@/lib/api";

export function StatsCards({ stats }: { stats: ContractStats }) {
  const cards = [
    { label: "Transfers", value: stats.transferCount.toLocaleString() },
    { label: "Unique senders", value: stats.uniqueSenders.toLocaleString() },
    { label: "Unique receivers", value: stats.uniqueReceivers.toLocaleString() }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <div key={card.label} className="rounded border border-gray-200 p-4">
            <div className="text-xs font-medium uppercase tracking-wide text-gray-500">{card.label}</div>
            <div className="mt-1 text-2xl font-bold">{card.value}</div>
          </div>
        ))}
      </div>

      <div className="rounded border border-gray-200 p-4">
        <div className="text-xs font-medium uppercase tracking-wide text-gray-500">Volume by asset</div>
        {stats.volumeByAsset.length === 0 ? (
          <p className="mt-2 text-sm text-gray-400">No transfer volume yet.</p>
        ) : (
          <ul className="mt-2 space-y-1 text-sm">
            {stats.volumeByAsset.map((entry) => (
              <li key={entry.asset} className="flex justify-between font-mono text-xs">
                <span className="truncate pr-4">{entry.asset}</span>
                <span>{entry.volume}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
