BIN=node_modules/.bin

build:
	make clean
	$(BIN)/spire-of-babel js/app.js --bundle --minify --sourcemap --output js/build.min.js

deploy:
	firebase deploy

clean:
	rm js/build.min.js || exit 0;
