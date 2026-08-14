import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InvitationPage } from "@/features/invitation/InvitationPage";
import { InvitationExpired } from "@/features/invitation/components/InvitationExpired";
import { isInvitationAccessClosed } from "@/features/invitation/config/event";
import { getInvitationBySlug } from "@/features/invitation/data/invitations";

export const dynamic = "force-dynamic";

type InvitationRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: InvitationRouteProps): Promise<Metadata> {
  if (isInvitationAccessClosed()) {
    return {
      title: "Acara Telah Selesai",
      description: "Acara ulang tahun Rezvan dan Reivanya telah selesai.",
    };
  }

  const { slug } = await params;
  const invitation = await getInvitationBySlug(slug);

  return {
    title: invitation
      ? `Undangan untuk ${invitation.guest.displayName}`
      : "Undangan Tidak Ditemukan",
    description: invitation
      ? `Undangan ulang tahun Rezvan dan Reivanya untuk ${invitation.guest.displayName}.`
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

  return (
    <InvitationPage guest={invitation.guest} initialRsvp={invitation.rsvp} />
  );
}
