# DIY Electronics vs iFixit — feature comparison (branch `ifixit-parity`)

Studied on 2026-10-11: ifixit.com home, /Device (create-page flow), /Device/iPhone_13 (device page),
/Guide/iPhone+13+Battery+Replacement/145896 (guide page), /Answers, /Teardown. (/Store, /Wiki are
link-outs from those pages: Store = parts & tools shop with Fix Kits; Wiki = free-form troubleshooting pages.)

Status columns: **Before** = this repo before this branch, **Now** = after this branch.
have / partial / missing.

| # | iFixit feature | What iFixit does | Before | Now | Where in our app |
|---|---|---|---|---|---|
| 1 | Device category tree | 16 top categories (Appliance, Camera, Car, Computer Hardware, Electronics, Game Console, Household, Mac, Medical Device, PC, Phone, Skills, Tablet, Tool, Vehicle, Apparel) drilling to model pages | have (119 types, 17 groups, 2.8k models, 3.3k repair pages) | **have, wider**: 157 types / 21 groups / 3.2k models (+Health & Medical, Music & Pro Audio, PC components & peripherals, network switches/NAS/ONT, car amps/alarms/OBD/EV chargers, MPPT controllers, VFDs, bench PSUs, office/POS, fitness, RC, metal detectors, remotes) | `/devices` |
| 2 | Any device can get a page | Users create a new Device page by hand ("Start a New Page") | missing (old AI search returned JSON that was never shown or saved) | **have, better**: any device typed anywhere resolves to `/device/:slug`, researched by Gemini + Google Search with cited sources + Wikipedia image, saved to Firestore as a permanent shareable page; honest "not identified" state; or add a page by hand (admin-reviewed) | `/device/:slug`, `/search` |
| 3 | Device page layout | Intro, Guides (replacement / techniques), Troubleshooting, Related, Popular Answers, Parts, Tools, Specs, Identification, Background, sources | partial (catalog leaf: fault-finding solutions + videos) | **have**: universal pages show specs, identification, common faults, teardown notes, replaceable parts, sources; every device page (catalog or universal) now has Community guides, Answers, Parts & tools links, Videos | `/devices/...` leaf, `/device/:slug` |
| 4 | Step-by-step guides | Numbered steps, multiple images per step, cautions, Tools + Parts + Fix Kit, difficulty, time, "completed" counter, favourites, comments per step + guide | partial (static seed guides in a modal) | **have**: user-authored guides with numbered steps, up to 6 image links per step, per-step caution, tools & parts lists with marketplace/shop links, difficulty, time, "I fixed it" counter, comments per step and per guide, share link | `/guides/view/:id` |
| 5 | Guide authoring | Anyone can write/edit, drafts, history | missing | **have**: signed-in create/edit, private drafts, publish/unpublish, owner delete, admin remove/restore (audit-logged) | `/guides/new`, `/guides/edit/:id` |
| 6 | Answers (Q&A) | Questions per device, answers, accepted answer, upvotes, Unanswered / Most helpful / Newest filters | partial (Forum held posts in memory only) | **have**: Firestore questions + answers per device, accept answer, one upvote per user, Newest / Most helpful / Unanswered / Solved filters, edit/delete, admin moderation | `/answers`, `/answers/ask`, `/answers/q/:id` |
| 7 | Teardowns | Teardown listing + "Create a teardown" | missing | **have**: teardown guide type with its own listing and editor preset | `/teardowns` |
| 8 | Repairability score | Published scores (iFixit / EU) | missing | **have (honest)**: shown only when a published score with its source is found in research; otherwise "No published repairability score found". Difficulty filters on guide listings | device pages, `/guides`, `/teardowns` |
| 9 | Parts & tools store, Fix Kits | Own store with lifetime guarantee | partial (marketplace + spare parts) | **have (link-out + marketplace)**: per-device "Parts & tools" block, per-guide fix-kit lists → marketplace search (`/marketplace?q=`) plus Google Shopping / eBay / AliExpress / Takealot / iFixit searches. No stock or prices are claimed | device pages, guides |
| 10 | Reputation & badges | Points, badges, leaderboard | partial (local fake reputation counters) | **have**: live reputation computed from real Firestore activity (guides, teardowns, fixes received, answers, accepted answers, upvotes, videos) with 10 badges | `/contributors` |
| 11 | Global search | Site-wide search | partial (header suggestions from seed data) | **have**: one search across catalog devices, device pages, components, community + built-in guides, Answers, repair videos, PCB boards and spare parts; Enter in the header opens it; research actions when nothing is saved yet | `/search?q=` |
| 12 | Components / parts knowledge | Item pages for parts/tools (no datasheet search) | partial (seed spare parts) | **have, better**: any part number → component page with specs, pinout, equivalents (linked), markings, applications, test notes, cited sources, datasheet links (Alldatasheet, Octopart, Datasheet Archive, manufacturer, PDF search), distributors (LCSC, Mouser, DigiKey) and how-to-test links to `/multimeter/test/:component` | `/components`, `/components/:part` |
| 13 | Request a device | — | missing | **have**: request a device (public open-requests list for admins) or add a page yourself (pending admin review) | `/devices`, `/search`, not-found device pages |
| 14 | Moderation | Moderation queue | partial (videos, listings) | **have**: Admin Desk → Repair hub tab (pending devices, device/component pages, guides, questions, answers, requests) with audit log | `/admin` |
| 15 | FixBot (AI assistant) | AI repair assistant | have | have | `/diagnostic`, `/ai-assistant` |
| 16 | Wiki pages | Free-form troubleshooting docs | partial (catalog solutions are structured troubleshooting) | partial (no free-form wiki editor; "technique" guides + device overview cover most uses) | — |
| 17 | Translations, guide history | Multi-language, revision history | missing | missing | — |
| 18 | Image hosting | Uploads to their CDN | partial (Storage uploads for boards/videos) | partial: guides use https image links; upload buttons explain that Cloud Storage is not enabled on the Spark plan | guide editor |

## Where we are already better than iFixit
- **AI diagnosis** with multimeter checks for every catalog leaf, plus SANWOLF AI chat.
- **Open-ended coverage**: every device and every part number on Earth resolves to a cited, permanent page on first search (iFixit needs a volunteer to hand-create each page).
- **Component pages** with pinouts, equivalents, datasheet + distributor searches and links to the multimeter test guides — iFixit has nothing equivalent.
- **Board library** (real PCB numbers, Commons photos with licences, cited board facts, schematic/boardview searches, community board photos & files).
- **Electrical theory + Exam Room**, courses and certificates.
- **Marketplace with verified sellers** (company verification, purchase requests, reviews) instead of a single first-party store.
- **Community repair videos** on every model page.
- **South-African context** (load-shedding faults, SANS plugs, geysers, gate motors, inverters, local brands like Defy/Mobicel/Hisense, Takealot links).

## Remaining gaps (not built in this branch)
- Guide revision history / multiple editors, translations.
- Free-form wiki pages.
- Image uploads for guides (needs a Cloud Storage bucket → Blaze plan); links only for now.
- Full-text search is client-side over the newest 300 guides / questions / device pages / components; a search index (Algolia / Typesense / Firestore vector search) is needed at scale.
