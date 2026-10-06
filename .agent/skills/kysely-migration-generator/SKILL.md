---
name: kysely-migration-generator
description: Takes a Mermaid ERD (like docs/architecture/schema.mmd) and turns it into a Kysely migration file in src/db/migrations/. Use this whenever you need to convert a schema diagram into database tables.
---

# Kysely Migration Generator

This skill converts a Mermaid ERD into a TypeScript database migration using Kysely.

### Workflow Steps

1. **Read the ERD:** Open up `docs/architecture/schema.mmd` and check out the entities, columns, and relationships.
2. **Convert to Kysely Syntax:**
   - **Table Names:** Change entity names to lowercase `snake_case` (e.g., `USERS` becomes `users`, `BOOK_LOANS` becomes `book_loans`).
   - **Primary Keys:** Set up primary keys with auto-incrementing integers (`.integer().primaryKey().autoIncrement()`) or UUIDs depending on what the schema specifies.
   - **Foreign Keys:** Map relationships using `.references('table.id').onDelete('cascade')`.
   - **Relationships:**
     - One-to-Many (`||--o{`): Add the foreign key column on the child table.
     - One-to-One (`||--o|`): Add the foreign key column on the child table and tack on `.unique()`.
3. **Save the File:** Write the migration file to `src/db/migrations/<timestamp>_<migration_name>.ts` (for example, `20261006085300_library_schema.ts`).
4. **Write `up` and `down` Functions:**
   - `up(db: Kysely<any>)`: Create tables in order so that parent tables exist before child tables try to reference them.
   - `down(db: Kysely<any>)`: Drop tables in **exact reverse order** using `db.schema.dropTable('table_name').ifExists().execute()`.
5. **Test Everything:**
   - Run `npm run build` to make sure there aren't any TypeScript errors.
   - Run `npm run migrate:up` to make sure the migration actually runs against the database without blowing up.
