# Git dan push pertama

Repository lokal menggunakan branch `main`. Sebelum membuat commit:

```sh
git status --short
git add .
git diff --cached --stat
git commit -m "chore: initialize Bridge AI starter"
```

Jika Git belum memiliki identitas, atur nama dan email milik Anda melalui `git config user.name` dan `git config user.email`.

Buat repository kosong di GitHub, GitLab, atau layanan Git pilihan Anda, lalu jalankan dengan URL repository tersebut:

```sh
git remote add origin <URL_REPOSITORY>
git push -u origin main
```

Jangan gunakan placeholder `<URL_REPOSITORY>` secara literal. Remote dan kredensial layanan Git tidak disertakan dalam starter ini.

`.env`, dependency lokal, virtual environment, cache, dan hasil build diabaikan oleh Git. `.env.example`, lockfile dependency, source code, tes, dan migrasi SQL disertakan. CI GitHub Actions memeriksa frontend dan backend tanpa membutuhkan kredensial Supabase.
