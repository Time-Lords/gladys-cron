#Gladys Cron
**Useless** with Gladys >= 3.0.0

Launch scenarios with your cron rules

##Installation
```bash
# Go to the hooks directory
$ cd gladys/api/hooks

# Clone the repository
$ git clone https://github.com/Time-Lords/gladys-cron.git cron
$ cd cron

# Install NPM dependencies
$ npm install

# Restart Gladys
$ sudo pm2 restart gladys
```

##Usage
```
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    |
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
```
