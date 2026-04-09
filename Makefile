.PHONY: copy_env
copy_env:
	scp /Users/ramisvakazov/projects/flowers-care-backend/.env root@45.9.188.130:projects/flowers-care-backend/.env

.PHONY: send
send:
	rm -rf Archive.zip && ts-node archiver.ts && scp Archive.zip root@45.9.188.130:projects/flowers-care-backend && rm Archive.zip
	ssh root@45.9.188.130 "cd projects/flowers-care-backend && unzip -o Archive.zip && rm Archive.zip && yarn"
	echo "Files send successfully"

.PHONY: deploy
deploy:
	yarn build
	rm -rf Archive.zip && ts-node archiver.ts && scp Archive.zip root@45.9.188.130:projects/flowers-care-backend && rm Archive.zip
	ssh root@45.9.188.130 "cd projects/flowers-care-backend && unzip -o Archive.zip && rm Archive.zip && yarn && pm2 restart flowers-care"
	echo "Deploy of flowers-care-backend has been finished"
