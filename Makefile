BIN=node_modules/.bin

build:
	make clean
	$(BIN)/spire-of-babel static/js/app.js --bundle --minify --sourcemap --output static/js/build.min.js

lint:
	$(BIN)/eslint static/js/ --ignore-pattern **/*.min.js

deploy:
	firebase deploy

clean:
	rm static/js/build.min.js || exit 0;
	rm static/js/build.min.js.map || exit 0;
