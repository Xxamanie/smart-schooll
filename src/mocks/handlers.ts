import { http, HttpResponse } from "msw";

interface LoginPayload {
  email?: string;
}

interface AuthPayload {
  type?: "teacher" | "student" | "parent";
}

interface BroadcastMessagePayload {
  message?: string;
}

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
    const payload = (await request.json()) as LoginPayload;

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

  // Bootstrap endpoint
  http.get("/api/bootstrap", () =>
    HttpResponse.json({
      status: "ok",
      message: "Mock API working",
      currentUser: null,
      currentStudent: null,
      currentParent: null,
      schools: [],
      messages: [],
      resources: [],
      events: [],
      exams: [],
      announcements: [],
      broadcastMessage: null,
      chatHistory: [],
    })
  ),

  // Alternative auth endpoint
  http.post("/api/auth", async ({ request }) => {
    const body = (await request.json()) as AuthPayload;
    if (body?.type === "teacher") {
      return HttpResponse.json({ user: { id: "T-1", name: "Demo Teacher" }, staff: [] });
    }
    if (body?.type === "student") {
      return HttpResponse.json({ user: { id: "S-1", name: "Demo Student" } });
    }
    if (body?.type === "parent") {
      return HttpResponse.json({ user: { id: "P-1", name: "Demo Parent" } });
    }
    return new HttpResponse("Bad Request", { status: 400 });
  }),

  // Broadcast message endpoints
  http.post("/api/actions/broadcast-message", async ({ request }) => {
    const { message } = (await request.json()) as BroadcastMessagePayload;
    return HttpResponse.json({ message });
  }),
  http.delete("/api/actions/broadcast-message", () =>
    HttpResponse.json({ ok: true })
  ),
];
