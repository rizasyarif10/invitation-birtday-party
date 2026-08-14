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
      "Masa konfirmasi kehadiran telah berakhir karena acara sudah selesai.",
      410,
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 10_000) {
    return jsonError("Data konfirmasi terlalu besar.", 413);
  }

  let rawPayload: unknown;
  try {
    rawPayload = await request.json();
  } catch {
    return jsonError("Format data konfirmasi tidak valid.", 400);
  }

  const payload = parseRsvpPayload(rawPayload);
  if (!payload) {
    return jsonError(
      "Pilih kehadiran yang valid dan batasi ucapan hingga 500 karakter.",
      400,
    );
  }

  try {
    const result = await saveRsvp(payload);

    if (result === "not-found") {
      return jsonError("Undangan tidak ditemukan.", 404);
    }

    if (result === "unchanged") {
      return jsonError(
        "Konfirmasi dengan pilihan yang sama sudah pernah dikirim. Silakan ubah pilihan kehadiran jika keputusan Anda berubah.",
        409,
      );
    }

    return Response.json({
      success: true,
      message:
        result === "created"
          ? "Terima kasih! Konfirmasi kehadiran Anda sudah tersimpan."
          : "Terima kasih! Perubahan konfirmasi kehadiran Anda sudah tersimpan.",
    });
  } catch (error) {
    console.error("Gagal menyimpan konfirmasi RSVP.", error);
    return jsonError(
      "Konfirmasi belum dapat disimpan. Silakan coba beberapa saat lagi.",
      500,
    );
  }
}
