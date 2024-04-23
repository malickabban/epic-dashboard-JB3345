# The Epic Patient Dashboard
### Team 3345's Junior Design Project. 

The goal of this project is to create an easy to use, dynamic, and adapative dashboard for doctors that will allow them to better treat their patients by offering easy information retrieval and automating score calculation and notes writing.

# Install Guide

* For the sign-in page, the username is "TestDoctor" and the password is "TestPassword"

### Pre-requisites
* There are no hardware requirements for running this project
* The backend for this application is written using Java, so to run the application locally Java must be configured on the machine
### Dependencies
* Dependencies for this project include Springboot for the backend and Next.js, node.js, and Boostrap/Popper for the frontend
### Download Instructions
* This project can be downloaded directly from this repository, either by cloning it locally or downloading the zip file
### Build Instructions and Installation
* This project is intended to run within the Epic system using SMART.

Installation: 
* Make sure you have Node.js on your device (https://nodejs.org/en/download).
* Navigate to 'frontend\next\epicdash' folder and run 'npm install' to install all necessary packages you need.
### Run Instructions
* If you cloned the project, open it directly
* If you download a zip, upack the zip and open the project
* After all dependencies are installed, navigate to 'frontend\next\epicdash' and run 'npm run dev' to start the frontend. Then, navigate to 'backend\src\main\java\com\JD3345\backend\BackendApplication.java' and run the main method to start the backend. Alternatively to run the backend, run the jar (backend-0.0.1-SNAPSHOT.jar) in the repo instead
### Troubleshooting
A common error when installing:
* You're not in the right folder. Make sure to properly navigate to 'frontend\next\epicdash'.
* Open the folder in this order: epic-dashboard > frontend > next > epicdash

# Release Notes

## Version 1.0

### Features
* Added the patient bio data section (containing basic data, observations, conditions, and history)
* Added the score calculation section and score breakdown page
* Added the diagnostic notes section
* Completed the nav bar with Help and Privacy Policy pages

### Bug Fixes
* The Help page is now visible from the sidebar
* Score calculation for CHADS2VASc has been corrected
* Diagnosis notes now update across different patients

### Known Issues
* The delete button on the score calculation page does not work across scores, only the one currently searched for


## Version 0.4.0

### Features
* Diagnostic notes section added
* Notes detailing each score calculated are now displayed
* Diagnostic notes can be added to and removed from the diagnostic notes section

### Bug Fixes
* Changed API calls so correct patient data is obtained
* Updated frontend score display so correct data is displayed in each category

### Known Issues
* Several instances of each patient with different data are obtained from the server, need to detect this and diplay all data for each patient on the same screen
* UX needs to be improved

## Version 0.3.0

### Features
* Patient medical scores section complete
* Medical score page added
* Scores can be added to and removed from medical score page

### Bug Fixes
* Changed API calls so no duplicate patients are obtained
* Altered privacy of patient object fields so data is available to frontend

### Known Issues
* Current patients obtained from API do not contain enough data (conditions, encounters, diagnoses)
* Formatting needs to be improved

## Version 0.2.0

### Features
* Patient identifying data, diagnoses, and visit history are now displayed
* Any displayed data can be removed from the dashboard
* Made more improvements to the UI

### Bug Fixes
* Changed API calls to occur on start up, improving performance
* Decreased the number of patients obtained from the API

### Known Issues
* Duplicate patients are still displayed
* Formatting needs to be improved

## Version 0.1.0

### Features
* Patient's name, id, general practicioner, and death status are now displayed
* Added the ability to add, remove, and search for patients
* Greatly improved the look and usability of the UI

### Known Issues
* Various Formatting bugs

# Tech Stack and Project Architecture

The project is a web app consisting of a Next.js frontend framework, with code written in Typescript, with Bootstrap and Tailwind css and a Spring Boot java backend.

We chose Next.js because of its support of server side rendering aswell as easy page routing. We wrote the frontend code in Typescript because it is significantly less code than normal Javascript and is more readable, and Bootstrap and Tailwind give us access to easy to use and beautiful UI elements.

We chose Springboot because it is the best choice for developing your backend in Java given its easy of use and minimal boilerplate/setup.



