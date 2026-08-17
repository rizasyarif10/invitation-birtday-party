"use client";

import { useEffect, useState } from "react";
import { EventDetailsSection } from "@/features/invitation/components/EventDetailsSection";
import { InvitationCover } from "@/features/invitation/components/InvitationCover";
import { InvitationFooter } from "@/features/invitation/components/InvitationFooter";
import { InvitationHero } from "@/features/invitation/components/InvitationHero";
import { InvitationMessage } from "@/features/invitation/components/InvitationMessage";
import { LocationSection } from "@/features/invitation/components/LocationSection";
import { MusicButton } from "@/features/invitation/components/MusicButton";
import { RsvpSection } from "@/features/invitation/components/RsvpSection";
import { useBirthdayMusic } from "@/features/invitation/hooks/useBirthdayMusic";
import { useRevealOnScroll } from "@/features/invitation/hooks/useRevealOnScroll";
import type {
  Guest,
  RsvpEntry,
  RsvpSummary,
} from "@/features/invitation/types";

type InvitationPageProps = {
  guest: Guest;
  initialRsvp: RsvpSummary | null;
  initialRsvpEntries: RsvpEntry[];
};

export const InvitationPage = ({
  guest,
  initialRsvp,
  initialRsvpEntries,
}: InvitationPageProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const [showCover, setShowCover] = useState(true);
  const { isPlaying, play, toggle } = useBirthdayMusic();
  useRevealOnScroll();

  useEffect(() => {
    document.body.style.overflow = showCover ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showCover]);

  const openInvitation = () => {
    if (isOpened) return;

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    setIsOpened(true);
    void play();
    window.setTimeout(() => {
      setShowCover(false);
    }, 1_350);
  };

  const scrollToMessage = () => {
    const target = document.getElementById("invitation-message");
    if (!target) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    target.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fff7e8] text-[#321b10] selection:bg-[#e76f19] selection:text-white">
      {showCover && (
        <InvitationCover
          guest={guest}
          isOpened={isOpened}
          onOpen={openInvitation}
        />
      )}
      {!showCover && <MusicButton isPlaying={isPlaying} onToggle={toggle} />}

      <main
        inert={showCover ? true : undefined}
        aria-hidden={showCover}
        className={`transition-opacity duration-1000 ease-out ${isOpened ? "opacity-100 delay-200" : "opacity-0 delay-0"}`}
      >
        <InvitationHero onContinue={scrollToMessage} />
        <InvitationMessage guest={guest} />
        <EventDetailsSection />
        <LocationSection />
        <RsvpSection
          guest={guest}
          initialRsvp={initialRsvp}
          initialRsvpEntries={initialRsvpEntries}
        />
        <InvitationFooter />
      </main>
    </div>
  );
};
export default InvitationPage;
