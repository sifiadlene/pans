---
description: "Workflow guidance for keeping the PAN architecture markdown, draw.io source, and rendered previews in sync"
applyTo: 'architecture.md|architecture.drawio|architecture.png|architecture-sequence.png|render.js'
---

# PAN Architecture Workflow

Use this guidance when updating the PAN routing architecture artifacts.

## Scope

* Keep [architecture.md](../../architecture.md) and [architecture.drawio](../../architecture.drawio) aligned.
* Every diagram tab in [architecture.drawio](../../architecture.drawio) must have a corresponding rendered image file (e.g. `<diagram-name>.png`).
* Treat [architecture.png](../../architecture.png) as the rendered preview for the "Agentic Router Architecture" diagram.
* Treat [architecture-sequence.png](../../architecture-sequence.png) as the rendered preview for the "Sequence Flow" diagram.
* When a new diagram tab is added, a matching output image file must also be produced and committed.
* Use [render.js](../../render.js) to regenerate all diagram images after draw.io edits.

## Conventions

* Update the markdown narrative and the diagram in the same change when the routing flow changes.
* Keep the request flow, component names, and edge labels consistent across both artifacts.
* Prefer the same terminology in both files for intent extraction, semantic routing, PAN selection, query fan-out, and result synthesis.
* If the routing sequence changes, update the sequence section in the diagram as well as the overview text.
* Keep all arrows in the "Sequence Flow" diagram flat and linear (single horizontal runs), matching the current visual style.
* Avoid introducing routed bends, multi-segment jogs, or non-linear detours in sequence arrows unless explicitly requested.

## Required Workflow

1. Edit [architecture.md](../../architecture.md) and [architecture.drawio](../../architecture.drawio) together when the architecture changes.
2. Run `node render.js` after any draw.io change to regenerate image files for **all** diagram tabs.
3. When adding a new diagram tab, ensure [render.js](../../render.js) is updated to export that tab to a named `.png` file.
4. Verify that every rendered image matches its draw.io source tab before finishing.
5. Avoid introducing terminology in one artifact that is not reflected in the other.

## Validation

* Run `node render.js` after diagram changes.
* Confirm an image file exists for every diagram tab in [architecture.drawio](../../architecture.drawio).
* Review all regenerated images for label overlap and flow correctness.
* If the diagram changes, confirm the sequence diagram still tells the same story as the markdown request flow.
* Confirm sequence arrows remain visually flat/linear in [architecture-sequence.png](../../architecture-sequence.png).
