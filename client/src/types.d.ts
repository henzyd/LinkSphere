interface ApiErrorResponse {
  status: number;
  data: {
    message: string;
    validationErrors?: Record<"field" | "message", string>[];
  };
}
