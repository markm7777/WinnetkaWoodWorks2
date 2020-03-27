

const express = require('express');
const nodemailer = require('nodemailer');
const https = require('https');
const app = express();
const request = require('request');
const port = process.env.PORT || 5000;
const fs = require('fs');
const bodyParser = require('body-parser');
const convert = require('xml-js');

const registerFile = './data/registeredUsers.json'; //cmd
//const registerFile = './create-react-app-express/data/registeredUsers.json'; //vc debugger

const purchaseFile = './data/purchases.json'; //cmd
//const purchaseFile = './create-react-app-express/data/purchases.json'; //vc debugger

const productsFile = './client/public/products.json'; //cmd
//const productsFile = './create-react-app-express/client/public/products.json'; //vc debugger


app.use(bodyParser.json());

// https server
https.createServer({
  key: fs.readFileSync('./ca.key'),
  cert: fs.readFileSync('./ca.crt')
//  key: fs.readFileSync('./create-react-app-express/ca.key'),
//  cert: fs.readFileSync('./create-react-app-express/ca.crt')
}, app).listen(port, () => console.log(`Listening on port ${port}`));

// http server
//app.listen(port, () => console.log(`Listening on port ${port}`));

// test route
app.get('/express_backend', (req, res) => {
  res.send({ response: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT!!!!!!' });
});

app.get('/login', (req, res) => {
  //TODO: check if user has previously registered by looking in registeredUsers.json file
//  let file = './data/registeredUsers.json';
//  let file = './create-react-app-express/data/registeredUsers.json';
  fs.readFile(registerFile, 'utf8', function(err, contents) {
    if (err) {
      console.log(err);
    }
    else {
      let authentication = req.headers.authorization.replace(/^Basic/, '');
      authentication = (new Buffer(authentication, 'base64')).toString('utf8');
      let loginInfo = authentication.split(':');

      let users = JSON.parse(contents);

      let obj = users.find(user => {
//        return ((user.name === req.query.name) && (user.password === req.query.password))
        return ((user.name === loginInfo[0]) && (user.password === loginInfo[1]))
      });
      if (obj != null) {
        console.log('Login succeeded!');      
        res.send('true');
      }
      else {
        console.log('Login failed!');      
        res.send('false');
      }  
    }
  });
  // res.send({ response: 'Server received login request'});
});

app.get('/logout', (req, res) => {
  res.send({ response: 'Server received logout request'});
});

app.get('/getProducts', (req, res) => {
  fs.readFile(productsFile, 'utf8', function(err, contents) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(contents);
    }
  });
});

app.post('/register', (req, res) => {
  let registeredUsers = [];
  
  let user = {
    name: req.body.body.name,
    email: req.body.body.email,
    password: req.body.body.password
  }

  // let user = {
  //   name: req.query.name,
  //   email: req.query.email,
  //   password: req.query.password
  // }

  fs.stat(registerFile, function(err, fileStat) {
    if (err) {
      if (err.code == 'ENOENT') {
        //file does not exist
        registeredUsers.push(user);
        fs.writeFileSync(file, JSON.stringify(registeredUsers));
      }
    } else {
      if (fileStat.isFile() && (fileStat.size > 0)) {
        fs.readFile(registerFile, 'utf8', function(err, contents) {
          if (err) {
            console.log(err);
          }
          else {
            registeredUsers = JSON.parse(contents);
            registeredUsers.push(user);
            fs.writeFileSync(registerFile, JSON.stringify(registeredUsers));
          }
        });
      }
    }
    res.send('true');
  });
});

