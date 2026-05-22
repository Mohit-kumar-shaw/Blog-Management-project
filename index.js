import express from "express";
import bodyParser from 'body-parser';

const app = express();
const PORT = 3002;

//Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

//Dummy data
var blogs = [
  {
    id: 1,
    title: "Why Developers Love Coffee More Than Sleep ☕",
    content:
      `A developer’s daily routine: Wake up → Drink coffee → Fix one bug → Create two new bugs → Drink more coffee. Repeat until deployment succeeds.`,
    author: "admin",
  },
  {
    id: 2,
    title: "My Code Works… Don’t Touch It 😂",
    content:
      "Every programmer’s biggest fear is hearing: ‘Can you just make one small change?’ That one small change usually becomes a full-day debugging session.",
    author: "user",
  },
  {
    id: 3,
    title: "Relationship Status: Debugging 💔",
    content:
      "I told my laptop we needed a break. Now it freezes every time I open VS Code.",
    author: "admin",
  },
  {
    id: 4,
    title: "Frontend Developers vs Backend Developers ⚔️",
    content:
      "Frontend Developer: ‘The button color is wrong!’ Backend Developer: ‘The server is literally on fire.’",
    author: "user",
  },
  {
    id: 5,
    title: "404 Motivation Not Found 😴",
    content:
      "I started learning coding to become rich. Now I celebrate when my code runs without errors.",
    author: "admin",
  },
  {
    id: 6,
    title: "Bug Fixing Level: Impossible 🐛",
    content:
      "The bug disappears when the senior developer comes to check it. This is called artificial intelligence.",
    author: "user",
  },
  {
    id: 7,
    title: "Deploy on Friday? Brave Soul 🚀",
    content:
      "Rule number one in IT: Never deploy on Friday unless you enjoy weekend office calls.",
    author: "admin",
  },
  {
    id: 8,
    title: "Coding Diet Plan 🍕",
    content:
      "Breakfast: Coffee. Lunch: Coffee. Dinner: Stack Overflow and regret.",
    author: "user",
  },
  {
    id: 9,
    title: "Life of a Software Engineer 👨‍💻",
    content:
      "90% of coding is searching why your code doesn’t work. The other 10% is wondering why it suddenly works.",
    author: "admin",
  },
  {
    id: 10,
    title: "Dear JavaScript, Please Decide 😭",
    content:
      `JavaScript be like: [] + [] = "" and developers be like: Yes… totally makes sense.`,
    author: "user",
  },

  {
    id: 11,
    title: "Hehe",
    content:
      `hehehehehhe`,
    author: "user",
  },
  
  {
    id: 12,
    title: "Hahahahaha",
    content:
      `Hahahahaha`,
    author: "admin",
  },
];


//Routes
app.get('/', (req,res) =>{
  res.render('home', {title:'Welcome to Mohit Entertainment and joke Blog'});
});

app.get('/blogs', (req,res) =>{
  res.render('blog', {blogs});
});

app.get('/blogs/:id', (req,res)=>{
  const blog = blogs.find(b => b.id === parseInt(req.params.id));
  if(! blog){
    return res.status(404).send('Blog not found');
  }
  res.render('blogDetails',{blog});
});

app.get('/add-blog', (req,res)=>{
  res.render('addBlog');
});

app.post('/add-blog', (req,res)=>{
  const {title,content,author}= req.body;
  blogs.push({id:blogs.length+1, title,content,author});
  res.redirect('/blogs');
});

//Delete blog(Admin only)
app.get('/delete/:id', (req,res)=>{
  blogs = blogs.filter(b => b.id != parseInt(req.params.id));
  res.redirect('/blogs');
  // res.render('/blogs');
});

//404 Page
app.use((req,res)=>{
  res.status(404).render('404',{msg:'404 - Page not found'});
});


app.listen(PORT, ()=>{
  console.log(`The server is running on http://localhost:${PORT}`);
});