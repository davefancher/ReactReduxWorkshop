# React/Redux Workshop Outline

## Welcome!

* Housekeeping
* Facilities
* Introductions

## Prerequisite Checks

* Install [node/npm](https://nodejs.org/en/download/) - get latest recommended version
* Install [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) extension
* Clone the samples repository for easy access to workshop materials

<hr />

## Part 1: Introducing React

<!-- Whiteboard Stuff -->

* What is React?
* Anatomy of a React application
    * Components
    * Props - read-only; the static pieces
    * State - updatable; the pieces that change
* Data *always* flows downward

<hr />

## Part 2: My First React Project (Overview & Setup)

Throughout the workshop we'll gradually build out an application that allows us to interact with some data from [An API of Ice and Fire](https://anapioficeandfire.com/). The application will be a great foundation for continuing study as it will be loaded with examples of how to accomplish a variety of tasks with React and Redux.

*Demo: The finished app*

The initial setup for a React application can be a bit tedious but it's important to see how the various packages interact to make our application work. There are some tools such as ```create-react-app``` to automate some of this but since it's only necessary once per project we'll take the time to walk through the process today.

### Initialize a repository

**Optional but recommended**

```bash
git init
```

Copy ```.gitignore``` from the ```Part2``` folder.

### Initializing the npm package:

```bash
npm init
```

Accept the defaults. You should now have a basic ```package.json``` file

### Installing React

Now we'll install the core React components: react and react-dom

```bash
npm install react react-dom --save
```

*Note that ```install``` can be shortened to ```i``` in each of the ```npm``` commands.*

These packages provide all of React's core functionality and the entry point for rendering React components.

### Installing Babel

Although it's possible to write a React application with "vanilla" JavaScript it's far more convenient (and productive!) to use React's JSX extension which allows us to specify components with a markdown-like syntax. In order to achieve this we'll need a transpiler that knows how to convert JSX to JavaScript. That's where Babel comes in.

```bash
npm install babel-core babel-loader babel-preset-env babel-preset-es2015 babel-preset-react babel-preset-stage-2 css-loader  --save
```

Here we've installed several packages that include the core Babel functionality along with some extensions to handle ES6 and JSX.

### Installing Webpack and the Dev Server

As our application grows in complexity we'll quickly find ourselves wanting to better organize our code but that brings along another set of challenges such as how to package and deploy all that code. Webpack solves that problem by providing a convenient bundling system. Let's add that to our project now.

```bash
npm install webpack webpack-dev-server react-hot-loader@3.0.0-beta.7 --save
```

While we're still installing packages, let's also take care of adding some additional packages for compiling [SASS](http://sass-lang.com) sheets as well. We won't be doing much custom styling today but we might as well include them.

```bash
npm install --save-dev node-sass sass-loader css-loader style-loader
```

### Configuring Babel and Webpack

Now that Babel and Webpack are installed we need to configure them. Copy both ```.babelrc``` and ```webpack.config.js``` from the ```Part2``` folder.

Babel uses the ```.babelrc``` file to identify which transformers to use to convert our modern JSX code to JavaScript.

Similarly, Webpack uses the ```webpack.config.js``` file to identify not only what to build but also how to build it and to host it with the webpack dev server.

*We could also have used the [Express](http://expressjs.com/) server here but the Webpack dev server works really well with Webpack and supports easy hot reloading of modules.* 

### Creating the Basic Application Structure

If you look at the ```webpack.config.js`` file you'll see a few specific paths referred to throughout the file. These paths describe the compilation entry point as well as the output destination. Let's create the structure that Webpack is expecting to find. (Note that Webpack will automatically create the destination files and folders.)

We'll start with the ```dev``` folder which will contain our JavaScript and SASS code.

```bash
mkdir dev
```

Next, let's add an ```index.html``` file in our application root. You can copy the file from the ```Part2``` folder.

Finally, let's add the ```index.jsx``` and ```site.scss``` files to the ```dev``` folder. You can again copy these from the ```Part2``` folder.

### Configuring Build and Start Scripts

The last step before we can start building our React application is to configure some build and start scripts that tell node what to do when ```npm build``` or ```npm start``` are executed. To do so, open the ```package.json``` file and add the following two lines to the ```scripts``` node:

```javascript
"build": "webpack --config ./webpack.prod.config.js --progress --colors",
"start": "webpack-dev-server --open"
```

### Building the Project

All of the required packages and configuration should now be in place so we can *finally* compile some code! Go ahead and run:

```bash
npm start
```

This will compile the code and start the ```webpack-dev-server```. It will also open your default browser and navigate to the new page.

Congratulations! Your app is now configured!

<hr />

## Part 3: My First React Project: Hello World

In the last section we built created our workspace and imported all the necessary components to build a simple React application but we haven't actually started using React yet since all we're serving up is some HTML.

In this section we'll begin building out the  application we previewed at the beginning of the last section.

### Defining a Component, the Functional Way

In keeping with software development tradition let's begin our introduction to React with a simple "Hello World" component. For convenience we'll define this first component directly within the ```/dev/index.jsx``` file.

```javascript
function HelloWorld () {
    return (
        <div>Hello world!</div>
    )
}
```

The above snippet defines a very simple component called ```HelloWorld```. Let's take a moment to examine the code before we begin using it.

Of particular importance here is how this appears to be a blend of JavaScript and HTML. This is JSX - a declarative extension to JavaScript that lets us write logic in JavaScript while expressing the resulting element(s) in their natural form.

It's important to note, however, that the ```HelloWorld``` fuction does not return HTML but instead returns a specialized React object; the JSX syntax is syntactic sugar over much more verbose JavaScript function calls.

*Since you'll almost never use the long-form we won't cover it here.*

Another important item of note is that all React components must return one of the following:

* A single root element (such as ```div```)
* A single value
* ```null```

This restriction exists because again, we're just building JavaScript objects.

Now that we have our component and understand a bit of what's going on, let's see how to start using it within our application.

### Using the HelloWorld Component

To use the ```HelloWorld``` component within the application we need to tell our page about it. Because we're working within the ```index.jsx``` file for the time being, all we need to do is tell React to put it on the page. This is where the ```ReactDOM.render``` function comes into play.

Below the ```HelloWorld``` definition enter the following:

```javascript
ReactDOM.render(
    <HelloWorld />,
    document.querySelector("#container")
);
```

```ReactDOM.render``` accepts two arguments:
1. The component to render
2. A reference to the element where the component will be rendered.

Now save the file and observe the change within your browser window. Provided that the ```react-hot-loader``` package is installed and configured correctly within webpack you should see this change reflected automatically.

Notice how we represented the ```HelloWorld``` as a JSX element rather than invoking the function. Babel knows to look for a function that matches the element name. It also knows how to pass additional information to that function so it can be used within the component.

Speaking of which...

### Hello Props

```props``` are one of the mechanisms we can use to pass data down to a component. They typically represent specific display elements or other things that affect formatting.

Let's add some props to change the text that the ```HelloWorld``` component renders.

First we'll need to modify the ```HelloWorld``` function as follows:

```javascript
function HelloWorld (props) {
    return (
        <div>Hello {props.firstName} {props.lastName}!</div>
    )
}
```

Here we've changed ```HelloWorld``` to accept a parameter named ```props```. This name is by convention. ```props``` represents an object that contains all of the data passed down to the component, in this case, the ```firstName``` and ```lastName``` values.

So how do those values get passed to the component? Simple. We add them as attributes to the JSX element!

```javascript
ReactDOM.render(
    <HelloWorld firstName="Dave" lastName="Fancher" />,
    document.querySelector("#container")
);
```

With the above modifications in place save the file and observe how the component renders the name you supplied.
<hr />

## Appendix A: Resources

* [webpack](https://webpack.github.io/)
* [webpack dev server](https://webpack.github.io/docs/webpack-dev-server.html)
* [Babel](https://babeljs.io/)
* [React](https://facebook.github.io/react/)
* [React-Router](https://reacttraining.com/react-router/)
* [Redux](http://redux.js.org/)

<hr />

## Appendix B: Tutorials

* [Facebook](https://facebook.github.io/react/tutorial/tutorial.html)
* [Kirupa](https://www.kirupa.com/react/)