build:	config
	heroku apps:destroy --app "${APP_NAME}" --confirm "${APP_NAME}" && echo 1 || echo 0
	heroku apps:create --app "${APP_NAME}" --region eu | cut -d '|' -f1 | xargs > url.txt

deploy-heroku:	config
	cat url.txt | xargs -I{} heroku config:set BASE_URL={} --app ${APP_NAME}
	heroku git:remote --app "${APP_NAME}"
	git restore .
	git checkout -b main
	git push -u heroku main

config:
	sudo chmod u+x ./cred.sh
	sh ./cred.sh

cleanup:
	rm ~/.netrc
