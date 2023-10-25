# UNDER CONSTRUCTION
# Fridge Manager - A Web Application for managing your Grocery Stocks

  
> "Fridge Manager" is a Fullstack project, developed during my spare time, using Java Spring Boot Backend Development and React / TypeScript Frontend Development as well as a MongoDB Database Connection.

## SonarCloud
### backend
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=ben-21_fridge-manager-backend&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=ben-21_fridge-manager-backend)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ben-21_fridge-manager-backend&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ben-21_fridge-manager-backend)

### frontend
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=ben-21_fridge-manager-frontend&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=ben-21_fridge-manager-frontend)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ben-21_fridge-manager-frontend&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ben-21_fridge-manager-frontend)


## Table of Contents

- [Overview](#overview)
- [CI / CD](#ci--cd)
- [Wireframes](#wireframes)
- [Models / Database-Structure](#models-and-database-structure)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Usage](#usage)
- [License](#license)

## Overview

The deployed project can be found at [Fridge Manager](https://fridge-manager.schaefer-inet.de)  
**Please consider that the main focus of the app is on the backend. The frontend is only designed to represent the functional character of the app.**

Title: Fridge Manager - A Web Application for managing your Grocery Stocks

Summary:

## CI / CD
The project runs on my own cloud server and is developed using continous integration and contionous deployment. For this I set up a  NGINX-Webserver and a Docker Environment. My App, the NGINX-Webserver and Certbot (for SSL Certificates) run as a container. All is configured and started using one Docker-Compose file. 
CI and CD is triggered by merging a branch into the Main-Branch. For both I used Github Actions (build with Maven and SonarCloud for CI - own yml. Files for CD to my DigitalOcean Cloudserver).

## Wireframes


## Models and Database Structure






## Tech Stack

- Java
- Spring Boot
- Maven
- JUnit
- TypeScript
- React
- MongoDB
- REST
- Docker
- Docker Compose
- NGINX Webserver
- Certbot (SSL)
- DigitalOcean Cloud Server

## Features


## Usage


## License

Copyright [2023] [Ben-21]

---

