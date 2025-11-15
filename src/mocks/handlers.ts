import { http, HttpResponse } from "msw";

export const handlers = [
  // Health check route
  http.get("/api/health", () => {
    return HttpResponse.json({
      status: "ok",
      message: "Backend is running",
    });
  }),

  // Example auth mock
  http.post("/api/auth/login", async ({ request }) => {
    const payload = (await request.json().catch(() => null)) as
      | { email?: string }
      | null;

    if (!payload?.email) {
      return HttpResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    return HttpResponse.json({
      token: "mock_jwt_token",
      user: {
        id: "123",
        email: payload.email,
        role: "teacher",
      },
    });
  }),

  // Example current user mock
  http.get("/api/auth/me", () => {
    return HttpResponse.json({
      id: "123",
      email: "info-smartschool@gmail.com",
      role: "teacher",
    });
  }),
];
