# The Epic Patient Dashboard
### Team 3345's Junior Design Project. 

The goal of this project is to create an easy to use, dynamic, and adapative dashboard for doctors that will allow them to better treat their patients by offering easy information retrieval and automating score calculation and notes writing.

# Release Notes

## Version 0.2.0

### Features
* Patient identifying data, diagnoses, and visit history are now displayed.
* Any displayed data can be removed from the dashboard.
* Made more improvements to the UI.

### Bug Fixes
* Changed API calls to occur on start up, improving performance
* Decreased the number of patients obtained from the API

### Known Issues
* Duplicate patients are still displayed
* Formatting needs to be improved

## Version 0.1.0

### Features
* Patient's name, id, general practicioner, and death status are now displayed.
* Added the ability to add, remove, and search for patients.
* Greatly improved the look and usability of the UI.

### Known Issues
* Various Formatting bugs


# Tech Stack and Project Architecture

The project is a web app consisting of a Next.js frontend framework, with code written in Typescript, with Bootstrap and Tailwind css and a Spring Boot java backend.

We chose Next.js because of its support of server side rendering aswell as easy page routing. We wrote the frontend code in Typescript because it is significantly less code than normal Javascript and is more readable, and Bootstrap and Tailwind give us access to easy to use and beautiful UI elements.

We chose Springboot because it is the best choice for developing your backend in Java given its easy of use and minimal boilerplate/setup.

# Milestones

## Milestone 1: Initial Project Setup and MMF 1
### 11-26-2023
**Milestone Rationale:**
We decided that our best bet for Milestone 1 would be to do as much foundational work as possible in addition to delivering on MMF 1. This included setting up:
1. A sign-in page
2. A dashboard frontend that showed a list of patients along with basic relevant information on them
3. A fully fleshed out backend that could parse json files and pass relevant information to the frontend
   
After setting that up we moved on to implimenting MMF 1, which would allow users to modify the patient list. This meant:
1. Users can remove patients they no longer wish to see, but can add those patients back at any time
2. Users can add patients that were not already visible
3. Caching patient data on the frontend so that new requests do not need to be send to the backend to retrieve patient information
   
This was all done by essentially having one "master" list of patients, and one "display" list of patients. Users can directly modify the display list to show who they want, and can always add back patients from the "master" list.

# How do I run this project?
Once you have the project downloaded make sure you install all relevant dependencies (Next.js, node.js, Boostrap/Popper, Springboot).
Navigate to 'frontend\next\epicdash' and run 'npm run dev' to start the frontend.
Then to start the backend, navigate to 'backend\src\main\java\com\JD3345\backend\BackendApplication.java' and run the main method, or alternatively run the jar (backend-0.0.1-SNAPSHOT.jar) in the repo instead.

For the sign-in page, the username is "TestDoctor" and the password is "TestPassword".


