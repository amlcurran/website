---
title: "Enums and structs in Swift #2: bounded contexts"
slug: "enums-and-structs-pt2-boundaries"
image: "ec-both-apps"
featured: ./ec-both-apps.png
rawDate: "2022-04-30"
snippet: "Enums and structs are some of Swift's most powerful APIs, and they can greatly improve code comprehension. But how do you decide which one to use?"
unlisted: true
---

Enums and structs are some of Swift's really powerful APIs, and they can improve code quality.

In the previous part of this series of articles, I spoke about how determining whether the object we need to represent is data or state should influence the decision on whether to model it as an enum or a struct.

In this part, I'll take a look at the second part of my decision process – whether the object represents a finite or infinite number of options.

# Finding boundaries to the problem

A good way to think about enums and structs is whether they represent a *bounded set*. This is a fancy term that means, is there an infinite number of things this object represents or not?

Enums are great at representing small finite sets of things. For example, `Bool` is an enum with two cases. `Optional` is even defined in Swift as an enum!

`Optional` does have a finite bounded set of values because there's a finite number of states – either the wrapped object is there, or it isn't. There's no conceptual third state we'd ever add.

Where structs are better is when there is a large number (or infinite) amount of states represented. For example, `Int` isn't an enum, nor is `String`!

One of my favourite examples for a struct-based approach is analytics events. Say we want to send screen load events on the screen being viewed:

```swift
override func viewDidLoad() {
    super.viewDidLoad()
    analytics.screenLoaded(named: Screen.homeScreen)
} 
``` 

Now `Screen` is often implemented in Swift as an enum but here I'd use a struct because the amount of cases `Screen` could have is *unbounded*.

This comes back to the first part of this series – `Screen` here represents data, not state. Data is almost always unbounded, but state will have a bounded number of values it can take.

It is common to use associated types to add data to an enum. However, structure the struct to have this behaviour – with no change in external API and even less code!

```swift
enum ScreenAsEnum {
    
    case homeScreen(tabIndex: Int)
    case detailScreen(id: String)
    
    var name: String {
        switch self {
        case .homeScreen:
            return "home"
        case .detailScreen:
            return "detail"
        }
    }
    
    var additionalProperties: [String: Any] {
        switch self {
        case .homeScreen(tabIndex: let tabIndex):
            return ["tab": tabIndex]
        case .detailScreen(id: let id):
            return ["id": id]
        }
    }
    
}
```

```swift
struct ScreenAsStruct {
    
    let name: String
    let additionalProperties: [String: Any]
    
    static func homeScreen(tabIndex: Int) -> ScreenAsStruct {
        ScreenAsStruct(name: "home",
                       additionalProperties: ["tab": tabIndex])
    }
    
    static func detailScreen(id: String) -> ScreenAsStruct {
        ScreenAsStruct(name: "detail",
                       additionalProperties: ["id": id])
    }
    
}
```

# Conclusion

In the first part of this series we looked at data and state, and looking at the bounded-ness of a set is another lens we can use to determine how best to model our code.

Enums make sense when the set of values is small, and structs when the set of values is conceptually infinite. Large sets are a grey area, but likely a struct is more extensible.

In the last part of this series we'll look at concepts such as iteration, and blast radius.