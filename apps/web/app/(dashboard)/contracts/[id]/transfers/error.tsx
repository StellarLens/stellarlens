"use client";

export default function ContractTransfersError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-bold">Transfers</h1>
      <p className="text-sm text-red-600">Couldn&apos;t load transfers: {error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
      >
        Try again
      </button>
    </div>
  );
}
