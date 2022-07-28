# Todo App

**There are two ways the TODOS are implemented here:**

- **Using Data Binding only:** Using this method leads to creating custom events in order to catch the updates from the parent element. ALso leads to a lot of redundant code.
- **Using Services:** This is the ideal approach. Since, services can be directly used to manage updates. There is no need to create custom events to catch certain updates.
