import React, { Component } from 'react';
import {Card, CardImg, CardText, CardTitle, CardBody} from 'reactstrap';

class DishDetail extends Component{
        constructor(props){
            super(props);
        }
        renderDish(dish){
                return(
                        <Card>
                            <CardImg width="100%" src={dish.image} alt={dish.name} /> 
                            <CardBody>
                                <CardTitle> {dish.name} </CardTitle>   
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                );
        }
        renderComments(dish){
            if(dish.comments==null){
                return(
                    <div></div>
                );
            }
           var menus=dish.comments.map((commenti) =>{
                return(
                    <li key={commenti.id} style={{fontSize: 18}}>
                        <div><p>{commenti.comment}</p></div>
                         <div><p>--{commenti.author}, {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                        }).format(new Date(commenti.date))}</p></div>   
                      </li> 
                );
           });
           return(
               <div>
                   <h4>Comments</h4>
                   <ul className='list-unstyled'>
                    {menus}
                </ul>
                </div>
           );
          
        }
        render(){
            var dish= this.props.selectedDish;
             if(dish!=null){
                 return(
                     <div className="row">
                         <div className="col-12 col-md-5 m-1">
                            {this.renderDish(dish)}                               
                         </div>
                         <div className="col-12 col-md-5 m-1">
                         {this.renderComments(dish)}
                         </div>
                     </div>
                 );
             } 
             else{
                 return(
                        <div> </div>
                 );
             }
        }
}
export default DishDetail;