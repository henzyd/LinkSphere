export function isApiErrorResponse(error: unknown): error is ApiErrorResponse {
  return (
    typeof error === "object" &&
    error != null &&
    "message" in (error as ApiErrorResponse).data &&
    ("validationErrors" in (error as ApiErrorResponse).data || true)
  );
}
