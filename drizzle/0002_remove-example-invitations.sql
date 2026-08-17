-- Menghapus tiga undangan contoh awal.
-- DELETE bersifat idempotent: aman saat data sudah tidak tersedia.
DELETE FROM "invitations"
WHERE "slug" IN (
	'bapak-budi-dan-keluarga',
	'kak-rina',
	'rezky-dan-pasangan'
);
