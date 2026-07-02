---
description: "Workflow guidance for keeping the PAN architecture markdown, draw.io source, and rendered preview in sync"
applyTo: 'architecture.md|architecture.drawio|architecture.png|render.js'
---

# PAN Architecture Workflow

Use this guidance when updating the PAN routing architecture artifacts.

## Scope

* Keep [architecture.md](../../architecture.md) and [architecture.drawio](../../architecture.drawio) aligned.
* Treat [architecture.png](../../architecture.png) as the rendered preview of the draw.io source.
* Use [render.js](../../render.js) to regenerate the preview after diagram edits.

## Conventions

* Update the markdown narrative and the diagram in the same change when the routing flow changes.
* Keep the request flow, component names, and edge labels consistent across both artifacts.
* Prefer the same terminology in both files for intent extraction, semantic routing, PAN selection, query fan-out, and result synthesis.
* If the routing sequence changes, update the sequence section in the diagram as well as the overview text.

## Required Workflow

1. Edit [architecture.md](../../architecture.md) and [architecture.drawio](../../architecture.drawio) together when the architecture changes.
2. Regenerate [architecture.png](../../architecture.png) with [render.js](../../render.js) after draw.io changes.
3. Verify that the rendered preview matches the draw.io source before finishing.
4. Avoid introducing terminology in one artifact that is not reflected in the other.

## Validation

* Run `node render.js` after diagram changes.
* Review the regenerated preview for label overlap and flow correctness.
* If the diagram changes, confirm the sequence diagram still tells the same story as the markdown request flow.
