# Editor test site

A throwaway Hugo site for answering the open questions in `../MASTER-NOTES.md`. It uses a real theme as a Hugo module (PaperMod, vendored in the build command) and editable-regions v0.0.21. The home page is a test harness: each dashed box is one test.

Run the local tests first, then the hosted ones. **H6 comes last**, because it may break every component (see T-DATES).

## Setup

1. Create a git repo from this folder, commit, and push. `_vendor/` and `public/` are gitignored on purpose.
2. Connect the repo to a new CloudCannon site. `.cloudcannon/initial-site-settings.json` sets the build:
   - build command: `go version && hugo mod vendor && hugo`
   - Hugo 0.166.0
   - Node from `.nvmrc` (`lts/*`)
3. Locally, from this folder, run:

   ```sh
   ../regression-tests/.bin/hugo mod vendor
   ../regression-tests/.bin/hugo -b /
   ```

   **MUST NOT** run a rebuild watcher during editor tests. The local editor writes each edit to disk. A watcher then rebuilds and the preview reloads, which hides whether the editor re-rendered anything in the browser. Rebuild by hand only after changing templates or config. After an editor test, check that `public/` still has the old value.

   And in a second terminal:

   ```sh
   cloudcannon dev public
   ```

## Local tests (dev server)

| ID | Question | Notes entry |
| --- | --- | --- |
| L1 T-PARAMS | Three config files, three boxes each (A primitive, B component reading its context, C component reading `site.*`). P1: edit Intro title in **Site settings**. P2: edit the first menu item's name in **Menus (collection only)**. P3: `languages.yaml` is in no collection, so edit **A3** on the page. For each P, which of A, B and C update live? | C4, 3.11 |
| L2 T-SINGLEKEY | In Site settings → Links, do the existing items show as "GitHub" and "Email"? Can you add one of each? | 6.4 |
| L3 T-ARRAY-WRAPPER, T-ICON | Add a button on the home page. Does it render with no `<template>`? Does its icon show? Inspect the icon: is `data-src` `readFile` or `missing`? | 3.12, 3.14 |
| L4 T-SUMMARY | Can you edit the summary text? Does clicking it toggle the `<details>` instead? | GAP #13 |
| L5 T-BLOCKS | Add, remove and reorder blocks. Edit a stat in place. Add an item to "Stats with no items". Swap the two text blocks, which share a `_name` | Open questions 10, 11; GAP #10 |
| L6 T-TAXONOMY | On Bundle post: does the Tags dropdown list `data/tags.yaml`? Type a new tag: does it stay out of the data file? In Site data → Tags, add, remove and reorder tags | 6.2 |
| L7 T-SELECT-CONVENTION | On the home page, does "Colour (no values configured)" list red, green and blue, or show a misconfiguration error? | 10.2 #8 |
| L8 T-NESTED-INPUTS | On About, which label does the menu weight field show: DOTTED or PLAIN? | Open question 18 |
| L9 T-SNIPPETS | On Bundle post, in the content editor: do the Stats (parent/child), Badge (no args) and Collapse snippets open as snippets? Edit each one and save. Is `openByDefault=true` still unquoted? Does `> [!NOTE]` survive a save? | 9.3–9.5, open question 13 |
| L10 T-TIMING | Open the home page in the Visual Editor with the browser console open. Record the three `[T-TIMING]` lines | GAP #12 |
| L11 T-OPENWRITE | Open Old post and change nothing. Does the dev server log a `synced` write? | Open question 14 |
| L12 T-DEFAULTS | Edit Old post's title and save. Run `git diff`: which schema keys were added, and with what values (`draft: true`?) | 7.5 |
| L13 T-NOLIVESYNC | Restart with `cloudcannon dev public --no-live-sync`. Edit `content/about.md` on disk. Does the open editor reload? | Open question 15 |
| L14 T-INDEX | From the Pages and Posts collections, do Editor test site (`content/_index.md`) and Posts (`content/posts/_index.md`) open at `/` and `/posts/`? | C6, 2.9 |

After L11 and L12, run `git checkout -- content` to reset.

## Hosted tests

| ID | Question | Notes entry |
| --- | --- | --- |
| H1 T-GO | Does the build log print a `go version` line, and does `hugo mod vendor` succeed? | C2, 8.9 |
| H2 T-NVMRC | Which Node version does the build log show? Any error about `lts/*`? | Open question 17 |
| H3 T-BASEURL | In the hosted Visual Editor, what does the T-BASEURL box show for `site.BaseURL`? Is its image broken? Is the cover on Bundle post broken? | C1, open question 19 |
| H4 T-DEVFILES | Do "Site settings" and "Menus (collection only)" list their files? Is "Site settings (no include_developer_files)", which covers `markup.yaml`, empty? Locally all three should list their file | 5.2 |
| H5 T-INDEX | Repeat L14 on the hosted site | C6 |
| H7 T-TIMING | Repeat L10 on the hosted Visual Editor, with the console set to the preview iframe. Is `inEditorMode` `true` in the inline head line? | 10.1 #11 |
| H6 T-CREATE, T-UPLOAD, T-DATES | Add → Post. Before saving, upload a cover image. Save. Record: the file path created, where the image landed, and the exact `date` line (quoted or bare). Do components on the home page still render afterwards? | 6.1, 7.1–7.3, 7.7 |

## What each part of the site is for

| File | Tests |
| --- | --- |
| `layouts/home.html` | Harness: L1–L5, H3 |
| `layouts/partials/tests/*` | T-PARAMS partials (live vs `site.Params`), button, icon with the `readFile` fallback |
| `layouts/partials/blocks/*` | T-BLOCKS |
| `layouts/partials/extend_head.html` | Theme head-hook override; T-TIMING probes |
| `layouts/shortcodes/*` | T-SNIPPETS (parent/child stats, no-arg badge). Collapse comes from the theme |
| `content/posts/old-post/` | T-OPENWRITE, T-DEFAULTS: has no `draft`, `tags` or `cover` keys |
| `config/_default/params.yaml` | Editable settings (YAML, in two collections for T-DEVFILES) |
| `package.json`, `.nvmrc` | T-NVMRC only |

Until the upstream Visual Editor API fix ships, saving a dated post strips the quotes from its date, and every component on the site fails. After saving a post, re-quote its `date` before the next test (`sed -i '' 's/^date: \(.*Z\)$/date: "\1"/' content/posts/*/index.md`).
