---
title: "Introducing Freetrade for iPad"
date: "16 Jun 2021"
slug: "migrating-to-hilt"
image: "freetrade-hilt-1"
rawDate: "2021-06-16"
previous: "https://freetrade.io/blog/migrating-our-android-app-from-dagger-to-hilt"
---
How we’re continuously modernising our app.

Recently Google announced [Hilt](https://dagger.dev/hilt/), a dependency injection framework for Android. It works on top of Dagger to make injecting dependencies into our classes easier, but has some nice features specific to Android.

We used Dagger in the app before but it definitely caused confusion, so we decided to move the app to using Hilt to see if our developers would prefer it.


# Why inject dependencies?

We use [dependency injection](https://www.freecodecamp.org/news/a-quick-intro-to-dependency-injection-what-it-is-and-when-to-use-it-7578c84fa88f/) in our apps heavily to maintain good separation between the layers of our app, and make our unit tests robust and [easy to write](https://developer.android.com/training/dependency-injection/hilt-testing).

By avoiding creating dependencies within classes, we can write tests easier. For example, to test a screen does the right thing when a user is logged in, versus logged out, we inject different user statuses using a mocked UserService.


# The downsides of Dagger

[Dagger](https://dagger.dev/dev-guide/) – which Hilt is based on – allows you to define a way of creating and injecting dependencies into your classes. It builds a tree of dependencies and will autogenerate code to add those dependencies to your classes.

This would be great if it is all you need to get started with Dagger, but you also have to understand more, such as Modules, and Components. These two together define how objects are built, and where they can be injected into.

They're a bit confusing, and we ended up with large modules (for example, our `ViewModelModule`). Developers new to Android struggled to know that all Android classes required a function in a Component to get their dependencies injected. It's a hurdle that didn't need to exist!


Using Hilt

Hilt mostly abstracts these concepts away from you. All your injectable objects still work as is, as do any modules you need.

But the best bit of Hilt is that it gets rid of your Components! Annotating an Android class with `@AndroidEntryPoint `will make injected variables within it work without needing to build a Component. So migrating to Hilt was a three-step process:

1. Annotate all our Android classes which were using `@Inject` variables with `@AndroidEntryPoint`.
1. Annotate our Application with `@HiltAndroidApp`
1. Delete all our Components.

It was a bit tricky to ensure we caught all classes which needed the @AndroidEntryPoint, so I wrote a lint rule to catch them and migrate them all. You can find how we use lint rules in more detail in an [earlier blog post](./lint-rules.md).


# Conclusion

Hilt is a nice approach to keeping dependency injection on Android but without so much of the knowledge of Dagger required. It meshes the two concepts nicely and has made developers more productive on the app, whilst also removing a few hundred lines of boilerplate:


It also gives us a much easier way of migrating our view models to using Jetpack ViewModels, as Hilt integrates tightly with them. So that makes our next step to upgrading our app even easier!