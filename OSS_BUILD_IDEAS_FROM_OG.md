# internal Core -> OSS Build Ideas (Feature Backlog)

This document compares `envisioning-core` (internal) against `envisioning-core-oss` and lists capabilities that exist in internal but are not in OSS today.

Use this as a menu of things OSS users can build next.

## Scope of comparison

Compared codebase areas:
- `src/app` routes/pages (UI + API)
- `src/components` feature modules
- `src/lib` actions/services/integration modules
- `docs/` and migration footprint for internal-only capabilities

Snapshot date: 2026-02-28.

## 1) internal-only page types and workspaces

## 1.1 CRM page types beyond OSS

internal has several protected dashboard sections that OSS does not include yet:
- Activity feed: `/dashboard/activity`
- Assistant: `/dashboard/assistant`
- Emails: `/dashboard/emails`
- Interactions (meeting/call notes): `/dashboard/interactions`
- Leads pipeline: `/dashboard/leads`
- Licenses: `/dashboard/licenses`
- Milestones: `/dashboard/milestones`
- Tasks: `/dashboard/tasks`
- Policies: `/dashboard/policies`
- Readiness analytics: `/dashboard/readiness`

Settings depth in internal is also larger:
- Currencies + exchange rates
- Contact/lead characteristics
- Integrations (email)
- Calendar booking settings
- Zapier settings
- Offer analytics settings

## 1.2 Public page types beyond OSS

internal exposes multiple public experiences, not only public offer viewing:
- Public lead capture/config flows (`/form`, plus API endpoints)
- Public readiness assessment and results (`/form/readiness/...`)
- Public meeting booking pages (`/meet/[username]` and cancel/reschedule flows)
- Public project views (`/projects/view/[id]`)
- Expanded public offer flows (confirm/extend/billing/service-inputs/preview endpoints)

## 1.3 CMS/website workspace (separate from CRM)

internal includes a second workspace under `/website` with many CMS entity types:
- Events
- Methodology
- Newsletter issues
- Partners
- Research
- Reports
- Technologies
- Tags
- Services (with FAQs, logos, testimonials)
- Work (deliverables, weblinks, testimonial linking)
- Temp radars

This workspace pattern is not present in OSS.

## 2) internal-only customization systems

## 2.1 Dual data-space architecture

internal supports separate CRM + CMS data spaces and env-driven routing:
- CRM default (`/dashboard`)
- Optional CMS project (`/website`)
- Data-space switcher + cookie preference + route-based resolution
- Separate Supabase credentials for CRM and CMS

OSS currently uses a single Supabase data space.

## 2.2 Configurable characteristics and taxonomy

internal contains richer schema-driven customization for:
- Contact characteristics
- Lead characteristics
- Settings lists and metadata-driven filters
- Extended unified form relation panels (lead/license/milestone/task relations)

## 2.3 Advanced commercial configuration

internal extends the current OSS offer model with:
- License-linked sales flows
- Milestone/service dependencies and upstream service linkage
- Richer public offer acceptance lifecycle (preview/confirm/extend)
- Billing/service-input helpers and prefill endpoints

## 2.4 Workflow customization

internal has broader workflow infrastructure:
- Kanban-oriented status handling for leads/tasks
- Activity events stream and pruning jobs
- Task ownership + status APIs
- More entity-specific server actions

## 3) internal-only integrations and automations

## 3.1 Google + Gmail integration

internal includes endpoints/services for:
- Google OAuth start/callback
- Gmail sync/push/backfill/status
- Linking email data into CRM interactions

## 3.2 Calendar booking integration

internal includes full booking infrastructure:
- Calendar settings API
- Public availability lookup
- Booking creation/cancel/reschedule/tokenized booking pages
- ICS generation and availability feeds

## 3.3 Zapier/webhook integration

internal provides:
- Zapier interaction ingestion endpoint
- API token management for secure webhook auth
- Delivery logs/monitoring-oriented settings

## 3.4 Messaging/media integrations

internal includes modules for:
- Postmark email service patterns
- Slack webhook service
- Cloudinary uploads (including upload-by-url)
- Newsletter subscriber/import tooling

## 3.5 Currency and market data

internal includes:
- Exchange-rate service + refresh APIs
- Public exchange-rate/currency endpoints
- Currency conversion hooks/services

## 4) High-value feature packs OSS users can build

## Pack A: Revenue operations expansion
- Leads + interactions + tasks + milestones + licenses
- Kanban boards and ownership views
- Relationship graph between offers/projects/milestones

## Pack B: Public pipeline automation
- Public lead form with tokenized follow-up flow
- Rich public offer acceptance lifecycle (confirm, billing, extend)
- Automated creator/share links and analytics

## Pack C: Integrations suite
- Gmail ingestion + interaction auto-linking
- Calendar booking pages + host settings
- Zapier inbound webhooks with idempotency + logs

## Pack D: CMS workspace in OSS
- Add optional `/website` space with separate Supabase project
- Start with 2-3 CMS entities (research, technologies, events)
- Add dual-workspace switcher and shared auth

## Pack E: Personalization + scoring
- Custom characteristics (contacts/leads)
- Readiness assessment forms and scoring dashboards
- Radar/chart components for profile and trend visualization

## 5) Suggested implementation order for OSS users

1. Add leads/interactions/tasks (most immediate CRM value).
2. Add Gmail + calendar integration (highest automation lift).
3. Add tokenized public lead flow + richer public offer acceptance.
4. Add dual data-space support and a first CMS entity set.
5. Add readiness scoring/custom characteristics as advanced modules.

## 6) Quick evidence pointers in internal repo

Core-only route clusters:
- `src/app/dashboard/{leads,interactions,tasks,milestones,licenses,policies,readiness,assistant,emails,...}`
- `src/app/api/{gmail,google,calendar,meet,zapier,exchange-rates,tasks,milestones,leads,public/readiness,...}`
- `src/app/website/**`

Core-only service/modules:
- `src/lib/services/{calendar-service,email-service,exchange-rate-service,ics-generator,slack-service,...}`
- `src/lib/{data-space-config,data-space-resolver,linkedin-import,newsletter-subscribers,...}`
- `src/components/features/{assistant,kanban,readiness,...}`

---

If useful, this can be split next into a phase-by-phase OSS roadmap with estimated complexity and required schema/API changes per feature pack.
