import React from 'react'
import { messaging } from "./init-fcm";
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
export default class Test extends React.Component{
  
    // ...
   constructor(props) {
       super(props)
   
       this.state = {
            notBookAvailable:true,
            bookNameAdded:'',
            notifiedBooks:[],
            deviceToken:''
       }
   }
   
      
   
      getNotification=async(fetchOptions)=>{
          console.log("fetchOptions",fetchOptions)
        const headers = {'Content-Type': 'application/json',
        'authorization':'key=AAAA7Ml6qeo:APA91bFHvXw0oz2pEviktsJ8YNkMd6L40_iqikTrOX9mqXUk3phBupauAgmd--LTsDofIWBRcEsXHJ7nSU5XLCv3zcAa-Xdpkox5Mvy7YlwM-FIWriVEz7MKV6gpcbSYzO5SpMhIvkXv'
     }
        let response=await axios.post("https://fcm.googleapis.com/fcm/send",fetchOptions,{headers:headers})
        console.log("response",response)
      }
      getToken=async()=>{
          const token=await messaging.getToken();
          this.setState({deviceToken:token})

      }
      componentDidMount()
      {
       this.getToken()
       let     fetchOptions={
        "notification" : {
            "body" : "Book is available",
            "title": "Book availability",
              "icon": "http://www.liberaldictionary.com/wp-content/uploads/2019/02/icon-0326.jpg"
        },
        "data" : {
            "body" : "Book is available",
            "title": "The book is available",
            "key_1" : "Value for key_1",
            "key_2" : "Value for key_2"
        },
           "to": "ftydmvW0PcvaZv1p8tzk0c:APA91bFHTA4zLHnXECbkZT2NlOGCtaEC70b8eMVm8jdfNtzBGJVXDBsdx0Z2g1luucY8H74W8HVfSSV64FvfM4uvSOhUMpdM6UEChWZun5dUttD7PNvZCPe3y6HBEcuqPWmwBh1aPGNR"
       
       }
           //call the notifcaion method
          this.getNotification(fetchOptions)
      }
 BookList=[
    { 'name':'Don Quixote'
    },
    {
       'name':'Lord of the Rings' 
    },
    {
        'name':'Harry Potter and the Sorcerer' 
     },
     {
        'name':'Pinocchio' 
        //
     },
]
handleEvent=(event)=>{
    console.log("event.target.value",event.target.value)
this.setState({book:event.target.value})



}
handleNotification=()=>{
   //store the device token
   let notifiedBook={}
   notifiedBook.bookName=this.state.book
   notifiedBook.deviceToken=this.state.deviceToken
   this.state.notifiedBooks.push(notifiedBook)
   console.log("this.state.notifiedBooks",this.state.notifiedBooks)
  
}
handleOk=()=>{
    let isBookAvailable=this.BookList.includes(this.state.book)
    console.log("isBookAVAILABEL",isBookAvailable)
    if(!isBookAvailable)
    {
        this.setState({notBookAvailable:isBookAvailable})
    }
}
handleBookAddition=(event)=>{
this.setState({bookNameAdded:event.target.value})

}
handleBookAdditionNotification=()=>{
    for(let i=0;i<this.state.notifiedBooks.length;i++)
    {
        if(this.state.notifiedBooks[i].bookName==this.state.bookNameAdded)
        {
            let fetchOptions={
                "content_available": false,
                "data" : {
                    "notification" : {
                        "body" : "Book is available",
                        "title": "Book availability",
                          "icon": "http://www.liberaldictionary.com/wp-content/uploads/2019/02/icon-0326.jpg"
                    },
                    "body" : "Book is available",
                    "title": "The book is available",
                    "key_1" : "Value for key_1",
                    "key_2" : "Value for key_2"
                },
                   "to": "ftydmvW0PcvaZv1p8tzk0c:APA91bFHTA4zLHnXECbkZT2NlOGCtaEC70b8eMVm8jdfNtzBGJVXDBsdx0Z2g1luucY8H74W8HVfSSV64FvfM4uvSOhUMpdM6UEChWZun5dUttD7PNvZCPe3y6HBEcuqPWmwBh1aPGNR"
               
               }
               this.getNotification(fetchOptions)
        }
        }
    }
   
   render(){
       console.log("notBookAvailable",this.state.notifiedBooks)
       return(
           <Grid>
             {this.BookList.map((item)=>{
                 return(
                        <Grid style={{padding:16,}}>
                            {item.name}
                        </Grid>
                 )
             })} 
             <Grid style={{padding:16,}}>
                 <TextField label="Enter the book " onChange={(event)=>{this.handleEvent(event)}}>
                    
                 </TextField>
                 
             </Grid>
             {this.state.notBookAvailable!=null && (this.state.notBookAvailable)?
             <Grid style={{padding:16}}>
             <Button vairant='contained' onClick={()=>{this.handleOk()}} style={{background:'green'}}>
ok
             </Button>
             </Grid>:null}
            
             {this.state.notBookAvailable!=null && !(this.state.notBookAvailable)?
             <Grid style={{padding:16}}>
                 <Typography>
                     sorry the book isnt available
                 </Typography>
             <Button vairant='contained' onClick={()=>{this.handleNotification()}} style={{background:'red'}}>
Notify me
             </Button>
             </Grid>:null}
             <Grid>
                 <TextField label='add a book' onChange={(event)=>{this.handleBookAddition(event)}}>
                    
                 </TextField>
             </Grid>
             <Grid>
                 <Button  onClick={()=>{this.handleBookAdditionNotification()}}>
                    ok
                 </Button>
             </Grid>
           </Grid>
       )
   }
}