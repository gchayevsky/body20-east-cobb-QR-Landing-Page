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
