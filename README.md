# CalgaryDuplexes.ca

A static, PPC-ready Calgary duplex authority site.

## What was found locally

- No existing `calgaryduplexes.ca` site was found.
- A Matrix export scaffold exists at `../calgary-hoods-deepdive-main/data/matrix-exports/matrix-export-manifest.csv`.
- That manifest includes 4,380 duplex-related export segments across 218 Calgary communities:
  - Semi Detached (Half Duplex): sold, active, pending segments
  - Full Duplex: sold, active, pending segments
- Processed aggregate files currently contain headers only, so this build does not publish private listing, sold, or MLS-derived figures.

## Build commands

```bash
npm install
npm run build
npm run check
npm run dev
```

## PPC testing

The homepage supports query-param personalization:

- `?intent=investor`
- `?intent=seller`
- `?intent=suite`
- `?intent=infill`
- `?intent=half`
- `?intent=full`

Forms preserve `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `gclid`, `msclkid`, and `fbclid` into hidden fields.

## Launch checklist

1. Point `calgaryduplexes.ca` at the static host.
2. Connect the Netlify form or replace with the preferred CRM endpoint.
3. Add call tracking, consent-aware analytics, Google Ads conversion events, and Microsoft Ads tags.
4. Load Matrix raw exports, run the existing normalizer, and review aggregate-only output before publishing community stats.
5. Replace/extend assets if you want a dedicated CalgaryDuplexes.ca image set.
