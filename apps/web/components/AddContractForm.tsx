import { addContract } from "@/app/(dashboard)/contracts/actions";

export function AddContractForm() {
  return (
    <form action={addContract} className="max-w-sm space-y-3">
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <input
          id="address"
          name="address"
          required
          placeholder="G... or C..."
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label htmlFor="network" className="block text-sm font-medium text-gray-700">
          Network
        </label>
        <input
          id="network"
          name="network"
          required
          defaultValue="testnet"
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name <span className="text-gray-400">(optional)</span>
        </label>
        <input id="name" name="name" className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm" />
      </div>
      <button
        type="submit"
        className="rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
      >
        Register contract
      </button>
    </form>
  );
}
