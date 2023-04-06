---
title: "Enums and structs in Swift #1: data vs state"
slug: "enums-and-structs-part1"
image: "ec-both-apps"
featured: ./ec-both-apps.png
rawDate: "2021-12-30"
snippet: "Enums and structs are some of Swift's most powerful APIs, and they can greatly improve code comprehension. But how do you decide which one to use?"
---

_A huge thanks goes to [Dan Lages](https://twitter.com/danlages1) for proof-reading this!_

Enums and structs are some of Swift's most powerful APIs, and they can greatly improve code comprehension.

However I find enums and structs are used sometimes in contexts that don't fit. This leads to code which is harder to extend or understand that it needs to be.

There’s a few questions I ask myself when I go to use an enum or a struct and this article talks about the first of those questions: **is the object data or is it state**?

## Using enums to represent state

Enums are great for state because states of an object are – by definition – *[mutually exclusive](https://en.wikipedia.org/wiki/Mutual_exclusivity)*. What mutual exclusivity means is that two things can never be simultaneously true. [`Optional`](https://docs.swift.org/swift-book/LanguageGuide/TheBasics.html#ID330) is a good example in this case, as there will never be simultaneously a wrapped object *and* nil. It's either/or.

Let's take the example of a long-running HTTP request. It can have these four states and it will never be in more than one state at a time:

- `Idle` – we've not yet started the request
- `Loading` – the request has started but not yet finished
- `Successful` – the request is done and returned us data
- `Failed` – the request is done but failed

You could model this in different ways, of course. You might not require an Idle state, or you could replace Successful and Failed with a single CompletedWithResult state. But the important thing is that a request can't simultaneously be both loading and successful, or in any other two states, at once. This is an example of mutual exclusivity (and also, an example of a [state machine](https://en.wikipedia.org/wiki/Finite-state_machine), which cycles through a finite number of states).

```swift
func getData() async {
  requestState = .loading
  do {
    let result = try await doApiRequest()
    requestState = .successful(result)
  } catch {
    requestState = .failed(error)
  }
}
```

Enums' mutual exclusivity gives them another useful tool making them useful for representing state – `switch`.

Switching over an enum is a common pattern. With states, it is likely that you're going to want different behaviour for different states – you're not going to show the same UI for a successful load vs a failed one for example.

Switching on our state-enum allows us to manage all our states correctly and with a decently small amount of code. A switch statement is a great encapsulation of mutual exclusivity as only one of the branches will be executed.

## Using structs to represent data

[Structs](https://docs.swift.org/swift-book/LanguageGuide/ClassesAndStructures.html) are more suitable for data because data doesn't have much behaviour difference between the variants. Structs are also immutable, and it is [good practise](https://redux.js.org/faq/immutable-data#what-are-the-benefits-of-immutability) to keep your data immutable too.

In the olden days of object-oriented design, data was normally represented as a bunch of properties without any associated behaviour. These were called plain old java objects, or [POJOs](https://www.geeksforgeeks.org/pojo-vs-java-beans/).

Thankfully we've all moved on from that to give data objects behaviour – but the important thing with data objects is that, most of the time, there's no behaviour change if the data is different.

Let's go back to our long-running HTTPS request. If there's an error, we want to show an alert to the user. We could make an enum with a case for each alert we want to show. But then we'll need to switch over the enum for the alert title, subtitle, buttons, etc. For example:

```swift
enum ErrorViewState {
    case loggedOut
    case notFound
    case other

    var errorTitle: String {
        switch self {
        case .loggedOut:
            return "Logged out!"
        case .notFound:
            return "Not found!"
        case .other:
            return "Unknown error"
        }
    }

    var errorDescription: String {
        switch self {
        case .loggedOut:
            return "Please log in again"
        case .notFound:
            return "The item you requested is not available"
        case .other:
            return "An unknown error happened, try again"
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
        errorDescription: "An unknown error happened, try again"
   )
}
```

A key thing in this case is that these different errors will not have much different behaviour. The title won't have any behaviour once it is set to the correct value for the correct error. Once that is done, it is static.

## Conclusion

Hopefully that gives an insight into my thought process about when to use enums and structs.

I use an enum when:
- The concept is a state or state machine
- The behaviour of different values of the concept is different

I'll use a struct when:
- The concept is simple data which I'm using to configure something
- The behaviour of the configuration doesn't differ significantly between different variations

This is the first part of three posts; the second will deal with the concept of bounds and finite values!
