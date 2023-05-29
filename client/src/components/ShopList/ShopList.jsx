import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaMoneyBill, FaCalendarAlt } from "react-icons/fa";
import { AiOutlineCheckCircle } from "react-icons/ai";
import "./ShopList.module.css";
import { orderByIdUser } from "../../redux/actions/actions";
import usePagination from "@mui/material/usePagination/usePagination";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";


const ShopList = () => {
    const { userId } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(orderByIdUser(userId));
        console.log(order)
      }, [dispatch, userId]);
    const order = useSelector((state) => state.orderByUser )


      return (
        <div className="shopping-list">
          <h2 className="shopping-list-title">
            <FaShoppingCart className="shopping-list-icon" /> Lista de Compras
          </h2>
          {order.length === 0 ? (
            <p>No hay compras realizadas.</p>
          ) : (
            <div className="shopping-list-items">
              {order.map((o) => (
                <div key={o.id} className="shopping-list-item">
                    <h1>Usuario: {o.User.name}</h1>
                  <div className="shopping-list-item-details">
                      {o.Books.map(b => {
                          return(
                              <div>
                                  <p className="shopping-list-item-name">
                                <AiOutlineCheckCircle className="shopping-list-item-icon" />{" "}
                                {b.title}
                    </p>
                    <p className="shopping-list-item-price">
                      <FaMoneyBill className="shopping-list-item-icon" /> $
                      {b.price}
                    </p>
                        </div>
                        )
                      })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
};

export default ShopList;
