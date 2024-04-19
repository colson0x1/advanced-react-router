### Todo List: Advanced React Router App (Data Fetching & Submission)

1. **Add New Page Components:**

   - HomePage
   - EventsPage
   - EventDetailPage
   - NewEventPage
   - EditEventPage

2. **Add Routing & Route Definitions:**

   - `/` => HomePage
   - `/events` => EventsPage
   - `/events/<some-id>` => EventDetailPage
   - `/events/new` => NewEventPage
   - `/events/<some-id>/edit` => EditEventPage

3. **Implement Root Layout:**

   - Add a root layout that includes the `<MainNavigation>` component above all page components.

4. **Implement MainNavigation Links:**

   - Add properly working links to the `MainNavigation`.

5. **Active Link Styling:**

   - Ensure that the links in `MainNavigation` receive an "active" class when active.

6. **Output Dummy Events:**

   - Output a list of dummy events to the `EventsPage`.
   - Each list item should include a link to the respective `EventDetailPage`.

7. **Display Selected Event ID:**
   - Output the ID of the selected event on the `EventDetailPage`.

#### Additional Features:

- Add another (nested) layout route that includes the `<EventNavigation>` component above all `/events...` page components.
