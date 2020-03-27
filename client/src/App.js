/// launch config setting              "runtimeArgs": ["--disable-web-security"]

//TODO (as of 12-25-19):
// move remaining style attributes to css file
// address warnings about controlled/uncontrolled components
// address warnings about href's
// add validation for input fields
// investigate https issues
// user name in login/register/etc...
// enforce shipping address zip code
// checkout without login - after login checkout is blank - TODO: save data to ls

// YES, maybe the components should be separate files, but during development (of this scale) I find it easier to have them all in one place


import React from 'react';
import './WinnetkaWoodworks.css';
import products from './products.js';
import video from './Forest2.mp4';
import convert from 'xml-js';

let git = true;


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.openLogin = this.openLogin.bind(this);
    this.openLogout = this.openLogout.bind(this);
  }

  openLogin() {
    this.props.openLogin();
  }

  openLogout() {
    this.props.openLogout();
  }

  render() {

    return (
      <React.Fragment>
       <p id='login' onClick={this.props.loggedIn ? this.openLogout : this.openLogin}>{this.props.title}</p>
      </React.Fragment>
    )
  }
}

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.openShoppingCart = this.openShoppingCart.bind(this);
  }

  openShoppingCart() {
    this.props.openShoppingCart();
  }

  render() {
    return (
        <span style={{position: 'relative'}}>
          <p id='shoppingCart' onClick={this.openShoppingCart}>{this.props.title}</p>
          <img id='cartIcon' src={this.props.icon} alt=''></img>
          <p style={{position: 'absolute', bottom: '-3px', left: '157px', color: 'red', fontSize: '10pt', fontWeight: 'bold', opacity: '1.0'}}>{this.props.cartCount}</p>
        </span>
    )
  }
}

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.openCheckout = this.openCheckout.bind(this);
  }

  openCheckout() {
    this.props.openCheckout();
  }

  render() {
    if (this.props.enable) {
      return (
        <p id='shoppingCart' onClick={this.openCheckout}>{this.props.title}</p>
      )
    }
    else {
      return (
        <p id='shoppingCart' style={{color: 'gray'}}>{this.props.title}</p>
      )
    }
  }
}

class LogInDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {userName: '', password: ''};
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.openRegister = this.openRegister.bind(this);
  }

  handleUserNameChange(event) {
    this.setState({userName: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  onLogin() {
    this.props.onLogin(this.state.userName, this.state.password);
  }

  onCancel() {
    this.props.onCancel();
  }

  openRegister() {
    this.props.openRegister();
  }

  render() {
    return (
      <>
        <div id='dialogMain'>
          <div className="block">
            <label>User name:</label>
            <div className="divider"/>
            <input type="text" value={this.state.userName} onChange={this.handleUserNameChange} />
          </div>
          <div className="block">
            <label>Password:</label>
            <div className="divider"/>
            <input type="text" value={this.state.password} onChange={this.handlePasswordChange} />
          </div>
        </div>
        <div>
          <div id='loginFailedDiv'>
            <p>{this.props.loginFailed ? 'Login failed. Please try again.' : ''}</p>
          </div>
          <div id='registerDiv'>
            <p id='register' onClick={this.openRegister}>{this.props.registerTitle}</p>
          </div>
        </div>

        <div id='dialogButtons'>
          <button id='mainButtons' onClick={this.onLogin}>Login</button>
          <div className="divider"/>
          <button id='mainButtons' onClick={this.onCancel}>Cancel</button>
        </div>
      </>
    )
  }
}

class RegisterDialog extends React.Component {
  constructor(props) {
    super(props);
    this.onRegister = this.onRegister.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      regName: '',
      regEmail: '',
      regPassword: ''
    }
  }

  onRegister() {
    this.props.onRegister(this.state.regName, this.state.regEmail, this.state.regPassword);
  }

  onCancel() {
    this.props.onCancelRegister();
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    return(
      <>
        <div id='billingDiv'>
          <div id='billingLabelDiv'>
            <div className='labelDiv'>Name:</div>
            <div className='labelDiv'>Email:</div>
            <div className='labelDiv'>Password:</div>
          </div>
          <div id='billingInputDiv'>
            <div className='inputDiv'>
              <input onChange={this.onChange} name={'regName'} value={this.state.regName}></input>
            </div>
            <div className='inputDiv'>
              <input onChange={this.onChange} name={'regEmail'} value={this.state.regEmail}></input>
            </div>
            <div className='inputDiv'>
              <input onChange={this.onChange} name={'regPassword'} value={this.state.regPassword}></input>
            </div>
          </div>
        </div>
        <div id='dialogButtons'>
          <button id='mainButtons' onClick={this.onRegister}>Register</button>
          <div className="divider"/>
          <button id='mainButtons' onClick={this.onCancel}>Cancel</button>
        </div>
      </>
    )
  }
}

class LogOutDialog extends React.Component {
  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onLogout() {
    this.props.onLogout();
  }

  onCancel() {
    this.props.onCancel();
  }

  render() {
    let greeting = this.props.user + ', are you sure you want to log out?';

    return(
      <>
        <div id='dialogMain'>
          <p style={{textAlign: 'center'}}>{greeting}</p>
        </div>
        <div id='dialogButtons'>
          <button id='mainButtons' onClick={this.onLogout}>Yes</button>
          <div className="divider"/>
          <button id='mainButtons' onClick={this.onCancel}>Cancel</button>
        </div>
      </>
    )
  }
}

class ShoppingCartDialog extends React.Component {
  constructor(props) {
    super(props);
    this.onOk = this.onOk.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onIncrementQty = this.onIncrementQty.bind(this);
    this.onDecrementQty = this.onDecrementQty.bind(this);
    this.onSetNewQty = this.onSetNewQty.bind(this);
    this.onCheckout = this.onCheckout.bind(this);
  }

  onOk() {
    this.props.onOk();
  }

  onCancel() {
    this.props.onCancel();
  }

  onCheckout() {
    this.props.onCheckoutFromCart();
  }

  onRemove(item) {
    this.props.onRemoveItemFromCart(item);
  }

  onSetNewQty(item, val) {
    let newItem = {
      name: item.name,
      price: item.price,
      qty: val,
      id: item.id
    };
    this.props.onChangeQty(newItem);
  }

  onIncrementQty(item) {
    let newItem = {
      name: item.name,
      price: item.price,
      qty: item.qty + 1,
      id: item.id
    };
    this.props.onChangeQty(newItem);
  }

  onDecrementQty(item) {
    let newItem = {
      name: item.name,
      price: item.price,
      qty: item.qty - 1,
      id: item.id
    };
    this.props.onChangeQty(newItem);
  }

  render() {
    let subTotal = 0.0;
    let cartItems = this.props.cartItems.map((item) => {
        subTotal = (parseFloat(subTotal) + parseFloat(item.price) * parseFloat(item.qty)).toFixed(2);
        return (
          <li className='item' key={item.id}>
            <Spinner item={item} qty={item.qty} onIncrementQty={this.onIncrementQty} onDecrementQty={this.onDecrementQty} onSetNewQty={this.onSetNewQty}></Spinner>
            <div style={{flex: 1, marginLeft: '20px', background: 'lightskyblue', maxHeight: '40px', overflow: 'hidden'}}>{item.name}</div>
            <p style={{marginLeft: '20px', marginRight: '20px'}}>${item.price}</p>
            <button onClick={()=>this.onRemove(item)}>Remove</button>
          </li>
        )
    });

    let total = <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                    <p>Total ${subTotal}</p>
                    <button style={{height: '25px', marginLeft: '20px', marginRight: '20px'}} onClick={this.props.enableCheckout ? this.onCheckout : null} className={this.props.enableCheckout ? 'enabledButton' : 'disabledButton'}>Checkout</button>
                </div>

    return (
      <>
        <div id='dialogMain'>
          <ul id='cart-ul'>
            {cartItems}
          </ul>
          {total}
        </div>
        <div id='dialogButtons'>
          <button id='mainButtons' onClick={this.onOk}>OK</button>
          <div className="divider"/>
          <button id='mainButtons' onClick={this.onCancel}>Cancel</button>
        </div>
      </>
    );
  }
}

async function getShippingCosts(data) {
  let packageElements = '';
  for (const packageData of data.packageDataArr) {
    packageElements += `<Package ID="1ST">
      <Service>PRIORITY</Service>
      <ZipOrigination>91306</ZipOrigination>
      <ZipDestination>${data.zip}</ZipDestination>
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

  const response = await fetch(encodeURI(url))
  if (response.status !== 200) {
    throw Error(response.status);
  }
  const textData = await response.text();

  let resultObj = convert.xml2js(textData, {compact: true, spaces: 4});
  let totalRate = 0;
  if (Array.isArray(resultObj.RateV4Response.Package)) {
    for (const myPackage of resultObj.RateV4Response.Package) {
      totalRate = (parseFloat(totalRate) + parseFloat(myPackage.Postage.Rate._text)).toFixed(2);
    }
  }
  else {
    totalRate = (parseFloat(resultObj.RateV4Response.Package.Postage.Rate._text)).toFixed(2);
  }
  let retVal = `{"Rate":"${parseFloat(totalRate).toFixed(2)}"}`;
  return (JSON.parse(retVal));
}

function requestLocal(request, data) {
  let regUsers = null;
  switch (request) {
    case '/getShippingCosts':
      return getShippingCosts(data); //this is not local

    case '/register':
      console.log('Register: ' + data.name + ' ' + data.email + ' ' + data.password);
      regUsers = JSON.parse(localStorage.getItem('registeredUsers'));
      if (regUsers == null) {
        regUsers = [data];
      }
      else {
        regUsers.push(data);
      }
      localStorage.setItem('registeredUsers', JSON.stringify(regUsers));
      break;

    case '/checkout':
      return true;

    case '/getProducts':
      return products.products;

    case '/logout':
      return true;

    case '/login':
      console.log('Login: ' + data.user + ' ' + data.password);
      regUsers = JSON.parse(localStorage.getItem('registeredUsers'));

      let obj = regUsers.find(user => {
        return ((user.name === data.user) && (user.password === data.password))
      });
      if (obj != null) {
        console.log('Login succeeded!');
        return true;
      }
      else {
        console.log('Login failed!');
        return false;
      }
    default:
      return false;
  }
}

async function sendPostRequest(request, data) {

  if (git) {
    return requestLocal(request, data);
  }

  const postData = {
    title: 'Checkout post',
    body: data,
    userId: 2
  };
  const postOptions = {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const response = await fetch(request, postOptions);
  if (response.status !== 200) {
    throw Error(response.status);
  }
  const body = await response.json();
  return body;
}

async function sendGetRequest(request, data) {
  if (git) {
   return requestLocal(request, data);
  }

  const response = await fetch(request);
  if (response.status !== 200) {
    throw Error
  }
  const body = await response.json();
  return body;
}

async function sendGetRequestLogin(request, data) {
  if (git) {
    return requestLocal(request, data);
  }

  try {
    const userInfo = btoa(`${data.user}:${data.password}`);
    const response = await fetch(request, {
      headers: new Headers({
        "Authorization": 'Basic ' + userInfo,
        "Content-Type": 'application/json'
      })
    })
    if (response.status !== 200) {
      throw Error
    }
    const body = await response.json();
    return(body);
  }
  catch(err) {
    throw Error;
  }
}

class CheckoutDialog extends React.Component {
  constructor(props) {
    super(props);
    this.onCheckout = this.onCheckout.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onShippingSameAsBilling = this.onShippingSameAsBilling.bind(this);

    this.subTotal = 0.0;
    this.tax = 0.0;
    this.shipping = 0.0;
    this.total = 0.0;
    this.taxRate = '.09';

    let lsCheckoutData = getCheckoutDataFromLocalStorage(this.props.user);

    this.state = {
      billName: '',
      billCity: '',
      billAddress: '',
      billState: '',
      billZip: '',
      billEmail: '',
      shipName: '',
      shipAddress: '',
      shipCity: '',
      shipState: '',
      shipZip: '',
      payType: 'Visa',
      payName: '',
      payNumber: '',
      payExp: '',
      payCCV: '',
      disableShippingAddress: false,
      shipping: 0.0
    }
  }

  componentDidMount() {
    let lsCheckoutData = getCheckoutDataFromLocalStorage(this.props.user);

//    let ls = JSON.parse(localStorage.getItem(this.props.user));
    // if (lsCheckoutData != null) {
    //   this.setState(
    //     {
    //       billName: lsCheckoutData.billName,
    //       billCity: lsCheckoutData.billCity,
    //       billAddress: lsCheckoutData.billAddress,
    //       billState: lsCheckoutData.billState,
    //       billZip: lsCheckoutData.billZip,
    //       billEmail: lsCheckoutData.billEmail,
    //       shipName: lsCheckoutData.shipName,
    //       shipAddress: lsCheckoutData.shipAddress,
    //       shipCity: lsCheckoutData.shipCity,
    //       shipState: lsCheckoutData.shipState,
    //       shipZip: lsCheckoutData.shipZip,
    //       payType: lsCheckoutData.payType,
    //       payName: lsCheckoutData.payName,
    //       payNumber: lsCheckoutData.payNumber,
    //       payExp: lsCheckoutData.payExp,
    //       payCCV: lsCheckoutData.payCCV
    //     }
    //   )
    // }
  }

  getPackageData(cartItems) {
    //Note: We're calculating shipping costs based on the shipping cost of each individual item
    let packageDataArr = [];
    for (let i = 0; i < cartItems.length; i++) {
      for (let j = 0; j < cartItems[i].qty; j++) {
        packageDataArr.push(
          {
            width: cartItems[i].width,
            height: cartItems[i].height,
            pounds: cartItems[i].pounds,
            ounces: cartItems[i].ounces
          }
        )
      }
    }
    return packageDataArr;
  }

//async await promise notes:
//remember that async function will halt at await, but function will 'exit' returning a promise.
//the code after the await will execute after the promise (fetch?) finishes.
//the caller of this async function catches this fullfilled promise in its '.then'.
//so everything keeps going, the stuff that runs later is the code after the await, and the code in the .then.

  onChange(e) {
    if (e.target.name === 'shipZip') {
      if (e.target.value.length === 5) {
        let value = e.target.value;
        let packageDataArr = this.getPackageData(this.props.cartItems);
        sendPostRequest('/getShippingCosts', {zip: value, packageDataArr: packageDataArr})
          .then(res => {
            if (res !== undefined) {
              if ("Rate" in res) {
                let newShippingCost = parseFloat(res.Rate).toFixed(2);
                this.setState({shipping: newShippingCost, message:''});
              }
              else if ('Error' in res) {
                this.setState({message: res.Error});
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
        }
      else {
        this.setState((prev) => {
          return {shipping: 0};
        })
      }
    }
    this.setState({[e.target.name]: e.target.value});
  }

  componentDidUpdate() {
    addCheckoutDataToLocalStorage(this.props.user, this.state);
  }

  onCheckout() {
    //TODO: validate inputs
    let checkoutData = {
      billName: this.state.billName,
      billCity: this.state.billCity,
      billAddress: this.state.billAddress,
      billState: this.state.billState,
      billZip: this.state.billZip,
      billEmail: this.state.billEmail,
      shipName: this.state.shipName,
      shipAddress: this.state.shipAddress,
      shipCity: this.state.shipCity,
      shipState: this.state.shipState,
      shipZip: this.state.shipZip,
      payType: this.state.payType,
      payName: this.state.payName,
      payNumber: this.state.payNumber,
      payExp: this.state.payExp,
      payCCV: this.state.payCCV,
      user: this.props.user,
      cartItems: this.props.cartItems,
      subTotal: this.subTotal,
      tax: this.tax,
      shipping: this.state.shipping,
      total: this.total,
    }

    addCheckoutDataToLocalStorage(this.props.user ? this.props.user : 'anonymousUser', this.state);

    this.props.onCheckout(checkoutData);
  }

  onCancel() {
    addCheckoutDataToLocalStorage(this.props.user ? this.props.user : 'anonymousUser', this.state);
    this.props.onCancel();
  }

  onShippingSameAsBilling() {
    this.setState((prevState) => {
      return ({
      shipName: prevState.billName,
      shipAddress: prevState.billAddress,
      shipCity: prevState.billCity,
      shipState: prevState.billState,
      shipZip: prevState.billZip
      })
    });
  }

  render() {
    this.subTotal = 0.0;
    let cartItems = this.props.cartItems.map((item) => {
      this.subTotal = (parseFloat(this.subTotal) + parseFloat(item.price) * parseFloat(item.qty)).toFixed(2);
        return (
            <li style={{listStyle: 'none', paddingBottom: '0px', paddingLeft: '5px'}} key={item.id}>{item.name} - ${(item.price * item.qty).toFixed(2)} (Qty.{item.qty})</li>
          )
        }
      );
    this.tax = (parseFloat(this.subTotal) * parseFloat(this.taxRate)).toFixed(2);
    this.total = (parseFloat(this.subTotal) + parseFloat(this.tax) + parseFloat(this.state.shipping)).toFixed(2);

    return (
      <>
        <div id='dialogMain'>
          <div id='checkoutWrapper'>
            <div id='orderSummary'>
              <OrderSummary onChange={this.onChange} cartItems={cartItems} subTotal={this.subTotal} tax={this.tax} shipping={this.state.shipping} total={this.total}></OrderSummary>
            </div>
            <div id='addressDiv'>
              <div id='billingAddress'>
                <BillingAddress onChange={this.onChange} billName={this.state.billName} billAddress={this.state.billAddress} billCity={this.state.billCity} billState={this.state.billState} billZip={this.state.billZip} billEmail={this.state.billEmail}></BillingAddress>
              </div>
              <div id='shippingAddress'>
                <ShippingAddress onChange={this.onChange} onShippingSameAsBilling={this.onShippingSameAsBilling} shipName={this.state.shipName} shipAddress={this.state.shipAddress} shipCity={this.state.shipCity} shipState={this.state.shipState} shipZip={this.state.shipZip} disable={this.state.disableShippingAddress}></ShippingAddress>
              </div>
            </div>
            <div id='payment'>
              <Payment onChange={this.onChange} payType={this.state.payType} payName={this.state.payName} payNumber={this.state.payNumber} payExp={this.state.payExp} payCCV={this.state.payCCV}></Payment>
            </div>
            <div>
              <CheckoutMessage message={this.state.message}></CheckoutMessage>
            </div>
          </div>
        </div>

        <div id='dialogButtons'>
          <button id='mainButtons' onClick={this.onCheckout}>Submit Order</button>
          <div className="divider"/>
          <button id='mainButtons' onClick={this.onCancel}>Cancel</button>
        </div>
      </>
    )
  }
}

function OrderSummary(props) {
  return (
    <>
      <div className='checkDialogSubTitles'>Order Summary</div>
      <div id='summaryDiv'>
        <div id='cartItemsDiv'>
          {props.cartItems}
        </div>
        <div id='summaryLabelDiv'>
          <div className='labelDiv'>Total:</div>
          <div className='labelDiv'>Tax:</div>
          <div className='labelDiv'>Shipping:</div>
          <div className='labelDiv'>-----------</div>
          <div className='labelDiv'>Total Amount:</div>
        </div>
        <div id='summaryAmountDiv'>
          <div className='labelDiv'>${props.subTotal}</div>
          <div className='labelDiv'>${props.tax}</div>
          <div className='labelDiv'>${props.shipping}</div>
          <div className='labelDiv'>-----------</div>
          <div className='labelDiv'>${props.total}</div>
        </div>
      </div>
    </>
  )
}

function BillingAddress(props) {
  return (
    <>
      <div className='checkDialogSubTitles'>Billing Address</div>
      <div id='billingDiv'>
        <div id='billingLabelDiv'>
          <div className='labelDiv'><span style={{color:'red'}}>* </span>Name:</div>
          <div className='labelDiv'><span style={{color:'red'}}>* </span>Address:</div>
          <div className='labelDiv'><span style={{color:'red'}}>* </span>City:</div>
          <div className='labelDiv'><span style={{color:'red'}}>* </span>State:</div>
          <div className='labelDiv'><span style={{color:'red'}}>* </span>Zip Code:</div>
          <div className='labelDiv'><span style={{color:'red'}}>* </span>Email:</div>
        </div>
        <div id='billingInputDiv'>
          <div className='inputDiv'>
            <input onChange={props.onChange} name={'billName'} value={props.billName}></input>
          </div>
          <div className='inputDiv'>
            <input onChange={props.onChange} name={'billAddress'} value={props.billAddress}></input>
          </div>
          <div className='inputDiv'>
            <input onChange={props.onChange} name={'billCity'} value={props.billCity}></input>
          </div>
          <div className='inputDiv'>
            <input onChange={props.onChange} name={'billState'} value={props.billState}></input>
          </div>
          <div className='inputDiv'>
            <input onChange={props.onChange} name={'billZip'} value={props.billZip}></input>
          </div>
          <div className='inputDiv'>
            <input onChange={props.onChange} name={'billEmail'} value={props.billEmail}></input>
          </div>
        </div>
      </div>
    </>
  )
}

class ShippingAddress extends React.Component {
  constructor(props) {
    super(props);
    this.onShippingSameAsBilling = this.onShippingSameAsBilling.bind(this);
    this.state = {
      disabled: false
    }
  }

  onShippingSameAsBilling(e) {
    this.setState({disabled: e.target.checked})
    this.props.onShippingSameAsBilling();
  }

  render() {
    return (
      <>
        <div className='checkDialogSubTitles'>
          <div style={{display: 'inline-block', marginLeft: '0px', marginRight: '30px'}}>Shipping Address</div>
          <input style={{width: '20px'}} type='checkbox' onClick={this.onShippingSameAsBilling}></input>
          <p style={{display: 'inline', fontSize: '10pt'}}>Shipping address same as billing address</p>
        </div>
        <div id='shippingDiv'>
          <div id='billingLabelDiv'>
            <div className='labelDiv'><span style={{color:'red'}}>* </span>Name:</div>
            <div className='labelDiv'><span style={{color:'red'}}>* </span>Address:</div>
            <div className='labelDiv'><span style={{color:'red'}}>* </span>City:</div>
            <div className='labelDiv'><span style={{color:'red'}}>* </span>State:</div>
            <div className='labelDiv'><span style={{color:'red'}}>* </span>Zip Code:</div>
          </div>
          <div id='billingInputDiv'>
            <div className='inputDiv'>
              <input onChange={this.props.onChange} name={'shipName'} value={this.props.shipName} disabled = {this.state.disabled}></input>
            </div>
            <div className='inputDiv'>
              <input onChange={this.props.onChange} name={'shipAddress'} value={this.props.shipAddress} disabled = {this.state.disabled}></input>
            </div>
            <div className='inputDiv'>
              <input onChange={this.props.onChange} name={'shipCity'} value={this.props.shipCity} disabled = {this.state.disabled}></input>
            </div>
            <div className='inputDiv'>
              <input onChange={this.props.onChange} name={'shipState'} value={this.props.shipState} disabled = {this.state.disabled}></input>
            </div>
            <div className='inputDiv'>
              <input onChange={this.props.onChange} name={'shipZip'} value={this.props.shipZip} disabled = {this.state.disabled}></input>
            </div>
          </div>
        </div>
      </>
    )
  }
}

function Payment(props) {
  return (
    <>
      <div className='checkDialogSubTitles'>Payment Information</div>
      <div id='paymentDiv'>
        <div id='paymentCol1'>
          <div id='paymentCol1-1'>
            <div id='paymentLabelDiv'>
              <div className='labelDiv' style={{marginBottom: '10px'}}><span style={{color:'red'}}>* </span>Type:</div>
              <div className='labelDiv'><span style={{color:'red'}}>* </span>Name:</div>
            </div>
          </div>
          <div id='paymentCol1-2'>
            <div id='paymentInputDiv'>
              <div className='inputDiv' style={{marginBottom: '10px'}}>
                <input type='radio' onChange={props.onChange} name={'payType'} style={{width: '10px'}} value={'Visa'} checked={props.payType === 'Visa'}></input>
                <p style={{display: 'inline', fontSize: '10pt', marginRight: '10px'}}>Visa</p>
                <input type='radio' onChange={props.onChange} name={'payType'} style={{width: '10px'}} value={'Mastercard'} checked={props.payType === 'Mastercard'}></input>
                <p style={{display: 'inline', fontSize: '10pt', marginRight: '10px'}}>Mastercard</p>
                <input type='radio' onChange={props.onChange} name={'payType'} style={{width: '10px'}} value={'Discover'} checked={props.payType === 'Discover'}></input>
                <p style={{display: 'inline', fontSize: '10pt', marginRight: '10px'}}>Discover</p>

              </div>
              <div className='inputDiv'>
                <input onChange={props.onChange} name={'payName'} value={props.payName} style={{width: '300px'}}></input>
              </div>
            </div>
          </div>
        </div>

        <div id='paymentCol2'>
          <div id='paymentCol2-1'>
            <div id='paymentLabelDiv'>
              <div className='labelDiv'><span style={{color:'red'}}>* </span>CC Number:</div>
              <div className='labelDiv'><span style={{color:'red'}}>* </span>Exp. Date:</div>
              <div className='labelDiv'><span style={{color:'red'}}>* </span>CCV:</div>
            </div>
          </div>
          <div id='paymentCol2-2'>
            <div id='paymentInputDiv'>
              <div className='inputDiv'>
                <input onChange={props.onChange} name={'payNumber'} value={props.payNumber} style={{width: '300px'}}></input>
              </div>
              <div className='inputDiv'>
                <input onChange={props.onChange} name={'payExp'} value={props.payExp} style={{width: '300px'}}></input>
              </div>
              <div className='inputDiv'>
                <input onChange={props.onChange} name={'payCCV'} value={props.payCCV} style={{width: '300px'}}></input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function CheckoutMessage(props) {
  return (
    <div id='checkoutMessageDiv'>{props.message}</div>
  )
}

class ConfirmationDialog extends React.Component {
  constructor(props) {
    super(props);
    this.onOk = this.onOk.bind(this);
  }

  onOk() {
    this.props.onOk();
  }

  render() {
    return (
      <>
        <div id='dialogMain'>
          <h3>Thank you for your Order!</h3>
        </div>
        <div id='dialogButtons'>
          <button id='mainButtons' onClick={this.onOk}>OK</button>
        </div>
      </>
    )
  }
}

class DialogContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onCancel = this.onCancel.bind(this);
  }

  onCancel() {
    this.props.onCancel();
  }

  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    let loggedInUser = ' ';
    if (this.props.user !== '') {
      loggedInUser += `${this.props.user}`;
    }

    return (

      <React.Fragment>
        <div id='containerBackground'>
          <div id='containerContent' style={{width: this.props.width, height: this.props.height}}>
            <div id='containerContentTitle'>
              <span id='title'>{this.props.title}</span>
              <span>  </span>
              <span id='titleUser'>{loggedInUser}</span>
              <div id='cancelX'>
                <button onClick={this.onCancel}>X</button>
              </div>
            </div>
            <div id='containerContentCustom'>
              {this.props.dialogContent}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

class Spinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {qty: this.props.qty};
    this.onIncrementQty = this.onIncrementQty.bind(this);
    this.onDecrementQty = this.onDecrementQty.bind(this);
    this.onChange = this.onChange.bind(this);
    }

  onChange(e) {
    this.props.onSetNewQty(this.props.item, e.target.value);
  }

  onIncrementQty() {
    this.props.onIncrementQty(this.props.item);
  }

  onDecrementQty() {
    this.props.onDecrementQty(this.props.item);
  }

  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'row', height: '30px'}}>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <input style={{flex: '1', width: '20px'}} value = {this.props.qty} onChange={this.onChange}></input>
        </div>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <button onClick={this.onIncrementQty} style={{height: '15px', lineHeight: '5px'}}>+</button>
          <button onClick={this.onDecrementQty} style={{height: '15px', lineHeight: '5px'}}>-</button>
        </div>
      </div>
    );
  }
}

function User(props) {
  if (props.user) {
    return (<p id='user'>Welcome, {props.user}</p>);
  }
  else {
    return null;
  }
}

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.changeArticle = this.changeArticle.bind(this);
    this.state = {activeItem: 'Home'};
  }

  changeArticle(name) {
    this.setState({activeItem: name});
    this.props.changeArticle(name);
  }
  render() {
    return (
      <React.Fragment>
        <nav id="nav">
          <ul>
            <li className='liNav no-bullet'><a className={(this.state.activeItem === 'Home' ? 'activeClass' : 'navAnchor')} onClick={() => this.changeArticle('Home')} href={'#homeDiv'}>Home</a></li>
            <li className='liNav no-bullet'><a className={(this.state.activeItem === 'Products' ? 'activeClass' : 'navAnchor')} onClick={() => this.changeArticle('Products')} href={'#productsDiv'}>Products</a></li>
            <li className='liNav no-bullet'><a className={(this.state.activeItem === 'About' ? 'activeClass' : 'navAnchor')} onClick={() => this.changeArticle('About')} href={'#aboutDiv'}>About</a></li>
            <li className='liNav no-bullet'><a className={(this.state.activeItem === 'Contact' ? 'activeClass' : 'navAnchor')} onClick={() => this.changeArticle('Contact')} href={'#contactDiv'}>Contact</a></li>
          </ul>
        </nav>
      </React.Fragment>
    )
  }
}

function Home(props) {
  return (
    <div id='homeDiv'>
      {props.videoEnded && <div id='imgDiv1'> <img src={process.env.PUBLIC_URL + '/images/chair.jpg'} alt="Pineapple" style={{width:'200px', height:'200px'}}></img> </div>}
      {props.videoEnded && <div id='imgDiv2'> <img src={process.env.PUBLIC_URL + '/images/lamp.JPG'} alt="Pineapple" style={{width:'200px', height:'200px'}}></img> </div>}
      {props.videoEnded && <div id='imgDiv3'> <img src={process.env.PUBLIC_URL + '/images/bench.JPG'} alt="Pineapple" style={{width:'200px', height:'200px'}}></img> </div>}
      {props.videoEnded && <div id='imgDiv4'> <img src={process.env.PUBLIC_URL + '/images/headboard.JPG'} alt="Pineapple" style={{width:'300px', height:'300px'}}></img> </div>}
    </div>
  )
}

function About(props) {

  return(
    <div id='aboutDiv'>
      <p className="subhead" style={{marginLeft: '30px', marginRight: '40px', marginTop: '0px', textIndent: '20px', opacity: '1.0', color: 'black'}}>
        <img src={process.env.PUBLIC_URL + '/images/logo5.png'} alt="Pineapple" style={{width:'100px', height:'100px', marginLeft: '10px', marginRight: '20px', float: 'left'}}></img>
        At Winnetka Woodworks we strive to produce quality furniture that will provide a lifetime of enjoyment.
        At Winnetka Woodworks we strive to produce quality furniture that will provide a lifetime of enjoyment.
        At Winnetka Woodworks we strive to produce quality furniture that will provide a lifetime of enjoyment.
        At Winnetka Woodworks we strive to produce quality furniture that will provide a lifetime of enjoyment.
        At Winnetka Woodworks we strive to produce quality furniture that will provide a lifetime of enjoyment.
        At Winnetka Woodworks we strive to produce quality furniture that will provide a lifetime of enjoyment.
        <img src={process.env.PUBLIC_URL + '/images/shed1.JPG'} alt="shed" style={{width:'200px', height:'200px', marginLeft: '10px', marginRight: '20px', marginTop: '10px', marginBottom: '10px', float: 'right'}}></img>
        At Winnetka Woodworks we strive to produce quality furniture that will provide a lifetime of enjoyment.
        At Winnetka Woodworks we strive to produce quality furniture that will provide a lifetime of enjoyment.
        At Winnetka Woodworks we strive to produce quality furniture that will provide a lifetime of enjoyment.
        At Winnetka Woodworks we strive to produce quality furniture that will provide a lifetime of enjoyment.
        At Winnetka Woodworks we strive to produce quality furniture that will provide a lifetime of enjoyment.
      </p>
      <p style={{textIndent: '20px', marginLeft: '30px', marginRight: '40px', color: 'black'}}>At Winnetka Woodworks we strive to produce quality furniture that will provide a lifetime of enjoyment.
        At Winnetka Woodworks we strive to produce quality furniture that will provide a lifetime of enjoyment.
        At Winnetka Woodworks we strive to produce quality furniture that will provide a lifetime of enjoyment.
        At Winnetka Woodworks we strive to produce quality furniture that will provide a lifetime of enjoyment.
        At Winnetka Woodworks we strive to produce quality furniture that will provide a lifetime of enjoyment.
        At Winnetka Woodworks we strive to produce quality furniture that will provide a lifetime of enjoyment.
        <img src={process.env.PUBLIC_URL + '/images/img_0765.jpg'} alt="motorcycle" style={{width:'200px', height:'200px', marginLeft: '10px', marginRight: '20px', marginTop: '10px', marginBottom: '10px', float: 'left'}}></img>
        At Winnetka Woodworks we strive to produce quality furniture that will provide a lifetime of enjoyment.
        At Winnetka Woodworks we strive to produce quality furniture that will provide a lifetime of enjoyment.
        At Winnetka Woodworks we strive to produce quality furniture that will provide a lifetime of enjoyment.
        At Winnetka Woodworks we strive to produce quality furniture that will provide a lifetime of enjoyment.
        At Winnetka Woodworks we strive to produce quality furniture that will provide a lifetime of enjoyment.
      </p>
      <p style={{textIndent: '50px', fontStyle: 'italic'}}>-- Winnetka Woodworks</p>
    </div>
  )
}

function DetailsDialog(props) {
  return (
    <div id='detailsDialog'>
      <p>{props.details}</p>
    </div>
  )
}

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.onAddToCart = this.onAddToCart.bind(this);
    this.onDetails = this.onDetails.bind(this);
    this.onCancelDetails = this.onCancelDetails.bind(this);

    this.state = {showDetails: false};
  }

  onAddToCart(name, price, id, width, height, pounds, ounces) {
    this.props.addToCart(name, price, id, width, height, pounds, ounces);
  }

  onDetails() {
    this.setState({showDetails: true});
  }

  onCancelDetails() {
    this.setState({showDetails: false});
  }

  render() {
    return(
      <>
        <div id='product'>
          <div id='imageDiv'>
            <img id='image' src={process.env.PUBLIC_URL + '/' + this.props.image} alt=''></img>
          </div>
          <div id='textDiv'>
            <span id='productText'>{this.props.name} {this.props.price}</span>
          </div>
          <div id='buyButtonDiv'>
            <button onClick={() => this.onAddToCart(this.props.name, this.props.price, this.props.id, this.props.width, this.props.height, this.props.pounds, this.props.ounces)}>Add to cart</button>
          </div>
          <p id='details' style={{margin:0, paddingBottom: '5px'}} onClick={this.onDetails}>Details</p>
        </div>
        <DialogContainer show={this.state.showDetails} onCancel={this.onCancelDetails} dialogContent={<DetailsDialog onCancel={this.onCancelDetails} details={this.props.details}/>}  width='600px' height='240px' title={'Details'}></DialogContainer>
      </>

    )
  }
}

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {products: [], data: ''};
  }

  //get the products from the server
  componentDidMount() {
    sendGetRequest('/getProducts')
      .then(res => this.setState({ products: res }))
      .catch(err => console.log(err));
  }

  render() {
    let productsJSX = this.state.products.map((product) =>
      <li key={product.id}>
        <Product name={product.name} price={product.price} image={product.image} id={product.id} width={product.width} height={product.height} pounds={product.pounds} ounces={product.ounces} details={product.details} addToCart={this.props.addToCart}></Product>
      </li>
    );

    return(
      <React.Fragment>
        <div id='productsDiv'>
          <div>{this.state.data}</div>
          <ul id='products-ul'>
            {productsJSX}
          </ul>
        </div>

      </React.Fragment>
    )
  }
}

function Contact(props) {

  return(
    <>
    <div id='contactDiv'>
        <h3 style={{marginTop: '0'}}>Winnetka Woodworks</h3>
        <p>12345 Maple Lane</p>
        <p>Any Town, CA 91306</p>
        <br></br>
        <p>Phone: 999 765-4321</p>
        <p>Email: mark.murphy7777@gmail.com</p>
        <a href={'#contactDiv'}>
          <iframe title={'Map'} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26395.913036501577!2d-118.58849713338948!3d34.210527146292364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c29bf24b78f7d1%3A0x641ef7caae4314da!2sWinnetka%2C%20Los%20Angeles%2C%20CA!5e0!3m2!1sen!2sus!4v1577414854081!5m2!1sen!2sus" style={{width:"900", height:"750", frameBorder:"0", border: "0", allowFullScreen:""}}></iframe>
        </a>
    </div>
    </>
  )
}

class Article extends React.Component {
  constructor(props) {
    super(props);

    this.components = {
      'Home' : Home,
      'About' : About,
      'Products' : Products,
      'Contact' : Contact
    }
  }

  render() {
    let ComponentContent = this.components[this.props.componentName];

    return (
      <React.Fragment>
        <article id="article">
          <div className='articleName'>{this.props.componentName}</div>

          <ComponentContent addToCart={this.props.addToCart} videoEnded={this.props.videoEnded}/>
        </article>
      </React.Fragment>
    )
  }
}

function createLocalStorage(user) {
  let localStorageObj = {
    checkoutData: {},
    cartItems: []
  }
  localStorage.setItem(user, JSON.stringify(localStorageObj));
}

function addCheckoutDataToLocalStorage(user, data) {
  let ls = JSON.parse(localStorage.getItem(user));
  if (ls !== null) {
    ls.checkoutData = data;
    localStorage.setItem(user, JSON.stringify(ls));
  }
}

function addCartItemsToLocalStorage(user, data) {
  let ls = JSON.parse(localStorage.getItem(user));
  if (ls !== null) {
    ls.cartItems = data;
    localStorage.setItem(user, JSON.stringify(ls));
  }
}


function getCheckoutDataFromLocalStorage(user) {
  let ls = JSON.parse(localStorage.getItem(user));
  if (ls != null) {
//    return (ls.checkoutData);
    return (ls);
  }
  else {
    return (null);
  }
}

function deleteLocalStorage(user) {
  localStorage.removeItem(user);

}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {renderText: "hello",
                  article:"1",
                  componentName: 'Home',
                  showLoginDialog: false,
                  showRegisterDialog: false,
                  user: '',
                  showLogoutDialog: false,
                  showCheckoutDialog: false,
                  loggedIn: false,
                  showCartDialog: false,
                  products: {},
                  data: '',
                  cartCount: 0,
                  cartItems: [],
                  checkoutData: {},
                  subTotal: 0.0,
                  showConfirmationDialog: false,
                  loginFailed: false,
                  returnToCheckout: false,
                  videoEnded: false
                };

    this.changeArticle = this.changeArticle.bind(this);
    this.openLogin = this.openLogin.bind(this);
    this.openLogout = this.openLogout.bind(this);
    this.onCancelLogin = this.onCancelLogin.bind(this);
    this.onCancelLogout = this.onCancelLogout.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.onOkCart = this.onOkCart.bind(this);
    this.onCancelCart = this.onCancelCart.bind(this);
    this.openShoppingCart = this.openShoppingCart.bind(this);
    this.openCheckout = this.openCheckout.bind(this);
    this.onCheckout = this.onCheckout.bind(this);
    this.onCancelCheckout = this.onCancelCheckout.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.onRemoveItemFromCart = this.onRemoveItemFromCart.bind(this);
    this.onChangeQty = this.onChangeQty.bind(this);
    this.onCheckoutFromCart =this.onCheckoutFromCart.bind(this);
    this.onOkConfirmation = this.onOkConfirmation.bind(this);
    this.onCancelConfirmation = this.onCancelConfirmation.bind(this);
    this.onRegister = this.onRegister.bind(this);
    this.openRegister = this.openRegister.bind(this);
    this.onCancelRegister = this.onCancelRegister.bind(this);
    this.onVideoEnded = this.onVideoEnded.bind(this);

    this.lsData = {};

  }

  changeArticle(name) {
    this.setState({componentName: name});
  }

  onLogin(user, password) {
    sendGetRequestLogin('/login', {user: user, password: password})
      .then(res => {
          if (res === true) {
            let lsData = getCheckoutDataFromLocalStorage(user);
            if (lsData !== null) {
              let tempCount = 0;
              lsData.cartItems.map((item) => tempCount += item.qty);
              this.setState({ data: res.response, user: user, showLoginDialog: false, loggedIn: true, cartItems: lsData.cartItems, checkoutData: lsData.checkoutData, cartCount: tempCount, loginFailed: false, showCheckoutDialog: this.state.returnToCheckout });
            }
            else {
              this.setState({ data: res.response, user: user, showLoginDialog: false, loggedIn: true, loginFailed: false, showCheckoutDialog: this.state.returnToCheckout});
              createLocalStorage(user);
            }
          }
          else {
            this.setState({ loginFailed: true, user: ''});
          }
        })
      .catch(err => console.log(err));
  }

  onRegister(name, email, password) {
    sendPostRequest('/register', {name: name, email: email, password: password})
      .then(res => this.setState({ showRegisterDialog: false}))
      .catch(err => console.log(err));
  }

  onLogout() {
    //do actual logout
    sendGetRequest('/logout')
      .then(res => this.setState({ data: res.response, user: '', showLogoutDialog: false, loggedIn: false, cartItems: [], cartCount: 0, loginFailed: false }))
      .catch(err => console.log(err));
  }

  onCancelLogin() {
    this.setState({showLoginDialog: false, loginFailed: false});
  }

  onCancelRegister() {
    this.setState({showRegisterDialog: false});
  }

  onCancelLogout() {
    this.setState({showLogoutDialog: false});
  }

  openLogin() {
    this.setState({showLoginDialog: true});
  }

  openRegister() {
    this.setState({showLoginDialog: false, showRegisterDialog: true});
  }

  openLogout() {
    this.setState({showLogoutDialog: true});
  }

  openShoppingCart() {
    this.setState({showCartDialog: true});
  }

  onOkCart() {
    this.setState({showCartDialog: false});
  }

  onCancelCart() {
    this.setState({showCartDialog: false});
  }

  openCheckout() {
    this.setState({showCheckoutDialog: true});
  }

  onCheckoutFromCart() {
    this.setState({showCartDialog: false, showCheckoutDialog: true});
  }

  onCancelCheckout() {
    this.setState({showCheckoutDialog: false});
  }

  onCheckout(data) {
    if (this.state.loggedIn === false) {
      this.setState({showCheckoutDialog: false, showLoginDialog: true, returnToCheckout: true});
    }
    else {

      sendPostRequest('/checkout', data)
        .then(res => this.setState({ data: res.response }))
        .catch(err => console.log(err));

      this.setState({showCheckoutDialog: false, showConfirmationDialog: true, cartItems: [], cartCount: 0, subTotal: 0});
      deleteLocalStorage(this.state.user);
    }
  }

  onOkConfirmation() {
    this.setState({showConfirmationDialog: false});
  }

  onCancelConfirmation() {
    this.setState({showConfirmationDialog: false});
  }

  addToCart(name, price, id, width, height, pounds, ounces) {
    let foundItem = false;

    //if the item is already in the list, increment qty
    const newCartItems = this.state.cartItems.map(cartItem => {
      if(cartItem.name === name) {
        cartItem.qty = cartItem.qty + 1;
        foundItem = true;
      }
      return cartItem;
    });

    let subTotal = (parseFloat(this.state.subTotal) + parseFloat(price)).toFixed(2);
    if (foundItem) {
      this.setState((state) => {
        addCartItemsToLocalStorage(this.state.user, newCartItems);
        return {cartCount: state.cartCount + 1, cartItems: newCartItems, subTotal: subTotal};
      });
    }
    else {
      this.setState((state) => {
        let newCartItems = state.cartItems.concat({name: name, price: price, id: id, width: width, height: height, pounds: pounds, ounces: ounces, qty: 1})
        addCartItemsToLocalStorage(this.state.user, newCartItems);
        return {cartCount: state.cartCount + 1, cartItems: newCartItems, subTotal: subTotal}; /// don't mutate the state
      })
    }
  }

  onRemoveItemFromCart(item) {
    console.log('onRemoveItemFromCart');
    let newCartItems = this.state.cartItems.filter((cartItem) => cartItem.name !== item.name);
    let newCartCount = this.state.cartCount - item.qty;
    let subTotal = (this.state.subTotal - (item.price * item.qty)).toFixed(2);
    this.setState((state) => {
      addCartItemsToLocalStorage(this.state.user, newCartItems);
      return {cartCount: newCartCount, cartItems: newCartItems, subTotal: subTotal};
    })
  }

  onChangeQty(item) {
    let qtyChange = 0;
    let totalChange = 0

    if (item.qty === 0) {
      item.qty = 1;
      this.onRemoveItemFromCart(item);
    }
    else {
      //find item in list and increment qty
      const newCartItems = this.state.cartItems.map(cartItem => {
        if(cartItem.name === item.name) {
          qtyChange = item.qty - cartItem.qty;
          totalChange =  item.price * qtyChange;
          cartItem.qty = item.qty;
        }
        return cartItem;
      });

      let subTotal = (parseFloat(this.state.subTotal) + parseFloat(totalChange)).toFixed(2);
      this.setState((state) => {
        addCartItemsToLocalStorage(this.state.user, newCartItems);
        return {cartCount: state.cartCount + qtyChange, cartItems: newCartItems, subTotal: subTotal};
      })
    }
  }

  onVideoEnded() {
    this.setState({videoEnded: true});
  }

  componentWillUnmount() {
    console.log('bye');
  }

  render() {
   return (
      <div id="outerDiv-x">
        <div id='headerDiv-x'>

          <div id='videoDiv'>
            <video id='videoTag' autoPlay={true} loop={false} controls={false} muted={true} onEnded={this.onVideoEnded}>
              <source src={video} type='video/mp4' />
            </video>
          </div>

          <div id='headerLinks'>
            <User user={this.state.user}></User>
            <Login title={this.state.loggedIn ? 'Logout' : 'Login'} loggedIn={this.state.loggedIn} openLogin={this.openLogin} openLogout={this.openLogout}></Login>
            <ShoppingCart title={'Shopping Cart'} openShoppingCart={this.openShoppingCart} icon={process.env.PUBLIC_URL + '/images/icons8-shopping-cart-30.png'} cartCount={this.state.cartCount}></ShoppingCart>
            <Checkout title={'Check out'} openCheckout={this.openCheckout} enable={this.state.cartCount > 0}></Checkout>
          </div>
          <h1 id='mainHeaderTitle'>Winnetka Woodworks</h1>
        </div>

        <div id="mainDiv-x">
          <Navigation changeArticle={this.changeArticle} addToCart={this.addToCart}></Navigation>
          <Article renderText={this.state.renderText} componentName={this.state.componentName} addToCart={this.addToCart} videoEnded={this.state.videoEnded}></Article>
        </div>

        <div id='footerDiv-x'>
          {/* <h5>{this.state.data}</h5> */}
          <h5>Winnetka Woodworks, Inc. Copyright 2019{this.state.data}</h5>
        </div>

        <DialogContainer show={this.state.showLoginDialog} onCancel={this.onCancelLogin} dialogContent={<LogInDialog
                                                                                                         onLogin={this.onLogin}
                                                                                                         onCancel={this.onCancelLogin}
                                                                                                         openRegister={this.openRegister}
                                                                                                         user={this.state.user}
                                                                                                         registerTitle={'Register'}
                                                                                                         loginFailed={this.state.loginFailed}/>}
          width='600px' height='240px' title={'Login'} user={this.state.user}></DialogContainer>

        <DialogContainer show={this.state.showRegisterDialog} onCancel={this.onCancelRegister} onRegister={this.onRegister} dialogContent={<RegisterDialog
                                                                                                                                            onRegister={this.onRegister}
                                                                                                                                            onCancelRegister={this.onCancelRegister}/>}
          width='600px' height='200px' title={'Register'}></DialogContainer>

        <DialogContainer show={this.state.showLogoutDialog} onCancel={this.onCancelLogout} dialogContent={<LogOutDialog
                                                                                                            onLogout={this.onLogout}
                                                                                                            onCancel={this.onCancelLogout}
                                                                                                            user={this.state.user}/>}
          width='400px' height='150px' title={'Logout'} user={this.state.user}></DialogContainer>

        <DialogContainer show={this.state.showCartDialog} onCancel={this.onCancelCart} dialogContent={<ShoppingCartDialog
                                                                                                        onOk={this.onOkCart}
                                                                                                        onCancel={this.onCancelCart}
                                                                                                        onRemoveItemFromCart={this.onRemoveItemFromCart}
                                                                                                        onChangeQty={this.onChangeQty}
                                                                                                        onCheckoutFromCart={this.onCheckoutFromCart}
                                                                                                        user={this.state.user}
                                                                                                        cartItems={this.state.cartItems}
                                                                                                        enableCheckout={this.state.cartCount > 0}/>}
          width='700px' height='500px' title={'Shopping Cart'} user={this.state.user}></DialogContainer>

        <DialogContainer show={this.state.showCheckoutDialog} onCancel={this.onCancelCheckout} dialogContent={<CheckoutDialog
                                                                                                                onCheckout={this.onCheckout}
                                                                                                                onCancel={this.onCancelCheckout}
                                                                                                                user={this.state.user}
                                                                                                                cartItems={this.state.cartItems}/>}
          width='70%' height='80%' title={'Checkout'} user={this.state.user}></DialogContainer>

        <DialogContainer show={this.state.showConfirmationDialog} onCancel={this.onCancelConfirmation} dialogContent={<ConfirmationDialog
                                                                                                                        onOk={this.onOkConfirmation}/>}
          width='600px' height='200px' title={'Order Confirmation'} user={this.state.user}></DialogContainer>
      </div>
    )
  }
}
export default App;