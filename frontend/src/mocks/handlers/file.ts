import { HttpResponse, http } from "msw";
import BASE_URL from "../../constants/baseURL";

export const fileHandlers = [
  http.get("defaultPoster.jpg", () => {}),
  http.get("mockPoster.jpg", () => {}),
  http.get(BASE_URL.API + "poster/:poster", async () => {
    const buffer = await fetch("mockPoster.jpg").then((response) =>
      response.arrayBuffer()
    );
    return HttpResponse.arrayBuffer(buffer, {
      headers: { "Content-Type": "image/jpeg" },
    });
  }),
  http.post(BASE_URL.API + "api/upload", () => {
    return HttpResponse.json("poster/mockPoster.jpg");
  }),
];
