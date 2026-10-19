<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application rules
- Keep shared navigation and footer in SiteShell mounted by the root route; each public content page owns its leaf route and metadata so navigation and search previews remain distinct.
- Keep sign-based pricing and integer-cent estimate math in src/lib/business.ts; calculate a min/max range for variable-price items to avoid presenting an unsupported fixed quote.
- Use semantic tokens and editorial styles in src/styles.css with Button variants for controls; this keeps the presentation consistent across pages.
- Render store photos and footage through EditorialMedia with posters, preload="none" and tap-to-play; this keeps real videos lightweight and respects motion and bandwidth preferences.
- Keep this concept frontend-only with no booking, payment or persistent customer records; the site offers information, directions and transient estimates only.
