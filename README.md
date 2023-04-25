GraphQL: Loopback and Stepzen


Official documentation: [Loopback V4 official documentation](https://loopback.io/doc/en/lb4/)

Below a quick overview of the arguments of the lb4 CLI matching with the various concepts in loopback.

|        Option        | Description                                                                                                                                                                   |
|:--------------------:|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| app                  | Central class for setting up all module's components, controllers, servers and bindings                                                                                       |
| datasource           | Create the source of data, where store/fetch data from. (in-memory, file, MongoDB.                                                                                            |
| model                | Create entity in a Model. Use to model the formats of the data                                                                                                                |
| repository           | Create the abstraction layer between your model and your controller. Model defines the format of the data, the repository add the type of behavior you can do with the model. |
| relation             | Create relation between the entities in the Model                                                                                                                             |
| controller           | Where you put your API endpoint logic and handle requests/responses to your API.                                                                                              |
| extension            |                                                                                                                                                                               |
| service              |                                                                                                                                                                               |
| openapi              |                                                                                                                                                                               |
| interceptor          |                                                                                                                                                                               |
| observer             |                                                                                                                                                                               |
| discover             |                                                                                                                                                                               |
| update               |                                                                                                                                                                               |
| rest-crud            |                                                                                                                                                                               |
| copyright            |                                                                                                                                                                               |
| import-lb3-models    |                                                                                                                                                                               |
| example              | Create a full sample                                                                                                                                                          |
| install-completion   |                                                                                                                                                                               |
| uninstall-completion |                                                                                                                                                                               |

lb4 --help

Rest versus GraphQL: [You tube video](https://www.youtube.com/watch?v=PTfZcN20fro)

# Installation MongoDB
```
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add
sudo apt-get install gnupg
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
sudo apt-get update
sudo apt-get install -y mongodb-org
echo "mongodb-org hold" | sudo dpkg --set-selections
echo "mongodb-org-server hold" | sudo dpkg --set-selections
echo "mongodb-org-shell hold" | sudo dpkg --set-selections
echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
echo "mongodb-org-tools hold" | sudo dpkg --set-selections
ps --no-headers -o comm 1
sudo systemctl start mongod
sudo systemctl status mongod
```

#Data Modeling
How to design the model https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model
Types of associations https://guides.rubyonrails.org/association_basics.html

# Query
##find filter
filter={
  "offset": 0,
  "limit": 100,
  "skip": 0,
  "order": "string",
  "where": {
    "additionalProp1": {}
  },
  "fields": {
    "id": true,
    "title": true,
    "desc": true,
    "isComplete": true,
    "remindAtAddress": true,
    "remindAtGeo": true,
    "tag": true
  }
}

# Development

## A word on association
This chapter is largely inspired by  https://guides.rubyonrails.org/association_basics.html
See also https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model

It is important to understand what lb4 is supporting and what does it means.
At this time lb4 supports:
* belongsTo
* hasMany
* hasManyThrough
* hasOne

Other types of relationship are not supported:
* has_one :through
* has_and_belongs_to_many

But what does it mean?


Building blocks as explained in the official documentation: https://loopback.io/doc/en/lb4/Concepts.html
![Building blocks](./images/key-concepts-overview-diagram.png)


The following steps will be followed and are well documented:
* create app scaffolding
* create datasource
* create model
* create repository
* create relationships
* create controller

# MongoDB
## MongoDB docker runtime
```
docker pull mongo
docker run --name mongodb -d -p 27017:27017 mongo
```

## MongoDB create DS
```
db.createUser({user: "nono", pwd: "Passw0rd!", roles:[{db:"test"}]})
db.createUser( {user: "nono", pwd: "Passw0rd", roles:[ { role: "readWrite" , db:"countriesDS"} ] })

mongodb://nono:Passw0rd@192.168.246.171:27017/test
```

Add data in mongodb from csv

mongoimport --db myDb --collection myCollection --type csv --headerline --file /path/to/myfile.csv

## MongoDB Client: compass
```
wget https://downloads.mongodb.com/compass/mongodb-compass_1.35.0_amd64.deb
sudo dpkg -i mongodb-compass_1.35.0_amd64.deb
mongodb-compass
```

# Models
We start with a very simple model.

![Models design: ](./images/models.png)


![Countries applications](./images/compass.png)


# Sample with Continents
`lb4 app`
![Countries applications](./images/countries1.png)
```
$ cd countries
($ npm start)
lb4 datasource

Datasource name: CountriesAPI
Select the connector for CountriesAPI:  MongoDB (supported by StrongLoop)
Connection String url to override other settings (eg: mongodb://username:password@hostname:port/database): mongodb://localhost:27017/countries
host: localhost
port: 27017
user: 
password: [hidden]
database: countries
Feature supported by MongoDB v3.1.0 and above: Yes
```
![Countries data source](./images/countries2.png)
lb4 model for each entity
```
lb4 model
? Model class name: Continent
? Please select the model base class Entity (A persisted model with an ID)
? Allow additional (free-form) properties? No
? Enter the property name: code
? Property type: string
? Is code the ID property? Yes
? Is code generated automatically? No
? Is it required?: Yes
? Enter the property name: name
? Property type: string
? Is it required?: Yes
```

![Countries model Continent](./images/countries3.png)
```
lb4 model
? Model class name: Country
? Please select the model base class Entity (A persisted model with an ID)
? Allow additional (free-form) properties? No
? Enter the property name: code
? Property type: string
? Is code the ID property? Yes
? Is code generated automatically? No
? Is it required?: Yes
? Enter the property name: name
? Property type: string
? Is it required?: Yes
```

![Countries model Country](./images/countries4.png)

```
lb4 repository
? Select the datasource CountriesApiDatasource
? Select the model(s) you want to generate a repository for Continent, Country
```

![Countries repository](./images/countries5.png)

```
lb4 relation
? Please select the relation type hasMany
? Please select source model Continent
? Please select target model Country
? Foreign key name to define on the target model code
? Source property name for the relation getter (will be the relation name) countries
? Allow Continent queries to include data from related Country instances?  Yes
```

![Countries relationships](./images/countries6.png)

```
lb4 controller
```
![Countries controllers](./images/countries7.png)
![Countries controllers](./images/countries8.png)
Main file generated
![Main generated files](./images/countries9.png)

Test the applications
(Ensure access to db): db.createUser( {user: "nono", pwd: "Passw0rd", roles:[ { role: "readWrite" , db:"countriesDS"} ] })


Populate with some data:
```
curl -X POST "http://localhost:3000/continents" -H  "accept: application/json" -H  "Content-Type: application/json" -d "{\"name\":\"Africa\",\"code\":\"AF\"}"
curl -X POST "http://localhost:3000/continents" -H  "accept: application/json" -H  "Content-Type: application/json" -d "{\"name\":\"Antarctica\",\"code\":\"AN\"}"
curl -X POST "http://localhost:3000/continents" -H  "accept: application/json" -H  "Content-Type: application/json" -d "{\"name\":\"Asia\",\"code\":\"AS\"}"
curl -X POST "http://localhost:3000/continents" -H  "accept: application/json" -H  "Content-Type: application/json" -d "{\"name\":\"Europe\",\"code\":\"EU\"}"
curl -X POST "http://localhost:3000/continents" -H  "accept: application/json" -H  "Content-Type: application/json" -d "{\"name\":\"North America\",\"code\":\"NA\"}"
curl -X POST "http://localhost:3000/continents" -H  "accept: application/json" -H  "Content-Type: application/json" -d "{\"name\":\"Oceania\",\"code\":\"SA\"}"
curl -X POST "http://localhost:3000/continents" -H  "accept: application/json" -H  "Content-Type: application/json" -d "{\"name\":\"South America\",\"code\":\"OC\"}"

curl -X POST "http://localhost:3000/countries" -H  "accept: application/json" -H  "Content-Type: application/json" -d "{\"code\":\"FR\",\"name\":\"France\",\"currency\":\"EUR\",\"capital\":\"Paris\",\"continentId\":\"EU\"}"
curl -X POST "http://localhost:3000/countries" -H  "accept: application/json" -H  "Content-Type: application/json" -d "{\"code\":\"GB\",\"name\":\"United Kingdom\",\"currency\":\"GBP\",\"capital\":\"London\",\"continentId\":\"EU\"}"
```
![Testing so far](./images/test-countries.png)

# Building docker image and publish it to OpenShift
Reference: https://medium.com/loopback/loopback-quick-tip-running-lb4-application-in-docker-c029e3a71000


Dockerfile provided by Loopback


```
sudo docker build -t myapp .

```


# GraphQL development
Officiel documentation is [here](https://loopback.io/doc/en/lb4/GraphQL.html).


## Concepts
![Testing so far](./images/lb-graphql-concepts.png)

##
 Installation and dev

`npm install --save @loopback/graphql`

Modify it a little for GraphQL support

`npx openapi-to-graphql-cli --port=3010 http://localhost:3000/openapi.json`


```
{
  ...
  "numOps": 21,
  "numOpsQuery": 8,
  "numOpsMutation": 13,
  "numOpsSubscription": 0,
  "numQueriesCreated": 8,
  "numMutationsCreated": 13,
  "numSubscriptionsCreated": 0
}
GraphQL accessible at: http://localhost:3010/graphql
```

![Testing so far](./images/graphiql.png)

Get continents
```
{
  continents {
    code
    name
  }
}
```
Get countries of a continent
```
{
  continentCountries(id: "EU") {
    name
  }
}
```
Adding a filter
```
{
  continents(filter: {limit: 2, offset:0, order: "code ASC"}) {
    code
  }
}
```


Sample mutation
```
mutation {
  continentControllerCreate(newContinentInput: {code: "AS", name: "Asia"}) {
    code
    name
  }
}
```

![Sample mutation](./images/sample-mutation.png)


Introspection call to introspect the API (on Linux)
```
curl 'http://localhost:3010/graphql?' -X POST -H 'User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/112.0' -H 'Accept: application/json' -H 'Accept-Language: en-US,en;q=0.5' -H 'Accept-Encoding: gzip, deflate, br' -H 'Referer: http://localhost:3010/' -H 'Content-Type: application/json' -H 'Origin: http://localhost:3010' -H 'DNT: 1' -H 'Connection: keep-alive' -H 'Sec-Fetch-Dest: empty' -H 'Sec-Fetch-Mode: cors' -H 'Sec-Fetch-Site: same-origin' --data-raw '{"query":"\nquery IntrospectionQuery {\n__schema {\n\nqueryType { name }\nmutationType { name }\nsubscriptionType { name }\ntypes {\n...FullType\n}\ndirectives {\nname\ndescription\n\nlocations\nargs {\n...InputValue\n}\n}\n}\n}\n\nfragment FullType on __Type {\nkind\nname\ndescription\nfields(includeDeprecated: true) {\nname\ndescription\nargs {\n...InputValue\n}\ntype {\n...TypeRef\n}\nisDeprecated\ndeprecationReason\n}\ninputFields {\n...InputValue\n}\ninterfaces {\n...TypeRef\n}\nenumValues(includeDeprecated: true) {\nname\ndescription\nisDeprecated\ndeprecationReason\n}\npossibleTypes {\n...TypeRef\n}\n}\n\nfragment InputValue on __InputValue {\nname\ndescription\ntype { ...TypeRef }\ndefaultValue\n}\n\nfragment TypeRef on __Type {\nkind\nname\nofType {\nkind\nname\nofType {\nkind\nname\nofType {\nkind\nname\nofType {\nkind\nname\nofType {\nkind\nname\nofType {\nkind\nname\nofType {\nkind\nname\n}\n}\n}\n}\n}\n}\n}\n}\n","operationName":"IntrospectionQuery"}' -o sdl.json
```

You can then use the GraphQL Voyager to visualise the API using the introspection tab.
![Sample mutation](./images/continents-introspection.png)


## Handling environments variables
https://strongloop.com/strongblog/managing-loopback-configurations-the-twelve-factor-way/

## Deploy in Kubernetes
Instruction to deploy in Kubernetes https://loopback.io/doc/en/lb4/deploying_to_ibm_cloud_kubernetes.html

```
docker build -t countries-app .

ibmcloud login –sso
ibmcloud cr login

OPT ibmcloud cr namespace-list
OPT ibmcloud cr namespace-add lb4ad

docker tag countries-app:latest de.icr.io/lb4ad/countries-app:1.0.0
docker push de.icr.io/lb4ad/countries-app:1.0.0

OPT ibmcloud cr image-list
OPT ibmcloud cr vulnerability-assessment --extended de.icr.io/lb4ad/countries-app:1.0.0

ibmcloud cr build -t de.icr.io/lb4ad/countries-app:1.0.0 .

ibmcloud ks cluster config --cluster bu7aeuff0l32lp0k2rv0

OPT kubectl get nodes

** Attention changer le namespace car sinon default **
No kubectl run countries-app-deployment --image=de.icr.io/lb4ad/countries-app:1.0.0
kubectl create ns lb4app

kubectl create deployment countries-app --image=de.icr.io/lb4ad/countries-app:1.0.0 -n lb4app

kubectl expose deployment/countries-app --type=NodePort --port=3000 --name=countries-app-service --target-port=3000 -n lb4app


kubectl describe service countries-app-service -n lb4app

ibmcloud ks cluster get -c bu7aeuff0l32lp0k2rv0
kubectl get svc -o wide

kubectl delete -n default pod countries-app-deployment

OPT export POD_NAME=$(kubectl get pods -o go-template --template '{{range .items}}{{.metadata.name}}{"\n"}}{{end}}')
OPT echo Name of the Pod: $POD_NAME
?? kubectl proxy ??
```

https://kubernetes.io/docs/tutorials/kubernetes-basics/update/update-intro/
Samples of data exposed with API and also GraphQL API
https://www.back4app.com/database/back4app/list-of-all-continents-countries-cities/graphql-playground