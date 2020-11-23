import React from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
export default class Signin extends React.Component{
    constructor(props) {
        super(props)
    
        this.state = {
             number:0
        }
    }
    handleTextField=(event)=>{
this.setState({number:event.target.value})
    }
    handleOK=()=>{

    }
   render(){
       return(
           <Grid>
 <Grid>
<TextField label='enter the number' onChange={(event)=>{this.handleTextField(event)}}>

</TextField>
           </Grid>
           <Grid>
               <Button variant='contained' onClick={()=>{this.handleOK()}}>
                   OK
               </Button>
           </Grid>
           </Grid>
          
           
       )
   }
}