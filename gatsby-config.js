require("dotenv").config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    title: `Alex Curran`,
    description: `I’m Alex Curran, a software developer specialising in mobile applications across Android and iOS.`,
    author: `Alex Curran`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Alex Curran`,
        short_name: `Alex Curran`,
        icon: `src/utils/favicon.png`,
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `talk-images`,
        path: `${__dirname}/src/talks`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `docs`,
        path: `${__dirname}/src/docs`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `portfolio-bits`,
        path: `${__dirname}/src/portfolio`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `side-projects`,
        path: `${__dirname}/src/side-projects`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `articles`,
        path: `${__dirname}/src/articles`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `not-tech`,
        path: `${__dirname}/src/not-tech`,
        ignore: [`**/**.tsx`]
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /images/
        }
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Domine:300,700', 'Material Icons Round:400', 'Open Sans:400', 'Source Serif Pro:400,700']
        }
      }
    },
    `gatsby-plugin-typescript`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              backgroundColor: 'transparent'
            }
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "G-916879VLE5",
        ],
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true
        },
        gTagConfig: {
          anonymize_ip: true,
        }
      },
    },
    {
      resolve: `gatsby-source-pocket`,
      options: {
        consumerKey: process.env.POCKET_CONSUMER_KEY,
        accessToken: process.env.POCKET_AUTH_TOKEN,
        weeksOfHistory: 52 * 4,
        apiMaxRecordsToReturn: 3000,
        getCurrentWeekOnly: `n`,
        stateFilterString: "archive",
        tagFilter: false,
        tagFilterString: "_untagged_",
        favouriteFilter: true,
        favouriteFilterValue: 1,
        searchFilter: false,
        searchFilterString: "These 21 things",
        domainFilter: false,
        domainFilterString: "buzzfeed.com"
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
}
