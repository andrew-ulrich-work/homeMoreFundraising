 heroku create


git remote add heroku https://git.heroku.com/stark-thicket-79965.git

```
git remote set-url heroku https://git.heroku.com/stark-thicket-79965.git
```

```
 git push heroku master
 ```

```
$ heroku logs --tail
```

```
heroku features:enable http-session-affinity
```

https://stark-thicket-79965.herokuapp.com/ | 