# llamatelemetry Django + Next.js Docs

This project mirrors the `llamatelemetry.github.io` documentation site (v0.1.0) using a Django + Next.js stack. All markdown content is sourced from `docs/` and the navigation matches `zensical.toml`.

## Structure

- `backend/` – Django ASGI app, wired with `django-nextjs`
- `frontend/` – Next.js App Router site that renders the markdown docs
- `docs/` – documentation markdown (copied from `llamatelemetry.github.io`)
- `zensical.toml` – original Zensical config (kept for reference)

## Development

1. Install Python dependencies:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

2. Install Node dependencies:

```bash
cd frontend
npm install
```

3. Run Next.js (frontend) and Django (backend):

```bash
# terminal 1
cd frontend
npm run dev
```

```bash
# terminal 2
cd backend
python3 manage.py runserver 8000
```

Open `http://127.0.0.1:8000` to view the docs through Django.

## Notes

- Django proxies Next.js through `django-nextjs` using ASGI middleware.
- The default URL config uses non-streaming rendering so the built-in WSGI dev server works.
- If you want streaming responses, switch `nextjs_page(stream=True)` in `backend/llamatelemetry_site/urls.py` and run an ASGI server:

```bash
cd backend
uvicorn llamatelemetry_site.asgi:application --host 127.0.0.1 --port 8000 --reload
```

- Routes are served by Next.js; Django uses a catch-all URL configuration.
- If you see a hop-by-hop header error under WSGI, the project filters those headers in `backend/llamatelemetry_site/views.py`.
- Sync navigation from `zensical.toml` with:

```bash
python3.11 scripts/sync_nav.py
```

- `frontend/lib/nav.js` is generated; don’t edit it directly.
- Search index is generated at runtime from `docs/` via `frontend/lib/search.js`.
