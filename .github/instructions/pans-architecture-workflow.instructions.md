---
description: "Workflow guidance for keeping the PAN architecture markdown, draw.io source, and rendered previews in sync"
applyTo: 'architecture.md|architecture.drawio|architecture.png|architecture-sequence.png|render.js'
---

# PAN Architecture Workflow

Use this guidance when updating the PAN routing architecture artifacts.

## Scope

* Keep [architecture.md](../../architecture.md) and [architecture.drawio](../../architecture.drawio) aligned.
* Treat [architecture.png](../../architecture.png) as the rendered preview for the "Agentic Router Architecture" diagram.
* Treat [architecture-sequence.png](../../architecture-sequence.png) as the rendered preview for the "Sequence Flow" diagram.
* Use [render.js](../../render.js) to regenerate both previews after diagram edits.

## Conventions

* Update the markdown narrative and the diagram in the same change when the routing flow changes.
* Keep the request flow, component names, and edge labels consistent across both artifacts.
* Prefer the same terminology in both files for intent extraction, semantic routing, PAN selection, query fan-out, and result synthesis.
* If the routing sequence changes, update the sequence section in the diagram as well as the overview text.
* Keep all arrows in the "Sequence Flow" diagram flat and linear (single horizontal runs), matching the current visual style.
* Avoid introducing routed bends, multi-segment jogs, or non-linear detours in sequence arrows unless explicitly requested.

## Required Workflow

1. Edit [architecture.md](../../architecture.md) and [architecture.drawio](../../architecture.drawio) together when the architecture changes.
2. Regenerate [architecture.png](../../architecture.png) and [architecture-sequence.png](../../architecture-sequence.png) with [render.js](../../render.js) after draw.io changes.
3. Verify that both rendered previews match the draw.io source before finishing.
4. Avoid introducing terminology in one artifact that is not reflected in the other.

## Validation

* Run `node render.js` after diagram changes.
* Review both regenerated previews for label overlap and flow correctness.
* If the diagram changes, confirm the sequence diagram still tells the same story as the markdown request flow.
* Confirm sequence arrows remain visually flat/linear in [architecture-sequence.png](../../architecture-sequence.png).
