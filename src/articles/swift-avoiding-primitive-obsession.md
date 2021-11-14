---
title: "Avoiding primitive obsession in Swift"
slug: "swift-avoiding-primitive-obsession"
image: "primitive-obsession-hero"
rawDate: "2017-03-27"
---

It’s all too easy to pass information around in your code as strings or ints, but this can soon catch up with you. Swift has a powerful set of protocols to avoid this situation, which can ensure your code is still well-modelled, whilst being easy to write.


Ensuring your code represents the problem being solved is called _domain modelling_ and is an important part of software craft. This means you should create classes (or structs!) that represent the problem, as opposed to using structures like dictionaries or tuples to store your information. The benefit of creating these _domain concepts_ is that you create a richer API and reduce the amount of effort a developer has to use to understand a piece of code.

The opposite of domain modelling — using primitives to represent complex ideas — is called [primitive obsession](https://sourcemaking.com/refactoring/smells/primitive-obsession), and is a [code smell](http://wiki.c2.com/?CodeSmell). An example of this is representing a website’s URL by storing it as a String . A URL has more information and specific properties compared to a String (e.g. the scheme, query parameters, protocol), and by storing it as a String you can no longer access these URL-specific items (the domain concepts) without additional code.

As part of your domain modelling, there are two things you want to aim for:

> Making your code as explanatory as possible, without requiring documentation

Code which acts as its own documentation is one of the holy grails of software development. If the code is self-documenting in this way, then the documentation will never go out-of-date because it is part of the code itself. You don’t need to remember to update the documentation each time you change the code, which is easy to overlook.

> Prevent misuse of your code in ways that don’t make sense for the business

One thing often overlooked about good code is that it makes it difficult to do the wrong thing. A function that requires a URL should take a URL as a parameter, not a String. Whilst it might be easier for a user of the function if they can pass in a String, the function now has to ensure that String is actually a URL too. By forcing the user to do this you put some of the burden on them, but also prevent them from not only misusing your API, but being able to misuse it.

Let’s focus on this little snippet of code and look at some ways of modelling this better:

```
func showDetailsForEmail(withId: String) {
    // push new view controller
}
```

## Using typealiases

typealias is a [keyword](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html) — available both in Objective-C and Swift — useful to show where something in your code could be easily represented by something else:

```
typealias EmailId = String

func showDetailsForEmail(withId: EmailId) {
    // push new view controller
}
```
Typealiases are good for explaining what something can be used for in this context, and they satisfy the first goal (making your code more explanatory). Here, by looking at the function signature, you can see what you’re required to send to the function to get it to work — the ID of an email. Previously when the function just required a String, it is less obvious what that string should represent and how you can create one. It would have been all too easy to pass in a completely unrelated String to the method, which isn’t what you want.

Unfortunately, typealiases fail the second requirement — preventing misuse of the API. Typealiases are a “nickname” for another object; they’re not a separate type so they won’t prevent their “nicknamed” type being used in their place. Even though the above function requires an EmailId, you could still pass a String (or even another typealias) in its place:

```
typealias EmailId = String
typealias SMSId = String

func showDetailsForEmail(withId: EmailId) {
    // push new view controller
}

let smsOne: SMSId = “from:alice:to:bob”
showDetailsForEmail(withId: smsOne) // compiles, even though this isn’t correct
```

This code doesn’t make sense from the perspective of a developer, but the compiler can’t know that. A mistake like this would be caught at runtime, either by a crash later down the line, or just by strange behaviour (if you put an SMS ID in accidentally, it would try to show you emails from this SMS conversation!). If you can tell the compiler — and the developer — what you explicitly mean when you ask for an EmailId, you can catch the error at compile time.

## Removing primitive obsession

The simplest way to ensure that you don’t end up accidentally passing the wrong “meaning” of one of these strings to a method is to make two different objects for the two different types, promoting them from being lowly typealiases:

```
struct EmailId {
    let rawValue: String
}

struct UserId {
    let rawValue: String
}
showDetailsForEmail(withId emailId: EmailId) {
    // push new view controller
}

let joe = UserId(rawValue: “joeBloggs”)
showDetailsForEmail(withId: joe) // this now fails to compile
```

This will fail to compile with the error:

```
Cannot convert value of type UserId to EmailId
```

Which is perfect! Whilst it might seem like overhead to create two separate objects for what seems like a string, it’s important to realise that isn’t the case. In this instance, it makes no sense to be able to pass a `UserId` to the `showDetailsForEmail()` method, so you should prevent developers from doing it. In the eyes of the business that is setting these requirements, a UserId and an EmailId are clearly two different things, so making this evident in your code gets you closer to matching the business rules. Furthermore, it is far quicker to catch an error at compile time, than at runtime.

## Testing your domain structs

A common annoyance with creating objects to wrap domain items is that it can add a lot of boilerplate to the data you create in your tests:

```
let testEmail = Email(id: EmailId(rawValue: “from:alice:to:bob”), message: “…”)
```

Ensuring tests are expressive and quick and easy to understand is important. Luckily, Swift can make your life easier here.

Swift has a suite of protocols which can be used to say “this object can be constructed just from a primitive”. These are the `ExpressibleBy*Literal` protocols where * can be some built-in types, e.g. a String, Int, Double, or Array. Implementing these protocols just requires implementing some initialisers:

```
struct EmailId: ExpressibleByStringLiteral {

    let rawValue: String
    public init(stringLiteral value: String) {
        self.rawValue = value
    }
 
    public init(extendedGraphemeClusterLiteral value: String) {
        self.rawValue = value
    }
 
    public init(unicodeScalarLiteral value: String) {
        self.rawValue = value
    }

}
```

You can then pass a string literal instead of having to create this struct yourself, which means you don’t have to worry about the boilerplate of creating your wrapping struct all the time:

```
let firstEmailId = EmailId(rawValue: “from:jane:to:kathy”)
let secondEmailId: EmailId = “from:daniel:to:erica”
```

This can make your test setup easier as now instead of:

```
let testEmail = Email(id: EmailId(rawValue: “from:sue:to:terry”), message: “…”)
```

You can simply write:

```
let testEmail = Email(id: “from:sue:to:terry”, message: “…”)
```

You would still create an EmailId , but you’ve reduced some of the boilerplate code.

One really important point is that this will only work with string literals (ie text contained in “quotation marks”). So the following code won’t compile because stringId is a String (as soon as a string literal is assigned, it is assigned as a String):

```
let stringId = “any”
let testEmail = Email(id: stringId, message: “…”) // fails to compile, as stringId is a String
```

Which is what you wanted, as this prevents you passing random strings.

These literal convertible protocols are really useful for tests because they allow you to write less test boilerplates. Their usefulness is limited in production because, in this example, it is unlikely you’d create EmailIds from string literals, it is more likely to be delivered from JSON (and thus be a String). Furthermore, if you used this in production, you would lose all the safety you’ve gained from having structs — you could just type any String much like a typealias.

## Conclusion

Domain modelling is essential to making code that is easy for new and experienced developers alike to be able to understand. By making your code more explanatory, you make it easier for developers to understand, and easier to refactor. By ensuring you prevent misuse of code, you make it safer to refactor and reuse code. Type systems are powerful tools to help improve your code, and can also have benefits for understanding the business rules you need to write. But in Swift, the types don’t have to be a burden while testing, by implementing the ExpressibleLiteral protocols.

Know any other good uses for these protocols? [Tweet me](https://twitter.com/amlcurran)! If you like the article, please give it a share 😁.

### Bonus round

Read more on this concept in my other article, [Time is always part of your domain](time-in-your-domain.md).