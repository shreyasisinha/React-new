import React, { Component } from 'react';
import {Card, CardImg, CardText, CardTitle, CardBody, Breadcrumb ,BreadcrumbItem, Button,Modal, ModalHeader, ModalBody,Row,Label} from 'reactstrap';
import  {Link} from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';

const maxLength = (len) => (val)=> !(val) || (val.length <= len);
const minLength = (len) => (val)=> !(val) || (val.length >= len);

class CommentForm extends Component{
        constructor(props){
            super(props);
            this.state={
                  isModalOpen: false  
            };
            this.toggleModal= this.toggleModal.bind(this);
        }
        toggleModal() {
            this.setState({
                isModalOpen:!this.state.isModalOpen
            });
        }
        handleSubmit(values){
            console.log(values);
            alert("Current State is" + JSON.stringify(values));
        }
        render(){
        return(
        <>
        <Button outline onClick={this.toggleModal}>
            <span className="fa fa-pencil fa-lg"></span> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
             <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
             <ModalBody className="m-4">
                 <LocalForm onSubmit={(values)=>this.handleSubmit(values)}   >
                     <Row className="form-group">
                         <Label htmlFor="rating">Rating</Label>
                         <Control.select model="rating" name="rating"
                         className="form-control">
                             <option>1</option>
                             <option>2</option>
                             <option>3</option>
                             <option>4</option>
                             <option>5</option>
                         </Control.select>
                     </Row>
                     <Row className="form-group">
                         <Label htmlFor="yourname">Your Name</Label>
                         <Control.text model=".yourname" id="yourname" name="yourname"
                         placeholder="Your Name"
                         className="form-control"
                         validators={{
                             minLength:minLength(3), maxLength: maxLength(15)
                        }}
                        />
                        <Errors
                            className="text-danger"
                            model=".yourname"
                            show="touched"
                            messages={{
                               
                                minLength: 'Must be greater than 2 characters',
                                maxLength: 'Must be 15 characters or less'
                            }}
                            />                       
                     </Row>
                     <Row className="form-group">
                         <Label htmlFor="comment">Your Name</Label>
                         <Control.textarea model=".comment" id="comment" name="comment"
                         rows="6"
                         className="form-control"/>
                    </Row>
                    <Row className="form-group">
                               
                         <Button type="submit" color="primary">
                              Submit
                          </Button>
                    </Row>
                 </LocalForm>
             </ModalBody>
        </Modal>
        </>
        );
     }
}

function RenderDish({dish}) {
    return(
        <Card>
            <CardImg src={dish.image} alt={dish.name} />
            <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
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
                    <CommentForm/>
                </ul>
                </div>
           );
          
        }
      const DishDetail = (props) => {
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
                            <RenderDish dish={props.dish} />                              
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