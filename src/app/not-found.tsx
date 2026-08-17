import type { Metadata } from "next";
import { InvitationNotFound } from "@/features/invitation/components/InvitationNotFound";

export const metadata: Metadata = {
  title: "Invitation Not Found",
};

export default function NotFoundPage() {
  return <InvitationNotFound />;
}