app.post('/checkout', (req, res) => {
  sendConfirmationEmail(req.body.body.billName, req.body.body.billEmail);

  let purchases = [];

  fs.stat(purchaseFile, function(err, fileStat) {
    if (err) {
      if (err.code == 'ENOENT') {
        console.log('Does not exist.');
        purchases.push(req.body.body);
        fs.writeFileSync(file, JSON.stringify(purchases));
      }
    } else {
      if (fileStat.isFile() && (fileStat.size > 0)) {
        fs.readFile(file, 'utf8', function(err, contents) {
          if (err) {
            console.log(err);
          }
          else {
            purchases = JSON.parse(contents);
            purchases.push(req.body.body);
            fs.writeFileSync(file, JSON.stringify(purchases));
          }
        });
      }
    }
    res.send('true');
  });



// writeCheckoutToFile(req.body.body);
//  res.send({ response: 'Server received checkout request'});
});


function writeCheckoutToFile(data) {
  let file = './data/purchases.json';
//  let file = './create-react-app-express/data/purchases.json';

  var json = JSON.stringify(data); 
  fs.appendFile(file, json + '\n', function(err) {
    if (err) {
      throw err;
    }
  }); 
}

function sendConfirmationEmail(name, email) {
  const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
          user: "mark.murphy7777@gmail.com",
          pass: "Bail3ykingg"
      }
    });
  const mailOptions = {
      from: 'mark.murphy7777@gmail.com',
      to: email,
      subject: 'Winnetka Woodworks - Confirmation',
      text: `Thank you for your order ${name}`,
      replyTo: 'mark.murphy7777@gmail.com'
  };
  transporter.sendMail(mailOptions, function(err, res) {
    if (err) {
      console.error('there was an error: ', err);
    } else {
      console.log('here is the res: ', res)
    }
  });
}

app.post('/getCityFromZip', (req, res) => {
  console.log('getShippingCosts');
  let url = 'http://production.shippingapis.com/ShippingAPITest.dll?API=CityStateLookup&XML=<CityStateLookupRequest USERID="377NONE02169"><ZipCode ID= "0"><Zip5>91306</Zip5></ZipCode></CityStateLookupRequest>'; 
  request.get(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
        let result1 = convert.xml2js(body, {compact: true, spaces: 4});
        console.log(result1.CityStateLookupResponse.ZipCode.City._text);
        res.end(`{"city": "${result1.CityStateLookupResponse.ZipCode.City._text}"}`);
    }
  });
});


app.post('/getShippingCosts', (req, res) => {

  let packageElements = '';

  for (const packageData of req.body.body.packageDataArr) {
    packageElements += `<Package ID="1ST">
      <Service>PRIORITY</Service>
      <ZipOrigination>91306</ZipOrigination>
      <ZipDestination>${req.body.body.zip}</ZipDestination>
      <Pounds>${packageData.pounds}</Pounds>
      <Ounces>16</Ounces>
      <Container></Container>
      <Width></Width>
      <Length></Length>
      <Height></Height>
      <Girth></Girth>
      <Machinable>false</Machinable>
      </Package>`;
  }

  let url = `https://secure.shippingapis.com/shippingapi.dll?API=RateV4&XML=<RateV4Request USERID="377NONE02169">
    <Revision>2</Revision>
    ${packageElements}
    </RateV4Request>`;

  request.get(url, function (err, response, body) {
    if(err){
      res.end('Error getting shipping costs from USPS');
    } else {
      let resultObj = convert.xml2js(body, {compact: true, spaces: 4});
      if ('Error' in resultObj.RateV4Response.Package) {
        console.log(resultObj.RateV4Response.Package.Error.Description._text);
        res.end(`{"Error":"${resultObj.RateV4Response.Package.Error.Description._text}"}`);
      }
      else {
        let totalRate = 0;
        if (Array.isArray(resultObj.RateV4Response.Package)) {
          for (const package of resultObj.RateV4Response.Package) {
            totalRate = (parseFloat(totalRate) + parseFloat(package.Postage.Rate._text)).toFixed(2);
          }
        }
        else {
          totalRate = (parseFloat(resultObj.RateV4Response.Package.Postage.Rate._text)).toFixed(2);        
        }
        console.log(`Shipping cost for ${req.body.body.zip} : $${totalRate}`);
        res.end(`{"Rate":"${parseFloat(totalRate).toFixed(2)}"}`);
      }
    }
  });
});


