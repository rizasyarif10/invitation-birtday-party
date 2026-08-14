import "server-only";

import { cache } from "react";
import { and, eq, ne } from "drizzle-orm";
import { db } from "@/db";
import { invitations, rsvps } from "@/db/schema";
import type {
  AttendanceValue,
  InvitationData,
} from "@/features/invitation/types";

const normalizeSlug = (slug: string) => slug.trim().toLowerCase();

export const getInvitationBySlug = cache(
  async (slug: string): Promise<InvitationData | null> => {
    const [row] = await db
      .select({
        slug: invitations.slug,
        displayName: invitations.displayName,
        salutation: invitations.salutation,
        attendance: rsvps.attendance,
        message: rsvps.message,
      })
      .from(invitations)
      .leftJoin(rsvps, eq(rsvps.invitationId, invitations.id))
      .where(eq(invitations.slug, normalizeSlug(slug)))
      .limit(1);

    if (!row) return null;

    return {
      guest: {
        slug: row.slug,
        displayName: row.displayName,
        salutation: row.salutation,
      },
      rsvp:
        row.attendance === null
          ? null
          : {
              attendance: row.attendance ? "hadir" : "tidak-hadir",
              message: row.message ?? "",
            },
    };
  },
);

type SaveRsvpInput = {
  slug: string;
  attendance: AttendanceValue;
  message: string;
};

export type SaveRsvpResult =
  | "created"
  | "updated"
  | "unchanged"
  | "not-found";

export async function saveRsvp({
  slug,
  attendance,
  message,
}: SaveRsvpInput): Promise<SaveRsvpResult> {
  const [invitation] = await db
    .select({ id: invitations.id })
    .from(invitations)
    .where(eq(invitations.slug, normalizeSlug(slug)))
    .limit(1);

  if (!invitation) return "not-found";

  const attendanceValue = attendance === "hadir";
  const [insertedRsvp] = await db
    .insert(rsvps)
    .values({
      invitationId: invitation.id,
      attendance: attendanceValue,
      message,
    })
    .onConflictDoNothing({ target: rsvps.invitationId })
    .returning({ id: rsvps.id });

  if (insertedRsvp) return "created";

  const [updatedRsvp] = await db
    .update(rsvps)
    .set({
      attendance: attendanceValue,
      message,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(rsvps.invitationId, invitation.id),
        ne(rsvps.attendance, attendanceValue),
      ),
    )
    .returning({ id: rsvps.id });

  return updatedRsvp ? "updated" : "unchanged";
}
