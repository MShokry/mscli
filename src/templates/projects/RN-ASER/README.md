mkdir -p ./src/{Components,Navigation,Screens,locales,utils,Context,data,assets/{Font,images}}
json -I -f package.json -e 'this.scripts.build= "ORG_GRADLE_PROJECT_bundleInArRelease=true npx react-native run-android --variant Release"'

json -I -f package.json -e 'this.scripts.release="cd android && ./gradlew bundleRelease && cd .."'
json -I -f package.json -e 'this.scripts.clean= "rm -rf $TMPDIR/metro-* && rm -rf $TMPDIR/haste-map-* && yarn --cache-clean"'

# Keys

# App Flow
 - [ ] Login
 - [ ] register
 - [ ] walkthrough
 - [ ] home screen
		- [ ] show devices List
		- [ ] search
		- [ ] filter screen
- [ ] User Profile
- [ ]  Contact Us
- [ ] Device Details
	- [ ] Tank Card
	- [ ] Grapgh
	- [ ] Details
- [ ] Edit Device Details
- [ ] Device Users
	- [ ] No user Card
	- [ ] User List

# Dark theme

### Profile page 

# Error 401 500
- [ ] When connection error reload
- [ ] Logout user when token change


# App Icon

