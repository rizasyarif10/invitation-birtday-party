-- Menambahkan daftar undangan tamu tambahan.
-- ON CONFLICT membuat migration aman ketika slug sudah tersedia.
INSERT INTO "invitations" ("slug", "nama_undangan", "sapaan")
VALUES
	('gaza', 'Gaza', 'Gaza'),
	('rayyansah', 'Rayyansah', 'Rayyansah'),
	('gibran', 'Gibran', 'Gibran'),
	('kenan', 'Kenan', 'Kenan'),
    ('aisyah', 'Aisyah', 'Aisyah'),
    ('inara', 'Inara', 'Inara'),
    ('azam', 'Azam', 'Azam'),
    ('fadil-dan-irul', 'Fadil & Irul', 'Fadil & Irul'),
    ('iyus', 'Iyus', 'Iyus'),
    ('ibu-eka', 'Ibu Eka', 'Ibu Eka'),
    ('ibu-eva', 'Ibu Eva', 'Ibu Eva'),
    ('ibu-yani', 'Ibu Yani', 'Ibu Yani')
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
