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

## Build & Run Project
Run the command up to your scenario in the root folder.
### Build & Run
Show process on terminal `docker-compose build docker-compose up` or <br>
Run process in background `docker-compose build && docker-compose up -d`
### Shutdown
`docker-compose down`

## API Reference

### Table of Contents
[Facebook Authen](#faceAuth)

<a name="faceAuth"/>

### Facebook Authentication ( Access via GET method on '/api/auth/facebook' )
#### Return value
| Field Name | Type | Value | Description |
| :------------: | --------------------------------- | ------------------ | ------------------ |
| registStatus | Bool | true or false | our system register status |
| accountType | String | 'facebook' or 'line' |  |
| accountID | String | id provided by facebook or line API |  |

<p align="center">.................................................</p>

### Current Login Session Data ( Access via GET method on '/api/current-login-session' )
#### Return value on can get login session data
| Field Name | Type | Value | Description |
| :------------: | --------------------------------- | ------------------ | ------------------ |
| success | Bool | true | |
| user | Object | { "registStatus": Bool,<br> "accountType": String,<br> "accountID": String } | current login user info |

#### Return value on can not get login session data (user did not login)
| Field Name | Type | Value | Description |
| :------------: | --------------------------------- | ------------------ | ------------------ |
| success | Bool | false | |
| msg | String |  | false cause |

<p align="center">.................................................</p>

### Logout ( Access via GET method on '/api/logout' )
Performs logout will clear all session then redirect to the home page

<p align="center">.................................................</p>

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
| educationLevel | String | 'pratom' or 'matthayomton' or 'matthayomplai' | Yes |
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
