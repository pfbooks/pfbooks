import { useState } from "react";
import Stars from "./Stars";

const Reviews = ({bookId,Reviews}) => {

    return (
        <div>
            <h1>REVIEWS</h1>
            {Reviews?.map(item => {
                return (
                    <div key={item.id}>
                        <Stars rating={item.rating}/>
                        <h1>{item.userName}</h1>
                        <p>{item.comment}</p>
                    </div>
                )
            })}
      
        </div>
    )

}

export default  Reviews;
