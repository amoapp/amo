# /firebase
Folder containing all the constants and functions related to Firebase.

## Files
- `references.ts`: Contains the references to memory addresses for DATABASE, REALTIME, and STORAGE. This file could be broken up into those three segments as the application grows.
- `api.ts`: Contains the functions that perform **grouped actions** on the backend. Grouped actions, as opposed to singular actions, are a group of changes to one or more services that act as one unit. As an example, `setProfilePicture` is a group action as it uploads an image to the Storage Bucket, and also fetches the download URL of the uploaded image and sets it to the user object on Realtime Database.
