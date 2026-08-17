-- Menambahkan daftar undangan tamu.
-- ON CONFLICT membuat migration aman ketika slug sudah tersedia.
INSERT INTO "invitations" ("slug", "nama_undangan", "sapaan")
VALUES
	('rayi', 'Rayi', 'Rayi'),
	('sakha', 'Sakha', 'Sakha'),
	('asha', 'Asha', 'Asha'),
	('alana', 'Alana', 'Alana'),
	('ayasha', 'Ayasha', 'Ayasha'),
	('ghafi-dan-veya', 'Ghafi & Veya', 'Ghafi & Veya'),
	('ghaidan-dan-ghaisan', 'Ghaidan & Ghaisan', 'Ghaidan & Ghaisan'),
	('keanu-dan-sarah', 'Keanu & Sarah', 'Keanu & Sarah'),
	('clarissa-dan-thomas', 'Clarissa & Thomas', 'Clarissa & Thomas'),
	('louie-dan-elora', 'Louie & Elora', 'Louie & Elora')
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
