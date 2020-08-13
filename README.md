# ncfd
an open source hyip project.Deposit your money and earn money after awhile
code is fully functional and can be cloned and run on your own server.

## instalation
you need nodejs12, yarn and mongodb 4.5 installed on your machin in order to run this project.

then run the script below

    git clone https://github.com/puyaars/ncfd.git
    cd ncfd
    yarn

### configuration
make a copy of **config.sample.json** and rename it **config.json** and add your payeer api keys and mongodb connection adress
```
{
    "account": "",
    "apiId": "",
    "apiPass": "",
    "m_shop": ""
  }
```
### development
    yarn dev
    
### build
    yarn build

### production
    yarn build
    yarn start

## Would you like to contribute?
- [ ] We need a better UI design. a feature to have multiple themes to easily select in the config would be nice.
- [ ] Multi language support would be great.
- [ ] error handling 
- [ ] documentation

these are parts we need contributions. feel free to push your code.

## bug report
create an issue. we will take care of it


## License
Released under the [MIT license](LICENSE).