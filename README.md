# Simplify your online presence with one simple link.

Are you tired of having to constantly update your CV, social media profiles, and other online platforms with your latest links and information? With links.dev, you can simplify your online presence and make it easier for potential employers, clients, and followers to find and access all your important links in one place.

## Benefits

- Add all your links to one simple page
- Get a professional, easy-to-remember URL
- No more updating individual platforms - just add your Link in Bio URL to your CV, social media bios, and anywhere else you want to share your links
- You have the full control over your links - you can change them at any time from your GitHub repository
- You have the full control over how your page looks - you can customize the page's design and from your GitHub repository
- It is completely free!

## How to sign up

To register for links.dev, you need to do two things:

- Create **a pull request** to add yourself to the registry.yaml file. 
- Create **a new public repository** called "my-links". (You can also fork [this](https://github.com/fatih-yavuz/my-links)) This repository should contain two files:
  1. page.json, which contains the content of your page.
  2. [Optional] custom.css, which allows you to customize the look of your page.

That's it!

### What's next?
Once you have created your "my-links" repository and opened your pull request, wait for it to be reviewed and approved. Once it is merged to the master branch, your page will be visible at: https://links.dev/username

## Stay in touch?
- Subscribe to the [newsletter](http://eepurl.com/igpQ6j), get notified when new features are added to links.dev
- Follow [@links4dev](https://twitter.com/links4dev) on Twitter for updates
- Join the [Discord](https://discord.gg/gVJPDQq4) server to get help and share your ideas
- Want to support me for me? You can buy me a coffee [here](https://www.buymeacoffee.com/fthdev), I will publicly thank you on Twitter from [my personal account](https://twitter.com/fthdev) :)

## Tips

### Profile Picture Tips
- Use and image url which has 1:1 aspect ratio for your profile picture. This will make sure that your profile picture is displayed correctly.
- You can use your Twitter or LinkedIn profile picture image url as your profile picture.
- Do not use a url which contains the image in a web page. This will not work. You need to use the direct image url (which most probably will have .jpg or .png extension). You can get this url by right clicking on the image and selecting "Copy image address".

### Available Icons
- You can use any of the icons listed [here](https://github.com/fatih-yavuz/links.dev/tree/main/user-page/icons)
- If you are a designer, feel free to create a pull request to add more icons to the list.



## Restrictions

- Your username must be unique. If your username is already taken, you will be asked to choose a different one.
- Your page cannot contain any offensive content.
- Your page cannot contain any links to illegal content.
- You cannot register reserved usernames. These are listed in the [`restricted-usernames.yaml`](restricted-usernames.yaml) file.

## Thanks

Thank you for using my service! I hope you have a great time creating your own page and sharing it with others. Let me know if you have any questions or need any assistance along the way.

Once you have your page set up, you can share the link with your friends and colleagues so they can see what you've created.

## Support My Work
If you like this project and want to support my work, you can do so by starring this repo or buying me a coffee. Thank you for your support!

[![Buy me a coffee](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/fthdev)


## Early Adopters

First 1000 users will get early adopters badge on their profile. 

Here is a list of first 24 early adopters:

- [Fatih Yavuz](https://links.dev/fatih)
- [Sila Eryılmaz](https://links.dev/sila)
- [Ali Göktaş](https://links.dev/a)
- [Birkan Atıcı](https://links.dev/birkan)
- [Ali Yılmaz](https://links.dev/ali)
- [Ufuk Kodaman](https://links.dev/kodman)
- [Sezer İltekin](https://links.dev/iltekin)
- [Rıza Sabuncu](https://links.dev/riza)
- [Ahmet Buğra Çakıcı](https://links.dev/ahmet)
- [Oğuz Albayrak](https://links.dev/o)
- [Erhan Büte](https://links.dev/erhan)
- [Onur Şuyalçınkaya](https://links.dev/onur)
- [Zeynep Nur Aktas](https://links.dev/zeynep)
- [Didem Küçükkaraaslan](https://links.dev/codingwithdidem)
- [Tolga Gezginiş](https://links.dev/t)
- [Furkan Kapukaya](https://links.dev/furkan)
- [Melih Sivri](https://links.dev/melih)
- [Joshua](https://links.dev/j)
- [Alperen Çetin](https://links.dev/alperen)
- [Can Çitoğlu](https://links.dev/can)
- [Yunus Bulut](https://links.dev/yunusbulut)
- [Ömer Ulusal](https://links.dev/omer)
- [Mehmet Akif Tütüncü](https://links.dev/akif)
- [Ahmet Can Aydemir](https://links.dev/ahmetcan)

## Frequently Asked Questions
#### My PR is merged but my page is online yet
You should invalidate the registry cache. Normally, it should be done automatically on the CI but sometimes, GitHub's own cache is not invalidated when links.dev's registry cache is invalidated. Click this link to invalidate registry cache. 
https://links.dev/fatih/?refresh-registry=1
#### I've updated my-links, but I don't see the update on my page
You need to clear the cache with hitting your page refresh=1 query param. 
Example: https://links.dev/fatih?refresh=1
If you still don't see the update, it might be because you recently committed the changes to your repo. It takes a bit time for GitHub to invalidate raw content caches. Try hitting your page with refresh=1 5 minutes later. 
 
#### Can I add myself to Early Adopters in README.md? 
Not anymore. Because it causes unnecessary merge conflicts.

#### Can I add myself to example-pages.js? 
It depends. If you have a different theme than the default one, yes you can. Please keep in mind that, you have to have a known image hosting provider url or Twitter, LinkedIn profile picture url. Because its content is displayed on the home page, and it is susceptible to XSS. That's why I cannot accept your pull request if you are using a custom image url.  
