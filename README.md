# Kadeřnictví Tereza

Moderní statický prezentační web pro lokální kadeřnický salon v Poličce. Koncept: **Soft Luxury Hair Studio**.

Web je čistý frontend bez backendu a bez build procesu. Je připravený pro GitHub Pages, Netlify nebo Vercel.

## Lokální spuštění

Stačí otevřít `index.html` v prohlížeči.

Pro lokální kontrolu přes server:

```bash
python3 -m http.server 8097
```

Potom otevřít `http://127.0.0.1:8097/`.

## Struktura

```text
/
├── index.html
├── README.md
└── assets/
    ├── css/style.css
    ├── js/main.js
    └── img/
```

## Nasazení na GitHub Pages

1. Nahrát obsah repozitáře na GitHub.
2. V GitHubu otevřít `Settings` → `Pages`.
3. Zvolit deploy z větve `main` a složky `/root`.
4. Po doběhnutí buildu bude web dostupný na GitHub Pages URL repozitáře.

## Co doplnit od klientky

- Reálné fotografie salonu.
- Reálné fotografie proměn a prací.
- Přesnější rozsah služeb.
- Případný konkrétní ceník, pokud ho chce zveřejnit.
- Odkazy na sociální sítě.
- Případné texty k používaným značkám kosmetiky a péče.

## Poznámka k obsahu

Web záměrně neuvádí pevný ceník ani falešné recenze. Ceny jsou formulované jako orientační podle konzultace, délky a náročnosti vlasů.
