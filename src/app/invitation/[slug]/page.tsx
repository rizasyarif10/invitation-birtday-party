import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InvitationPage } from "@/features/invitation/InvitationPage";
import { InvitationExpired } from "@/features/invitation/components/InvitationExpired";
import { isInvitationAccessClosed } from "@/features/invitation/config/event";
import {
  getInvitationBySlug,
  getRsvpEntries,
} from "@/features/invitation/data/invitations";

export const dynamic = "force-dynamic";

type InvitationRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: InvitationRouteProps): Promise<Metadata> {
  if (isInvitationAccessClosed()) {
    return {
      title: "The Celebration Has Ended",
      description: "Rezvan and Reivanya's birthday celebration has ended.",
    };
  }

  const { slug } = await params;
  const invitation = await getInvitationBySlug(slug);

  return {
    title: invitation
      ? `Invitation for ${invitation.guest.displayName}`
      : "Invitation Not Found",
    description: invitation
      ? `Rezvan and Reivanya's birthday invitation for ${invitation.guest.displayName}.`
      : undefined,
  };
}

export default async function InvitationRoute({
  params,
}: Readonly<InvitationRouteProps>) {
  if (isInvitationAccessClosed()) return <InvitationExpired />;

  const { slug } = await params;
  const invitation = await getInvitationBySlug(slug);

  if (!invitation) notFound();

  const rsvpEntries = await getRsvpEntries();

  return (
    <InvitationPage
      guest={invitation.guest}
      initialRsvp={invitation.rsvp}
      initialRsvpEntries={rsvpEntries}
    />
  );
}
