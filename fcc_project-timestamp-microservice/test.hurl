# Our first Hurl file, just checking
# that our server is up and running.

GET http://localhost:3000
HTTP 200


# Formatted date
GET http://localhost:3000/api/2015-12-25
HTTP 200
[Asserts]
jsonpath "$.unix" == 1451001600000
jsonpath "$.utc" == "Fri, 25 Dec 2015 00:00:00 GMT"


# Date in milliseconds
GET http://localhost:3000/api/1451001600000
HTTP 200
[Asserts]
jsonpath "$.unix" == 1451001600000
jsonpath "$.utc" == "Fri, 25 Dec 2015 00:00:00 GMT"


# Invalid input string (not a date)
GET http://localhost:3000/api/not-a-date
HTTP 200
[Asserts]
jsonpath "$.error" == "Invalid date"



