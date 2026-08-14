# Rezvan & Reivanya Birthday Invitation

Website undangan ulang tahun berbasis Next.js App Router, React, TypeScript,
Tailwind CSS, Drizzle ORM, dan Supabase PostgreSQL.

## Environment database

Salin `.env.example` menjadi `.env.local`, lalu isi dua connection string dari
Supabase:

```env
DATABASE_URL="transaction-pooler-port-6543"
DATABASE_MIGRATION_URL="session-pooler-port-5432"
```

`DATABASE_URL` hanya digunakan di server dan tidak boleh memakai awalan
`NEXT_PUBLIC_`.

## Database

Schema aplikasi berada di `src/db/schema.ts`. Terapkan migration dan seed tamu
awal dengan:

```bash
npm run db:generate
npm run db:check
npm run db:migrate
```

Tabel yang digunakan:

- `invitations`: slug, nama undangan, dan sapaan.
- `rsvps`: satu status kehadiran dan keterangan terbaru untuk setiap undangan.

Pengiriman pilihan kehadiran yang sama akan ditolak. Jika pilihan berubah,
record RSVP yang sama akan diperbarui; keterangan yang sama tetap diperbolehkan.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka salah satu route undangan, misalnya:

```text
http://localhost:3000/invitation/bapak-budi-dan-keluarga
```

## Pemeriksaan proyek

```bash
npm run lint
npm run typecheck
npm run build
```
