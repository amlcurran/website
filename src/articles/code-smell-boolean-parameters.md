---
title: "Clean code: The curse of a boolean parameter"
image: "computer"
rawDate: "2017-07-22"
slug: "code-smell-boolean-parameters"
snippet: "Whilst looking innocuous, booleans are often a source of code complexity and can frequently be a code smell. Why is this, and what can you do about it?"
---

A boolean (or Bool, or whatever syntax your language uses) is simple construct but can often make code more complex and less straightforward. Whilst there are simply two values of a boolean, true or false*, the fact they introduce a branch into your code is not something to be blindly accepted, but instead challenged.

We use methods like this a lot as iOS developers, as UIKit has many methods like this:

```
viewController.present(otherViewController, animated: true)
```

which could just as easily been two methods:

```
viewController.immediatelyPresent(otherViewController)
viewController.animatePresentation(of: otherViewController)
```

It is easy for these to get into how we write code, but they’re not always the right option. The main issue with a method which has a boolean parameter is that it forces the method body to handle logic it should have been told about.

Let’s look at this method, and see why it is problematic:

```
func dataLoader(_ dataLoader: DataLoader, finishedLoading data: Data?, wasSuccessful success: Bool) {
    dataLoader.currentRequest?.cancel()
    view.hideLoadingSpinner()
    if success {
        cache.store(data)
        view.update(with: data)
    } else {
        view.showErrorOverlay()
        dataLoader.retry(loading: information, delegate: self)
        tracking.track(.apiError)
    }
}
```

