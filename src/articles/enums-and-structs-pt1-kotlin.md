---
title: "Using sealed and data classes in Kotlin part 1: data vs state"
image: "ec-both-apps"
rawDate: "2021-12-15"
---
Data and sealed classes are some of Kotlin's really powerful APIs, and they can greatly improve code comprehension.

However I find they can be overused or used in contexts that don't fit. This leads to code which is harder to extend that it needs to be.

This is the first of three articles, which will focus on the question: **is the concept data or is it state**?

The first thing I look at when thinking about whether an object should be a data or sealed class is whether it is data (thus making it more suitable for a data class) or a state (thus suitable for a sealed class).

## Using sealed classes to represent state

Sealed classes are great for state because states of an object are – by definition – *mutually exclusive*. What mutual exclusivity means is that two things can never be simultaneously true. `Optional` here is a good example, as there will never be simultaneously a wrapped object *and* nil. It's either/or.

Let's take the example of a long-running HTTPS request. It can have these four states and it will never be in more than one state at a time:

- **Idle** – we've not yet started the request
- **Loading** – the request has started but not yet finished
- **Successful** – the request is done and returned us data
- **Failed** – the request is done but failed

You could model this in different ways (for example, you might not need `Idle`; or you could replace `Successful` and `Failed` with a single `CompletedWithResult` state). But the important thing is that a request can't simultaneously be both loading and successful, or in any other two states, at once.

Sealed classes are suitable for state for another reason – using `when` statements.

Switching over a sealed class is a common pattern. With states, it is likely that you're going to want different behaviour for different states – you're not going to show the same UI for a successful load vs a failed one for example. Switching on our state sealed class allows us to manage all our states correctly and with a decently small amount of code. A when statement is a great encapsulation of mutual exclusivity as only one of the branches will be executed.

## Using data classes to represent data

Data classes  are more suitable for data (if the name isn't obvious!) because data doesn't have much behaviour difference between the variants.

In the olden days of object-oriented design, data was normally represented as a bunch of properties without any associated behaviour. These were called plain old java objects, or POJOs.

Thankfully we've all moved on from that to give data objects behaviour – but the important thing with data objects is that, most of the time, there's no behaviour change if the data is different.

Let's go back to our long-running HTTPS request. If there's an error, we want to show an alert to the user. We could make an sealed class with a case for each alert we want to show. But then we'll need to switch over the class for the alert title, subtitle, buttons, etc.

```swift
enum ErrorViewState {
    case loggedOut
    case notFound
    case other
    
    var errorTitle: String {
        switch self {
        case .loggedOut:
            "Logged out!"
        case .notFound:
            "Not found!"
        case .other:
            "Unknown error"
        }
    }
    
    var errorDescription: String {
        switch self {
        case .loggedOut:
            "Please log in again"
        case .notFound:
            "The item you requested is not available"
        case .other:
            "An unknown error happened, try again"
        }
    }
}
```

Instead if we think about this as a bundle of data, we can make a struct with properties, e.g. title, subtitle, buttons. Not only does this push more logic out of our view layer, but we could even put this logic in a backend-for-frontend!

```swift
struct ErrorViewState {
    let errorTitle: String
    let errorDescription: String
    
    static let loggedOut = ErrorViewState(
        errorTitle: "Logged out!",
        errorDescription: "Please log in again"
    )
    
    static let notFound = ErrorViewState(
        errorTitle: "Not found!",
        errorDescription:  "The item you requested is not available"
    )
    
    static let other = ErrorViewState(
        errorTitle: "Unknown error",
        errorDescription: "An unknown error happened, try again")
}

```

A key thing in this case is that these different errors will not have much different behaviour. The title won't have any behaviour once it is set to the correct value for the correct error. Once that is done, it is static.

# Conclusion

Hopefully that gives an insight into my thought process about when to use enums and structs.

I use an enum when:
- The concept is a state or state machine
- The behaviour of different values of the concept is different

I'll use a struct when:
- The concept is simple data which I'm using to configure something
- The behaviour of the configuration doesn't differ significantly between different variations

This is the first part of three posts; the second will deal with the concept of bounds and finite values!