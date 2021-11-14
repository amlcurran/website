---
title: "Book reviews: Functional Swift & Protocol-Oriented Programming with Swift"
date: "28 Mar 2016"
slug: "book-reviews-functional-swift"
image: "book-reviews"
rawDate: "2016-03-28"
---

In what is probably shocking to anyone who knows me, I’ve recently finished two whole technical books. I’m starting to dig a bit deeper into Swift and iOS at Novoda, and, as at part of one of my colleagues’ work on adapting the Novoda Craftsmanship University to iOS, I have been doing some evaluation of the books in the course.

The two books I’ve most recently read are [Functional Swift](https://www.objc.io/books/functional-swift/) by Chris Eidhof, Florian Kugler, and Wouter Swierstra, and [Protocol-Oriented Programming with Swift](https://www.packtpub.com/application-development/protocol-oriented-programming-swift), by Jon Hoffman. Both the areas they attempt to explain — functional programming (FP) and protocol-oriented programming (POP) — are newish to me and areas I want to develop further.

## Functional Swift

I read Functional Swift first. I found it to be pretty interesting and the first half at least to be an excellent primer not just for FP, but also for Swift itself. It gives a detailed and well thought-out description of value vs. reference types in Swift, the use of Optionals and how all this applies to developing FP applications. I’ve dabbled a fair amount with Swift so none of the first half was too unfamiliar (although I did have to look up what a [Trie](https://en.wikipedia.org/wiki/Trie) is… go on, I’ll wait!), but explained it all in a more detailed way.

Unfortunately, I found a few of the code samples and the later case studies a bit too difficult to follow. A couple of times I found things weren’t explained as well as I’d like, and the last two chapters on using FP in certain case studies lost me entirely. Perhaps I’ll go back and read them again one day, and perhaps I just wasn’t concentrating enough!

## Protocol-oriented Programming

Second up was Protocol-Oriented Programming in Swift. I’d been told that this book was good but a little dry so I didn’t have high hopes after feeling a bit disappointed by the end of Functional Swift. However, I was pleasantly surprised at the quality of the explanation in this book! Jon did good work and I found the code examples to be much clearer than in Functional Swift. Again, like the previous book, there was a whole part of the book dedicated to something other than what the book said it was about — this time, there was a whole section about design patterns, and how that related to protocols. I didn’t read that bit, simply because if you know the design patterns before, it is pretty trivial to see how protocols can be applied within them (e.g. strategy pattern).

My biggest issue with the book is that I didn’t find myself persuaded about why protocol-oriented programming (POP) is a) different and b) better than OOP. I actually found that the description of POP given is just how I saw good OOP — using protocols (interfaces) to define roles and contracts. So maybe we’ve been doing POP all along, or maybe I’m missing something. The book touches on protocol extensions, but again, didn’t give a definitive reasoning to prefering a protocol extension over a collaborating class. As such, my current thought is that protocol extensions are interesting but I find the concept very odd. If you understand them better than I do, then please feel free to get in touch!

## Conclusion

All in all, I quite liked the books. I found both together cemented a lot of my wobbly understanding of Swift. Neither particularly stood out on initial reading (I’ll certainly give Functional Swift another go in the future) but together they complimented each other well and are a good couple of books to get a good overview of the state of Swift. So get reading!