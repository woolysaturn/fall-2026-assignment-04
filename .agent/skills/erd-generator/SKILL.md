---
name : erd-generator
description: Takes domain requirements, makes a Mermaid ERD diagram in docs/architecture/, runs a script to compile to SVG, and files errors if break.
---

# ERD Generator Skill

Use this skill whenever you need to make an ERD, database, diagram, or visual schema:

1. Look at prompt requirements and figure out the tables, primary kets, foreign keys, and relationships.
2. Save the Mermaid code into `docs/architecture/schema.mmd`. Make sure it starts with `erDiagram`.
3. Test if the diagram actually compiles by running this node script: `node .agent/skills/erd-generator/scripts/render_erd.js`.