export interface AuthState {
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  message: string | null;
}
