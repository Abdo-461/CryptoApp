The Repository accompanying my Tutorial on Simple Routing in React.js for Beginners: https://medium.com/@andrew.smith_84400/simple-react-js-routing-for-beginners-ca3d9e113f1a

Here we build a simple single page web application in React.js and implement routing using React Router.

**Crypto App Documentation**

*Purpose*
This document serves the purpose to show case my work and explain the functionalities, challenges and issues faced developing this small project.

*Overview and Outline*
The application is a very simple mechanism of fetching a group of coins and displaying them for a user to interact with. The web app consists of two pages, Home and Filter. In Home page, a user can see a list of paginated coins displayed with a pagination tab showing how many pages are there collecting the coins. The other page filter is for users to filter the list of coins based on name or symbol of the coin.

*Challenges*
Pagination is a very interesting and complex algorithm that I had to research and study about before I could implement it. I have discovered that react has a pagination library that could be utilized to achieve the end result. 
The biggest challenge was to integrate the filter function with pagination function. I have made a very extensive research and found similar people attempting similar concepts but there questions was left unanswered. I have tried to solve it myself by applying different solutions, writing the code in different ways but to my dismay, I could not achieve the result. Since I am very familiar with the filter algorithm, I applied the algorithm in a separate component that can be accessed from the nav bar. This is a potential area for me to discover further and learn new skills! I have not focused much on the design of the web pages since I am restricted by time constraints. I have also applied 2 very simple tests using Jest framework. I have deployed the website on S3 bucket on Amazon AWS.
