const API_URL = process.env.API_URL ?? "http://localhost:3000";
const API_KEY = process.env.API_KEY ?? "";

export interface Contract {
  id: number;
  address: string;
  name: string | null;
  network: string;
}

export interface CreateContractInput {
  address: string;
  network: string;
  name?: string;
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "x-api-key": API_KEY,
      "Content-Type": "application/json",
      ...init?.headers
    },
    cache: "no-store"
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`api request to ${path} failed with ${response.status}: ${body}`);
  }

  return response.json() as Promise<T>;
}

export function listContracts(): Promise<Contract[]> {
  return apiFetch<Contract[]>("/contracts");
}

export function createContract(input: CreateContractInput): Promise<Contract> {
  return apiFetch<Contract>("/contracts", {
    method: "POST",
    body: JSON.stringify(input)
  });
}
