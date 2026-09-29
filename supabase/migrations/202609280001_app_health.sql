-- Jalankan satu kali melalui SQL Editor Supabase.
-- Tabel publik ini hanya berisi marker koneksi, tanpa data pengguna.
create table public.app_health (
  id integer primary key check (id = 1)
);

insert into public.app_health (id) values (1);
alter table public.app_health enable row level security;
revoke all on public.app_health from anon, authenticated;
grant select on public.app_health to anon, authenticated;
create policy "Allow reading connection marker"
  on public.app_health for select
  to anon, authenticated
  using (true);
