# WikipStudy

A web app to learn from Wikipedia !  
Wikipedia is the largest source of knowledge openly accessible on the internet.  
What if you could learn easily from it ?  
That's the mission of WikipStudy !  

## Overview
WikipStudy is a web application designed to facilitate learning from Wikipedia. By using the vast amount of knowledge available on Wikipedia, WikipStudy aims to turn passive reading into active learning.

#### Note
This repository is only for the front-end part of the application. Here are the other repositories :
- [WikipStudy-Backend](https://github.com/arkonny/WikipStudy-Backend)
- [WikipStudy-Auth](https://github.com/arkonny/WikipStudy-Auth)
- [WikipStudy-Upload](https://github.com/arkonny/WikipStudy-Upload)

## Application Idea and Target Audience
### What the Project Does
WikipStudy allows users to create their quizzes, with a question and a fill-in answer.
At the creation of a quiz, the user can choose to generate one from a simple search that will find the correct wikipedia page and extract its first 10 sentences. From there, each sentence will be analysed and a key word will be chosen to be replaced, making a question out of it.  
Additionnally, they can search among all of the quizzes created by the other users to try them out.
And to more easily access quizzes they like, they can add them to their favorites.

### Target Audience
WikipStudy is designed for individuals of all ages and educational backgrounds who are searching for a way to learn from Wikipedia.

- Students: From high school or university, preparing an exam or conducting research, WikipStudy offers a convenient way to create revision quizzes, and cover various topics from Wikipedia articles.
- Teachers: They can make use of WikipStudy as a learning tool to create custom quizzes, encouraging a better student participation.
- Lifelong and casual learners: You can use WikipStudy to discover interesting facts from the wide range of topics available on Wikipedia.

## Application Functionalities
WikipStudy offers the following key functionalities:
- Play: Users can play quizzes by filling the correct answer for each question, and get a score afterwards
- Create: Users can create their own quizzes with a simple interface, and even add an image to their quiz to make it more unique !
- Generate: The special feature of WikipStudy ! Users can choose to generate a quiz from a wikipedia page out of a simple search.
- Search: Users can search for quizzes from other users, and see all of the quizzes created by a user.
- Bookmarking: Users can add to their favorites quizzes for future play and easy access.
- Privacy matters ! Your email adress is not communicated to anyone except you, of course.

## Testing the Application
You can directly go to the website : [WikipStudy](https://users.metropolia.fi/~lucienr/wikipstudy/)  
Or to the Apollo panel : [Apollo Server](https://wikipstudy.azurewebsites.net/graphql)

There, create an account, and login.
You arrive on your personal page, where you will be able to see your own quizzes and create new ones. You can also edit your username and email adress from there.  

### Finding and playing a quiz
On the "Research" page, by clicking on "Search" with no search words, you will access all of the quizzes created by everyone.  
On the "Play" page of a quiz, you can fill in what you think are the answers, and click on "Get result" to see your score. No need to try to cheat, you won't get the answers unless you are the owner of the quiz.  
You can look at the page of the owner of the quiz and see what other quizzes he created.  
If you like a quiz, click on the yellow star on the page of the quiz (the "Play" page) to add it to your favorites.
You can then access to your favorites by clicking on the link of the same name in the navigation bar.

### Creating a quiz
The "Edit" page has two states : either saved or unsaved.  
By clicking on "New quiz", you are in the unsaved state. Their, you can either generate a quiz or create your own by clicking on the green button "Add", to add a question.  
Once a quiz is saved or generated, it is playable and everyone can see it, but you cannot generate from wikipedia over a saved quiz, as it automatically creates a new one.  
To generate a quiz, click on the "Generate" button, enter the name of a wikipedia page (you can actually enter a search, it just needs to find the page in a single search, so you need to be precise. For example, "VIM" won't work, but "VIM (editor)" will find the correct page)  
You can add and modify the picture associated to the quiz at any time.  

Creating a lot of quizzes to test the generating tool is okay, as long as you delete the unused quizzes afterwards.
When deleting a quiz, it disappears from everyone's favorite, the saved results of the quiz are deleted, and the image associated to it is deleted as well.

### Note :
Currently, you cannot see your past results from the UI, but their is a graphql API call to do so. You can only see your results, by providing the id of a quiz you have played.
 
## Deploy your own instance of WikipStudy
To deploy WikipStudy locally and start using the application, follow these steps :
1. Clone the different repositories : (you should do that in a dedicated folder, as all of the repositories are important)
   ```
   git clone https://github.com/arkonny/WikipStudy
   git clone https://github.com/arkonny/WikipStudy-Backend
   git clone https://github.com/arkonny/WIkipStudy-Auth
   git clone https://github.com/arkonny/WikipStudy-Upload
   ```
2. Install the dependencies on each repository (except the "Wikipstudy" one, which is the front-end)
   ```
   cd WikipStudy-Backend
   npm i
   cd ../WikipStudy-Auth
   npm i
   cd ../WikipStudy-Upload
   npm i
   ```
3. Fill in the .env file of each repo with the correct informations; You will need a Mongo database, and choose a JWT secret and a password for the admin account.
(As of right now, the admin account is only useful for the tests, and doesn't have any specific privileges)
4. Start each application
   ```
   npm run dev
   ```
5. From VSCode for example, launch a live server of the WikipStudy repo (the front-end). From there, everything should work.
6. Additionaly, you can access the Apollo server interface at [http://localhost:3000/graphql](http://localhost:3000/graphql).

## Contributing
Contributions to WikipStudy are welcome! For now, the project is a proof-of-concept, and the front-end is not the priority.
What will matter the most next is :

- Questions variety : offer different type of questions, even more complex than what a simple quiz could offer, with interactive tasks and exercices and different media supports : audio, image, maybe even videos, and even more.
- Questions generation : being able, from a simple text input, to generate at least True or False questions, qualitative Fill-in questions, and Multiple choice questions. Enough so that someone could, from a written chapter of any kind of course, generate with no user interaction, a qualitative quiz to help do a quick revision of its course.

As of the interface, it will probably be a stand-alone software, or a simple discord bot could potentially be created for the quiz generation part.

## License
This project is licensed under the [MIT License](LICENSE).
