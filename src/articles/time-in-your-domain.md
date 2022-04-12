---
title: "Time is always part of your domain"
slug: "time-in-your-domain"
image: "time-hero"
rawDate: "2015-10-10"
---

Pretty much every project you’ll touch will have the concept of time in it. It is a concept that scares developers; makes even the most seasoned engineer doubt themselves; and makes most of us end up groaning back and forth from the coffee machine. But unfortunately in the information age, time is critical, whether it be calendars, or cache expiry. Time is always there… waiting to pounce.

Part of the issue that time poses is its lack of typing in most languages. Java and Javascript represent time as a long of milliseconds, whereas Objective-C and Swift inexplicably use a double of seconds (source of many of my bugs, I tell you). Time is a whole concept with a ton of logic, so to represent it as a lowly long is to do it an injustice. Let’s take a look at an example.

## Primitives versus the world

Let's take the example of a scrub bar for a video. The scrub bar position goes from 0 to 1, and we want to then move the video to that fractional position in the stream. With time as a primitive, it looks something like this:

```java
float fraction = scrubBar.getCurrentFraction();
long videoDurationMs = video.getDuration();
long videoSeekPosition = (long) fraction * videoDurationMs;
video.seekTo(videoSeekPositionMillis);
```

The amount of implicit knowledge (which results in [connascence of meaning](https://practicingruby.com/articles/connascence)) here is surprisingly high. We have to know that the video returns its duration in milliseconds, and requires a seek in milliseconds. If any of these APIs changed, there’s a high likelihood this code would break. Here’s where our friend, the Value Object, with all its logic and encapsulation, can help out.

## Gaining encapsulation, losing nothing

We often talk nowadays of using domain objects to represent, well, objects in our domain. This simply means that we build objects around something which important to the business, or the logic.

Compare using `java.net.URI` to storing a web url as a String. The URI class has methods which are specific to URIs and URLs, such as `getAuthority()`, and `getPath()`. If you store URLs in your app as strings, you don’t get this shared knowledge and logic. Most importantly, you’re forcing the client of a method with a signature like `String getUrl()` to do any logic themselves. This results in duplication of code, subtle behaviour differences, and is quite clearly an example of broken encapsulation.

It’s entirely the same with keeping Time as a raw number. There’s no knowledge or logic associated with a primitive — how do you know if `long mStartTime = 1000` is in milliseconds, or nanoseconds? It is millis from epoch, or millis from last week?. Representing Time as a real object allows you to encapsulate logic (need to use seconds in one place, and millis in another? `Time.toSeconds()` and `Time.toMillis()`). It also allows you to make construction explicit by using factory methods such as `Time.fromSeconds()` and `Time.fromDays()`.

I’ve seen codebases where time is sometimes store in seconds and sometimes in millis in the same class. How confusing is that! Will future you remember that in six months time? Probably not. Using Time (we’re gonna go uppercase now, its a domain object now!) as a value object means no-one outside that Time class needs to know how it is stored inside, they just use the class API as they need to. Let’s rewrite the code above using a Time value object:

```java
Time duration = video.getDuration();
float fraction = scrubBar.getCurrentFraction();
Time seekPosition = Time.proportionOf(duration, fraction);
video.seekTo(seekPosition);
```

Here we’ve encapsulated logic nearer to its source. For example, this code no longer knows how the video stores its duration, nor does it know how it seeks. Furthermore our inline calculation in the primitive example is now a clear method (`Time.proportionOf`), which explains far more what is happening. This means we could change the logic of the video easily without affecting this code, reducing coupling. Which is always a good thing!

It is very easy to use primitives to express Time but given its fickle nature, the extra security afforded by a class, including type-safety, immutability, and centralised logic is essentially a no-brainer. So start trying it!

_As an addendum: I have always argued that a Time class should always be a concrete, single, implementation. After all, time is absolute, there aren’t two types, right? Now I’m not so sure… but we’ll come back to that soon!_

_Thanks to @ataulm for proofing this, my excuse for any mistakes is I wrote it on a train…_

> Hero photo by [CHUTTERSNAP](https://unsplash.com/@chuttersnap?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/clock?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)