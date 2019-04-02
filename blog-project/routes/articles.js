const express = require("express");
const router = express.Router();
// const Article = require('../models/article.model');
const ArticleManager = require("../api/article");

showAddArticleForm = (req, res) => {
  res.render("addArticle", {
    title: "Add article"
  });
};

createNewArticle = async (req, res) => {
    const { title, author, body } = req.body;
    const articleManager = new ArticleManager();
    const newArticle = await articleManager.createNewArticle(title, author, body);
  
    if (newArticle.error) {
      res.render("errors", {
        error: newArticle.error
      });
    } else {
      res.redirect("/");
    }
  }

  displayArticleById = async (req, res) => {
    const  { id } = req.params;
    const articleManager = new ArticleManager();
    const articleItem = await articleManager.getArticleById(id);

    if (articleItem.error) {
        res.render('errors', {
            error: articleItem.error
        })
    } else {
        res.render('articlePage', {
            article: articleItem.article
        })
    }
  }

router.get("/add", showAddArticleForm);
router.post("/add", createNewArticle);
router.get('/:id', displayArticleById);

module.exports = router;