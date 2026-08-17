-- Menambahkan satu undangan contoh.
-- ON CONFLICT membuat migration aman jika slug sudah tersedia.
INSERT INTO "invitations" ("slug", "nama_undangan", "sapaan")
VALUES (
	'bapak-ahmad-dan-keluarga',
	'Bapak Ahmad & Keluarga',
	'Bapak Ahmad beserta keluarga'
)
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
