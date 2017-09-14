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

In this section we'll begin gradually building out the application we previewed at the beginning of the last section.

### Defining a Component, the Functional Way

In keeping with software development tradition let's begin our introduction to React with a simple "Hello World" component. For convenience we'll define this first component directly within the ```/dev/index.jsx``` file.

```javascript
function HelloWorld () {
    return (
        <div>Hello world!</div>
    )
}
```

The above snippet defines a very simple functional component called ```HelloWorld```. As you probably guessed, functional components are so named because they're defined as JavaScript functions. Let's take a moment to examine the code before we begin using it.

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

So how do those values get passed to the component? Simple. We add them as attribute-like arguments to the JSX element!

```javascript
ReactDOM.render(
    <HelloWorld firstName="Dave" lastName="Fancher" />,
    document.querySelector("#container")
);
```

With the above modifications in place save the file and observe how the component renders the name you supplied.

### Hello Props Expressions

Because JSX is more closely related to JavaScript than it is to HTML, we're not restricted to passing only simple values to our components. For example, if we wanted to pass values from an object to a component we could do something like the following:

```javascript
var me = { firstName: "Dave", lastName: "Fancher" };

ReactDOM.render(
    <HelloWorld firstName={me.firstName} lastName={me.lastName} />,
    document.querySelector("#container")
);
```

Of particular importance here is the fact that we replaced the quotes in our ```HelloWorld``` definition with curly braces. This tells the compiler that the value for those individual props is the result of an expression - in this case some properties of an object called ```me```. In fact, any valid JavaScript expression can appear within the braces thus allowing for some rather powerful techniques, some of which we'll look at a bit later but to showcase the capability lets extend our example just a bit further.

```javascript
const getUserInfo = () =>
    ({
        firstName: "Dave",
        lastName: "Fancher"
    });

function HelloWorld (props) {
    return (
        <div>Hello {props.user.firstName} {props.user.lastName}!</div>
    )
}

ReactDOM.render(
    <HelloWorld user={getUserInfo()} />,
    document.querySelector("#container")
);
```

In this final revision we've made several modifications:

1. We added a ```getUserInfo``` function to return some information about a user. You can imagine this function returning some data from a persisted JWT token or other source.
2. We revised the ```HelloWorld``` component to get the first and last name values from a prop named ```user```
3. We changed the ```HelloWorld``` element to take a prop named ```user``` from the result of evaluating the ```getUserInfo``` function.

Although the end result will the same as before we've begun the process of building composable React components. Components aren't usually quite as simple as what we've seen in this example though so let's move on to a more complex example.

<hr />

## Part 4: Class Components

In the last section we defined a component as a single JavaScript function but we'll quite frequently not only need our components to manage their data but we may also need more control over the components' lifecycle. That's where component classes come in.

Just like their functional counterparts are based on JavaScript functions, class components are based on JavaScript classes. This approach gives us more control over an individual component's behavior.

From here on, we'll no longer need the ```HelloWorld``` component so you can safely delete it from your ```index.jsx``` file. Don't worry about losing the example of a functional component because we'll be building up several more as we develop the application. (You can also refer back to the ```HelloWorld``` example in the ```Part3``` folder if you'd like to see it again.)

A common task in Web applications is providing a way for users to log in. We're not going to go to the extent of connecting to an actual authentication system but we will fake it by providing a log in form and using local storage to persist that state.

### Defining the Login Form

Since we've moved beyond the basic ```HelloWorld``` example and are starting to get serious about building this application let's start following some standard conventions for project organization. There are several ways to approach this but to keep things fairly simple we'll organize our code according to purpose and feature. Since the login form will be a component that applies to the whole application we'll place it in ```/components/app/loginForm.jsx```. Go ahead and create that folder and file structure.

After creating that structure the first thing we'll need to do is import some types from the React packages. We can do so with the following line (feel free to copy it from index.jsx):

```javascript
import React, { Component } from "react";
```

Because we want React to handle placing the login form on the page we don't need to import ```ReactDOM```. We will, however, have to tell ```index.jsx``` about the form but we'll come back to that in due time.

Next we'll create the initial structure for the component (feel free to copy this from the ```Part4``` folder):

```javascript
export default class LoginForm extends Component {
    render () {
        return (
            <div className="form-inline">
                <div className="form-group">
                    <label htmlFor="username">Email address</label>
                    <input type="text" className="form-control" id="username" placeholder="Email Address" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" />
                </div>
                <button className="btn btn-default">Log in</button>
            </div>)
    }
}
```

At this point our ```LoginForm``` component is conceptually little more than what we saw with the ```HelloWorld``` functional component but there are some important differences. First, instead of being a function we've defined a class called ```LoginForm``` that extends the base ```Component``` class that React provides. Extending ```Component``` is required for class components.

