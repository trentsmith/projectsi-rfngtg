import { Component } from '@angular/core';
import { HttpClientModule, HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';
 constructor(private http: HttpClient){
   
 }
  title = 'project';
  url = "https://api.worldtradingdata.com/api/v1/stock?symbol=SNAP,TWTR,VOD.L&api_token=PRt07UGBzUrZPTUROLww1CBKxFeS0OcWL7qB3oaaJKxeFJ1mWuhz7LI08qBF";
  data:any[];
  stock:any;
  show=true;
  tickers = [];
  open =[];
  close=[];
  sector=[];
  tickerssectors=[];
  currentDate:any;
  b:any;
  s:any;
  ngOnInit() 
  {
    let json = {username:"username3",password:"password3"};
      this.getData("http://www.mocky.io/v2/5e213a252f0000670077d4d4");
  }
getDate( offset:any )
{

    var x = new Date();
    var yi = x.getFullYear();
    var mi = (x.getMonth() + 1);
    var di =x.getDate();
    var m0 =0;
    var temp = offset;
    var t = mi;
    while(di-offset<0)
    {
      m0++; 
      if(t ==2)
      {
        offset = offset-28;
      }
      else if(t%2==0)
      {
        offset = offset-30;
      }
      else if(t%2!=0)
      {
        offset = offset-31;
      }
      t--;
      if(t==0)
      {
        t =12;
      }

    }
    if(m0>=mi)
    {
      mi =t;
      if(mi==1)
      {
        yi= yi-1;
      }
      else
      {
        yi = yi-1;
      }

    }
    var m = mi.toString();
    if(offset >0)
    {
      var d = (di-offset).toString();
    }
    else
    {
      var d = di.toString();
    }
    var y = yi.toString();

    (d.length == 1) && (d = '0' + d);
    (m.length == 1) && (m = '0' + m);
    var yyyymmdd = y +"-"+m+"-" + d;
    this.currentDate = yyyymmdd;

}

stockhistory:any[];
temp:any;
volume:any[];
price:any[];
percent:any[];
volumeaverage:any[];
percentaverage:any;
priceaverage:any[];
test =[];
getVolume()
{
  this.volumeaverage = [ 0 ];
   for(var i =0;i<this.tickers.length;i++)
  {
    var url1 = "https://api.worldtradingdata.com/api/v1/history?symbol="+this.tickers[i]+"&sort=newest&api_token=PRt07UGBzUrZPTUROLww1CBKxFeS0OcWL7qB3oaaJKxeFJ1mWuhz7LI08qBF";

    this.http.get(url1).subscribe(
      (data:any[])=>
      {
        this.temp = data;
      }) 
       for( i = 30;i > 10;i--)
        {
          try{
          this.getDate(i);
          var volume1 = this.temp["history"][this.currentDate].volume;
          this.volumeaverage[this.volumeaverage.length] = this.volumeaverage[this.volumeaverage.length]+ volume1;
          this.volume.push(volume1);
          }
          catch(err)
          {
            console.log(this.currentDate+"failure")
          }
          }
        this.volumeaverage.push(this.volumeaverage[this.volumeaverage.length-1]/this.volume.length);
  }
}
getPrice()
{
  var price = [];
  this.priceaverage = [0];
  var count = 0;
 for(var i =0;i<this.tickers.length;i++)
  {
    price.push([]);
    this.priceaverage = [0];
    var url1 = "https://api.worldtradingdata.com/api/v1/history?symbol="+this.tickers[i]+"&sort=newest&api_token=PRt07UGBzUrZPTUROLww1CBKxFeS0OcWL7qB3oaaJKxeFJ1mWuhz7LI08qBF";

    this.http.get(url1).subscribe(
      (data:any[])=>
      {
        this.temp = data;
      }) 


price=[[]];
var count1 = 0;
       for( i = 10;i > 1;i--)
        {
          
          try{
            console.log("success")
          this.getDate(i);
          var open = this.temp["history"][this.currentDate].open;
          var close = this.temp["history"][this.currentDate].close;
          console.log("test");
          this.priceaverage[count] = this.priceaverage[count]+ close;
                    console.log("test");

          price[count].push(open);
          price[count].push(close);
          count1++;
          }
          catch(err)
          {
            console.log(this.currentDate+"failure")
            console.log(err)
          }
          }
          this.priceaverage[count]=this.priceaverage[count]/this.price.length;
          count++;
  }  
  this.price = price;
}
brain = require('brain.js');
NN:any[];
temp1:any[];
buyorsell:any[];
getbuyorsell()
{
      var buyorsell = [];
  for(var i =0;i<this.tickers.length;i++)
  {
    var trycatch = 0;
          var url1 = "https://api.worldtradingdata.com/api/v1/history?symbol="+this.tickers[i]+"&sort=newest&api_token=PRt07UGBzUrZPTUROLww1CBKxFeS0OcWL7qB3oaaJKxeFJ1mWuhz7LI08qBF";

    this.http.get(url1).subscribe(
      (data:any[])=>
      {
        this.temp = data;
      }) 
  var maxhigh=0;
var minlow=0;
var maxvolume =0;
var minvolume =0;
         for( var j = 10;j > 2;j--)
        {
          try
          {
            this.getDate(j);
            var high = this.temp["history"][this.currentDate]["high"];
            var low = this.temp["history"][this.currentDate]["low"];
            var volume = this.temp["history"][this.currentDate]["volume"];

            if(high>maxhigh)
            {
              maxhigh = high;
            }
            if(low<minlow)
            {
              low = minlow;
            }
            if(volume>maxvolume)
            {
              maxhigh = high;
            }
            if(volume<minvolume)
            {
              low = minlow;
            }            
          //note to calculate percentage

          }
          catch(err)
          {
            console.log(this.currentDate.toString()+"failed");
          }
        }
  var hml = maxhigh-minlow;
var hvl = maxvolume - minvolume;
var lowhighprice = [minlow,maxhigh-hml*0.5,maxhigh];
var lowhighvolume = [minvolume,maxvolume-hvl*0.5,maxvolume];
            console.log(this.currentDate+"thisone")
          var open = this.temp["history"][this.currentDate]["open"];
          var close = this.temp["history"][this.currentDate]["close"];
          var volume1 = this.temp["history"][this.currentDate]["volume"];
            for(var m = 0;m<lowhighprice.length-1;m++)
            {
              if(lowhighvolume[m]<volume1&&lowhighvolume[m+1]>=volume1)
              {
                var v = m;
              }
              if(lowhighprice[m]<open&&lowhighprice[m+1]>=open)
              {
                var p = m;
              }
            }

        var array = [this.tickers[i],0];

  array[1]=0;
var count = 0;
      for(var k =10;k>2;k--)
      {
try
{
        this.getDate(k);
        var open = this.temp1["history"][this.currentDate].open;
        var close = this.temp1["history"][this.currentDate].close;
        var volume1 = this.temp1["history"][this.currentDate]["volume"];
          
        if( open < close)
        {
          count++;
        }
        else
        {
          count--;
        }
      }
      catch(err)
      {
console.log(this.currentDate.toString()+"failed");
      }
      var bias = 2;
if(count>1)
{
        if(p<bias||v<bias)
        {
          array[1]=1;
        }
        else
        {
          array[1]=0;
        }
}
else
{
  array[1]=0;
}

}
            buyorsell.push( array );
  }
  this.buyorsell = buyorsell;
}
info:any[];
gettickersymbols()
{
  this.info = [];
  this.tickers.push(this.stock);
  this.tickerssectors.push([]
  );
  
  

    this.tickerssectors.push("");
  this.test =[];
    this.test.push("");
  console.log(this.test);
  var stockstring="";
  for(var i =0;i<this.tickers.length;i++)
  {
    if(i==0)
    {
      stockstring = this.tickers[i];
    }
    else
    {
      stockstring = stockstring+","+this.tickers[i];
    };
  
  this.url = "https://api.worldtradingdata.com/api/v1/stock?symbol="+stockstring+"&api_token=PRt07UGBzUrZPTUROLww1CBKxFeS0OcWL7qB3oaaJKxeFJ1mWuhz7LI08qBF";

    this.http.get(this.url).subscribe(
    (data:any[])=>
    {
      this.data=data;
    }
  )

  }
}

deleteTickersymbols()
{
  for(var i =0;i<this.tickers.length;i++)
  {
    if(this.stock==this.tickers[i])
    {
      var temp = this.tickers[this.tickers.length-1];
      this.tickers[this.tickers.length-1] = this.tickers[i];
      this.tickers[i]=temp;
      this.tickers.pop();
      break;
    }

  }
  console.log(this.tickers);
}
deleteTickersymbolsonclick(stock:any)
{
  for(var i =0;i<this.tickers.length;i++)
  {
    if(stock==this.tickers[i])
    {
      var temp = this.tickers[this.tickers.length-1];
      this.tickers[this.tickers.length-1] = this.tickers[i];
      this.tickers[i]=temp;
      this.tickers.pop();
      break;
    }

  }
  console.log(this.tickers);
}

getSector(ticker:any)
{
  console.log(ticker);
  //if(this.tickers.length == this.tickerssectors.length)
  //{
  for(var i = 0;i < this.tickers.length;i++)
  {
    if( ticker==this.tickers[i] )
    {
      var count = i;
    }

  }
  //}
  if(this.test[count]=="Tech")
  {
    this.tickerssectors[count]=
    ["a"];
  }
  if(this.test[count]=="Energy")
  {
    this.tickerssectors[count]=
    ["a"];
  }
  if(this.test[count]=="Healthcare")
  {
    this.tickerssectors[count]=
    ["a"];
  }
  if(this.test[count]=="Industrials")
  {
    this.tickerssectors[count]=
    ["a"];
  }      
  if(this.test[count]=="Real Estate")
  {
    this.tickerssectors[count]=
    ["a"];
  }
  if(this.test[count]=="Financials")
  {
    this.tickerssectors[count]=
    ["a"];
  }
  console.log(this.tickerssectors[count]);
    console.log(this.test[count]);
}
password:string;
username:string;
onUsernameKeyUp(event:any)
{
  this.username =event.target.value;
}
onPasswordKeyUp(event:any)
{
  this.password =event.target.value;
}
onstockKeyUp(event:any)
{
  this.stock =event.target.value;
}
onsectorkKeyUp(event:any,stock:any)
{
  console.log(stock);
  for(var i =0;i<this.tickers.length;i++)
  {
    if(this.tickers[i]==stock)
    {
      var count = i;
    }
  }
  this.test[count] =event.target.value;
  console.log(this.test);
}
Login()
{
  this.show = true; 
}
showAI=false;
showmanuel = false;
AI()
{
  this.showAI = true;
  this.showmanuel=false; 
  this.tickers=[];
}
manual()
{
  this.showmanuel=true; 
  this.showAI = false; 
  this.tickers=[];
}
manuelInformation=[];
GetManuelInformation()
{
  this.info = [];
  //this.tickers.push(this.stock);
  //this.open.push(this.b);
  //this.close.push(this.s);
  this.info.push(this.stock);
  this.info.push(this.b);
  this.info.push(this.s);

  this.manuelInformation.push(this.info);
  console.log(this.manuelInformation);
}
onbuyKeyUp(event:any)
{
  this.b =event.target.value;
}
onsellKeyUp(event:any)
{
  this.s =event.target.value;
}
Logout()
{
  this.show = false; 
}

/*getRobinhoodData()
{
  var credentials = {
  username: this.username,//"smithtrent00@gmail.com",
  password: this.password//"Comic@con1"
};
var Robinhood = require('robinhood')(credentials, function(){
 
    //Robinhood is connected and you may begin sending commands to the api.
 
    Robinhood.quote_data('GOOG', function(error, response, body) {
        if (error) {
            console.error(error);
            process.exit(1);
        }
        console.log(body);
    });
 
});
}*/


data1:any[];
  getUserbyUsername()
  {
    var i =0;
    this.show =false;
    console.log(this.username);
    console.log(this.password);
    console.log(this.data1["user"]);
   for(i=0;i<this.data1["user"].length;i++)
    {
      if(this.data1["user"][i].username==this.username)
      {
        if(this.data1["user"][i].password==this.password)
        {
          this.showAI=true;
          this.show =true;
          this.showmanuel=true;
          console.log(this.username);
        }
      }
    }
  }
 getData(url:string)
  {
  /*  this.http.get(url)
    .subscribe(
      (data:any[])=>
      {
          this.data=data;
      }
    ) */
    var test;
    var url1 = "https://www.mocky.io/v2/5e1e02a43600001cf4c74556";
    this.http.get(url1).subscribe((data:any[])=>
    {
      console.log(data["user"][0]["username"]);
      console.log(data["user"][0]["password"]);
      this.data1 = data;
    })
  }  
}