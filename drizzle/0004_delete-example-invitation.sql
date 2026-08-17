-- Menghapus undangan contoh. RSVP terkait ikut terhapus melalui ON DELETE CASCADE.
-- DELETE bersifat idempotent: aman dijalankan saat datanya sudah tidak tersedia.
DELETE FROM "invitations"
WHERE "slug" = 'bapak-ahmad-dan-keluarga';
