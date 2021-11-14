---
title: "Improving completion blocks in Swift"
slug: "swift-improving-completion-blocks"
image: "swift-improving-completion-blocks"
rawDate: "2017-02-07"
previous: "https://blog.novoda.com/improving-completion-blocks-in-swift/"
---

Swift as a programming language focuses on making APIs descriptive and determinate. Completion blocks are less than perfect — but what is wrong with them, and how can we improve their usage?

The completion block is a very familiar pattern in both Objective-C and Swift. It is a useful feature that allows us to handle asynchronous actions whilst keeping the method call and the resultant code close together. Completion blocks are found all over iOS code, such as this example taken from URLSession :

```swift
let task = URLSession.shared.dataTask(with: aUrl, completionHandler: { (data, response, error) in
    // handle the result here
})
task.resume()
```

So long as you avoid [callback hell](http://callbackhell.com/), they’re a short and easy-to-write way of handling a single result from a method; if you have multiple outcomes or calls you’re better off using [the delegate pattern](https://developer.apple.com/library/content/documentation/General/Conceptual/CocoaEncyclopedia/DelegatesandDataSources/DelegatesandDataSources.html).

Completion blocks have problems but they’re not always obvious to see, which we can see with an implementation of one:

```
let task = URLSession.shared.dataTask(with: aUrl, completionHandler: { (data, response, error) in
    if let data = data {
        parse(data.asJSON)
    } else if let error = error {
        display(error)
    } else {
        // no data and no error... what happened???
    }
})
task.resume()
```
Hopefully now the problem is more obvious! The [Single Responsibility Principle](https://en.wikipedia.org/wiki/Single_responsibility_principle) tells us “_a class should only have one reason to change_”, but it should also apply to functions. In the case of this function, it does multiple things — it first determines whether the response was successful, and then does actions according to that result. Not only that, but we should try to avoid conditionals or abstract them as best we can. So we know we should split these completion blocks apart.

The other problem is made far more obvious by Swift’s type system. Take a look at the signature of the completion block:

```
(Data?, URLResponse?, Error?) -> Void
```

So, when the request completes, we _may_ get some Data, we _may_ get a URLResponse, and we _may_ get an Error.As iOS developers, we know by convention that we’ll either get data or an error, not both. But this is not enforced in the API; it is completely feasible by the API’s design that it could return data and an error at the same time. As for the URLResponse , you have to dig into [the documentation](https://developer.apple.com/reference/foundation/urlsession/1410330-datatask#discussion) to see when you will receive one of these.

This is a problem because a convention is just another way of saying something requires implicit knowledge. If you didn’t know about iOS conventions, you wouldn’t be able tell what this method returns under what conditions without Googling it or hunting API documentation. Looking at it another way, the conventions is that returning some data or an error are two _mutually exclusive outcomes_ — if one happens, the other will not. However, the API does not represent that these are mutually exclusive — rather the API, by having all three parameters as optional, declares that we could get any mix of them at any time! We could remove a lot of the ambiguity in this code and make it easier to use for clients of this API.

## Refactoring a better solution using functions

Using the interesting concept of [higher-order functions](http://learnyouahaskell.com/higher-order-functions), we can improve the API of a lot of these functions (except for URLSession, we’ll address that one at the bottom of this post). Most completion blocks take the signature, where Result can be any piece of useful data:

```(Result?, Error?) -> Void```

What we should be aiming for instead (remembering the term mutually exclusive) is two blocks, one taking the form:

```resultHandler: (Result) -> Void```

And another with the form:

```errorHandler: (Error) -> Void```

If any of you are familiar with [RxSwift](https://github.com/ReactiveX/RxSwift), then these will look [pretty familiar](http://reactivex.io/documentation/operators/subscribe.html). To implement something wrapping this functionality, we can use generics:

```
func completion<Result>(onResult: @escaping (Result) -> Void, onError: @escaping (Error) -> Void) -> ((Result?, Error?) -> Void) {
    return { (maybeResult, maybeError) in
        if let result = maybeResult {
            onResult(result)
        } else if let error = maybeError {
            onError(error)
        } else {
            onError(SplitError.NoResultFound)
        }
    }
}

enum SplitError: Error {
case NoResultFound
}
```

This function creates a closure which will use two separate closures to handle the results. Here’s a before and after using CLGeocoder:

```
CLGeocoder().geocodeAddressString(location, completionHandler: { [weak self] (maybePlaces, maybeError) in
    if let places = maybePlaces {
        self?.handleGeocoding(places: places)
    } else if let error = maybeError {
        self?.handleError(error: error)
    } else {
        // what now??
    }
})
```
And here’s the implementation with our closures:

```
CLGeocoder().geocodeAddressString(location, completionHandler: completion(
    onResult: { [weak self] places in
        self?.handleGeocoding(places: places)
    },
    onError: { [weak self] error in
        self?.handleError(error: error)
    }
))
```
The benefit here is that no longer do we have to deal with `Optionals` everywhere in the result, which makes our code more direct. The other benefit is now that the two data _flows_ in the result are separated into two distinct cases — one where the request succeeds, and one where it fails. This reduces boilerplate, ambiguity and also allows us to use function pointers to write succinct, readable code:

```
CLGeocoder().geocodeAddressString(location, completionHandler: completion(
onResult: zoomToFirstPlace,
onError: showToast))
```

## Refactoring URLSession

We can’t use our completion function defined above in the case of URLSession as the result is two separate objects — Data and a URLResponse . But if we think of the result to be both of these objects combined, it becomes clearer what we can do. If an error happens, and we don’t care about the URLResponse in that case, we can define a struct to encapsulate the Data and URLResponse:

```
struct Response {
    let data: Data
    let metadata: URLResponse?
}

extension URLSession {
    func dataTask(with url: URL, completion: @escaping ((Response?, Error?) -> Void)) -> URLSessionDataTask {
        return dataTask(with: url, completionHandler: { (maybeData, maybeResponse, maybeError) in
            if let data = maybeData {
                completion(Response(data: data, metadata: maybeResponse), nil)
            } else if let error = maybeError {
                completion(nil, error)
            }
        })
    }
}
```

Which would then allow us to use our function as we see fit:

```
URLSession.shared.dataTask(with: aUrl, completion: completion(
onResult: parseResponseAsJSON,
onError: tryCachedVersion
))
```

## Summing up

Completion blocks, whilst useful, aren’t quite perfect. They make code less direct and make it easier for bugs to creep in. Splitting out our completion blocks into separate data flows allows us to more easily keep our happy path and error handling separate. Removing the handling of optionals allows us to write our code more in terms of what we expect to do in these conditions rather than what the language tells us we have to do. Swift’s first class functions allow us to do this is in a maintainable yet approachable way.

You can find the function we used above to make our completion blocks in [this gist](https://gist.github.com/amlcurran/5a09332a835a2dfdce146de9babc9f74). If you have any more tips about working with completion blocks, why not [tweet me](https://www.twitter.com/amlcurran)!