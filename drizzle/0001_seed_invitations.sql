INSERT INTO "invitations" ("slug", "nama_undangan", "sapaan")
VALUES
	('bapak-budi-dan-keluarga', 'Bapak Budi & Keluarga', 'Bapak/Ibu beserta keluarga'),
	('kak-rina', 'Kak Rina', 'Kak Rina'),
	('rezky-dan-pasangan', 'Rezky & Pasangan', 'Rezky beserta pasangan')
ON CONFLICT ("slug") DO UPDATE SET
	"nama_undangan" = EXCLUDED."nama_undangan",
	"sapaan" = EXCLUDED."sapaan";
