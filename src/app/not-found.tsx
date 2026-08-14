import type { Metadata } from "next";
import { InvitationNotFound } from "@/features/invitation/components/InvitationNotFound";

export const metadata: Metadata = {
  title: "Undangan Tidak Ditemukan",
};

export default function NotFoundPage() {
  return <InvitationNotFound />;
}
