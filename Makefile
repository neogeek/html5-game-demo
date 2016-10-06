BIN=node_modules/.bin

build:
	make clean
	$(BIN)/spire-of-babel js/app.js --bundle --minify --sourcemap --output js/build.min.js

deploy:
	firebase deploy

clean:
	rm js/build.min.js || exit 0;
	rm js/build.min.js.map || exit 0;
