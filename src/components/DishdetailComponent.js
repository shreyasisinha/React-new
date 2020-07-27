import React from 'react';
import {Card, CardImg, CardText, CardTitle, CardBody, Breadcrumb ,BreadcrumbItem} from 'reactstrap';
import  {Link} from 'react-router-dom';
function RenderDish({item}) {
    console.log(item.name);
    return(
        <Card>
            <CardImg src={item.image} alt={item.name} />
            <CardBody>
            <CardTitle>{item.name}</CardTitle>
            <CardText>{item.description}</CardText>
            </CardBody>
        </Card>
    );

}
        function RenderComments({comments}){
            if(comments==null){
                return(
                    <div></div>
                );
            }
           var menus=comments.map((commenti) =>{
                return(
                    
                    <li key={commenti.id} style={{fontSize: 18}}>
                        <div><p>{commenti.comment}</p></div>
                         <div><p>--{commenti.author}, {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit'
                        }).format(new Date(Date.parse(commenti.date)))}</p></div>   
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
      const DishDetail = (props) => {
            console.log(props.dish.name);
             if(props.dish!=null){
                 return(
                    <div className="container">
                            <div className="row">
                                <Breadcrumb>
                                <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                                </Breadcrumb>
                                <div className="col-12">
                                    <h3>{props.dish.name}</h3>
                                    <hr />
                                </div>
                            </div>
                     <div className="row">
                         <div className="col-12 col-md-5 m-1">
                            <RenderDish item={props.dish} />                              
                         </div>
                         <div className="col-12 col-md-5 m-1">
                         <RenderComments comments={props.comments}/>
                         </div>
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

export default DishDetail;