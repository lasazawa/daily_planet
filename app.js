var express = require("express"),
app = express(),
bodyParser = require("body-parser");


app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:true}));

var articles = [];
var count = 1;

app.get("/", function(req,res) {
    res.render("index");
});

app.get("/articles", function(req,res) {
    res.render("articles", {allMyArticles: articles});
});

app.get("/about", function(req,res) {
    res.render("about");
});

app.get("/contact", function(req,res) {
    res.render("contact");
});

app.get("/new", function(req, res) {
    res.render("new");
});

app.post("/submit", function(req, res){
    var article = {};
    article.title = req.body.article.title;
    article.article = req.body.article.article;
    article.id = count;
    count++;
    articles.push(article);
    console.log(articles);
    res.redirect("articles");
});


app.get("/article/:id", function(req, res){
    var articleId = Number(req.params.id);

    var articleFound;
    articles.forEach(function(article) {
        if (article.id === articleId) {
            articleFound = article;
        }
    });
    res.render("article", {article: articleFound});
});

app.get('*', function(req, res) {
    res.render('404');
});

app.listen(3000, function(){
    console.log("server is listening on 3000");
});