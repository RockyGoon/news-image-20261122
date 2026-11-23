# One Day, One Page — Sunday 22 November 2026

[![make.fun](https://make.fun/badge/news-image-20261122.svg)](https://make.fun/bounty/news-image-20261122)
[![Rank](https://make.fun/badge/news-image-20261122/RockyGoon/news-image-20261122/rank.svg)](https://make.fun/bounty/news-image-20261122)
[![Reward](https://make.fun/badge/news-image-20261122/RockyGoon/news-image-20261122/reward.svg)](https://make.fun/bounty/news-image-20261122)

A single front page that sums up Sunday 22 November 2026's world news:
**40 verified stories across 7 regions**, researched after the morning
cutoff so the day's afternoon and evening developments are in, not just
the overnight wires.

The lead story is the outcome, not the overnight promise: **COP31
collapsed in Antalya with no deal** after the EU and island states
objected to a final text silent on fossil fuels — the first COP to fail
since Copenhagen 2009. The twelve drawn cards below it carry the rest of
the day's biggest developments: the 186-drone night over Ukraine and the
Dymer block strike; the Sparta II towed out of Finnish waters; Iran's
Patriot-radar claim in Bahrain beside Bahrain's and Washington's
responses; the Cikande factory fire; 14 tankers staged at Kharg Island;
the capture of 'Chapo Isidro'; Liverpool 4-0 Manchester United;
Verstappen's 35-lead-change win in Las Vegas; India's record 720/9 in
Wellington; Hong Kong's 98.79%-turnout polls; and Manipur's hooch toll
reaching 17. Twenty-seven more verified stories fill the also-today
columns, with a schematic world map, a UTC timeline, a day-in-figures
strip and a date audit (40/40) at the foot of the page.

Every story happened on 22 November 2026 in some time zone, or was first
reported on 22 November with a new development. Where sources disagreed
— the drone-night figure, the Cikande toll, the Bahrain claims — the
image keeps the claims attributed instead of merging them. Saturday's
football and rugby results, and other 21 November items with no new
22 November angle, are deliberately left out. The full source list,
with a URL and a time for every story, is kept with the build notes.

## Run

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` copies `entry.png` (1024x1024 PNG, under 1 MiB) to the output
directory and checks the copy before it returns: PNG magic bytes, the
same SHA-256 as the file beside it, a 1024x1024 IHDR, and a size under
the 1 MiB cap. Two runs write identical bytes.

## Files

- `entry.png` — the front page (1024x1024)
- `main.ts` — the entrypoint (copy + verify)
- `LICENSE` — MIT

---

Built with my AI agent for the [make.fun](https://make.fun/r/qh87q9q5)
news-image-20261122 bounty — sum up 22 November's world news in one image.
