---
title: "Using lint rules to prevent bugs"
date: "22 Jan 2021"
slug: "lint-rules"
image: "IMG_2161"
rawDate: "2021-01-22"
---
At Freetrade, developers work cross-platform to deliver features from beginning to end. The main benefit of this is that it avoids mistaken assumptions or differing behaviour over our platforms. 

However, some of our developers haven’t worked on mobile platforms before. Mobile platforms can be daunting, with new build systems, languages and Integrated Development Environments (IDEs), and one thing we've been experimenting with is using Lint rules as "safety rails" to nudge people into doing the right thing.

Lint rules are a piece of code that checks your code to find issues with it. For example, there is an Android Lint check which prevents you from passing an ID referencing a string to a method that expects an ID referencing a colour. Linting is implemented on many platforms, including Javascript, Python and Swift.

‍


The Freetrade Android app in the wild
‍

For a while now, Android Lint has supported [custom rules](https://github.com/googlesamples/android-custom-lint-rules) – they're covered in some [great articles](https://medium.com/@dbottillo/how-to-write-a-custom-rule-in-lint-d2395d88c8c2) elsewhere. After getting your head around the fact you're programming code to understand code, they're simple to write in Kotlin. We've added a few to avoid easy mistakes that developers can make. 
‍
> The reason for this is one of my favourite philosophies: ensure mistakes are as hard to make as possible.   

Instead of us having to be vigilant on PR (pull request) reviews for these things, developers can find out earlier by a more neutral observer, and with a 100% "error catching" rate. 

Here’s an example of how we use Android Lint to ensure that all text in the app can be updated remotely.

We use a third-party library which allows us to update text within the app without having to release a new version of the app. 

Whilst it works flawlessly under most circumstances, one place where the developer must be careful is when fetching a string that is set in a custom XML attribute:

```
valueLabel.text = styledAttributes.getString(R.styleable.Row_rowAmountText)
```
‍
In places like this, the library cannot update the text; instead you need to use a slightly different method we built:

```
valueLabel.text = styledAttributes.getStringFromResources(resources, R.styleable.Row_rowAmountText)
```

This is really not obvious. So I decided to try to make a lint rule to warn about this usage that will cause problems later, which you can find the source code of [here](https://gist.github.com/amlcurran/aaecb3fcc10236be3d7a5a677a96ce3f#file-lokalisestyledattributelintrule-kt). It works great, as you can see here:

![](./lint-rules-working.mp4)

Now, no-one can repeat that mistake without getting an IDE warning (and an error on their PR, in case they don't see it in the IDE). Something that was previously not very explicit but important, is now enforced. 

The ability to guide developers to doing the right thing is powerful, and the quick-fix suggestions (shown in the image above) are an excellent way of doing this.

Sadly, whilst we have a powerful Linter on Android, our version on iOS is more basic as SwiftLint only supports adding regex-based lint rules out-of-the-box. However, regex is powerful and we have used this to highlight a fair few issues.

Whilst we don't focus quite as much on coding style consistency at Freetrade (tabs vs spaces for example), I think it’s valuable to ensure that our developers get feedback about any mistakes they make earlier than at PR review. Custom lint rules allow us to do this in a way that isn't burdensome on the developer. 
‍
By adding these guardrails to the project, we make it harder to introduce bugs and easier for engineers of any background to get to a productive place on our mobile apps.