# Atelier Delicaté: custom soap concept

> Product specification. None of this is implemented yet: it adds no models, endpoints or screens to the system.

## Vision

**Atelier Delicaté** would be a guided experience where a person creates a soap proposal by combining options the business has approved in advance. It should feel creative and personal ("made by you, prepared with love by us") without turning the interface into a laboratory or allowing unsafe mixes.

The result would not be an automatic purchase. It would be saved as a design request and sent through WhatsApp so Delicaté can confirm the formula, availability, price, minimum quantity and production time.

## Core principle

Customers cannot freely mix any substance. The system only shows allowed combinations and applies the rules defined by the person responsible for formulating the soaps:

- available and temporarily unavailable ingredients;
- maximum number of ingredients per design;
- allergens and warnings;
- incompatibilities between bases, scents, colours and additives;
- ingredients restricted to body use;
- minimum quantities and preparation time;
- price increase per option.

## Proposed experience

### 1. Choose the care you want

The entry point uses needs that are easy to understand: gentleness, nourishment, freshness, body exfoliation or a gift. It must not promise to treat medical conditions.

### 2. Choose a base

Each base shows a short description, its appearance, the skin type it suits, its weight and a starting price. Selecting an option updates the preview immediately.

### 3. Add ingredients

Ingredients are shown as visual cards with:

- name and photo;
- sensory or cosmetic contribution;
- availability;
- possible allergen;
- extra cost;
- a "pairs well with" indicator.

The interface explains why an option is disabled. It must never fall back to a generic error.

### 4. Customise its look

Curated options for colour, finish, mould and botanical decoration. For a first version, a layered 2D preview is the right choice: it looks good and is far easier to maintain than a 3D model.

### 5. Choose a scent and its intensity

The customer picks a scent family and a subtle or noticeable intensity. "No added fragrance" must be available whenever the base allows it.

### 6. Packaging and message

The customer chooses individual, gift or event packaging, plus a short message for the label. The system validates length and allowed characters.

### 7. Review your creation

The summary shows the preview, the choices, warnings, quantity, estimated price and estimated time. The primary action would be **"Save my creation and ask"**.

### 8. Confirmation on WhatsApp

On submit, the system creates a code such as `DLT-A7K2Q`, stores an image of the preview and opens WhatsApp with a link to the design. Delicaté reviews the request before confirming the order.

## Screens and states

1. Atelier introduction.
2. Step-by-step guided configurator.
3. Editable summary.
4. Confirmation with the design code.
5. Design recovery through a secure link.
6. Admin view to review, quote and change the status.

Suggested states: `draft`, `submitted`, `in review`, `quoted`, `confirmed`, `unavailable` and `archived`.

## Visual preview

The first version can be composed in the browser from transparent PNG or WebP layers:

1. shape or mould;
2. colour/base;
3. ingredient texture;
4. decoration;
5. label or packaging.

The frontend saves the configuration and renders a final image with Canvas on submit. The backend keeps both the structured configuration and the resulting preview, so the design can be rebuilt even if the interface changes.

## Proposed data model

### Customisation catalog

- `SoapBase`: name, description, base colour, suggested skin type, price and active flag.
- `Ingredient`: name, description, image, allergens, cost, availability and allowed use.
- `ScentOption`: family, allowed intensity, cost and active flag.
- `MoldOption`: name, preview silhouette, weight, cost and active flag.
- `FinishOption`: colour, texture, decoration, visual layer and cost.
- `CompatibilityRule`: source, target, allowed, reason and limits.

### Customer creation

- `CustomSoapDesign`: random public code, session, status, quantity, estimated price, rules version and configuration frozen as JSON.
- `CustomSoapIngredient`: design, ingredient, position and approved relative quantity.
- `CustomSoapPreview`: generated image, width, height and date.
- `CustomSoapRequest`: name, phone, comment, consent and submission date.
- `CustomSoapStatusHistory`: previous status, new status, note and admin user.

The frozen JSON matters: if prices or ingredients change later, the original request keeps exactly what the customer saw.

## Proposed API

- `GET /api/customizer/options/`: active options and the rules they need.
- `POST /api/customizer/designs/`: create an anonymous draft.
- `PATCH /api/customizer/designs/<token>/`: save progress.
- `POST /api/customizer/designs/<token>/validate/`: validate the combination and price.
- `POST /api/customizer/designs/<token>/preview/`: upload the generated preview.
- `POST /api/customizer/designs/<token>/submit/`: turn a draft into a request.
- `GET /api/customizer/designs/<token>/`: retrieve a design through an unguessable token.

Public endpoints need rate limits, draft expiry, strict server-side validation and protection against malicious files.

## Recommended architecture

- A separate React route: `/crea-tu-jabon` ("create your soap").
- Configurator state in `useReducer`; the MVP does not need a global state library.
- Immediate local saving, synced to Django with a debounce.
- Rules and price calculation are authoritative in Django; React only shows a fast estimate.
- 2D Canvas for the preview, with visual assets served from object storage.
- A customised Django Admin for ingredients, compatibility rules and requests.
- A scheduled task that deletes expired drafts and orphaned previews.

## Security and privacy

- Ask for name and phone only on submit, never while creating.
- Ask for consent before storing contact information.
- Do not collect medical diagnoses or photos of the skin.
- Show allergens before submitting and include them again in the WhatsApp message.
- Use random public tokens; never expose sequential identifiers.
- Record who changed a request and when.

## Recommended MVP

The first release should be limited to:

- 2 bases;
- up to 2 extra ingredients;
- 3 scents plus a fragrance-free option;
- 3 colours;
- 3 moulds;
- 2D preview;
- estimated price;
- draft saving;
- review and submission through WhatsApp;
- administration of options and requests.

It would not include customer accounts, payments, 3D, artificial intelligence or automated manufacturing. Those features would add cost before validating whether people actually want to customise the product.

## Later phases

1. Favourites and duplicating designs.
2. A shareable link and social card for the created soap.
3. Designs for weddings, events and corporate gifts.
4. Reordering a previously confirmed creation.
5. Deposit payment after Delicaté approves the formula.
6. A 3D preview only if usage data justifies the investment.

## Open business decisions

- Which bases and ingredients are actually approved?
- What are the incompatibilities and allergens?
- What is the minimum quantity per design?
- How much does the price change per ingredient, mould and packaging?
- How many days do production and curing take?
- Will one-off pieces be allowed, or only batches?
- Who approves requests and updates their status?

These answers must be settled before designing the final model. The configurator has to express the real manufacturing rules, not invent them in the interface.
