# BODY20 East Cobb — QR Landing Page TODO

## Initial Build
- [x] Hero section with Jen portrait and headline
- [x] iframes.ai voice widget integration
- [x] Book Assessment button (links to body20.com/location/east-cobb)
- [x] Call Us button
- [x] Request Callback button
- [x] CallModal with form
- [x] Google Review Strip
- [x] Member Testimonials section
- [x] What Is EMS section
- [x] Authority Quotes section
- [x] Booking Section
- [x] Longevity Section
- [x] Sticky Booking Bar
- [x] Footer
- [x] Header with logo and phone number

## UI Fixes & Improvements
- [x] Fix overlay blocking iframes.ai widget tap (removed overlay, show iframe directly)
- [x] Add hint arrow pointing to widget
- [x] Increase "Tap the green button to speak with Jen" font size (1.35rem)
- [x] Remove "Free" from "Book Free Assessment" → now "Book Assessment"
- [x] Call Us button: mobile = tel: link to dial 770-450-6127, desktop = plain number display (no Skype)
- [x] Upgrade project to full-stack (web-db-user) for Twilio backend support
- [x] Add Twilio SMS backend route (leads.requestCallback) — sends SMS to 770-450-6127
- [x] Wire CallModal to real Twilio SMS via tRPC mutation
- [x] Fix CallModal on mobile: submit button cut off, Best Time dropdown not scrollable

## Chat with Jen Feature
- [x] Database schema: chat_sessions and chat_messages tables
- [x] Backend tRPC routes: chat.start, chat.sendMessage (LLM), chat.end, chat.sendTranscript (Twilio SMS)
- [x] JenChat frontend component: branded chat panel with Jen portrait, message bubbles, SMS transcript option
- [x] Wire Chat with Jen button into OrbSection between speak button and booking buttons
- [x] Fix Chat with Jen button placement — move closer to widget for better visual symmetry
- [x] Build /admin/chats transcript viewer: session list + full message thread view, password-protected
- [x] Replace placeholder JEN_SYSTEM_PROMPT with full Centerfy prompt + Chat Optimization Layer v1.0
- [x] Add SMS transcript request button and phone number input flow to JenChat component
- [x] Add persistent Get Transcript button to JenChat header (always visible, toggles transcript form)
- [x] Reduce gap between green orb widget and Chat with Jen button in OrbSection
