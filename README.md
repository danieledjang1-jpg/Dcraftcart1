# Dcraftcart

Dcraftcart is a responsive React + Vite product configurator concept for a futuristic electric flying-car design called **Dcraft Aero X**. It is inspired by the supplied visual reference: deep navy surfaces, electric-blue accents, an animated vehicle concept, a D-logo splash screen, and a multi-step checkout.

## Features

- Animated splash screen with a custom **D** brand mark and loading progress.
- Responsive overview dashboard, collapsible mobile navigation, and reusable components.
- Customizer with exterior finishes, interior finishes, performance upgrades, and accessories.
- Live price calculation from the current configuration (the total is derived, not stored in state).
- CSS-generated animated flying-car concept visual; no external UI framework is used.
- Cart with quantity updates and remove actions.
- Multi-step checkout with controlled inputs, inline validation, back/forward navigation, and a simulated two-second processing state.
- Success confirmation and local order history.
- `localStorage` persistence for the current page, custom configuration, cart, shipping form, and orders.
- Accessible labels, focus styles, and reduced-motion support.

## Run locally

Requirements: Node.js 18+ recommended.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

The production output is generated in `dist/`.

## Deploy to Netlify

1. Push this project to a GitHub repository.
2. In Netlify, choose **Add new site → Import an existing project** and connect the repository.
3. Set **Build command** to `npm run build`.
4. Set **Publish directory** to `dist`.
5. Deploy the site.

For Vercel, import the GitHub repository and use the Vite defaults (`npm run build`, output directory `dist`).

## Research notes / design decisions

### Multi-step form state
Checkout shipping fields live in the parent app through a persisted `shipping` object and are passed into the checkout component. This keeps user entries intact when the checkout step changes or the component is revisited. The checkout step is local UI state, while the app's active page is persisted.

### Derived totals
`getConfigPrice(config)` calculates the total from the selected color, interior, upgrades, and accessories. The computed value is memoized from `config`; no separate total state can drift out of sync when a choice changes.

### localStorage
The `useLocalStorage` hook reads saved values lazily during initial state creation and writes only when the value changes. Read/write operations are guarded with `try/catch` for restricted storage or malformed data. This is a client-rendered Vite app, so there is no server-side hydration step.

### Controlled form validation
Every shipping field is controlled by React state. A submit/review action validates required fields, email syntax, and phone format; errors are shown beside the corresponding input. The final order action validates again before showing the simulated processing state.

## Project reflection report

### AI tool disclosure
ChatGPT was used to help scaffold the React component structure, draft CSS styling, and document the architecture and research notes. Review and test the generated code before submitting it as your own work.

### Blockers and solutions
**Potential blocker: stale or inconsistent pricing.** Storing a running total separately in state can leave the displayed total out of sync when an upgrade is toggled. This implementation calculates the price from the current configuration on render instead, so all displayed totals use the same source of truth.

**Potential blocker: form values disappearing when navigating checkout.** Shipping values are lifted into the app-level state and persisted to localStorage, so changing steps or refreshing the page does not immediately discard the user's entries.

### Deployment process
1. Create a GitHub repository and commit the source code with descriptive messages.
2. Import the repository into Netlify or Vercel.
3. Configure the build command as `npm run build` and publish/output directory as `dist`.
4. Deploy, open the public URL, and test the app at desktop and mobile widths.
5. Test customizer price changes, cart quantity/remove controls, checkout validation, refresh persistence, simulated processing, and the order-success page.

### Important production note
This is a polished client-side demo. It does **not** process real payments, reserve real vehicles, or send orders to a server. A production launch would require a backend/database, real product assets, authentication, server-side validation, payment integration, privacy/security review, and verified delivery/pricing rules.

## Deployment links

- GitHub repository: _Add your public repository URL after pushing this project._
- Live demo: _Add your Netlify or Vercel URL after deployment._
