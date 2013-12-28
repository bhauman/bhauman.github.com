bundle exec jekyll buil
git checkout master
cp -r _site/* ./
git commit -am"publishing site"
git push
git checkout site-jekyll-source
echo "published site"

