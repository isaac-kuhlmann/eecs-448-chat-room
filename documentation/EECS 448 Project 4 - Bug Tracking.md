# Bugs

List of bugs found by the team

## Mobile Login Handles do not work:
  - **Date**: 11/01/2020
  - **Reported by**: Will Thomas
  - **Description**: When users try to login from a mobile phone the username that they provide will not work and is instead set to the default username "defacto"
  - **Date Fixed**: 11/07/2020
  - **Fixed by**: Will Thomas
  - **Fix Description**: The functionality to fix this bug was actually extremely closely related to the functionality to fix the lastChannel bug for new users, fixing that bug fixed this bug as well.

  ## Return to Last Channel Login not working:
  - **Date**: 11/07/2020
  - **Reported by**: Will Thomas
  - **Description**: When a pre-existing user would attempt to re-login to the chat app, the last channel that they had visited was not being set to the last channel from the database, and they would isntead rejoin the default chatroom "Chatroom" every time
  - **Date Fixed**: 11/08/2020
  - **Fixed by**: Will Thomas
  - **Fix Description**: To fix this bug, the handling of the login within the main App react component was modified, the user was being set too soon for the lastChannel to be set, and this would caused the last channel to be set as undefined, and then never get changed, only for pre-existing users

  ## New User Last Channel crashes site:
  - **Date**: 11/01/2020
  - **Reported by**: Will Thomas
  - **Description**: When a new user is created, they are not default given a lastChannel property and this causes the site to crash as it attempts to set the component state to undefined
  - **Date Fixed**: 11/07/2020
  - **Fixed by**: Will Thomas
  - **Fix Description**: This bug was fixed by changing how new users are registered within the database, the creation of a default chatroom "Chatroom" for all people to join into immediately fixed this problem by then having all new users have the lastChannel property set to the default chatroom.
  
  ## Too many Chats Fills Screen:
  - **Date**: 11/08/2020
  - **Reported by**: Will Thomas
  - **Description**: When too many chats are sent in a single chat room, the chat log will fill so full that it will move below the current list meant to hold all of the chats
  - **Date Fixed**: NA
  - **Fixed by**: NA
  - **Fix Description**: NA