# Changelog

All notable changes to OzMath will be documented in this file.

# To be integrated:
- Corca.app in written responses once the application becomes open source.
- Voice-to-text and drawing-to-text in written responses

### Changes
06/04/2025
- finished adding all problems from all 2022 papers & finalised marking solutions for all existing problems
- fixed problemview bug showing grading solution
  
03/04/2025
- slight about and landingpage changes

01/04/2025:
- busy week... added a few problems to the database (finished paper1 2022)
- changed study plan design to dynamic sliding, fixed
- updated project overview slightly
  
24/03/2025:
- fixed bugs in study plan
- changed pricing and plans for ozpremium
- slight optimisations to mobile view

22/03/2025:
- massive change to home page!
<img width="800" alt="image" src="https://github.com/user-attachments/assets/d1fa4b8a-8b46-4b75-8523-7f64cdb7cb7f" />

  To

<img width="800" alt="image" src="https://github.com/user-attachments/assets/1276fa25-4165-4305-b997-60496c27b538" />


- inspired by leetcode
- fixed back arrow ending test in test mode
- no longer saving tests where the user does not answer at least one problem


18/03/2025:
- redesigned authmodal and landingpage

05/03/2025:
- adding Google OAuth API so users can sign up/in using their Google account

-- University begins 

24/02/2025-27/02/2025:
- redesigned problem view, sliding mirror design using DOM 
- filling in problems, fixed text wrapping

21/02/2025 - 24/02/2025:
- adding specialist page/questions: test tagging, modals, mobile compatibility
- filling in more problems
  
20/02/2025:
- tuning OpenAI API to mark more accurately, and award full marks given correct answer without working out
- redesigning ProblemView
- adding problems to problembase, fine tuning solutions to all problems

19/02/2025:
- added css transitions to first page loads and refreshing
- improved initial mockup rendering
- updated github readme

18/02/2025:
- changed font and fixed text editor spacing issues
- add css transitions to mobile tab dropdown and landingpage-to-problems
- general reformatting; making buttons uniform, cleaning up UI, compacting topbar
  
01/02/2025 - 17/02/2025:
- Troubleshooting/refactoring components
- Revamping text editor space, implementing MathQuill
- Colour retheme, updated landingpage, updated favicon and logo
  
31/01/2025:
- Finalised QCAA 2023 problems to problembase
- Added donation button in about page
  
30/01/2025:
- Added API requests tracker in user settings modal
- Updated & automated count resetter for 12AM AEST daily, instead of hourly.
- Added Premium Hub tab for premium users
- Fixed bugs:
     - multi choice selections remain after clicking next problem
     - user's multi choice isnt displayed in test review  
- Adding more problems to the problembase
  
29/01/2025:
- Stripe integrated, premium features:
     - themes
     - crown icons in social and header
     - rate limit increase
- Bug fixes 

28/01/2025:
- Landing page improved, mockups designed

01/01/2025 - 27/01/2025:
- Mobile compatibility finalised:
     - sliders added to problem and answer descriptions
     - test review problem description hidden on smaller devices (hidden md:block) 
  
28/11/24:
- Made public repository without .env or /public for safety
- Fixed redirects, refreshing bugs
- Fixed navigation bugs from SocialPage
- Added video solution tag to ProblemList
- Added GitHub icon and link to About page
- Implemented themes entirely

### Known Bugs 
- Test does not save unless 'Return to problems' is clicked
- Video solution not available for viewing past tests from user or friends
- Back arrow in tests instantly ends test
- Video solutions do not play on chrome on dekstops, laptops. 

