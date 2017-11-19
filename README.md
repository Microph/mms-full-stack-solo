# Full Stack Solo [Section 1]

## Team Members
| Student ID | Name                         | Github Username | Role |
| :------------: | --------------------------------- | ------------------ | ------------------ |
| 5730106921 | Chanatip Kriengkraipetch     | [Microph](https://github.com/Microph) | Developer |
| 5730271721 | Teerachod Boonprapakorn      | [ptheera](https://github.com/ptheera) | Developer |
| 5730282621 | Nonthiwat Visuthikraisee     | [5730282621-NV](https://github.com/5730282621-NV) | Database Developer|
| 5731001821 | Kanokpon Thongchaijareonsiri | [npingnk](https://github.com/npingnk) | Software Tester|
| 5731036821 | Nattapat Boonprakong         | [nattapatboon](https://github.com/nattapatboon) | System Analyst |
| 5731083221 | Peerawut Luengruengroj       | [peerawutgaga](https://github.com/peerawutgaga) | Project Manager & System Analyst|
| 5731087821 | Pakpoom Thaweesitthichat     | [phakphumi](https://github.com/phakphumi) | Technical Lead & Back-end Developer|
| 5731111121 | Athip Intaraphirom           | [athip-int](https://github.com/athip-int) | Designer & Front-end Developer |

## Build & Run Project with Docker
### One Time Command (run this command at the first time)
`docker-compose build`

### Run Project
* Run in foreground `docker-compose up`
* Run in background `docker-compose up -d`
### Shutdown
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
#### Return value on can get login session data
| Field Name | Type | Value | Description |
| :------------: | --------------------------------- | ------------------ | ------------------ |
| success | Bool | true | |
| user | Object | { "registStatus": Bool,<br> "accountType": String,<br> "accountID": String,<br> "displayName": String } | current login user info |

#### Return value on can not get login session data (user did not login)
| Field Name | Type | Value | Description |
| :------------: | --------------------------------- | ------------------ | ------------------ |
| success | Bool | false | |
| msg | String | 'User is not login, yet' |  |

#### Possible value inside value field
| Field Name | Type | Value | Description |
| :--------: | :--: | :---: | :---------: |
| registStatus | Bool | true, false | return true when user already regist |
| accountType | String | 'admin', 'line', 'facebook' |  |
| accountID | String |  | ID provided by Facebook or Line API (username if accountType is admin ) |
| tutorID | String |  | If user is not tutor the value is null |
| displayName | String |  | name provided by Facebook or Line API (username if accountType is admin) |
| profilePic | String |  | URL to profile's picture provided by Facebook or Line API 

<p align="center">.................................................</p>

<a name="logout"></a>
### Logout ( Access via GET method on '/api/logout' )
* Performs logout will clear all session then redirect to the home page

<p align="center">.................................................</p>

<a name="regist"></a>
### Register ( /api/register via POST method)

#### Input Parameters
| Field Name | Type | Description | Required? |
| :------------: | --------------------------------- | ------------------ | ------------------ |
| agree | Bool | true on accept our condition or false on otherwise | Yes |
| accountType | String | 'facebook' or 'line' provided by login session | Yes |
| accountID | String | account id provided by login session | Yes |
| name | String | | Yes |
| surname | String | | Yes |
| gender | String | 'male', 'female', 'others' | Yes|
| educationLevel | String | 'pratom', 'matthayomton', 'matthayomplai', 'bachelor', 'master', 'doctor' | Yes |
| facebookUrl | String | | Optional |
| lineID | String | | Optional |
| email | String | | Yes |
| mobile | String | | Yes |
#### Return value on register successful
| Field Name | Type | Value | Description |
| :------------: | --------------------------------- | ------------------ | ------------------ |
| success | Bool | true | register successful |
#### Return value on register unsuccessful
| Field Name | Type | Value | Description |
| :------------: | --------------------------------- | ------------------ | ------------------ |
| success | Bool | false | register unsuccessful |
| msg | String | | false cause |

<p align="center">.................................................</p>

<a name="stSearch"></a>
### Student Search ( /api/search/student via GET method)

#### Input Parameters
| Field Name | Type | Description | Required? |
| :------------: | --------------------------------- | ------------------ | ------------------ |
| studentID | String | filter by studentID | Optional |
| name | String | filter by name | Optional |
| surname | String | filter by surname | Optional |
| gender | String | fitler by gender | Optional |
| educationLevel | String | filter by education level | Optional |
| facebookUrl | String | filter by facebook url | Optional |
| lineID | String | filter by line id | Optional |
| email | String | filter by email | Optional |
| mobile | String | filter by mobile | Optional |
* If there is some field has no data inside. You must not include the field
* Sending `studentID=undefined` means return the student who has undefined on studentID field
#### Return value on complete
| Field Name | Type | Value | Description |
| :------------: | --------------------------------- | ------------------ | ------------------ |
| success | Bool | true |  |
| students | Objects | [{ studentID: String, <br>name: String, <br> surname: String, <br>gender: String, <br>educationLevel: String, <br>facebookUrl: String, <br>lineID: String, <br>email:String, <br>mobile: String}] | found student |
| count | Number |  | Amount of student |
* If there is not any filter(didn't send any parameter), it return all student.
#### Return value on incomplete
| Field Name | Type | Value | Description |
| :------------: | --------------------------------- | ------------------ | ------------------ |
| success | Bool | false | search incomplete |
| msg | String | 'You should login before searching' |  |

<p align="center">.................................................</p>
