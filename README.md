# Work In Progress Mental Health App

An app to track your mental health habits. 

Create and account: 

Log Your Mood: 
![log mood](/log-moods.png)

Track Your Mental Health Habits: 

Add New Goals: 

View Your Progress: 

Analyze Trends: 


## Getting Started

#### Setting things up for the first time

1. We use PostgreSQL so you will need to instal PostgreSQL to your computer. Also if you're using a Mac, install Postico if you'd like to view the database.

2. Create a new `.env` file with information about your database, for example:

```
PORT=5000
DB_HOST='127.0.0.1'
DB_USERNAME='postgres'
DB_PASSWORD='postgres'
```

3. In order to create your database, run: `yarn db:create`
4. To run all current migrations for the database, run: `yarn db:migrate`
5. You should be able to get started!

#### Starting the Server

1. `cd {{dir_of_app}}`
2. `yarn install`
3. `yarn server`

#### Starting the Client

1. `cd {{dir_of_app}}/client`
2. `yarn install`
3. `cd {{dir_of_app}}` (probably done by going up a level `cd ..`)
4. `yarn client`

## Managing the Database

#### Creating models and running migrations

Currently we're using sequelizeCLI to manage our db. To create a new model you can use the following command (this example is for the user model which already exists):
`yarn sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string`
This will create a new model file in the `sequelize/models` folder. It will also create a new migrations file in the `sequlize/migrations` folder. **Right now you need to update both of these files from a `.js` file to a `.cjs` file.**

To run the migration you now need to run `yarn db:migrate`

### Creating migrations

If you need to update your current models you can run `yarn db:g:migration addPassword`. This will create a new migrations file in the `sequlize/migrations` folder. **Right now you need to update this file from a `.js` file to a `.cjs` file.**

Once you've created the migration you can run `yarn db:migrate`
