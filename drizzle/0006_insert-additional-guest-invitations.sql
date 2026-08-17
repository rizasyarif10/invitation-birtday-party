-- Menambahkan daftar undangan tamu tambahan.
-- ON CONFLICT membuat migration aman ketika slug sudah tersedia.
INSERT INTO "invitations" ("slug", "nama_undangan", "sapaan")
VALUES
	('winona', 'Winona', 'Winona'),
	('emran', 'Emran', 'Emran'),
	('rowena', 'Rowena', 'Rowena'),
	('kalandra', 'Kalandra', 'Kalandra')
ON CONFLICT ("slug") DO UPDATE SET
	"nama_undangan" = EXCLUDED."nama_undangan",
	"sapaan" = EXCLUDED."sapaan"
WHERE ROW(
	"invitations"."nama_undangan",
	"invitations"."sapaan"
) IS DISTINCT FROM ROW(
	EXCLUDED."nama_undangan",
	EXCLUDED."sapaan"
);
