---
title: "Running an A/B test on our paywall"
slug: "bodycoach-a-b-testing-paywall"
image: "book-reviews"
rawDate: "2023-01-28"
unlisted: true
---
As part of the Get Moving team at The Body Coach, we set up and ran an A/B test to attempt to improve the conversion of users on our paywall. A/B tests are hard to run well and this one was one I felt ran well – we got great results from it.

<More>

## Fundamentals of an A/B test

For those new to A/B testing, this is where you show two sets of users two different variations of the app.

For example, it could be something as simple as changing the colour of a button to make it more noticeable, or as complicated as a whole new onboarding flow.

This might sound like feature flags and there is a lot of overlap but the key takeaway from an A/B test is that you're actively measuring the effect the variations (or variants) have on user behaviour.

Taking the example of the new onboarding flow above, you may choose to measure how many users never finish onboarding. If your new variant has a lower number of users dropping off then the implication is the onboarding is more likely to result in users successfully onboarding. This could positively affect your revenue and customers.

## Identifying the problem space

The product and design teams at The Body Coach did research which uncovered that our paywall – where we asked the user to pay to sign up – wasn't following best practises for paywalls in general.

After a lot of research by that team, in particular from the website [Superwall](https://www.paywallscreens.com/), they came up with optimisations and a new design which we ran as our A/B test

| Before                                           | After                                         |
|--------------------------------------------------|-----------------------------------------------|
| ![The redesigned paywall](joe-paywall-after.jpg) | ![The paywall before](joe-paywall-before.jpg) |

## Setting up the experiment

The most difficult thing when setting up an A/B test is not the different variants, but what *metric* to* measure success against.

If the metric is too loosely related to the user behaviour, you risk the experiment running forever without a conclusion or an ambiguous result.

For example, if you're changing the onboarding flow a poor metric would be whether the user retains after 30 days – a user will see the onboarding only once, so it is unlikely to play a large part in them sticking around using your app. The proportion of users who complete onboarding is a metric much more likely to be affected by a good (or bad!) change to the onboarding.

For the paywall, the metric we want to measure is clear – how many people go on to pay? There is subtlety in this metric which will be explained later. We kept this as a secondary metric, but the main metric we measured was *Intent to subscribe*, which is best explained as the question:

> Does the new paywall increase the amount of people who go through to the Apple Pay/Google Pay screens?

## Running it

We used Amplitude to run this A/B test. My candid review of Amplitude is that it is fantastic, but the data is overwhelming. A huge positive of it is that it takes a lot of the interpretation of the data and does it for you, removing bias in the results. 

Amplitude splits an A/B test into four stages:
- **Plan**: creating the A/B test parameters themselves
- **Configure**: deciding what user segments will see which variant
- **Monitor**: see when users are being exposed to variants in real-time
- **Analyse**: See the statistics and conclusions around your experiment



## The results

## Next time