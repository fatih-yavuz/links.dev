# Simplify your online presence with one simple link.

Are you tired of having to constantly update your CV, social media profiles, and other online platforms with your latest links and information? With links.dev, you can simplify your online presence and make it easier for potential employers, clients, and followers to find and access all your important links in one place.

## Quick Links
- [Website](https://links.dev)
- [Backend Repo](https://gitlab.com/deskriptiff/links.dev-backend)
- [Discord](https://discord.gg/4Z8QZ5Y)
- [Twitter](https://twitter.com/links4dev)

## Benefits

- Add all your links to one simple page
- Get a professional, easy-to-remember URL
- No more updating individual platforms - just add your Link in Bio URL to your CV, social media bios, and anywhere else you want to share your links
- You have the full control over your links - you can change them at any time from your GitHub repository
- You have the full control over how your page looks - you can customize the page's design and from your GitHub repository
- It is completely free!

## How to sign up

You can find a video tutorial [here](https://www.youtube.com/watch?v=50oHDXGuqNQ&t=325s)

----

To register for links.dev, you need to do two things:

- Create **a pull request** to add yourself to the registry.yaml file. 
- Create **a new public repository** called "my-links". (You can also fork [this](https://github.com/fatih-yavuz/my-links)) This repository should contain two files:
  1. `page.json`, which contains the content of your page.
  2. [Optional] `custom.css`, which allows you to customize the look of your page.

That's it!
Once you have created your "my-links" repository and opened your pull request, wait for it to be reviewed and approved. Once it is merged to the master branch, your page will be visible at: https://links.dev/username

> :information_source: If you've already joined links.dev and want to contribute, take a look at the [Contributing section](#contributing).

## Tips

### Profile Picture Tips

- Use and image URL which has 1:1 aspect ratio for your profile picture. This will make sure that your profile picture is displayed correctly.
- You can use your Twitter or LinkedIn profile picture image URL as your profile picture.
- Do not use a URL which contains the image in a web page. This will not work. You need to use the direct image URL (which most probably will have .jpg or .png extension). You can get this URL by right-clicking on the image and selecting "Copy image address".

### Available Icons

- You can use any of the icons listed [here](https://github.com/fatih-yavuz/links.dev/tree/main/user-page/icons)
- If you are a designer, feel free to create a pull request to add more icons to the list.


### Required `page.json` sections

To display your website, your `page.json` must have at least these sections:
- Name (`name`)
- Description (`description`)
- Your image URL (`image_url`)
- Collection of links (`links`)

The minimal version `page.json` file may look like this:

```json
{
  "name": "Your name",
  "description": "Your description",
  "image_url": "url_to_your_image",
  "links": [
    {
      "title": "Link title",
      "url": "link_url"
    }
  ]
}
```

## Restrictions

- Your username must be unique. If your username is already taken, you will be asked to choose a different one.
- Your page cannot contain any offensive content.
- Your page cannot contain any links to illegal content.
- You cannot register reserved usernames. These are listed in the [`restricted-usernames.yaml`](restricted-usernames.yaml) file.
- You cannot register multiple usernames.

## Contributing

Found an issue, want to suggest an improvement or request a new feature? Contributions are always welcome to the project

Get started opening a [new Issue](https://github.com/fatih-yavuz/links.dev/issues/new/choose) or Pull Request!

## Support links.dev

If you like this project and want to support it, you can do so by starring this repo and buying a coffee. The money will be used for domain registry fees, server costs, and monitoring tools costs. Any support is highly appreciated. Thank you! 

[![Buy me a coffee](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](http://bit.ly/3G4193Q)


## Stay in touch?
- Subscribe to the [newsletter](http://eepurl.com/igpQ6j), get notified when new features are added to links.dev
- Follow [@links4dev](https://twitter.com/links4dev) on Twitter for updates
- Join the [Discord](https://discord.gg/KskRunFWEc) server to get help and share your ideas


## Frequently Asked Questions

#### My PR is merged, but my page is online yet

You should invalidate the registry cache. Normally, it should be done automatically on the CI but sometimes, GitHub's own cache is not invalidated when links.dev's registry cache is invalidated. Click this link to invalidate registry cache. 
https://links.dev/fatih/?refresh-registry=1

#### I've updated my-links, but I don't see the update on my page

You need to clear the cache with hitting your page refresh=1 query param. 
Example: https://links.dev/fatih?refresh=1
If you still don't see the update, it might be because you recently committed the changes to your repo. It takes a bit of time for GitHub to invalidate raw content caches. Try hitting your page with refresh=1 5 minutes later. 

#### Everything seems correct, but there is a problem
- Check your my-links repo's branch. Make sure that it has a branch called "main" and it has relevant files.
 

#### Can I add myself to example-pages.js? 
It depends. If you have a different theme than the default one, yes you can. Please keep in mind that, you have to have a known image hosting provider URL or Twitter, LinkedIn profile picture URL. Because its content is displayed on the home page, and it is susceptible to XSS. That's why I cannot accept your pull request if you are using a custom image URL.  