Our ```LoginForm``` class also currently defines only a ```render``` function which returns the content to render. Here we see another implication of JSX being so closely related to JavaScript in that many of the attributes such as ```className``` and ```htmlFor``` follow the JavaScript naming conventions rather than the HTML conventions.

At this point we've defined enough of the component to add it to the page but in order to do so we must first tell ```index.jsx``` about it. We'll accomplish that by adding an import directive to ```index.jsx```

```javascript
import LoginForm from "./components/app/loginForm.jsx";
```

Finally, we can replace our old ```HelloWorld``` element with a new ```LoginForm``` element like this:

```javascript
ReactDOM.render(
    <LoginForm />,
    document.querySelector("#container")
);
```

Note that we don't need to make any changes to our underlying ```index.html``` document to handle this new component; we simply tell ```ReactDOM``` to render the ```LoginForm``` within the ```#container``` element.

Now go ahead and save your changes and observe the result in the browser.

So we've defined a typical login form as a React class component but it doesn't do anything yet. We could start writing some code in our ```index.jsx``` to handle the user interaction but that's not really the React way.

One of the advantages that class components offer over functional components for components that require some type of interaction is that they provide some additional mechanisms for controlling the component's behavior. These mechanisms collectively form the *component lifecycle*.

### The Component Lifecycle

The [component lifecycle](https://facebook.github.io/react/docs/react-component.html) consists of three phases:

1. Mounting
2. Updating
3. Unmounting

Each of the three phases provides one or more function hooks we can define in our class components to ensure proper behavior.

#### Mounting

Mounting occurs when a component is being created and ultimately added to the DOM. We can tie in to the mounting process at any of four places by defining methods on our component class:

<dl>
    <dt>Component constructor</dt>
    <dd>Allows us to initialize the component's state. A component's constructor accepts the initial props object and should always call super(props). We'll discuss more about state in just a bit.</dd>
    <dt>componentWillMount</dt>
    <dd>Obsolete. Provides an alternative place to initialize state but the constructor is recommended.</dd>
    <dt>render</dt>
    <dd>Required. Returns the content that will be added to the DOM.</dd>
    <dt>componentDidMount</dt>
    <dd>Provides a place to write initialization code that requires elements be present in the DOM.</dd>
</dl>

#### Updating

After the initial rendering, any changes to props or state will trigger an update. Like the mounting phase, updating also provides several places to hook into.

<dl>
    <dt>componentWillReceiveProps</dt>
    <dd>Invoked before new prop values are sent to the mounted component.</dd>
    <dt>shouldComponentUpdate</dt>
    <dd>Provides an opportunity to compare the current prop and state values with the incoming values and inform React as to whether the component should be re-rendered by returning true or false.</dd>
    <dt>componentWillUpdate</dt>
    <dd>Gives us a place to perform any pre-update operations.</dd>
    <dt>render</dt>
    <dd>Same as during the mounting phase</dd>
    <dt>componentDidUpdate</dt>
    <dd>Gives us an opportunity to work with the newly updated DOM.</dd>
</dl>

#### Unmounting

The final stage of the component lifecycle is unmounting. This phase occurs as the component is being removed from the DOM. Unlike the other phases, Unmounting provides only a single hook:

<dl>
    <dt>componentWillUnmount</dt>
    <dd>Called immediately before the component is destroyed. This is useful for various cleanup operations much like .NET's IDisposable.Dispose method.</dd>
</dl>

### Managing Login: Setting Initial State

Our ```LoginForm``` doesn't need to utilize most of the hooks into the component lifecycle but it certainly does need to be aware of the current user context so let's begin building out that functionality starting with the constructor.

```javascript
constructor(props) {
    super(props);
    this.state = {
        validationError: null,
        userName: null
    };
}
```

This is a pretty typical pattern for a component constructor. The constructor accepts the initial props, passes them up to the superclass (Component), then defines some initial state that's available to the component.

Before we go any further let's take a moment to talk about what state means in React.

### State in React

Until now we've been tossing around the term "state" pretty frequently but we haven't really talked about what it means in a React app. Much like props, React state helps determine how a component will render. Unlike props, though, React state is private to a component but it can be updated in response to events. Furthermore, although state it private to an individual component, it can be passed to child components as props! This is another key aspect of React's compositional nature.

Let's continue building out our ```LoginForm``` component with this in mind. Along the way we'll circle back to this discussion with some special concerns around managing state within a component.

### Managing Login: Logging On

### Debugging: Introducing the React Developer Tools

### Managing Login: Conditional Rendering

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