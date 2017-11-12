# Full Stack Solo [Section 1]

## Team Members
| Student ID | Name                         | Github Username |
| :------------: | --------------------------------- | ------------------ |
| 5730106921 | Chanatip Kriengkraipetch     | [Microph](https://github.com/Microph) |
| 5730271721 | Teerachod Boonprapakorn      | [ptheera](https://github.com/ptheera) |
| 5730282621 | Nonthiwat Visuthikraisee     | [5730282621-NV](https://github.com/5730282621-NV) |
| 5731001821 | Kanokpon Thongchaijareonsiri | [npingnk](https://github.com/npingnk) |
| 5731036821 | Nattapat Boonprakong         | [nattapatboon](https://github.com/nattapatboon) |
| 5731083221 | Peerawut Luengruengroj       | [peerawutgaga](https://github.com/peerawutgaga) |
| 5731087821 | Pakpoom Thaweesitthichat     | [phakphumi](https://github.com/phakphumi) |
| 5731111121 | Athip Intaraphirom           | [athip-int](https://github.com/athip-int) |

## Build & Run Project
Run the command up to your scenario in the root folder.
### Build & Run
Show process on terminal `docker-compose build && docker-compose up` or
Run process in background `docker-compose build && docker-compose up -d`
### Shutdown
`docker-compose down`

## API Reference

### Register ( /api/register via POST method)

#### Input Parameters
| Field Name | Type | Description | Required? |
| :------------: | --------------------------------- | ------------------ | ------------------ |
| agree | Bool | true on accept our condition or false on otherwise | Yes |
| registerType | String | 'facebook' or 'line' | Yes |
| id | String | account id provide by line or facebook API | Yes |
| name | String | | Yes |
| surname | String | | Yes |
| educationLevel | String | 'pratom' or 'matthayomton' or 'matthayomplai' | Yes |
| facebookUrl | String | | Optional |
| lineID | String | | Optional |
| email | String | | Optional |
| mobile | String | | Yes |
#### Return value on success
| Field Name | Type | Value | Description |
| :------------: | --------------------------------- | ------------------ | ------------------ |
| success | Bool | true | login success |
| studentID | String | | student id generate by tutorium system |
| accountType | String | 'line' or 'facebook'| |
| accountID | String | | account id provide by facebook or line |
#### Return value on failure
| Field Name | Type | Value | Description |
| :------------: | --------------------------------- | ------------------ | ------------------ |
| success | Bool | false | register incomplete |
| msg | String | | error message |

### Login ( /api/login via POST method)
#### Input Parameters
| Field Name | Type | Description | Required? |
| :------------: | --------------------------------- | ------------------ | ------------------ |
| loginType | String | 'facebook' or 'line'| Yes |
| id | String | account id provide by line or facebook API | Yes |
| accessToken | String | token get from line or facebook | Optional |
#### Return value on success
| Field Name | Type | Value | Description |
| :------------: | --------------------------------- | ------------------ | ------------------ |
| success | Bool | true | login success |
| studentID | String | | student id generate by tutorium system |
| accountType | String | 'line' or 'facebook'| |
| accountID | String | | account id provide by facebook or line |
#### Return value on failure
| Field Name | Type | Value | Description |
| :------------: | --------------------------------- | ------------------ | ------------------ |
| success | Bool | false | login incomplete |
| msg | String | | error message |
