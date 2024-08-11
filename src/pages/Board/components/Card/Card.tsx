import React from "react";
import './card.scss';

interface CardProps{
    title:string;
}

export const Card:React.FC<CardProps> = ({title}) => {
   return(
    <div className="card-container">
        <h3 className="card-name">{title}</h3>
    </div>
   )
}