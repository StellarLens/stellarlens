import { AddContractForm } from "../../components/AddContractForm";
import { listContracts } from "../../lib/api";

export default async function ContractsPage() {
  const contracts = await listContracts();

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold">Contracts</h1>
        <p className="mt-1 text-sm text-gray-500">Registered Soroban contracts being indexed.</p>
      </div>

      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-gray-500">
            <th className="py-2 font-medium">Address</th>
            <th className="py-2 font-medium">Name</th>
            <th className="py-2 font-medium">Network</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((contract) => (
            <tr key={contract.id} className="border-b border-gray-100">
              <td className="py-2 font-mono text-xs">{contract.address}</td>
              <td className="py-2">{contract.name ?? "—"}</td>
              <td className="py-2">{contract.network}</td>
            </tr>
          ))}
          {contracts.length === 0 && (
            <tr>
              <td colSpan={3} className="py-4 text-gray-400">
                No contracts registered yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div>
        <h2 className="mb-3 text-lg font-semibold">Add contract</h2>
        <AddContractForm />
      </div>
    </div>
  );
}
