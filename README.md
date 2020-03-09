# URL_Shortener
URL shortening is a technique in which a URL may be made substantially shorter and still direct to the required page. This is achieved by using a redirect which links to the web page that has a long URL. For example, the URL "https://example.com/assets/category_B/subcategory_C/Foo/" can be shortened to "https://example.com/Foo". 

A friendly URL may be  
• desired for messaging technologies that limit the number of characters in a message (for example SMS). 
• for reducing the amount of typing required if the reader is copying a URL from a print source. 
•  for making it easier for a person to remember. 
• And many more.. 

1.  Extract the zip file, you will see 2 folders (FrontEnd & BackEnd). 
2.  Save them on a simple folder so you can access them from the CMD. 
3.  Go to CMD (on the search panel search for CMD) then go to the folder BackEnd (by using cd) For example, if your folder is in the        Documents, You need to write cd Document/Something/BackEnd. 
4.  Now you need to write npm run start (make sure that you already downloaded npm and nodejs in your computer). 
5.  Now you are connected to the server and to the database. 
6.  Now leave the server open and go to the second folder FrontEnd and open the html file (main.html). 
7.  Click on the Button (Get Started Now). You will be redirected to the second page to generate a shortener URL. 


I used some application frameworks to help me: 
 
• express- web framework we used to create our routes. 
• config- a package that allow us to get virables from the json file. 
• mongoose- very useful abstract to the data base mongoDB. 
• shortid- help us to generate the URL code. 
• valid-url- to validate the URLs that are sent to the API. 
• nodemon- when we update something in the code, nodemon help us to reconnect to the server. (you can also connect to the server using npm run dev instead of npm run start). 
• Cors- to override the policy headers.
