build:
	rm js/build.min.js || exit 0;
	./node_modules/.bin/r.js -o build.config.js
	mv js-build/config.js js/build.min.js
	rm -rf js-build/

deploy:
	firebase deploy
