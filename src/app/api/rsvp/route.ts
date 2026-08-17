import { isInvitationAccessClosed } from "@/features/invitation/config/event";
import { saveRsvp } from "@/features/invitation/data/invitations";
import type { AttendanceValue } from "@/features/invitation/types";

const MAX_MESSAGE_LENGTH = 500;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

type RsvpPayload = {
  slug: string;
  attendance: AttendanceValue;
  message: string;
};

const jsonError = (message: string, status: number) =>
  Response.json({ success: false, message }, { status });

function parseRsvpPayload(value: unknown): RsvpPayload | null {
  if (!value || typeof value !== "object") return null;

  const payload = value as Record<string, unknown>;
  const slug = typeof payload.slug === "string" ? payload.slug.trim() : "";
  const attendance = payload.attendance;
  const message =
    typeof payload.message === "string" ? payload.message.trim() : "";

  if (
    !slug ||
    slug.length > 180 ||
    !SLUG_PATTERN.test(slug) ||
    (attendance !== "hadir" && attendance !== "tidak-hadir") ||
    message.length > MAX_MESSAGE_LENGTH
  ) {
    return null;
  }

  return { slug, attendance, message };
}

export async function POST(request: Request) {
  if (isInvitationAccessClosed()) {
    return jsonError(
      "RSVPs are now closed because the celebration has ended.",
      410,
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 10_000) {
    return jsonError("The response data is too large.", 413);
  }

  let rawPayload: unknown;
  try {
    rawPayload = await request.json();
  } catch {
    return jsonError("The response data format is invalid.", 400);
  }

  const payload = parseRsvpPayload(rawPayload);
  if (!payload) {
    return jsonError(
      "Select a valid attendance response and keep your message within 500 characters.",
      400,
    );
  }

  try {
    const result = await saveRsvp(payload);

    if (result === "not-found") {
      return jsonError("Invitation not found.", 404);
    }

    if (result === "unchanged") {
      return jsonError(
        "The same attendance response has already been submitted. Please update your response if your plans change.",
        409,
      );
    }

    return Response.json({
      success: true,
      message:
        result === "created"
          ? "Thank you! Your attendance response has been saved."
          : "Thank you! Your updated attendance response has been saved.",
    });
  } catch (error) {
    console.error("Failed to save the RSVP response.", error);
    return jsonError(
      "Your response could not be saved. Please try again in a moment.",
      500,
    );
  }
}
