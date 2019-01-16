import React, { Component } from 'react'
import AuthService from '../../../../Service/AuthService.js'
import Nav from '../../../Nav/Nav.js'
import UserInfo from '../UserInfo/UserInfo.js'
import ProfileNav from '../ProfileNav/ProfileNav.js'

export default class Varorations extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      comment:'',
      rate:0,
      imgPath:'',
      username:'',
      valorations:null
    }
    this.authService = new AuthService();
  }
  
  handleChange=(e)=>{
    const { name, value } = e.target;
    this.setState({ ...this.state,[name]: value });
  }
  handleFormSubmit=(e)=>{
    e.preventDefault();
    const{comment,rate,imgPath,username}=this.state;
    this.authService
    .valorate({comment,rate,imgPath,username})
    .then(this.refresh())
  }
  rate=(rateNumber,e)=>{
    e.preventDefault()
    this.setState({rate:rateNumber})
  }
  fetchUser = () => {
    this.authService
      .loggedin()
      .then(user => 
        this.setState({ ...this.state, imgPath:user.imgPath , username:user.username}))
     
  };
  getValorations=()=>{
    this.authService.
    getValorations()
    .then(data=>     
      this.setState({valorations:data}))
  }
  emoji=(valoration)=>{
      if(valoration == 5){
        return "../../../../../images/super-happy-emoji.svg"
      }
      if(valoration == 4){
        return "../../../../../images/happy-emoji.svg"
      }
      if(valoration == 3){
        return "../../../../../images/meh-emoji.svg"
      }
      if(valoration == 2){
        return "../../../../../images/angry-emoji.svg"
      }
      if(valoration == 1){
        return "../../../../../images/super-angry-emoji.svg"
      }
          
  };
  refresh=()=>{
    [1,2,3].forEach(e => {
      this.getValorations()
    })
  }
  componentDidMount(){
    this.fetchUser()
    this.getValorations()
   
  }
  render() {
    console.log(this.state.valorations)
    let valorations = this.state.valorations?(
      this.state.valorations.map(valoration => (
        
        <div className='valoration-container'>
        <div className='banner-img'>
          <img className='valoration-img' src={valoration.imgPath} alt=""/>
        </div>  
          <div className='valoration-info'>
            <p className='valoration-name'>{valoration.username}</p>
            <p className='valoration-text'>{valoration.comment}</p>
          </div>  
          <img className='emoji-img' src={this.emoji(valoration.rate)} alt=""/>
        </div>     
      ))
      ):(
        <div>Be the first to rate!</div>
      );

      
    return (
      <div>
        <Nav />

       

        <div className='profile-info-cont'>
          <UserInfo image={this.props.getImage} name={this.props.getName}/>
          <div className='profile-content'>
          <div className='scroll-div'>
          {valorations}
          </div>
          <form className='valoration-form' onSubmit={this.handleFormSubmit}>
            <div className='emojis-container'>
              <button className='rate-button' onClick={(e)=>this.rate(1,e)}><img className='emojis' src="../../../../../images/super-angry-emoji.svg" alt=""/></button>
              <button className='rate-button' onClick={(e)=>this.rate(2,e)}><img className='emojis' src="../../../../../images/angry-emoji.svg" alt=""/></button>
              <button className='rate-button' onClick={(e)=>this.rate(4,e)}><img className='emojis' src="../../../../../images/meh-emoji.svg" alt=""/></button>
              <button className='rate-button' onClick={(e)=>this.rate(3,e)}><img className='emojis' src="../../../../../images/happy-emoji.svg" alt=""/></button>
              <button className='rate-button' onClick={(e)=>this.rate(5,e)}><img className='emojis' src="../../../../../images/super-happy-emoji.svg" alt=""/></button>
            </div>
              <textarea
                    type="text"
                    name="comment"
                    placeholder="Comment..."
                    onChange={e => this.handleChange(e)}
                    className="valoration-input"
                  />
              <input type="submit" className='submit-valoration' value='Share' />
          </form>
          </div>
          
          <ProfileNav/>     
        </div>
      </div>
    )
  }
}
