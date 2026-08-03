# HappyTails v3

> Living project brief for humans and AI agents. Update this document as the product evolves.

**Last updated:** 2026-06-26

## Project Snapshot

| Field | Value |
|-------|-------|
| **Name** | HappyTails v3 |
| **Pitch** | HappyTails is an all-in-one pet ecosystem that gives every pet a digital identity containing its documents, medical history, vaccinations, appointments, behavior notes, and service history. Pet owners can manage their pets, book services, and adopt animals, while pet businesses can manage their business, maintain their own CRM, and securely collaborate around shared pet records with the owner's permission. |
| **Target users** | **Primary** — Pet owners who want to manage all information about their pets in one place. **Secondary** — Veterinarians, Groomers, Pet shelters and rescue organizations, Breeders, Pet trainers, Pet sitters and boarding facilities, Dog walkers, Pet photographers, Pet insurance providers (future), Any business offering services related to pets. **Future** — Pet adoption organizations, Government or pet registration authorities (optional), Researchers or animal welfare organizations (optional). |
| **Problem** | Pet information today is scattered across paper records, vet portals, phone photos, and business-specific systems, so owners struggle to keep a complete, up-to-date picture of their pet's identity, documents, medical history, vaccinations, and service history. There is no secure, owner-controlled way to share that information with the businesses they rely on, and pet businesses lack a lightweight CRM and shared-record workflow that respects owner consent. |

## Product Goals

### Version 1 outcomes

- User authentication
- Pet profiles
- Digital pet records
- Document management
- Business verification workflow
- Business profiles
- Service management
- Booking request(send per mailf.ex)
- Customer management (only see requests for now)
- Pet record sharing with owner permission
- Notes and observations
- Notifications
- Search for pet businesses
- Multi-language support

### Success criteria

Pet owners can create an account, add and manage their pets, upload important documents, and securely share pet records with businesses. Verified businesses can create a business profile, receive and manage booking requests, access shared pet information with owner permission, communicate with pet owners, and add notes to pet records. The platform is secure, GDPR-compliant, responsive, multilingual, and provides a seamless experience for both pet owners and businesses.

### Non-goals (for now)

- Replace the starter task demo until the first real feature is ready.
- Premature optimization or large refactors before core workflows exist.

## User Workflows

### Primary workflow

The first thing a user should be able to accomplish.

**Pet Owner**

1. Create an account.
2. Add their first pet.
3. Complete the pet's profile (basic information, documents, vaccinations, medical history, etc.).
4. Start managing their pet, booking services, or exploring pet adoption.

**Pet Business**

1. Create a personal account.
2. Submit a request to create a business account, providing the required business information for verification.
3. Once approved, complete the business profile.
4. Configure offered services, staff, availability, and booking settings.

## Domain Model

Core entities discovered so far:

- User
- Business
- BusinessVerificationRequest
- BusinessMembership
- Pet
- PetOwner
- PetOwnership
- PetProfile
- PetDocument
- Vaccination
- MedicalRecord
- Allergy
- Medication
- HealthCondition
- BehaviorNote
- PetWeightRecord
- Appointment
- Booking
- Service
- ServiceCategory
- AvailabilitySchedule
- StaffMember
- Customer
- Contact
- AdoptionListing
- AdoptionApplication
- Conversation
- Message
- Notification
- Review
- Invoice
- Payment
- FileAttachment
- Address
- Species
- Breed
- EmergencyContact
- ActivityLog

## Feature Roadmap

### Planned

- User authentication
- Pet profiles
- Digital pet records
- Document management
- Business verification workflow
- Business profiles
- Service management
- Booking request(send per mailf.ex)
- Customer management (only see requests for now)
- Pet record sharing with owner permission
- Notes and observations
- Notifications
- Search for pet businesses
- Multi-language support

### In progress

- _None yet._

### Completed

- Starter template: sample `tasks` feature (replace or extend as the product takes shape).

## Product Constraints

### Authentication and roles

**Authentication**

- Users can create a personal account with email/password, and later optionally OAuth.
- Every user starts as a pet owner by default.
- Business access is only available after submitting a business verification request and being approved.

**Roles**

- Platform Admin
- Pet Owner
- Business Owner
- Business Staff

**Permissions**

- **Platform Admin:** approve/reject business verification requests, manage users, manage businesses, moderate content, access platform settings.
- **Pet Owner:** create and manage pets, upload documents, manage pet records, control sharing permissions, request bookings, message businesses, browse businesses.
- **Business Owner:** manage business profile, services, staff, booking requests, customer requests, notes, and shared pet records with owner permission.
- **Business Staff:** access assigned business data depending on permissions, manage booking requests, add notes/observations, view shared pet records, and communicate with pet owners.

**Important rule:** A user account is personal. Business accounts are separate verified entities linked to users through memberships.

### External integrations

- **Email:** Resend
- **Maps & Geocoding:** Google Maps or Mapbox
- **Cloud File Storage:** Cloudflare R2
- **Push Notifications:** (current)
- **SMS:** future
- **Calendar Sync:** Google Calendar, Outlook — future
- **Payment Processing:** Stripe — future
- **OAuth Providers:** Google, Apple — future

### Data sensitivity

- GDPR compliance (EU)
- Data minimization
- Explicit consent for sharing pet records
- Owner-controlled access permissions
- Encryption in transit (TLS) and at rest
- Secure authentication
- Role-based access control (RBAC)
- Audit logs for sensitive record access and modifications
- Data retention and deletion policies
- Right to access/export/delete personal data
- Secure file storage
- Privacy by design
- Regular backups
- EU-hosted infrastructure where possible
- Compliance with applicable veterinary data protection regulations

### Tone and UI style

- Modern, clean, friendly, and trustworthy
- Minimalist interface with a premium feel
- Intuitive navigation
- Soft rounded corners, subtle animations
- Accessible design, mobile-first, responsive
- Light and dark mode
- Card-based layouts, clear typography
- Pet-friendly visuals without feeling childish
- Professional business dashboards
- Consistent design system
- High focus on usability and speed

## Architecture Notes

This project builds on the Workbench starter stack:

- **Frontend:** TanStack Start, TanStack Router, shadcn/ui, Tailwind CSS v4
- **Backend:** Convex (queries, mutations, schema)
- **HTTP API:** Hono + OpenAPI + Scalar
- **Quality:** ESLint, Prettier, TypeScript, Vitest

See [starter-architecture.md](../starter-architecture.md) for monorepo layout and data flow.

Project-specific architecture decisions belong in the **Decisions** section below.

## Decisions

| Date | Decision | Reason | Impact |
|------|----------|--------|--------|
| 2026-06-26 | Initial project brief created via `npm run init-project` | Capture product direction before building | Agents and contributors share one source of truth |

## Open Questions

_No open questions recorded yet._

## Agent Notes

Instructions for AI coding agents working on this project:

1. Read this brief before planning product or feature work.
2. Align new features with **User Workflows** and **Product Goals**.
3. Update **Domain Model**, **Feature Roadmap**, and **Decisions** when you add meaningful functionality or make product choices.
4. Move resolved items out of **Open Questions** into **Decisions**.
5. Keep detailed implementation notes in code and [starter-architecture.md](../starter-architecture.md); use this brief for _what_ and _why_, not every _how_.
