import React, { Component } from 'react'
import Nav from '../../Nav/Nav.js'
import AutocompleteStart from '../../Mapas/AutocompleteStart.js'
import AutocompleteEnd from '../../Mapas/AutocompleteEnd.js'
import journeys from '../../../journeys.json'
export default class Join extends Component {
 
constructor(props) {
  super(props)

  this.state = {
    coorstart: null,
    coorend: null,
    journeys: journeys
  }


}


  startInfo = (coorstart) => {
    this.setState({ ...this.state, coorstart })
  
}
endInfo = (coorend) => {
    this.setState({ ...this.state, coorend })
    
    
}

getandSortDistance = ()=>{
  let staArray=[];
  
  this.state.journeys.forEach((e)=>{
  
  if (((e.startPoint.lat < (this.state.coorstart.lat + 0.01)) && (e.startPoint.lat > (this.state.coorstart.lat - 0.01))) && ((e.startPoint.lng < (this.state.coorstart.lng + 0.01))
   && (e.startPoint.lng > (this.state.coorstart.lng - 0.01))) &&  ((e.endPoint.lat < (this.state.coorend.lat + 0.01) && (e.endPoint.lat > (this.state.coorend.lat - 0.01))) && ((e.endPoint.lng < (this.state.coorend.lng + 0.01))
   &&(e.endPoint.lng > (this.state.coorend.lng - 0.01))))){
     
    staArray.push(e);
    
    
  }console.log(staArray)
})}

  render() {
    console.log(this.state)
  
const funciona = this.state.coorend==null ?(
    <p>loading...</p>
):(
      console.log(this.getandSortDistance())
);

    
    // console.log(this.state.coorstart,this.state.coorend)
    return (
      <div>
         {funciona}
         <Nav />
         <AutocompleteStart update={this.startInfo}/>
         <AutocompleteEnd update={this.endInfo}/>

      </div>
    )
  }
}
