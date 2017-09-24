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

## Module 1: Introducing React

<!-- Whiteboard Stuff -->

* What is React?

On a basic level, it's a library for building user interfaces with JavaScript. It began at Facebook in 2011 and was open sourced in 2013. Since then, it's grown to be used and supported by many major companies and it now has robust 3rd party library integrations and the [most framework specific libraries](https://github.com/enaqx/awesome-react).
Beyond the web, it's become a paradigm of sorts for building mobile, desktop, tv, and other kinds of applications with JavaScript.

The idea is that instead of using the standard layout of separating concerns into JavaScript, HTML, and CSS. You will render your views (and potentially css as well) from your JavaScript.

*If you have questions about using React because of the recent license & patent clause stir with React and Facebook, here is [a good explanation of the whole thing](https://medium.com/@dwalsh.sdlr/react-facebook-and-the-revokable-patent-license-why-its-a-paper-25c40c50b562) and [here is a response from the Facebook team](https://code.facebook.com/posts/112130496157735/explaining-react-s-license/).

> On September 22, 2017 Facebook [announced](https://code.facebook.com/posts/300798627056246/relicensing-react-jest-flow-and-immutable-js/) that they were changing the license used by React. As of version 16, React will no longer use the BSD + Patents license and will instead use the MIT license. 

* Anatomy of a React application
    * Components
    * Props - read-only; the static pieces
    * State - updatable; the pieces that change
    
A React app is made up of a series of components which can contain their own dynamic state. Here is an example of a simple counter component which maintains it's own state:
[React Component Screenshot](https://s3.amazonaws.com/react-workshop/react-intro.png)

And ends up looking like this when rendered (more on rendering in a future section):
[counter view](https://s3.amazonaws.com/react-workshop/Screen+Shot+2017-09-23+at+8.57.41+AM.png)

If state or some kind of data is passed to another component, it is called props and is read only. If we take the previous example and move the buttons into a child component, we can pass any functions or data we need to the child using props:

```js
// ButtonHolder.js
import React from 'react';

const ButtonHolder = (props) => {
  var {addOne, sub} = props;

  return (
    <div>
      <button className="button" onClick={addOne}>+</button>
      <button className="button hollow" onClick={sub}>-</button>
    </div>
  )
}

export default ButtonHolder;
```

```js
// App.js
import React, { Component } from 'react';
import ButtonHolder from './ButtonHolder';

class App extends Component {
  constructor () {
    super();
    this.state = {
      counter: 0
    };
  }
  add () {
    this.setState({
      counter: this.state.counter + 1
    })
  }
  subtract () {
    this.setState({
      counter: this.state.counter - 1
    })
  }
  render() {
    return (
      <div className='content-component'>
        <h1>Counter {this.state.counter}</h1>
        <ButtonHolder addOne={this.add.bind(this)} sub={this.subtract.bind(this)}/>
      </div>
    );
  }
}
export default App;
```
    
* Note: In React applications, data *always* flows downward. Displaying and manipulating props will never change the state in the parent component. When state changes in the parent, it will effect children relying on that state, but not the other way around.

<hr />

## Module 2: My First React Project (Overview & Setup)

Throughout the workshop we'll gradually build out an application that allows us to interact with some data from [An API of Ice and Fire](https://anapioficeandfire.com/). The application will be a great foundation for continuing study as it will be loaded with examples of how to accomplish a variety of tasks with React and Redux.

*Demo: The finished app*

The initial setup for a React application can be a bit tedious but it's important to see how the various packages interact to make our application work. There are some tools such as ```create-react-app``` to automate some of this but since it's only necessary once per project we'll take the time to walk through the process today.

### Initialize a repository

**Optional but recommended**

```bash
git init
```

Copy ```.gitignore``` from the ```Module``` folder.

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

Now that Babel and Webpack are installed we need to configure them. Copy both ```.babelrc``` and ```webpack.config.js``` from the ```Module2``` folder.

Babel uses the ```.babelrc``` file to identify which transformers to use to convert our modern JSX code to JavaScript.

Similarly, Webpack uses the ```webpack.config.js``` file to identify not only what to build but also how to build it and to host it with the webpack dev server.

*We could also have used the [Express](http://expressjs.com/) server here but the Webpack dev server works really well with Webpack and supports easy hot reloading of modules.* 

### Creating the Basic Application Structure

If you look at the ```webpack.config.js`` file you'll see a few specific paths referred to throughout the file. These paths describe the compilation entry point as well as the output destination. Let's create the structure that Webpack is expecting to find. (Note that Webpack will automatically create the destination files and folders.)

We'll start with the ```dev``` folder which will contain our JavaScript and SASS code.

```bash
mkdir dev
```

Next, let's add an ```index.html``` file in our application root. You can copy the file from the ```Module2``` folder.

Finally, let's add the ```index.jsx``` and ```site.scss``` files to the ```dev``` folder. You can again copy these from the ```Module2``` folder.

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

## Module 3: My First React Project: Hello World

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

## Module 4: Class Components

In the last section we defined a component as a single JavaScript function but we'll quite frequently not only need our components to manage their data but we may also need more control over the components' lifecycle. That's where component classes come in.

Just like their functional counterparts are based on JavaScript functions, class components are based on JavaScript classes. This approach gives us more control over an individual component's behavior.

From here on, we'll no longer need the ```HelloWorld``` component so you can safely delete it from your ```index.jsx``` file. Don't worry about losing the example of a functional component because we'll be building up several more as we develop the application. (You can also refer back to the ```HelloWorld``` example in the ```Module3``` folder if you'd like to see it again.)

A common task in Web applications is providing a way for users to log in. We're not going to go to the extent of connecting to an actual authentication system but we will fake it by providing a log in form and using local storage to persist that state.

### Defining the Login Form

Since we've moved beyond the basic ```HelloWorld``` example and are starting to get serious about building this application let's start following some standard conventions for project organization. There are several ways to approach this but to keep things fairly simple we'll organize our code according to purpose and feature. Since the login form will be a component that applies to the whole application we'll place it in ```/components/app/loginForm.jsx```. Go ahead and create that folder and file structure.

After creating that structure the first thing we'll need to do is import some types from the React packages. We can do so with the following line (feel free to copy it from index.jsx):

```javascript
import React, { Component } from "react";
```

Because we want React to handle placing the login form on the page we don't need to import ```ReactDOM```. We will, however, have to tell ```index.jsx``` about the form but we'll come back to that in due time.

Next we'll create the initial structure for the component (feel free to copy this from the ```Module4``` folder):

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
        username: null
    };
}
```

This is a pretty typical pattern for a component constructor. The constructor accepts the initial props, passes them up to the superclass (Component), then defines some initial state that's available to the component.

Before we go any further let's take a moment to talk about what state means in React.

### State in React

Until now we've been tossing around the term "state" pretty frequently but we haven't really talked about what it means in a React app. Much like props, React state helps determine how a component will render. Unlike props, though, React state is private to a component but it can be updated in response to events. Furthermore, although state it private to an individual component, it can be passed to child components as props! This is another key aspect of React's compositional nature.

Let's continue building out our ```LoginForm``` component with this in mind. Along the way we'll circle back to this discussion with some special concerns around managing a component's state.

### Managing Login: Logging On

In a typical modern Web application a user would enter their credentials and click the "Log in" button which would trigger some event handler to process the action. The same holds true in a React application and the process for setting up that handler is quite similar.

We'll begin by adding a click handler to the button:

```javascript
// snip
<button className="btn btn-default" onClick={this.handleLogin}>Log in</button>
// snip
```

Although this may look like the classic approach to hooking up a handler for the click event there is something we should discuss. First, notice how ```this.handleLogin``` is wrapped in curly braces. Recall from our earlier discussion that curly braces indicate that the value is the result of an expression. In this case we're telling React that this button's click handler is the component's ```handleLogin``` function.

Now let's go ahead and define the event handler as a method on the ```LoginForm``` class. We're going to keep things simple here and forego the formality of creating controlled inputs and stick with a more traditional approach to reading form data. As we progress through the workshop we'll cycle back to forms and look at more formal approaches later.

```javascript
handleLogin(e) {
    var emailAddress = document.querySelector("#username").value;
    var password = document.querySelector("#password").value;

    if (emailAddress && password) {
        localStorage.setItem("username", emailAddress);
        this.setState({ userName: emailAddress });
    } else {
        this.setState({ validationError: "There was a problem logging you in. Please check your credentials and try again." });
    }
}
```

> *Although event handlers follow a familiar pattern in React they do behave a bit differently. One important difference is that the event passed to the handler isn't a native browser event but is rather a React supplied type called [SyntheticEvent](https://facebook.github.io/react/docs/events.html) which aims to standardize events across browsers. We won't spend time discussing them much here but should you so desire to learn more you can follow the link above.*

The handleLogin event handler is rather straightforward. It simply reads the username and password values from their respective input fields and ensures that they have been supplied. If we have both we persist the user name to local storage and update the component state to reflect the credentials otherwise we update the component state to reflect an error condition.

Now save your file, jump over to the browser, open the developer console, and try it out. Provided that you haven't jumped ahead in these exercises you'll quickly discover that clicking the "Log in" button results in an error stating that we can't read property ```setState``` of ```null```.

Both references to ```setState``` in the handler are against ```this``` implying that the ```setState``` method belongs to our component. Indeed, React's Component class does define a method called ```setState``` so what's going on? 

This comes down to how JavaScript deals with the ```this``` operator. When we bound the function to the click event in the JSX we simply passed the function without any context such as the class reference. There are a few ways to work around this issue including arrow functions but the React team recommends explicitly binding the method to the instance in the constructor like this:

```javascript
constructor(props) {
    // snip

    this.handleLogin = this.handleLogin.bind(this);
}
```

Now when we save the file our button should behave properly... or at least not display any errors in the console.

### Debugging: Introducing the React Developer Tools

Since we haven't yet built in any conditional rendering logic to control how the component *reacts* to changes in its state we can turn to the [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) to verify that the state is actually changing.

The React Developer Tools are a browser extension that lets us inspect the current state of our React application.

Go ahead and open the browser's developer tools if you don't already have them open then click over to the "React" tab.

You should see a few panels. On the left is the document structure complete with component names. On the right is a listing of the selected components props and state. In more complex applications you can drill into child components and examine their state.

Select the ```LoginForm``` element if it isn't already selected and observe how the state currently reflects the state we defined in ```LoginForm```'s constructor. Now try to log in without entering a user name or password. You should see the ```validationError``` flash yellow and update to reflect our error message. Now try logging in with some combination of credentials.

What happened?

### Managing State

You should have seen the ```username``` flash yellow to highlight the change but notice how the ```validationError``` value is still set from the previous failed login attempt. This illustrates another important concept in React:

> State updates are *merged* into the current state.

This means that when we call ```setState``` the passed value doesn't replace the current state but rather merges with it. At first this may seem counterintuitive but this is also a key aspect of composing more complex components.

Speaking of ```setState```...

Earlier we discussed how state in React represents the changeable portions of a component. This is true but we need to take care how we go about updating that state.

The first rule of React state management is to *never* update state directly either by assigning a new object to ```this.state``` or by changing properties of ```this.state```.

Instead, we should *always* update state by passing a new object to ```this.setState``` because that is what instructs React to begin its update phase.

Now that we understand a bit more about React state management, let's go back and fix our event handler:

```javascript
// snip
if (emailAddress && password) {
    localStorage.setItem("username", emailAddress);
    this.setState({ username: emailAddress, validationError: null });
} else {
    this.setState({ username: null, validationError: "There was a problem logging you in. Please check your credentials and try again." });
}
// snip
```

Upon saving the document we can try our log in again and observe in the React Developer Tools that the component's state now properly reflects our various, well, states.

### Decoupling from the DOM

As we just observed, our ```handleLogin``` function now reads our entered credentials but we've introduced a new dependency - reading those values from specific elements. For instance, to get the entered email address we use ```document.querySelector``` to locate an element with an ID of ```username```. This certainly works but wouldn't it be nice to remove that dependency and give the ```LoginForm``` component a reference to our two text boxes? This is where the [```ref``` attribute](https://facebook.github.io/react/docs/refs-and-the-dom.html) comes in handy.

The ```ref``` attribute is a React feature that accepts a callback function which we can use to capture a reference to a DOM element. The supplied callback is invoked both when the component is mounted and when it's unmounted. React will pass either the created DOM element or null depending on when in the component's lifecycle the callback is being invoked.

Let's see ```ref``` in action. We'll begin by modifying our JSX to include ```ref``` attributes so we can capture the DOM elements as properties (*not props*) of our ```LoginForm``` class.

```javascript
// snip
<div className="form-group">
    <label htmlFor="username">User Name:</label>
    <input
        type="text"
        className="form-control"
        placeholder="Email Address"
        ref={element => this.username = element} />
</div>
<div className="form-group">
    <label htmlFor="password">Password: </label>
    <input
        type="password"
        className="form-control"
        ref={element => this.password = element} />
</div>
// snip
```

React handles binding the callback to the component class so there's no need for us to manually bind anything in our constructor or add additional lifecycle functions.

Now getting the value from the text boxes is simply a matter of accessing the class properties rather than performing a DOM lookup.

```javascript
handleLogin(e) {
    var emailAddress = this.username.value;
    var password = this.password.value;
    // snip
}
```

As you can see, this approach simplifies how we can get data from our form elements and even gives us the opportunity to change the underlying elements with minimal impact to the rest of the code. React refers to this approach as "uncontrolled" because we're working with the form elements in a more traditional manner without tapping into React's lifecycle. The downside of using uncontrolled input is that we lose th e ability to react to changes in those controls. For simple forms such as our login form, the uncontrolled approach is ideal but we'll look at a more "React-y" way of managing forms a bit later. 

### Managing Login: Conditional Rendering

We've progressed far enough that we can start making our component react to the various state changes. For this component we need to handle both failed and successful login attempts.

Recall from our earlier discussion about React's lifecycle that changes to state trigger the updating phase. This phase ultimately results in rerendering the component. Let's see this in action by implementing a few of the lifecycle functions before updating the ```render``` function to display the appropriate content for our state.

```javascript
export default class LoginForm extends Component {
    // snip

    componentWillMount() {
        console.log("componentWillMount");
    }

    componentDidMount() {
        console.log("componentDidMount");
    }

    componentWillReceiveProps() {
        console.log("componentWillReceiveProps");
    }

    componentWillUpdate() {
        console.log("componentWillUpdate");
    }

    componentDidUpdate() {
        console.log("componentDidUpdate");
    }

    render() {
        console.log("rendering");
        return (
            // snip
        );
    }
}
```

Upon saving the file the page will refresh and we should immediately see the following in the console:

```
componentWillMount
rendering
componentDidMount
```

Now click the log in button and observe the updating phase functions get written to the console:

```
componentWillUpdate
rendering
componentDidUpdate
```

We should also see the same messages written to the console for a successful log in.

> *Feel free to remove these functions as we included them only to observe the lifecycle and won't be using them for anything else.*

Since the updating phase functions are called each time the state changes we can provide all of the display logic our form requires within the ```render``` function. Let's do that now by first handling a successful login attempt.

```javascript
render () {
    if (this.state.username) {
        return <div>Hello, {this.state.username}!</div>;
    }

    return (
        // snip (same JSX as before)
    );
}
```

Entering some text in both fields and clicking the log in button should now result in the welcome message being displayed instead of the log in form.

The beautiful thing about this process is that React applies the changes intelligently; it applies the changes against an in-memory copy of the DOM and only applies what changes to the browser.

Now let's handle displaying the validation error. We really need to make a small change but remember, the ```render``` function must return exactly one item so we'll need to first wrap the current JSX within another ```div```.

```javascript
render() {
    if (/* snip */) {
        // snip
    }

    return (
        <div>
            // snip
        </div>
    );
}
```

Now all that's left is to include an expression that returns either the validation error or null within our new ```div```.

```javascript
<div>
    {this.state.validationError
        ? <div className="alert alert-danger">
            {this.state.validationError}
            </div>
        : null }
    // snip
</div>
```

Finally! We now have a component that properly handles our fake login and displays either the welcome message, the form, or the form and error message depending on our previous actions.

Reviewing the code really reveals how easy it is to create intelligent, declarative, and fully-encapsulated components within React.

As powerful as our simple ```LoginForm``` component is, it's still missing a few things. First, recall that when we first created the ```handleLogin``` function we had the successful case persist the email address to local storage. The purpose of doing that was to maintain our user context between page loads but if we refresh the page we see that our application has apparently forgotten who we are. Let's fix that.

All we need to do is update our constructor logic to initialize the state's ```username``` property to the value in local storage.

```javascript
constructor(props) {
    super(props);
    this.state = {
        validationError: null,
        username: localStorage.getItem("username")
    };

    // snip
}
```

Now save the file. If you were already logged on when the page refreshed you should still see the welcome message. If not, log in then refresh the page.

This leaves us with a problem. How do we clear that user context? In other words? How do we log off?

### Logging Out

Logging off itself is pretty straightforward. We know we'll need a button of some sort and another event handler. Let's start this feature by defining the event handler.

```javascript
handleLogoff(e) {
    localStorage.removeItem("username");
    this.setState({ username: null, validationError: null });
}
```

Remember to ensure that the function is properly bound to the component class by adding the following to the constructor:

```javascript
this.handleLogoff = this.handleLogoff.bind(this);
```

With that in place let's take this opportunity to introduce a few more React concepts by using an anchor element instead of a button.

```javascript
render() {
    if (this.state.username) {
        return (
            <div>
                Hello, {this.state.username}! (<a href="#" onClick={this.handleLogoff}>Log Off</a>)
            </div>
        );
    }

    // snip
}
```

By now this pattern should be starting to look familiar. We add the JSX that represents some HTML elements and attach an event handler to the link's click event.

Go ahead and try out new functionality. You should observe that clicking the Log Off button clears our user context but did you notice that the URL also changed? That's because we used a link and allowed the default action to occur. Fixing this issue is a matter of modifying our event handler to suppress that as follows:

```javascript
handleLogoff(e) {
    e.preventDefault();
    // snip
}
```

Remember that although this resembles the browser's native event, we're still working with React's *SyntheticEvent* to ensure consistent behavior across environments.

### Custom Styling

So far we've done very little in the way of styling our content and what we have done has relied on the default [Bootstrap 3.3](https://getbootstrap.com/docs/3.3/) classes. JSX does support an alternative which may be useful in certain circumstances so let's take a quick look at that now by customizing the look of our log off button.

We'll do so by defining a new style object within our existing ```render``` function.

```javascript
render () {
    if (this.state.username) {
        var buttonStyle = {
            border: "1px solid #AA0000",
            borderRadius: "5px",
            color: "#AA0000",
            fontSize: "8pt",
            fontWeight: "bold",
            padding: "7px",
            textDecoration: "none",
            textTransform: "uppercase"
        };

        return ( /* snip */ );
    }

    // snip
}
```

Notice how all of our new object's properties correspond with the JavaScript-friendly version of various CSS attributes. That's because React will use those properties to set the appropriate styles on the rendered element once we tell it which object to use. We do so like this:

```javascript
render () {
    if (this.state.username) {
        // snip

        return (
            <div>
                Hello, {this.state.username}! <a href="#" onClick={this.handleLogoff} style={buttonStyle}>Log Off</a>
            </div>
        );
    }

    // snip
}
```

Now when we save the file we should see the button style update to reflect what we specified with the style object.

Like anything else, this approach has positive and negative aspects. It's good for keeping the styles with the components but short of passing certain styles around through props it feels rather limiting. It also doesn't easily support various underlying pseudo-classes such as ```a:hover``` which dramatically diminishes its utility.

<hr />

## Module 5: Differentiating Components

So far we've worked through creating the project from scratch by importing the appropriate dependencies, defining a simple ```HelloWorld``` component, seeing how props and state relate to components, and building out a simulated login form. Now it's time to move on to the heart of the application.

### Adding a Home Page

Recall from earlier when we created our ```LoginForm``` component we instructed React to render the component to the page in ```index.jsx``` as follows:

```javascript
// snip

ReactDOM.render(
    <LoginForm />,
    document.querySelector("#container")
);
```

When we did this, the ```LoginForm``` component was all the application had to render but an application that does nothing but let a user log in or out isn't particularly useful so let's start making this feel like a "real" application by adding a basic home page.

Create a new ```home``` folder under ```components``` then add new file called ```home.jsx``` in that folder.

We need to import React and Container to define the home page component but since all we'll be rendering is some basic HTML and won't have any additional dependencies that's all we'll need.

```javascript
import React, { Component } from "react";
```

Now we can define the component. This component won't need to tap into the React lifecycle so a function component is sufficient.

```javascript
export default function Home () {
    return (
        <div>
            Welcome!
        </div>
    )
}
```

With that defined we now need to tell React to render it so let's jump back over to ```index.jsx``` to make that change.

Remember, when React only works with one element at a time regardless of whether that element is returned from a function component, a class component's ```render``` function, or being passed to ```ReactDOM.render``` so we have a bit of a problem - ```ReactDOM.render``` is already acecpting an element - our ```LoginForm```.

We've already seen one way to work around this in previous examples. We could simply wrap a ```div``` around ```Home``` and ```LoginForm``` but we're at a point where it's more important to question whether that's the right thing to do.

### Container and Presentation Components

As our application grows it becomes increasingly important to think about how its individual pieces interact with each other; ultimately we need to think about how the application is composed.

One separation that tends to naturally fall out of dividing the application into focused components is that of *container* and *presentation* components.

<dl>
    <dt>Container Components</dt>
    <dd>Container components are responsible for managing data and responding to state changes. They still provide the required ```render``` function but only to return another component.</dd>
    <dt>Presentation Components</dt>
    <dd>Presentation components are concerned what's actually being rendered based on the props supplied by a container component. These components generally have very little logic associated with them and as such are often defined as function components.</dd>
</dl>

We know our application is going to be more involved than a single page so it's really a good time to start thinking about our components in those terms and how they fit within our application.

We could split our ```LoginForm``` component into two but it's pretty straightforward as it is and although refactoring it would be rather trivial let's focus our efforts on another area, namely, a container component for our app.

Create a new folder named ```containers``` under the ```dev``` folder. Since this will be the root component for our application we'll just create a new file called ```appContainer.jsx``` in that new folder. We'll be needing the requisite React import so go ahead and add that to the new file, too. (This file will be a bit sparse for now but we'll definitely be coming back to it a few times throughout the rest of this workshop.)

Since the whole point of creating a container component is to manage state among other things we'll want to define this as a class component.

```javascript
export default class AppContainer extends Component {
    render () {
        return null;
    }
}
```

This is a great start for our new container but right now it doesn't do anything. If we were to replace the ```LoginForm``` element in our ```index.jsx``` file right now we'd see nothing because ```AppContainer.render``` returns null. It is important to note though that ```AppContainer``` still extends ```Component```. This is because React makes no distinction between container components and presentation components - they're both components as far as React is concerned so the distinction is purely an architectural pattern. 

Let's have this return some content by first importing the two components we're going to render - ```LoginForm``` and ```Home```.

```javascript
import LoginForm from "../components/app/loginForm.jsx";
import Home from "../components/home/home.jsx";
```

Now let's make ```AppContainer``` return something more useful than ```null```.

```javascript
render () {
    return (
        <div>
            <LoginForm />
            <Home />
        </div>
    );
}
``` 

And finally, let's replace references to ```LoginForm```  in ```index.jsx``` with the ```AppContainer```.

```javascript
// snip
import AppContainer from "./containers/appContainer.jsx";
// snip

ReactDOM.render(
    <AppContainer />,
    document.querySelector("#container")
);
```

Saving the file should again force the browser to refresh with the newly compiled changes now rendering both the ```LoginForm``` and ```Home``` content.

Again, though, while we've wrapped our app into a container component and are now displaying content we're still not really doing anything useful. Since most modern applications get data from an API how about we create another component to do just that?

<hr />

## Module 6: External Data

At the beginning of this workshop we saw a preview of the completed project. In that demo we showcased some data from the publically accessible, open source API: [An API of Ice and Fire](https://anapioficeandfire.com/), a fan created and maintained database of information pulled from the Game of Thrones TV series and Ice and Fire novels. In this section we'll begin connecting to that API so we can show its data.

The API puts data in several categories:

* Characters
* Houses
* Books

We're going to focus on the character data today but the others would be excellent opportunities to continue experimenting with React on your own.

### Getting External Data

One of the most beautiful things about React is that it is a highly focused library. Unlike other libraries, React focuses on one thing - building declarative user interfaces - and does that one thing very well. Of course, what this means is that there are a great many things that fall outside of React's scope and working with external data is just one of those things that React isn't directly concerned with. As such we're free to select whichever approach suits our needs best.

For working with external data there are plenty of options available. Perhaps an application already has [jQuery](http://jquery.com/) and is using ```$.ajax``` (Note: mixing React and jQuery is generally a bad idea but can work for some things). Maybe the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) is a good fit because we know our users will be using browsers that support it. Maybe a plain ol' XmlHttpRequest is more than sufficient. The point is React doesn't dictate how we get that data. React only cares how to render it.

For our purposes in the workshop we're going to use the [axios](https://www.npmjs.com/package/axios) library. Axios provides a simple interface quite similar to that offered by jQuery's [ajax](http://api.jquery.com/jQuery.ajax/) function but like React, axios is focused on just its one task - making network requests. It's also [promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)-based so it's very easy to wire-up the appropriate callback functions.

### Installing Axios

We can install axios by running the following terminal command:

```
npm install axios --save
```

Now we're free to reference axios within our application. For convenience, we're going to define our interactions with axios, and the Ice and Fire API by extension, in a separate module, outside the context of any controller and simply provide an interface of sorts. This allows us to keep our modules concerned with only manipulating the DOM *and* it gives us a really easy way to replace that functionality later when we want to save *a lot* of typing!

Create a new file in the ```dev``` folder called ```iceAndFireRepository.js```. Note that we've used the ```.js``` extension to indicate that this is just a JavaScript module and not a React component.

> We're going to skim over many of the implementation details here as they're more related to the Ice and Fire API than React or even axios. Every API comes with its own requirements and interfaces and since we're using this particular API for demonstration only it's not really important to cover them in detail. What is important is the overall process of interacting with an API.

The first thing we'll do is import the axios package.

```javascript
import axios from "axios";
```

Next up is to define a few constants we'll use to access the API. These identify the URL and tell the API which version we want to use.

```javascript
const API_URL = "https://www.anapioficeandfire.com/api/";
const API_VERSION_HEADER = "application/vnd.anapioficeandfire+json; version=1";

const API_REQUEST_HEADER = {
    "headers": {
        "accept": API_VERSION_HEADER
    }
};

const API_CATEGORY = {
    CHARACTERS: "characters"
};
```

Now we can use axios to get some data. Given the URL structure that this particular API uses we can write some generalized functions to handle requests and export a function to get a page of character data.

```javascript
const get =
    url => axios.get(url, API_REQUEST_HEADER);

const getPage =
    category =>
        (page, pageSize) =>
            get(`${API_URL}/${category}?page=${page}&pageSize=${pageSize}`);

export const getCharacters = getPage(API_CATEGORY.CHARACTERS);
```

There are a few arrows in there but the code is really just breaking down the process of making the request into some composable units. The ```get``` function accepts the URL we're having axios GET for us. The ```getPage``` function is a higher-order function that accepts the data category (character, house, book) and returns another function which accepts pagination information, constructs a URL, and forwards it on to ```get```. Finally, the ```getCharacters``` function is a partial application of ```getPage``` specifically tailored to getting character data.

Ultimately, when we invoke ```getCharacters``` we're given an ```axiosPromise``` object which conforms to the ES6 promise spec so we can handle the asynchronous operation as we might expect.

This highly functional approach to getting data really isn't all that different from how we compose React components and is indeed the model upon which React composition is based. Our data flows into one function (```getCharacters```) which adds some additional data to flow into another function (```getPage```) which formats a URL and forwards it on to another function (```get```) which in turn makes a request via ```axios.get```. Data always flows in one direction through the chain ultimately resulting in that promise.

Now let's build out a controller to observe this in action. 

### Our First Request

Create a folder named ```characters``` under the ```components``` folder and in that folder create a file named ```characterList.jsx```. All the usual setup applies but we also need to import our new ```iceAndFireRepository```

```javascript
import * as IceAndFire from "../../iceAndFireRepository.js";
```

Next up is to define the component. We'll definitely need to tap into the React lifecycle on this one so let's define it as a class component, making sure to declare some initial state. Since this component is going to represent a list of characters returned from the API it seems like an array named ```characters``` would be a good starting point.

```javascript
export default class CharacterList extends Component {
    constructor (props) {
        super(props);

        this.state = {
            characters: []
        };
    }

    render () {
        return null;
    }
}
```

For now we're not going to render anything. This will give us another good opportunity to use the React Developer Tools and observe some behavior which we can use to drive the rendering logic.

Where in the ```CharacterList``` component should we invoke our API request? A moment ago we mentioned needing to tap into the React lifecycle and the [lifecycle documentation](https://facebook.github.io/react/docs/react-component.html) gives us a pretty clear answer:

> "If you need to load data from a remote endpoint, [componentDidMount] is a good place to instantiate the network request."

We should initiate the request in ```componentDidMount```.

```javascript
componentDidMount () {
    IceAndFire
        .getCharacters(1, 25)
        .then(
            response =>
                this.setState({
                    characters: response.data
                }));
}
```

Our ```componentDidMount``` function consists of a single expression which initiates the request for the first page of 25 characters. When the request is complete we simply update the component state to reference the returned list.

Now add the component to the page in ```index.jsx``` and go to the browser. The visible page content shouldn't change but something has happened behind the scenes which you can observe in the React Developer Tools.

### Observing the State Change

Because we didn't have much interesting to look at when we examined our ```LoginForm```'s state, let's repeat that exercise with our slowly growing page.

This page now consists of several layers of components and elements. When the page loads the React Developer Tools will now allow us to drill into the overall structure starting at the top level: the ```AppContainer```. By default this node is selected and we the tools correctly report that there are no props, or, more specifically, that the props are an empty object. Let's drill into the child components by expanding the ```AppContainer``` element.

If we select the ```LoginForm``` element we'll see the same state values we observed before. If you're logged in you'll see the ```username``` set otherwise you'll see ```null``` for that value.

The ```Home``` component is simply displaying a welcome message so there's nothing interesting to look at there but what about our new ```CharacterList``` component? When we initialized the state in its constructor we explicitly set the ```characters``` value to an empty array but the developer tools are showing us very clearly that it's an array of 25 items! These were populated when our API request completed and se handed them over to the component via the call to ```setState```!

### Data Munging with Azios

Now that we've observed that we're definitely getting data back from our API request we're close to extending the ```CharacterList``` component to write out that list of characters.

One thing to note about the data from this API is that it isn't necessarily the cleanest data around. Take a moment to drill into the ```characters``` array in the developer tools. You should pretty quickly find that a great many characters are missing a name but fortunately those characters generally have at least one item in their ```aliases``` collection. In fact, there are lots of subtle things in the results that we could clean up if we continued to hand off the results to our component directly. To simplify our rendering logic we can augment our ```IceAndFireRepository``` to handle some of that munging (transformation and other cleanup) so we can keep our component focused on rendering the data.

Just to keep things simple we'll merely return an object that simply contains the character name or alias if the name isn't available.

We'll start by changing the ```getPage``` definition to accept a function we'll call ```munge``` and iterate over the resulting data, passing each item to that function:

```javascript
const getPage =
    (category, munge) =>
        (page, pageSize) =>
            get(`${API_URL}/${category}?page=${page}&pageSize=${pageSize}`)
                .then(response => response.data.map(munge));
```

Notice how getPage is now providing a callback for ```then``` rather than simply returning that ```axiosPromise``` like it was before. This gives us a convenient way to transform the response before handing it off to the caller. We could also provide a ```catch``` callback here in case of an error but we'll leave that for later when we can see a clean way of handling the errors. Regardless, axios still returns a promise to the caller, it will just resolve with the cleaned data rather than the actual HTTP response.

Now let's implement the munging function. It's really complicated:

```javascript
const mungeCharacter =
    character => ({
        name : character.name || (character.aliases[0] + "*")
    });
```

All we're doing here is returning a new object based on the supplied character. If ```character.name``` is ```falsy``` we return the first alias with an asterisk signifying that we didn't find a name.

Next we'll pass the ```mungeCharacter``` function to ```getPage``` from the ```getCharacters``` function.

```javascript
export const getCharacters = getPage(API_CATEGORY.CHARACTERS, mungeCharacter);
```

Finally we need to make a change to our ```CharacterList``` component because we've changed the structure of the data returned by the promise. Now we simply need to set the ```characters``` state value to ```response``` rather than ```response.data```.

That's it! Save the file and observe that the ```CharacterList``` state now contains a collection of 25 objects, each of which include a name. Our data is now ready to be displayed!

### Displaying the Data

Rendering this data is similar to what we've seen previously except now there's a bit of a twist. So far we've seen rendering only single values but never a collection. Clearly we'll need some type of looping construct but there's slightly more to it than that.

For now let's just render the characters as a bulleted list.

```javascript
render () {
    return (
        <ul>
        </ul>
    );
}
```

This sets us up to render the list but would you believe that rendering the items can be accomplished with only one more line? It's true!

```javascript
render () {
    return (
        <ul>
            {this.state.characters.map(c => <li>{c.name}</li>)}
        </ul>
    );
}
```

To render the items we just have to map each one to an ```li``` element!

Now save the file and observe what happens in the browser's console window. You should see a warning from React stating that *each child in an array or iterator should have a unique "key" prop*.

We've excluded an important piece of information that React needs to efficiently apply any changes to the underlying model to the DOM. To resolve this we need to add a prop named "key" to each ```li``` element. The value we provide should uniquely identify each item. The natural choice for this would be the item's unique identifier but since we didn't include that piece of information in our refined model we'll just set it to the element's index within the collection.

```javascript
render () {
    return (
        <ul>
            {this.state.characters.map((c, ix) => <li key={ix}>{c.name}</li>)}
        </ul>
    );
}
``` 

Finally, saving the file should result in a bulleted list of 25 items and no warning from React.

<hr />

## Module 7: Routing and Navigation

Now our application is starting to take shape. We have a functioning login form and a listing of characters we've retrieved from the Ice and Fire API. We still have quite a problem though - our single-page app (SPA) is just that, a single page. There's nothing in here yet to give the illusion of navigating around pages even though we've clearly separated the ```Home``` container from the ```CharacterList``` container. Let's fix that by introducing a new package: [```React Router```](https://reacttraining.com/react-router/).

React Router is a component-based, declarative navigation model which provides an easy way to swap out visible components while providing a deep-linking mechanism for easy, URI-based access to specific parts of our application.

While many popular environments (including previous versions of React Router) primarily focus on static routing, that is, having routes defined as part of the initialization process, React Router takes a fundamentally different approach by handling routes dynamically as components. This means that rather than having to specify every route in one place we can define them where they're used.

> There are a few versions of React Router available. The one we're going to use and the one discussed here is version 4.

Like anything else in software there are trade-offs associated with each approach. One of the biggest benefits of the dynamic approach is that our applications are free to evolve but the impact to other sections of the application from adding and removing features is kept to a minimum.

There are only a few key components and concepts that we're concerned with for our application:

<dl>
    <dt>Routers</dt>
    <dd>Routers manage transitioning between routes and managing the route history. There are a few different kinds of routers we can use and we'll discuss a few of them a bit later.</dd>
    <dt>Routes</dt>
    <dd>Routes render the content that corresponds to a particular path/URI. By default routes are rendered inclusively - as long as the path matches, the route will be rendered.</dd>
    <dt>Switches</dt>
    <dd>Switches are route groups where only one route will be rendered even if other routes in the group match the path.</dd>
    <dt>Links</dt>
    <dd>Links provide a component-based mechanism for interacting with the router and thus navigating around the application.</dd>
</dl>

> React Router is a powerful tool for our React Applications but we're only going to highlight a few of its features here. Be sure to check out the [documentation](https://reacttraining.com/react-router/web/guides/philosophy) to learn more about its full capabilities.

Now that we know a bit about the router it's time to add it to our application.

### React Router: Installation

We install React Router like any other npm package.

```
npm install react-router-dom --save
```

This package allows the router to interact with the DOM but also has a dependency on the ```react-router``` package which we also need so simply installing it is enough to get the other packages we need for this exercise.

Once the package has been installed we can import it into our app. But where?

### React Router: Adding a Router

Recall from before we added axios we split a container component called ```AppContainer``` away from ```index.jsx```. This component is intended to serve as the wrapper for our entire application and Routers are typically defined at the application root, this seems like a natural place.

Add the following ```import``` directive to ```appContainer.jsx```:

```javascript
import { BrowserRouter, Route, Switch, NavLink} from "react-router-dom";
```

This ```import``` directive makes the specified components available to our ```appContainer```. We'll be using each of them over the next few sections but since the heart of this functionality is the router let's start there.

As you can tell from our freshly added ```import``` directive, we're going to use a router called ```BrowserRouter```. This is just one of several routers that React Router provides, each having their own specific focus. For instance, ```BrowserRouter``` takes advantage of the HTML5 history APIs while ```HashRouter``` uses the hash portion of the URL to support older browsers. There are a few others as well but those are well beyond the scope of this workshop so let's get back to adding the router to our application.

The router is our application's outermost component so we'll activate it simply by wrapping the existing render content in a ```<BrowserRouter>``` element like so:

```javascript
render () {
    return (
        <BrowserRouter>
            // snip
        </BrowserRouter>
    );
}
```

As a container component, the router doesn't change the look of our page in any tangible way so let's continue on. We're going to use ```Switch```es and ```Route```s to split our application into navigable pages. 

Let's keep our overall page structure in place but wrap the existing ```Home``` and ```CharacterList``` components within a new ```Switch``` component:

```javascript
<div>
    <LoginForm />
    <Switch>
        <Home />
        <CharacterList />
    </Switch>
</div>
```

One interesting point about ```Switch``` is that since it returns only the first matching element and we haven't any route constraints, only our ```Home``` component will be rendered right now. If we were to switch around the order of the elements within the ```Switch``` only the ```CharacterList``` would be rendered.

So how do we add constraints to our ```Home``` and ```CharacterList``` elements? We need to wrap them each within individual ```Route``` components and specify the path to which each will resolve.

```javascript
<Switch>
    <Switch>
        <Route path="/">
            <Home />
        </Route>
        <Route path="/characters">
            <CharacterList />
        </Route>
    </Switch>
</Switch>
```

> For those with some React experience, the above snippet probably looks pretty ugly. Don't worry, we'll clean it up shortly!

### Webpack Dev Server: Enabling Deep Linking

Great! Now we have some ```Route```s defined so let's try them out. If you refresh the page you should see the familiar welcome message but what happens when you try to navigate to ```/characters```?

You should see a message stating

```
Cannot GET /characters
```

This is the Webpack Dev Server's 404 message. We're building a single-page app and relying on the ```BrowserRouter``` and ```Routes``` to determine what content to display but when we enter ```/characters``` in the browser's address bar the server tries to serve content hosted at that address rather than the root. We can fix this with a single tweak to our ```start``` task in ```package.json```.

```javascript
{
    // snip
    "scripts": {
        // snip
        "start": "webpack-dev-server --open --history-api-fallback",        
        // snip
    }
    // snip
}
```

Now save the file and restart the server (```CTRL + C``` then ```npm start```). When the browser opens try navigating to ```/characters``` again and observe the result. You should see the page load properly because the ```--history-api-fallback``` option tells the server to respond with ```/index.html``` in the event of a 404 thus enabling deep-linking but instead of the character list we see the same welcome message even though we expected to see the character list.

Why?

The reason is that the routes are matched top-down and the matching algorithm looks at path segments. ```/characters``` is a child of ```/``` so both of our routes match. Since ```Switch``` returns the first match even though we wanted the second, ```Home``` is rendered instead of ```CharacterList```. The workaround is to add another attribute to the route:

```javascript
<Route path="/" exact>
    <Home />
</Route>
```

Now when the matching algorithm inspects the first route it will find that it does match but because it's not an exact match the algorithm will move on to the next route thus rendering the ```CharacterList``` component.

### React Router: Route Options

Before we add navigation to our page let's return our focus to the Routes we defined a little while ago.

When we defined those routes we specified our ```Home``` and ```CharacterList``` components as *children* of the ```Route```s. This is certainly acceptible but you'll likely more often specify them through the ```component``` attribute even if for no other reason than it's a bit cleaner.

```javascript
<Switch>
    <Route path="/" exact component={Home} />
    <Route path="/characters" component={CharacterList} />
</Switch>
```

We don't necessarily have to specify a component directly, though. The ```Route``` component exposes another attribute called ```render``` which accepts a function and gives us more programmatic control over what's rendered when the route is matched. All of the route props are also forwarded on to the render function so we're free to use them within the function.

We can see this if we temporarily replace one of our routes with a function.

```javascript
<Route path="/"
        exact
        render={props =>
            <div>You are viewing the content for: {props.match.path}</div>} />
```

Our application doesn't need us to do this but it's good to know about so go ahead and undo the change.

### React Router: Unmatched Paths

A little while ago our server gave us a 404 when we tried to access ```/characters``` so we modified the server behavior to always return ```/index.html``` regardless of what was requested and let React Router handle displaying the content based on the path. But what if the user enters something that legitimately doesn't exist within our application?

Try navigating to something like ```/notfound```. What do you see?

You should see the page title and ```LoginForm``` but it would be nice to communicate to our user that they've tried accessing something that doesn't exist. We can handle this easily by simply adding a default ```Route```. For fun we'll implement this through the ```render``` attribute rather than building a formal component.

```javascript
<Route render={
    props =>
        <div className="spacerTop alert alert-danger">
            Sorry, the resource you requested ({props.location.pathname}) does not exist.
        </div>} />
```

Once again try navigating to an invalid path and you should now see the not found message. But what if we try going to something like ```/characters/20```? We'll eventually have this as a valid route but as far as the current state of our application is concerned, this isn't valid so we should see the error, right?

Navigating to that URI still shows the character list because ```/characters``` matches a valid route and the ```20``` is just ignored by router. We have some flexibility in how to solve this but for the time being let's implement the easiest solution: requiring the ```/characters``` route to match exactly.

```javascript
<Route path="/characters" exact component={CharacterList} />
```

### React Router: Navigation

Our application is really starting to feel like a real single-page application. We have several components, routing, and deep linking but so far we have no way to navigate around! How do we expect our users to get from page to page?

In a traditional application we'd link directly to pages with ```A``` elements and while our deep-linking capabilities would certainly allow that, React Router offers a better way: ```Link``` components. Why might we prefer the ```Link``` components over traditional ```A``` elements?

The primary reason to prefer the ```Link``` components is that we've already loaded the application! If we were to link directly to part of our application that would result in a new HTTP request to the application thus making us (typically) not only have to reload the application but also lose state! The ```Link``` components avoid this by working directly with the ```Router``` at our application root.

Let's define a function component to represent a navbar. To make this feel like a navbar we'll be mixing some Bootstrap classes with some of our own which are already defined in ```site.scss```. (Feel free to place this in the ```appContainer.jsx``` file for convenience.)

```javascript
const NavBar =
    props =>
        <ul className="list-inline navMenu">
            <li role="presentation">
                <Link to="/">Home</Link>
            </li>
            <li role="presentation">
                <Link to="/characters">Characters</Link>
            </li>
        </ul>
```

Here we have a function component which renders an unordered list with a few ```Link``` components. When rendered, each list item will be displayed as a tab which we can click to jump to different parts of the application.

We still don't have the ```NavBar``` on the page so let's do that and while we're at it let's wrap the remaining content in another ```div``` to make it feel like tab content.

```javascript
<BrowserRouter>
    <div>
        <NavBar />
        <div className="iceAndFireBody">
            {/* snip */}
        </div>
    </div>
</BrowserRouter>
```

Now when we view the page we should see some significant changes. Go ahead and click between the new tabs and observe how React toggles between the routes. For some added effect, open your browser's developer tools to the Network tab and observe that the only HTTP traffic is the character API request as opposed to entering the URIs directly into the address bar!

One thing that's still missing here is a way to highlight the current tab. Bootstrap usually handles this automatically but we're only using Bootstrap styles and not its JavaScript capabilities because React doesn't play nicely with other libraries that manipulate the DOM. Another difference between how Bootstrap and React Router handle identifing the current tab is that Bootstrap would apply a CSS class to the ``li`` element whereas React Router wants to apply it to the underlying ```A``` element. (Yes, ```Link``` renders an ```A``` element but hooks up the appropriate event handlers for us.) So how do we identify the current tab?

As always, we have a few options.

The first option, which we'll avoid, is to create a new component which wraps the ```Link```. (There are a number of examples of this approach on the Web.) The alternative is far easier and meets our needs quite well.

We can use React Router's ```NavLink``` component instead! ```NavLink``` is a specialized ```Link``` component which exposes a few additional props which we can leverage to highlight our selected tab.

```javascript
const NavBar =
    props =>
        <ul className="list-inline navMenu">
            <li role="presentation">
                <NavLink to="/"
                         exact
                         activeClassName="active">Home</NavLink>
            </li>
            <li role="presentation">
                <NavLink to="/characters"
                         activeClassName="active">Characters</NavLink>
            </li>
        </ul>
```

One of the really nice things about ```NavLink``` is that it follows some patterns that we're already familiar with: the ```exact``` prop, for instance, behaves as we saw with ```Switch```. The other prop we supply in our revised ```NavBar```, ```activeClassName```, indicates which CSS class should be applied to the underlying element when it's matched. In our case, we have an ```active``` class defined in ```site.scss`` which affects border, text color, and background color.

### React Router: Child Routes

Most applications follow a pattern of presenting a list of data and linking to a detailed view of items in that list. For instance, a user list might show some basic information about each user while linking to more detailed information about individual users. We can follow that same pattern in React applications. In fact, we already mentioned we were going to when we discussed trying to traverse to routes such at ```/characters/20``` which would typically indicate a character with ID 20.

We could simply add a new component and route to ```AppContainer.jsx``` and follow the established pattern there but in the interest of separating concerns and showing how React Router v4 dynamic routing works lets isolate the character-related pieces to a separate container component which we'll create in a new ```characters``` folder under ```containers```. We'll call this new container component ```characterHome.jsx```.

```javascript
export default class CharacterHome extends Component {
    render () {
        return null;
    }
}
```

> For simplicity here we're going to stay focused on implementing a child route and not worry about promoting code from the ```CharacterList``` component to the ```CharacterHome``` component.

This pattern should look quite familiar by now. We create a class that extends ```Component``` and implement a ```render``` function. We know that we're going to render the ```CharacterList``` component at ```/characters``` and a yet-to-be-built ```CharacterDetail``` component at ```/characters/:id``` so that sounds like we need two routes. (Remember to ```import``` the appropriate types from the other modules!)

```javascript
export default class CharacterHome extends Component {
    render () {
        return (
            <Switch>
                <Route path="/characters" exact component={CharacterList} />
                <Route path="/characters/:id" component={CharacterDetail} />
            </Switch>
        );
    }
}
```

Just as before, we defined routes that reflect the various parts of our application but now we're focused specifically on characters. 

One of the interesting aspects of React Router's dynamic routing capabilities is that we actually don't need to be quite as specific as we have been with our route path definitions. As it currently stands we've locked this component into the ```/characters``` scheme by hard-coding those paths but by taking advantage of the fact that route props are given to our new ```CharacterHome``` we can make this a bit more flexible.

```javascript
<Switch>
    <Route path={this.props.match.url} exact component={CharacterList} />
    <Route path={`${this.props.match.url}/:id`} component={CharacterDetail} />
</Switch>
``` 

By replacing the hard-coded paths with the matched URL we achieve the same result as what we had before except now we're allowing the dynamic routing to tell us where we are within the application. This frees us to change the base URI for this part of the application without having to change this component to reflect its new location.

We haven't defined the ```CharacterDetail``` component yet so let's do that now:

```javascript
const CharacterDetail =
    props =>
        <div className="spacerTop">Details for character: {props.match.params.id}</div>
```

Let's now connect this new ```CharacterHome``` component to our ```AppContainer```. We can do this by replacing the ```CharacterList``` import and changing the ```component``` prop for the respective route in ```appContainer.jsx```.

```javascript
import CharacterHome from "../containers/characters/characterHome.jsx";
```

Finally, let's modify our ```CharacterList``` component to render some ```Link```s so we can see these new routes responding accordingly. Let's begin by creating a simple function component above our ```CharacterList```.

```javascript
const CharacterListItem =
    props =>
        <li>
            <Link to={`${props.location.pathname}${props.character.id}`}>
                {props.character.name}
            </Link>
        </li>
```

This component will replace our current in-line list items. Note how we're taking advantage of the route information from the props to dynamically generate the ```Link``` target.

Now let's make the ```CharacterList``` render this component. We need to replace the current ```map``` result with the ```CharacterListItem``` as follows:

```javascript
{this.state.characters.map((c, ix) =>
    <CharacterListItem
        key={ix}
        character={{ id: ix, name: c.name }}
        {...this.props} />
)}
```

There are a few new things going on here so let's look at them before we continue.

First, we're consolidating a few values into a single prop by passing a new object for the ```character``` prop. This is perfectly acceptible here since our repository is only returning a name. Typically you could just pass the object from the repository rather than creating a new object.

The second new thing is something is using the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator) with ```this.props``` to allow all of the ```CharacterList``` props to flow down to each ```CharacterListItem```. This allows us to access useful route information such as the ```location``` from that component. Using the spread operator here is a bit on the questionable side since components should really only get the data they need but it was as good a place as any to show that it can be done.

With that slight refactoring out of the way, let's return to the browser and follow one of the links.

Uh oh! Instead of the ```CharacterDetail``` we're seeing the error message we defined back with our routing!

### React Router: Unmatched Paths (Revisited)

Recall when we defined the ```Route``` for ```/characters``` in ```appContainer.jsx``` we included the ```exact``` prop. We did that because we didn't have the concept of a detail page yet so it was perfectly valid. Now we do have a detail page and it's at ```/characters/:id``` but that route is defined within the ```CharacterHome``` component.

Because we require an exact match for ```/characters``` in ```AppContainer```, the router won't select the route when we provide the ```id``` value thus we never get directed to ```CharacterHome``` to discover that route. Let's remove ```exact``` from the ```/characters``` route and try our links again. We should now see a message stating the ```id``` of the character we clicked.

This leaves us with some interesting problem as far as unmatched paths go. First, we've moved detection of unmatched routes from the application root to individual sections within the app. Next, we need to determine what constitutes a valid ```id``` within the context of ```characters```. For instance, ```/characters/1``` is a valid path but ```/characters/arya%20stark``` may or may not be. We need to take this into consideration when designing our routes.

We've established that our character ```id```s are integer based so how can we reflect that in our route? The answer lies in everyone's favorite subject: *regular expressions*.

Route paths can be augmented with regular expressions to further control their format. In our case we want to ensure that the character ```id``` is at least one digit long so we can tweak the path as follows:

```javascript
<Route path={`${this.props.match.url}/:id(\\d+)`} component={CharacterDetail} />
```

In fact, route detection is built upon the [```path-to-regexp``` package](https://www.npmjs.com/package/path-to-regexp) so anything that package can handle is a valid path as far as React Router is concerned.

Because we've moved unmatched route detection from the ```AppContainer``` and it's now possible to enter an invalid character ```id``` we should implement an unmatched path route in ```CharacterHome```. Despite the lack of a "global" detection mechanism the ability to have more granular control over the detection is a positive thing.

```javascript
<Route render={() => <div className="alert alert-danger spacerTop">Invalid character path</div>} />
```

Let's go back to the application one more time and try a few different URIs to see our route revisions in action.

<hr />

## Module 8: Introducing Redux

***Coming Soon***

## Module 9: Adding Redux

***Coming Soon***

<hr />

## Appendix A: Resources

* [webpack](https://webpack.github.io/)
* [webpack dev server](https://webpack.github.io/docs/webpack-dev-server.html)
* [Babel](https://babeljs.io/)
* [React](https://facebook.github.io/react/)
* [React-Router](https://reacttraining.com/react-router/)
* [Redux](http://redux.js.org/)
* [React createClass vs Component](https://toddmotto.com/react-create-class-versus-component/)
* [Controlled vs Uncontrolled Inputs](https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/)
* [React's Component Lifecycles](https://medium.com/mofed/reacts-component-lifecycles-adf0ebc89d23)

<hr />

## Appendix B: Tutorials

* [Facebook](https://facebook.github.io/react/tutorial/tutorial.html)
* [Kirupa](https://www.kirupa.com/react/)
