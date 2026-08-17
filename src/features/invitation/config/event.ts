export const EVENT_DATE = new Date("2026-09-05T16:00:00+07:00");
export const INVITATION_ACCESS_END = new Date("2026-09-06T00:00:00+07:00");

export function isInvitationAccessClosed(now = Date.now()) {
  return now >= INVITATION_ACCESS_END.getTime();
}

export const EVENT = {
  dateLabel: "Saturday, September 5, 2026",
  timeLabel: "4:00 PM onwards (WIB)",
  venue: "HokBen Ciater",
  address:
    "Jl. Ciater Raya, RT.1/RW.4, Serua, Kec. Ciputat, Kota Tangerang Selatan, Banten 15414",
  googleMapsUrl: "https://maps.app.goo.gl/jhZL77WxBf5MaVNZ7",
  googleMapsEmbedUrl:
    "https://www.google.com/maps?q=HokBen%20Ciater%2C%20Jl.%20Ciater%20Raya%2C%20Serua%2C%20Ciputat%2C%20Tangerang%20Selatan&output=embed",
} as const;

export const EVENT_DETAILS = [
  { icon: "📅", label: "Date", value: EVENT.dateLabel },
  { icon: "🕒", label: "Time", value: EVENT.timeLabel },
  { icon: "🏡", label: "Venue", value: EVENT.venue },
  { icon: "📍", label: "Address", value: EVENT.address },
] as const;