Here we’re taking a look at some code (that would probably be found in a [Presenter](https://en.wikipedia.org/wiki/Model–view–presenter) class) which handles some data, and sets the result on the view. There’s three key bits in this method, and importantly there are two separate ways of “getting through” the method: one where success is true and one when it is false. A proper term for “getting through” a method is called a _control flow_ — if there are multiple control flows in a method this is the code smell we’re looking for!

Whilst this might not seem like too big a problem, the boolean adds indirection. The fact that there are three distinct parts to the method, but there are only two control flows, means this should actually be two explicit methods, rather than one method with a branch.

Whilst this would increase duplication, duplication is not always a bad thing! Duplication is better than inappropriate sharing. If there is one piece of code shared in two branches (such as the first two lines in the above method), it very likely indicates that this piece has a different cause from the other two. It also gives us some hints to decompose this into multiple methods. You’ll see what this means more clearly, when we take a look at refactoring this below.

### A brief aside: cyclomatic complexity

> This bit is optional but will be interesting for intermediate and advanced developers

There is also a term for measuring the amount of control flows in a chunk of code, which is called cyclomatic complexity. This may be familiar if you’ve ever used some static analysis tools, like SonarQube, on your project. The cyclomatic complexity is measured as the number of control flows in the piece of code. So, the code above has a cyclomatic complexity of 2. Bear in mind that cyclomatic complexity increases dramatically — a method which takes two booleans can have a complexity up to 4. Also a switch statement has a cyclomatic complexity equal to the number of cases! Try to figure out what cyclomatic complexity of the method below is (answer at the bottom of the post):

```
func handleData(wasSuccessful success: Bool) {
    if success {
        view.hideLoadingSpinner()
    } else {
        switch self.retryStrategy {
        case .none:
            view.showError()
        case .fetchFromCache:
            dataLoader.retryFromCache()
        case .retryFromNetwork:
            dataLoader.retry(loading: information)
        }
    }
}

enum RetryStrategy {
    case none
    case fetchFromCache
    case retryFromNetwork
}
```

## Refactoring a solution

We identified above that there are three different sections of the code, so let’s start by splitting them into separate methods. This will probably give us a better indication of the roles, and also we’re decomposing our (relatively) large method into smaller ones. Have a think first about what you would call those methods — a good method name is critical to making great, clean, code.

Here’s what I would call them:

```
func dataLoader(_ dataLoader: DataLoader, finishedLoading data: Data?, wasSuccessful success: Bool) {
    stopLoading()
    if success {
        cache.store(data)
        display(data)
    } else {
        showError()
    }
}

func stopLoading() {
    dataLoader.currentRequest?.cancel()
    view.hideLoadingSpinner()


func display(_ data: Data?) {
    view.update(with: data)
}

func showError() {
    view.showErrorOverlay()
    dataLoader.retry(loading: information)
    tracking.track(.apiError)
}
```

So we’ve now split the three sections of this code into their composed parts. Here, hopefully the different causes of each section become obvious, one part is about success, one about failure, and the other about completion regardless of whether it worked or not. I’m not convinced about the showError method name right now, have a think and let me know if you think of something better!

These different conditions (which are also states) give a big hint that these could be three different methods. It is also good — and again, hints at a code smell — that each method can be separated from the others, with no dependencies between them.

Note, that we’ve named the methods describing what they’re doing, not how they’re used. This allows us to be more flexible, and also makes the `finishedLoading(_:, wasSuccessful:)` really obvious about what is happening. We’ve extracted implementation details out of this method and into smaller methods, to the point that this method is now really easy to understand. And only 7 lines long!

> I like to try to keep methods under 10 lines long, as any larger and it makes it harder to read the method. I’ll talk more about making code easier to read another time.

## Tell, don’t ask

We still have a problem though, which is that the presenter still has to deal with the state of the data loader. This method still has logic which the data loader should be responsible for — as the client of the data loader needs to figure out whether the data was loaded sucessfully.

In this case, it gets given the boolean flag which the presenter must ask (via the if statement) to determine whether the data loading was successful or not. Instead, if the data loader had two delegate methods (one for success, and one for failure), the data loader would be telling the presenter directly whether the call worked or not. This is a very key idiom of clean code, and what I highlighted at the top of this post — you should tell clients of a piece of code what happened, not cause them to ask what happened.

The easiest way to do this would be having separate delegate methods. If we were to use two delegate methods, then we would end up with something like this:

```
func dataLoader(_ dataLoader: DataLoader, finishedLoading data: Data) {
    stopLoading()
    cache.store(data)
    display(data)
}

func dataLoader(_ dataLoader: DataLoader, failedToLoadWith error: Error) {
    stopLoading()
    showError()
}
```

This results in zero if statements in this code, which is great! Perhaps we’ll have one in the data loader, but that is all up to the implementation of the data loader — it could just as easily have none too.

So now we’ve refactored our one method with an if statement, into two with no if statements. In the end, we probably have slightly more code, but it is better divided, with lower cyclomatic complexity, and with less indirection. Here’s another two examples, which in my eyes are even bigger cases for not using a boolean parameter:

### When the entire method is actually two different implementations

```
func showPicker(animated: Bool) {
    if animated {
        UIView.animate(withDuration: 0.2, animations: {
            self.picker.frame.offsetBy(dx: 0, dy: -200)
        })
    } else {
        self.picker.frame.offsetBy(dx: 0, dy: -200)
    }
}
```

Here we could decompose this into a method that performs the move, and one that also animates it:

```
func showPickerAnimated() {
    UIView.animate(withDuration: 0.2, animations: {
        self.showPicker()
    })
}

func showPicker() {
    self.picker.frame.offsetBy(dx: 0, dy: -200)
}
```

### When the method does an additional thing determined by the boolean

```
func update(_ items: [String], andRefreshTable refreshTable: Bool) {
    self.items = items
    if refreshTable {
        tableView.reloadData()
    }
}
```

This is a particularly good case to remove a boolean. Instead of having the if statement in a method, you can have two methods and compose the more complex one from the simpler one:

```
func update(_ items: [String]) {
    self.items = items
}

func updateItemsAndTable(with items: [String]) {
    update(items)
    tableView.reloadData()
}
```

## Summing up

This is a short example of how you can remove if statements in your code, and make it easier to reason with in the long run. Booleans as parameters can couple together code that is mutally exclusive, and thus not directly related. Obviously, there are cases where they are useful, but by asking yourself the question, you will find the cases where they’re aren’t useful:

- When the boolean is used to indicate mutual exclusive control flows
- When the boolean is used to decorate an another with additional information
- When the boolean is used as a flag to additional actions

Thanks for reading 😊

The answer to the cyclomatic complexity question is…

4: one branch for success being true, and 3 for the case statements!

* excluding Objective-C, of course…

Photo by [Tianyi Ma](https://unsplash.com/@tma?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/computer?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
  