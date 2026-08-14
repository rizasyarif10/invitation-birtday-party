export type AttendanceValue = "hadir" | "tidak-hadir";

export type Guest = {
  slug: string;
  displayName: string;
  salutation: string;
};

export type RsvpSummary = {
  attendance: AttendanceValue;
  message: string;
};

export type RsvpFeedback = {
  type: "success" | "error";
  message: string;
};

export type InvitationData = {
  guest: Guest;
  rsvp: RsvpSummary | null;
};
