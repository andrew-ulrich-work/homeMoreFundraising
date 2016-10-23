# Skeleton project for Swagger
A few new endpoints:
https://pacific-beach-41748.herokuapp.com/getObject
will list all objects specified in the HUD HMIS standard specs

https://pacific-beach-41748.herokuapp.com/getObject/{objectName}
will give you one fake but perfectly valid record for the object whose name is {objectName}, generated on the fly (i.e. you have an infinite source of fairly realistic fake data)
for example: https://pacific-beach-41748.herokuapp.com/getObject/Enrollment

https://pacific-beach-41748.herokuapp.com/enum/
will list out the potential values of every enumerated field defined in the HUD HMIS spec

https://pacific-beach-41748.herokuapp.com/enum/{fieldName}
will give you the specific field's details, e.g. https://pacific-beach-41748.herokuapp.com/enum/HealthStatus

there area also a few new ones 