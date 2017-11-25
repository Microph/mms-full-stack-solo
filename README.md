# Full Stack Solo [Section 1]

## Team Members
| Student ID | Name                         | Github Username | Role |
| :------------: | --------------------------------- | ------------------ | ------------------ |
| 5730106921 | Chanatip Kriengkraipetch     | [Microph](https://github.com/Microph) | Front-end Developer |
| 5730271721 | Teerachod Boonprapakorn      | [ptheera](https://github.com/ptheera) | Developer |
| 5730282621 | Nonthiwat Visuthikraisee     | [5730282621-NV](https://github.com/5730282621-NV) | Database Developer & Back-end Developer|
| 5731001821 | Kanokpon Thongchaijareonsiri | [npingnk](https://github.com/npingnk) | Software Tester|
| 5731036821 | Nattapat Boonprakong         | [nattapatboon](https://github.com/nattapatboon) | System Analyst |
| 5731083221 | Peerawut Luengruengroj       | [peerawutgaga](https://github.com/peerawutgaga) | Project Manager & System Analyst|
| 5731087821 | Pakpoom Thaweesitthichat     | [phakphumi](https://github.com/phakphumi) | Technical Lead & Back-end Developer|
| 5731111121 | Athip Intaraphirom           | [athip-int](https://github.com/athip-int) | Designer & Front-end Developer |

## Build & Run Project with Docker 
* Install Docker & Docker-Compose first
* These command must run in the root directory (run in 'mms-full-stack-solo' folder)
### One Time Command (run this command at the first time)
> `docker rm $(docker ps -a -q) --force`<br>
> `docker rmi $(docker images -a -q) --force`<br>
> `docker volume rm $(docker volume ls -q) --force`<br>
> `docker-compose build`<br>
* Run these command in order
* If some warning or error occurs, ignores them and continue run following command
* Run these command only at first time or when you want to format the docker and rebuild everything

### Start Command
* Run in foreground `docker-compose up`
* Run in background `docker-compose up -d`
### Shutdown Command
* `docker-compose down`
* Very important to shutdown with this command or your PC will has a lot of docker-container

## Database Details
> Configuration
> * database: tutorium
> * user: tutorium
> * password: 123
> * port: 3306
* Setup config in '/backend/config/config.js'
* SHA256 algorithm used to hash 'password' field on 'admin' table

## API Reference

### Table of Contents
[Admin Authen](#adminAuth)<br>
[Facebook Authen](#faceAuth)<br>
[Line Authen](#lineAuth)<br>
[Current Login Session Data](#currLog)<br>
[Logout](#logout)<br>
[Reigster](#regist)<br>
[Student Search](#stSearch)<br>
[Tutor Search](#tutorSearch)<br>
[Update Student Profile](#upStudentPro)<br>

<a name="adminAuth"></a>
### Admin Authentication ( Access via POST method on '/api/auth/admin' )
#### Input Parameters
| Field Name | Type | Description | Required? |
| :------------: | --------------------------------- | ------------------ | ------------------ |
| username | String | username is 'tutorium' on demo database | Yes |
| password | String | username is 'tutorium' on demo database| Yes |

* On success saving SESSION to cookies and redirect to admin homepage
* Access session data on '/api/current-login-session'
<p align="center">.................................................</p>

<a name="faceAuth"></a>
### Facebook Authentication ( Access via GET method on '/api/auth/facebook' )
* On success saving SESSION to cookies and redirect to homepage
* Access session data on '/api/current-login-session'
<p align="center">.................................................</p>

<a name="lineAuth"></a>
### Line Authentication ( Access via GET method on '/api/auth/line' )
* On success saving SESSION to cookies and redirect to homepage
* Access session data on '/api/current-login-session'
<p align="center">.................................................</p>

<a name="currLog"></a> 
### Current Login Session Data ( Access via GET method on '/api/current-login-session' )
#### Return value if user already login (HTTP 200 Success)
| Field Name | Type | Value | Description |
| :------------: | --------------------------------- | ------------------ | ------------------ |
| success | Bool | true | |
| user | Object | { "registStatus": Bool,<br> "studentID": Integer,<br> "isTutor": Bool,<br> "accountType": String,<br> "accountID": String,<br> "displayName": String,<br> "profilePic": String } | current login user info |

#### Possible value inside user field
| Field Name | Type | Value | Description |
| :--------: | :--: | :---: | :---------: |
| registStatus | Bool | true, false | return 'false' if the account is not register |
| studentID | Integer | 1...2147483648 | return 'null' if the account is not register |
| isTutor | Bool | true, false | return 'true' if the account is tutor |
| accountType | String | 'admin', 'line', 'facebook' |  |
| accountID | String |  | ID provided by Facebook or Line API (username if accountType is admin ) |
| displayName | String |  | name provided by Facebook or Line API (username if accountType is admin) |
| profilePic | String |  | URL to profile's picture provided by Facebook or Line API 

#### Return value if user did not login, yet (HTTP 400 Bad Request)
| Field Name | Type | Value | Description |
| :------------: | --------------------------------- | ------------------ | ------------------ |
| success | Bool | false | |
| msg | String | 'User is not login, yet' |  |

<p align="center">.................................................</p>

<a name="logout"></a>
### Logout ( Access via GET method on '/api/logout' )
* Performs logout will clear all session then redirect to the home page

<p align="center">.................................................</p>

<a name="regist"></a>
### Register ( /api/register via POST method)
#### Pre-required
* Authentication
#### Input Parameters
| Field Name | Type | Description | Required? |
| :------------: | --------------------------------- | ------------------ | ------------------ |
| agree | Bool | true on accept our condition or false on otherwise | Yes |
| name | String | | Yes |
| surname | String | | Yes |
| gender | String | 'male', 'female', 'others' | Yes|
| educationLevel | String | 'pratom', 'matthayomton', 'matthayomplai', 'bachelor', 'master', 'doctor' | Yes |
| facebookUrl | String | | Optional |
| lineID | String | | Optional |
| email | String | | Yes |
| mobile | String | | Yes |
#### Return value on complete (HTTP 200 Success)
| Field Name | Type | Value | Description |
| :------------: | --------------------------------- | ------------------ | ------------------ |
| success | Bool | true | register successful |
| msg | String | 'Register complete', 'Account is already register' |  |
#### Return value on incomplete (HTTP 400 Bad Request, HTTP 403 Forbidden)
| Field Name | Type | Value | Description |
| :------------: | --------------------------------- | ------------------ | ------------------ |
| success | Bool | false | register unsuccessful |
| msg | String | 'Registration incomplete', 'Authenticate and condition accept need for register' |  |

<p align="center">.................................................</p>

<a name="stSearch"></a>
### Student Search ( /api/search/student via GET method)
#### Pre-required
* Authentication
#### Input Parameters
| Field Name | Type | Description | Required? |
| :------------: | --------------------------------- | ------------------ | ------------------ |
| studentID | String | filter by studentID | Optional |
* If there is some field has no data inside. You must not include the field
* Sending `studentID=undefined` means return the student who has undefined on studentID field
* Not Send the filter to get all student
#### Return value on complete (HTTP 200 Success)
| Field Name | Type | Value | Description |
| :------------: | --------------------------------- | ------------------ | ------------------ |
| success | Bool | true |  |
| students | Objects | [{ studentID: String, <br>name: String, <br> surname: String, <br>gender: String, <br>educationLevel: String, <br>facebookUrl: String, <br>lineID: String, <br>email:String, <br>mobile: String, <br> wantList: Object, <br> place: Object, <br> time: Object}] | found student |
| count | Number |  | Amount of student |
#### Return value on incomplete (HTTP 403 Forbidden, HTTP 200 No Content)
| Field Name | Type | Value | Description |
| :------------: | --------------------------------- | ------------------ | ------------------ |
| success | Bool | false | search incomplete |
| msg | String | 'You should login before searching', 'Student not found' |  |

<p align="center">.................................................</p>

<a name="tutorSearch"></a>
### Tutor Search ( /api/search/tutor via GET method)

#### Input Parameters
| Field Name | Type | Description | Required? |
| :------------: | --------------------------------- | ------------------ | ------------------ |
| studentID | String | filter by studentID | Optional |
* If there is some field has no data inside. You must not include the field
* Sending `studentID=undefined` means return the tutor who has undefined on studentID field
* Not Send the filter to get all tutor
#### Return value on complete (HTTP 200 Success)
| Field Name | Type | Value | Description |
| :------------: | --------------------------------- | ------------------ | ------------------ |
| success | Bool | true |  |
| tutors | Objects | [{ studentID: String, <br>education: Objects, <br>teachList: Objects, <br>place: List, <br>time: Objects, <br>uploadEvidence: Objects, <br>isApproved: Bool, <br>student: {name: String, surname: String, gender: String}}] | found tutors |
| count | Number |  | Amount of tutor |
#### Return value on incomplete (HTTP 200 No Content)
| Field Name | Type | Value | Description |
| :------------: | --------------------------------- | ------------------ | ------------------ |
| success | Bool | false | search incomplete |
| msg | String | 'Tutor not found' |  |

<p align="center">.................................................</p>

<a name="upStudentPro"></a>
### Update Student Profile ( /api/student/profile/updater via PUT method)
#### Pre-required
* Authentication
* Has StudentID (already register)
#### Input Parameters
| Field Name | Type | Description | Required? |
| :------------: | --------------------------------- | ------------------ | ------------------ |
| name | String | Send old value or updated value | Yes |
| surname | String | Send old value or updated value | Yes |
| gender | String | 'male', 'female', 'others' | Yes|
| educationLevel | String | 'pratom', 'matthayomton', 'matthayomplai', 'bachelor', 'master', 'doctor' | Yes |
| facebookUrl | String | Send old value or updated value | Yes |
| lineID | String | Send old value or updated value | Yes |
| email | String | Send old value or updated value | Yes |
| mobile | String | Send old value or updated value | Yes |
#### Return value on complete (HTTP 200 Success)
| Field Name | Type | Value | Description |
| :------------: | --------------------------------- | ------------------ | ------------------ |
| success | Bool | true | updated complete |
| msg | String | 'Updated Complete' |  |
#### Return value on incomplete (HTTP 400 Bad Request, HTTP 403 Forbidden)
| Field Name | Type | Value | Description |
| :------------: | --------------------------------- | ------------------ | ------------------ |
| success | Bool | false | updated incomplete |
| msg | String | 'Profile hasn't been update, please correct your input', 'You should login before update your profile'  |  |

<p align="center">.................................................</p>
