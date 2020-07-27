# AngularWebApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.4.

See it in action https://angular-web-app-1.web.app/home

# Architectural Summary

* Angular 10 aplication (scaffolded with angular-cli).
* Built around RxJS Observables.
* Consume Rest APIs with Angular HttpClient.
* Handling HTTP Errors.
* Angular Material for displaying product's list.
* Flex-Layout to adapt the list in a responsive way.
* Angular-Router to communicate between tabs.
* Product's list is paginated in order to display certain amount of data per page.
* Sorting mechanism (through the different attributes of each object).
* Unit tested via Karma and Jasmine.
* Minimal styling with Foundation CSS used as the base framework and SCSS used to process custom styles.
* Basic example of async e2e test using new (async/await) Typescript syntax.
* JsonServer to generate mock data on my server folder.
* Facker.js(4.1.0) to populate data on my server folder.
* Build and deploy to Firebase.


# Setup

Install the npm dependencies

```bash
npm install
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
"# angular-web-app" 
