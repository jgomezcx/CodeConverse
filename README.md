# Web Development Final Project - Code-Converse

Submitted by: Jaime Gomez

This web app: Code-Verse is a vibrant forum designed for coding enthusiasts to share, discover, and discuss projects and ideas. With features like post creation, a streamlined home feed, interactive post pages, and robust engagement tools including unlimited upvotes and comments, users can easily manage their content, search for specific topics, and sort discussions by popularity or recency. Whether you're looking to learn, share, or connect, Code-Verse offers a dynamic platform to foster a community of passionate coders.

Time spent: 22 hours spent in total

## Required Features

The following **required** functionality is completed:

- [X] **A create form that allows the user to create posts**
- [X] **Posts have a title and optionally additional textual content and/or an image added as an external image URL**
- [X] **A home feed displaying previously created posts**
- [X] **By default, the time created, title, and number of upvotes for each post is shown on the feed**
- [X] **Clicking on a post shall direct the user to a new page for the selected post**
- [X] **Users can sort posts by either their created time or upvotes count**
- [X] **Users can search for posts by title**
- [X] **A separate post page for each created post, where any additional information is shown is linked whenever a user clicks a post**
- [X] **Users can leave comments underneath a post on the post's separate page**
- [X] **Each post should have an upvote button on the post's page. Each click increases its upvotes count by one and users can upvote any number of times**
- [X] **A previously created post can be edited or deleted from its post page**

The following **optional** features are implemented:

- [ ] Users can only edit and deleted posts or delete comments by entering the secret key, which is set by the user during post creation
- [ ] Upon launching the web app, the user is assigned a random user ID. It will be associated with all posts and comments that they make and displayed on them.
- [ ] Users can repost a previous post by referencing its post ID. On the post page of the new post, the referenced post is displayed and linked, creating a thread
- [ ] Users can customize the interface of the web app
- [ ] Users can share and view web videos
- [ ] Users can set flags while creating a post. Then users can filter posts by flags on the home feed.
- [X] Users can upload images directly from their local machine as an image file
- [ ] Display a loading animation whenever data is being fetched

The following **additional** features are implemented:

* [X] Ability to upload either images or gifs

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='https://imgur.com/a/N4V5WhY.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<p> https://imgur.com/a/N4V5WhY.gif </p>
GIF created with ...  

[ScreenToGif](https://www.screentogif.com/) for Windows


## Notes

Some of the main challenges while building this web application was building it to work along side supabase as it pulls and sends data back and forth between it. supa base makes it super easy to set up tables and make calls between on another, but it also is challenging to see how to make those calls and how to send up certain information for those calls to go back and forth. After setting up the main functionality of the website, learning buckets for storeing files was simple enough as well as displaying them. Gif files do work thanks to using buckets in supabase. Lastly it took a lot of time to style the website the way i wanted it to look. a lot went into building the style to make a clean and uniform look for the website.

## License

    Copyright [2024] [Jaime Gomez]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
